import moment from "moment";
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import "animate.css";
import { IoHomeOutline } from "react-icons/io5";
import { ABoxAll } from "../../Components/Boxes";
import SLoading from '../../Components/Loading';
import { AMessageError } from "../../Components/Messages";
import { SubBar, SubBarLeft, SubBarRight } from '../../Components/SubBar';
import { AppContext } from '../../Contexts/AppContext';
import api from "../../Services/api";

const Home = () => {
  const { setLoading, loading } = useContext(AppContext);
  const [allCiclos, setAllCiclos] = useState<any>([]);
  const [cicloAtivo, setCicloAtivo] = useState<boolean>(true);
  useEffect(() => {
    const getCiclos = (async () => {
      await api.get('ciclos')
        .then((result) => {
          let res = result.data.data;
          setAllCiclos(res);
          let activeCicle = res.filter((item: any) => (item.ativo === true));
          if (activeCicle.length > 0) {
            setCicloAtivo(true);
            let metasExist = activeCicle[0].metas.filter((meta: any) => (meta.cicloId === activeCicle[0].idCiclo)).sort((a: any, b: any) => a.semana > b.semana ? -1 : 1);
            let dataCompare = moment(metasExist.slice(0)[0].dataInicial).add(7, 'day').format("YYYY-MM-DD");
            let dataAtual = moment().format("YYYY-MM-DD");
            let dtcompare = moment(dataAtual).isAfter(moment(dataCompare));

            if (dtcompare === true) {
              api.post('metas', {
                data: {
                  cicloId: activeCicle[0].idCiclo,
                  semana: metasExist.slice(0)[0].semana + 1,
                  dataInicial: dataCompare,
                  dataFinal: moment(dataCompare).add(6, 'day').format("YYYY-MM-DD")
                }
              }).then(() => {
                api.get('ciclos').then((result) => {
                  let re = result.data.data;
                  setAllCiclos(re);
                })
              })
            }

          }
        });
      setLoading(false);
    });

    const interval = setInterval(() => {
      getCiclos();
    }, 500);
    return () => clearInterval(interval);
  }, [])

  return (
    <Fragment>

      {loading &&
        <SLoading />
      }

      <SubBar>
        <>
          <SubBarLeft>
            <div className="flex items-center justify-start">
              <IconContext.Provider value={{ className: 'text-3xl' }} >
                <div>
                  <IoHomeOutline />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Home</h1>
            </div>

          </SubBarLeft>
          <SubBarRight>

            <div className="flex items-center py-7 overflow-x-auto whitespace-nowrap">
            </div>

          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>
        {!cicloAtivo &&

          <AMessageError className="rounded-t-lg !mb-0 animate__animated animate__fadeIn animate__delay-2s">
            Não há ciclos cadastrados ou está inativo, para visualização de dados adicione e/ou ative-o em ciclos.
          </AMessageError>

        }
        {allCiclos.map((item: any, index: any) => (
          <div key={index}>
            {item.metas.map((im: any, ixm: any) => (
              <div key={ixm} className="ml-4">Ciclo {im.cicloId} | Semana {im.semana} de {moment(im.dataInicial).format("DD/MM/YYYY")} à {moment(im.dataFinal).format("DD/MM/YYYY")}</div>
            ))}
          </div>
        ))}
      </ABoxAll>

    </Fragment>
  )
}

export default Home;
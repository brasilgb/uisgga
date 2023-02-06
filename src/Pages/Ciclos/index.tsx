import React, { Fragment, useContext, useEffect, useState } from 'react'
import { SAddButtom, SDlButtom, SEdButtom } from '../../Components/Buttons';
import SFormSearch from '../../Components/Form/FormSearch';
import SLoading from '../../Components/Loading';
import Pagination from '../../Components/Pagination';
import { SubBar, SubBarLeft, SubBarRight } from '../../Components/SubBar';
import { STable, STd, STh, STr } from '../../Components/Tables';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../Services/api';

const Ciclos = () => {

  const [allCiclos, setAllCiclos] = useState<any>([]);
  const { setLoading, loading } = useContext(AuthContext);

  // useEffect(() => {
  // setTimeout(() => {
  //   setLoading(false);
  // }, 500);
  // },[]);

  useEffect(() => {
    setLoading(true);
    const getAllCiclos = async () => {
      await api.get('ciclos')
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
            setAllCiclos(response.data.data);
          }, 500)
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getAllCiclos();
  }, [])
  return (
    <Fragment>

      {loading &&
        <SLoading />
      }

      <SubBar>
        <>
          <SubBarLeft>
            <h1 className='text-3xl font-medium'>Ciclos</h1>
          </SubBarLeft>
          <SubBarRight>

            <div className="flex items-center py-4">
              <span className="text-gray-600 ">

              </span>

              <span className="mx-2 text-gray-500 ">/</span>

              <a href="#" className="text-gray-600  hover:underline">Ciclos</a>

            </div>

          </SubBarRight>
        </>
      </SubBar>
      <div className="flex items-center justify-between">
        <div>
          <SAddButtom link='/22' />
        </div>
        <div>
          <SFormSearch />
        </div>
      </div>
      <div>
        <div className="flex flex-col md:px-6 lg:px-8">
          <div className="overflow-x-auto  bg-gray-50 border border-white md:rounded-lg p-2 shadow-md">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-t-lg">
                <STable>
                  <>
                    <thead className='bg-gray-200'>

                      <STr bgColor="bg-gray-200">
                        <>
                          <STh><span>#ID</span></STh>
                          <STh><span>Data inicial</span></STh>
                          <STh><span>Data final</span></STh>
                          <STh><span>Semana inicial</span></STh>
                          <STh><span>Semana atual</span></STh>
                          <STh><span>Semanas percorridas</span></STh>
                          <STh><span>-</span></STh>
                        </>
                      </STr>

                    </thead>

                    <tbody>
                      {allCiclos.map((ciclo: any, index: any) => (
                        <STr key={index} bgColor="bg-white">
                          <>
                            <STd>{ciclo.idCiclo}</STd>
                            <STd>{ciclo.dataInicial}</STd>
                            <STd>{ciclo.dataFinal}</STd>
                            <STd>{ciclo.semanaInicial}</STd>
                            <STd>{ciclo.metas.length}</STd>
                            <STd>{ciclo.metas.length}</STd>
                            <STd>
                              <div className='flex items-center justify-end'>
                                <SEdButtom link='' />
                                <SDlButtom link='' />
                              </div>

                            </STd>
                          </>
                        </STr>
                      ))}
                    </tbody>
                  </>
                </STable>

              </div>
              <div>

                <Pagination items={allCiclos} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Ciclos;
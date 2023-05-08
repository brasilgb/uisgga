import React, { Fragment, useContext, useEffect, useState } from 'react'

import { IconContext } from 'react-icons';
import { IoArrowBack, IoArrowForward, IoCheckmark, IoClose, IoHome, IoTimerOutline } from 'react-icons/io5';
import { GiLargePaintBrush } from "react-icons/gi";
import { SAddButtom, SDlButtom } from '../../Components/Buttons';
import { SFormSearchData } from '../../Components/Form/FormSearch';
import SLoading from '../../Components/Loading';
import ReactPaginate from 'react-paginate';
import { SubBar, SubBarLeft, SubBarRight } from '../../Components/SubBar';
import { STable, STd, STh, STr } from '../../Components/Tables';
import { AppContext } from '../../Contexts/AppContext';
import 'animate.css';
import api from '../../Services/api';
import { ModalDelete, ModalConfirm } from '../../Components/ModalDelete';
import { CgSpinnerTwo } from 'react-icons/cg';
import moment from 'moment';
import { ABoxAll } from '../../Components/Boxes';
import { useNavigate } from "react-router-dom";
import { ITENS_PER_PAGE } from "../../Constants";

const Ciclos = () => {
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AppContext);
  const [allCiclos, setAllCiclos] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [idCiclo, setIdCiclo] = useState();
  const [loadingActive, setLoadingActive] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [messageSearch, setMessageSearch] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getAllCiclos = async () => {
      await api.get('ciclos')
        .then((response) => {
          setTimeout(() => {
            setAllCiclos(response.data.data.sort((a: any, b: any) => (a.idCiclo > b.idCiclo ? -1 : 1)));
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response.status);
        });
    };
    getAllCiclos();
  }, [setLoading])

  const toggleDelete = (id: any) => {
    setShowDeleteModal(!showDeleteModal);
    setIdDelete(id);
  }

  // delete ciclos
  const deleteRow = (async (id: any) => {
    await api.delete('ciclos', {
      data: { idCiclo: id },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        const cic = allCiclos.filter((item: any) => item.idCiclo !== id);
        setAllCiclos(cic);
        setShowDeleteModal(false);
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // edita ciclos
  const updateCiclo = (async (id: any, ativo: any, data: any, semana: any, semanafinal: any) => {
    setIdCiclo(id);
    setLoadingActive(true);
    await api.patch('ciclos', {
      idCiclo: id,
      ativo: ativo ? false : true,
      dataInicial: data,
      semanaInicial: semana,
      dataFinal: moment().format("YYYY-MM-DD"),
      semanaFinal: semanafinal
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        api.get('ciclos')
          .then((response) => {
            setTimeout(() => {
              setLoadingActive(false);
              setAllCiclos(response.data.data.sort((a: any, b: any) => (a.idCiclo < b.idCiclo)));
            }, 500)
          })
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // -> Pagination
  const [newCiclo, setNewCiclo] = useState(allCiclos.slice(0, 50));
  useEffect(() => {
    setNewCiclo(allCiclos.slice(0, 50));
  }, [allCiclos])
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITENS_PER_PAGE;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(allCiclos.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const DisplayItems = newCiclo
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((ciclo: any, index: any) => (
      <STr key={index} head={false} colorRow={index % 2}>
        <>
          <STd>{ciclo.idCiclo}</STd>
          <STd>{moment(ciclo.dataInicial).format("DD/MM/YYYY")}</STd>
          <STd>{ciclo.semanaInicial}</STd>
          <STd>
            {
              ciclo.metas.sort((s: any, m: any) => (s.semana < m.semana ? -1 : 1)).slice(-1)[0].semana
            }
          </STd>
          <STd>{ciclo.metas.length}</STd>
          <STd>{ciclo.dataFinal != null ? moment(ciclo.dataFinal).format("DD/MM/YYYY") : '-'}</STd>
          <STd>{ciclo.semanaFinal != null ? ciclo.semanaFinal : '-'}</STd>
          <STd>{ciclo.lotes.length}</STd>
          <STd>
            <div className='flex items-center justify-end'>
              <button
                onClick={() => updateCiclo(ciclo.idCiclo, ciclo.ativo, ciclo.dataInicial, ciclo.semanaInicial, ciclo.metas[ciclo.metas.length - 1].semana)}
              >
                {ciclo.ativo
                  ? <span className='flex items-center justify-center h-8 w-8 bg-green-600 border-2 border-white text-white rounded-full mr-4'>
                    <IconContext.Provider value={{ className: 'font-extrabold' }} >
                      <div>
                        {idCiclo === ciclo.idCiclo && loadingActive ? <CgSpinnerTwo className='animate-spin' size={22} /> : <IoCheckmark size={22} />}
                      </div>
                    </IconContext.Provider>
                  </span>
                  : <span className='flex items-center justify-center h-8 w-8 bg-red-600 border-2 border-white text-white rounded-full mr-4'>
                    <IconContext.Provider value={{ className: 'font-extrabold' }} >
                      <div>
                        {idCiclo === ciclo.idCiclo && loadingActive ? <CgSpinnerTwo className='animate-spin' size={22} /> : <IoClose size={22} />}
                      </div>
                    </IconContext.Provider>
                  </span>
                }
              </button>

              <SDlButtom active={ciclo.ativo} onClick={() => toggleDelete(ciclo.idCiclo)} />
            </div>
          </STd>
        </>
      </STr>
    ));
  // Pagination ->

  // -> sistema de busca
  async function handleSearch() {
    let date = moment(startDate).format('YYYY-MM-DD');
    await api.get(`date/${date}`)
      .then((response) => {
        setLoadingSearch(true);

        setTimeout(() => {
          if (response.data.data.length > 0) {
            setNewCiclo(response.data.data);
            setLoadingSearch(false);
            setMessageSearch(true);
          } else {
            setNewCiclo(response.data.data);
            setLoadingSearch(false);
            setMessageSearch(true);
          }
        }, 500);
      })
      .catch((err) => {
        console.log(err.response);
      })
  };
  // Sistema de busca ->

  // Reload ciclos
  const handleReloadCiclos = (() => {
    setLoading(true);
    setTimeout(() => {
      setNewCiclo(allCiclos);
      setLoading(false);
      setMessageSearch(false);
    }, 500)
  });

  return (
    <Fragment>

      {loading &&
        <SLoading />
      }
      <SubBar>
        <>
          <SubBarLeft>
            <>
              <IconContext.Provider value={{ className: 'text-3xl' }} >
                <div>
                  <IoTimerOutline />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Ciclos</h1>
            </>
          </SubBarLeft>
          <SubBarRight>

            <div className="flex items-center py-4">
              <button onClick={() => navigate('/')} className="text-gray-600 ">
                <IconContext.Provider value={{ className: 'text-xl' }} >
                  <div>
                    <IoHome />
                  </div>
                </IconContext.Provider>
              </button>
              <span className="mx-2 text-gray-500 ">/</span>
              <span className="text-gray-600">Ciclos</span>
            </div>

          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>

        <div className="flex items-center justify-between mb-2">
          <div>
            <SAddButtom onClick={() => navigate('/ciclos/addciclo')} />
          </div>

          {messageSearch &&
            <div className="flex items-center justify-start">
              <button onClick={() => handleReloadCiclos()} className="flex items-center justify-center" title="Limpar busca">
                <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
                  <div className="bg-gray-200 rounded-l-full px-2 py-1  border border-gray-300">
                    <GiLargePaintBrush className="rotate-90" />
                  </div>
                </IconContext.Provider>
              </button>
              <div className="bg-gray-100 text-base rounded-r-md py-1 px-4  border border-gray-300">Correspondências encontradas: <span className={`${newCiclo.length > 0 ? 'text-green-500' : 'text-red-500'}`}>{newCiclo.length}</span></div>

            </div>
          }

          <div className="flex">
            <SFormSearchData
              loading={loadingSearch}
              onclick={handleSearch}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>
        </div>

        <div className="rounded-t-lg border overflow-auto">
          <STable>
            <>
              <thead>

                <STr head={true}>
                  <>
                    <STh><span>#ID</span></STh>
                    <STh><span>Data inicial</span></STh>
                    <STh><span>Semana inicial</span></STh>
                    <STh><span>Semana atual</span></STh>
                    <STh><span>Semanas percorridas</span></STh>
                    <STh><span>Data final</span></STh>
                    <STh><span>Semana final</span></STh>
                    <STh><span>Lotes</span></STh>
                    <STh><span></span></STh>
                  </>
                </STr>

              </thead>

              <tbody className='animate__animated animate__fadeIn'>

                {DisplayItems}

              </tbody>
            </>
          </STable>

        </div>
        {newCiclo.length > itemsPerPage &&
          <div className='bg-white border-x border-b rounded-b-lg py-2  '>
            <ReactPaginate
              previousLabel={<IoArrowBack size={17} />}
              nextLabel={<IoArrowForward size={17} />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName="flex items-center justify-center"
              previousLinkClassName="flex items-center justify-center mr-1 w-11 h-11 rounded-lg bg-gray-100 !border-2 !border-white shadow-md"
              nextLinkClassName="flex items-center justify-center ml-1 w-11 h-11 rounded-lg bg-gray-100 !border-2 !border-white shadow-md"
              disabledClassName="flex items-center text-gray-300 cursor-not-allowed bg-white"
              // pageClassName="border flex items-center justify-center bg-gray-200 mx-1 rounded-lg"
              pageLinkClassName="mx-1 flex items-center justify-center w-11 h-11 text-gray-800 bg-gray-100 rounded-lg !border-2 !border-white shadow-md"
              // activeClassName="border-0 flex items-center text-gray-50 bg-blue-500 rounded-lg"
              activeLinkClassName="flex items-center justify-center w-11 h-11 !text-gray-50 font-bold !bg-blue-500 rounded-lg !border-2 !border-white shadow-md"
            />
          </div>
        }

      </ABoxAll>

      {showDeleteModal &&
        <ModalDelete info="este ciclo" closemodal={() => setShowDeleteModal(!showDeleteModal)} deleterow={() => deleteRow(idDelete)} />
      }

    </Fragment>
  )
}

export default Ciclos;
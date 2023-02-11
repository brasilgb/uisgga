import React, { Fragment, useContext, useEffect, useState } from 'react'

import { IconContext } from 'react-icons';
import { IoArrowBack, IoArrowForward, IoCheckbox, IoCheckmark, IoClose, IoHome, IoTimer } from 'react-icons/io5';
import { SAddButtom, SDlButtom } from '../../Components/Buttons';
import { SFormSearchData } from '../../Components/Form/FormSearch';
import SLoading from '../../Components/Loading';
import ReactPaginate from 'react-paginate';
import { SubBar, SubBarLeft, SubBarRight } from '../../Components/SubBar';
import { STable, STd, STh, STr } from '../../Components/Tables';
import { AuthContext } from '../../Context/AuthContext';
import 'animate.css';
import api from '../../Services/api';
import { ModalDelete, ModalConfirm } from '../../Components/ModalDelete';
import { CgSpinnerTwo } from 'react-icons/cg';
import moment from 'moment';

const Ciclos = () => {

  const { setLoading, loading } = useContext(AuthContext);
  const [allCiclos, setAllCiclos] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [idCiclo, setIdCiclo] = useState();
  const [loadingActive, setLoadingActive] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setLoading(true);
    const getAllCiclos = async () => {
      await api.get('ciclos')
        .then((response) => {
          setTimeout(() => {
            setLoading(false);
            setAllCiclos(response.data.data.sort((a: any, b: any) => (a.idCiclo < b.idCiclo)));
          }, 500)
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getAllCiclos();
  }, [])

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
        setShowConfirmModal(true);
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // edita ciclos
  const updateCiclo = (async (id: any, ativo: any, data: any, semana: any) => {
    setIdCiclo(id);
    setLoadingActive(true);
    await api.patch('ciclos', {
      idCiclo: id,
      ativo: ativo ? false : true,
      dataInicial: data,
      semanaInicial: semana
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
            setLoading(true);
            setTimeout(() => {
              setLoadingActive(false);
              setAllCiclos(response.data.data.sort((a: any, b: any) => (a.idCiclo < b.idCiclo)));
            }, 1000)
          })
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // Pagination
  const [newCiclo, setNewCiclo] = useState(allCiclos.slice(0, 50));
  useEffect(() => {
    setNewCiclo(allCiclos.slice(0, 50));
  }, [allCiclos])
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(allCiclos.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const DisplayItems = newCiclo
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((ciclo: any, index: any) => (
      <STr key={index} head={true} colorRow={index % 2}>
        <>
          <STd>{ciclo.idCiclo}</STd>
          <STd>{ciclo.dataInicial}</STd>
          <STd>{ciclo.dataFinal}</STd>
          <STd>{ciclo.semanaInicial}</STd>
          <STd>{ciclo.metas.length}</STd>
          <STd>{ciclo.metas.length}</STd>
          <STd>
            <div className='flex items-center justify-end'>
              <button
                onClick={() => updateCiclo(ciclo.idCiclo, ciclo.ativo, ciclo.dataInicial, ciclo.semanaInicial)}
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

  // sistema de busca
  const handleSearch = (async () => {
    setLoading(true);
    let date = moment(startDate).format('YYYY-MM-DD');
    console.log(date);
    await api.get(`date/${date}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err.response);
    })
    // setNewCiclo(resultSearch);
    setLoading(false);
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
                  <IoTimer />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Ciclos</h1>
            </>

          </SubBarLeft>
          <SubBarRight>

            <div className="flex items-center py-4">
              <span className="text-gray-600 ">
                <IconContext.Provider value={{ className: 'text-xl' }} >
                  <div>
                    <IoHome />
                  </div>
                </IconContext.Provider>
              </span>

              <span className="mx-2 text-gray-500 ">/</span>

              <a href="#" className="text-gray-600  hover:underline">Ciclos</a>

            </div>

          </SubBarRight>
        </>
      </SubBar>

      <div className="flex flex-col md:px-6 lg:px-8">
        <div className="overflow-x-auto  bg-gray-50 border border-white md:rounded-lg p-2 shadow-md">

          <div className="flex items-center justify-between mb-2">
            <div>
              <SAddButtom onClick='/22' />
            </div>
            <div>
              <SFormSearchData
                onclick={handleSearch}
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
          </div>
          <div>

            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-t-lg border">
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

                    <tbody className='animate__animated animate__fadeIn'>

                      {DisplayItems}

                    </tbody>
                  </>
                </STable>

              </div>
              <div className='bg-white border-x border-b rounded-b-lg py-2  '>
                {/* <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} /> */}
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
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal &&
        <ModalDelete info="este ciclo" closemodal={() => setShowDeleteModal(!showDeleteModal)} deleterow={() => deleteRow(idDelete)} />
      }

      {showConfirmModal &&
        <ModalConfirm info="Ciclo" closemodal={() => setShowConfirmModal(!showConfirmModal)} />
      }

    </Fragment>
  )
}

export default Ciclos;
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
import { AuthContext } from '../../Context/AuthContext';
import 'animate.css';
import api from '../../Services/api';
import { ModalDelete, ModalConfirm } from '../../Components/ModalDelete';
import { CgSpinnerTwo } from 'react-icons/cg';
import moment from 'moment';
import { ABoxAll } from '../../Components/Boxes';
import { useNavigate } from "react-router-dom";
import { ITENS_PER_PAGE } from "../../Constants";

const Lotes = () => {
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AuthContext);
  const [allLotes, setAllLotes] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [idLote, setIdLote] = useState();
  const [loadingActive, setLoadingActive] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [messageSearch, setMessageSearch] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getAllLotes = async () => {
      await api.get('lotes')
        .then((response) => {
          setTimeout(() => {
          setAllLotes(response.data.data.sort((a: any, b: any) => (a.idLote < b.idLote)));
          setLoading(false);
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response.status);
        })
    };
    getAllLotes();
  }, [])

  const toggleDelete = (id: any) => {
    setShowDeleteModal(!showDeleteModal);
    setIdDelete(id);
  }

  // delete lotes
  const deleteRow = (async (id: any) => {
    await api.delete('lotes', {
      data: { idLote: id },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        const cic = allLotes.filter((item: any) => item.idLote !== id);
        setAllLotes(cic);
        setShowDeleteModal(false);
        setShowConfirmModal(true);
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // edita lotes
  const updateLote = (async (id: any, ativo: any, data: any, semana: any, semanafinal: any) => {
    setIdLote(id);
    setLoadingActive(true);
    await api.patch('lotes', {
      idLote: id,
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
        api.get('lotes')
          .then((response) => {
            setTimeout(() => {
              setLoadingActive(false);
              setAllLotes(response.data.data.sort((a: any, b: any) => (a.idLote < b.idLote)));
            }, 500)
          })
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // -> Pagination
  const [newLote, setNewLote] = useState(allLotes.slice(0, 50));
  useEffect(() => {
    setNewLote(allLotes.slice(0, 50));
  }, [allLotes])
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITENS_PER_PAGE;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(allLotes.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const DisplayItems = newLote
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((lote: any, index: any) => (
      <STr key={index} head={true} colorRow={index % 2}>
        <>
          <STd>{lote.idLote}</STd>
          <STd>{moment(lote.dataInicial).format("DD/MM/YYYY")}</STd>
          <STd>{lote.semanaInicial}</STd>
          <STd>{lote.metas[lote.metas.length - 1].semana}</STd>
          <STd>{lote.metas.length}</STd>
          <STd>{lote.dataFinal != null ? moment(lote.dataFinal).format("DD/MM/YYYY") : '-'}</STd>
          <STd>{lote.semanaFinal != null ? lote.semanaFinal : '-'}</STd>
          <STd>
            <div className='flex items-center justify-end'>
              <button
                onClick={() => updateLote(lote.idLote, lote.ativo, lote.dataInicial, lote.semanaInicial, lote.metas[lote.metas.length - 1].semana)}
              >
                {lote.ativo
                  ? <span className='flex items-center justify-center h-8 w-8 bg-green-600 border-2 border-white text-white rounded-full mr-4'>
                    <IconContext.Provider value={{ className: 'font-extrabold' }} >
                      <div>
                        {idLote === lote.idLote && loadingActive ? <CgSpinnerTwo className='animate-spin' size={22} /> : <IoCheckmark size={22} />}
                      </div>
                    </IconContext.Provider>
                  </span>
                  : <span className='flex items-center justify-center h-8 w-8 bg-red-600 border-2 border-white text-white rounded-full mr-4'>
                    <IconContext.Provider value={{ className: 'font-extrabold' }} >
                      <div>
                        {idLote === lote.idLote && loadingActive ? <CgSpinnerTwo className='animate-spin' size={22} /> : <IoClose size={22} />}
                      </div>
                    </IconContext.Provider>
                  </span>
                }
              </button>

              <SDlButtom active={lote.ativo} onClick={() => toggleDelete(lote.idLote)} />
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
            setNewLote(response.data.data);
            setLoadingSearch(false);
            setMessageSearch(true);
          } else {
            setNewLote(response.data.data);
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

  // Reload lotes
  const handleReloadLotes = (() => {
    setLoading(true);
    setTimeout(() => {
      setNewLote(allLotes);
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
              <h1 className='text-2xl ml-1 font-medium'>Lotes</h1>
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
              <span className="text-gray-600">Lotes</span>
            </div>

          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>

        <div className="flex items-center justify-between mb-2">
          <div>
            <SAddButtom onClick={() => navigate('/lotes/addlote')} />
          </div>

          {messageSearch &&
            <div className="flex items-center justify-start">
              <button onClick={() => handleReloadLotes()} className="flex items-center justify-center" title="Limpar busca">
                <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
                  <div className="bg-gray-200 rounded-l-full px-2 py-1  border border-gray-300">
                    <GiLargePaintBrush className="rotate-90" />
                  </div>
                </IconContext.Provider>
              </button>
              <div className="bg-gray-100 text-base rounded-r-md py-1 px-4  border border-gray-300">Correspondências encontradas: <span className={`${newLote.length > 0 ? 'text-green-500' : 'text-red-500'}`}>{newLote.length}</span></div>

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
              <thead className='bg-gray-200'>

                <STr bgColor="bg-gray-200">
                  <>
                    <STh><span>#ID</span></STh>
                    <STh><span>Data inicial</span></STh>
                    <STh><span>Semana inicial</span></STh>
                    <STh><span>Semana atual</span></STh>
                    <STh><span>Semanas percorridas</span></STh>
                    <STh><span>Data final</span></STh>
                    <STh><span>Semana final</span></STh>
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
        {newLote.length > itemsPerPage &&
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
        <ModalDelete info="este lote" closemodal={() => setShowDeleteModal(!showDeleteModal)} deleterow={() => deleteRow(idDelete)} />
      }

      {showConfirmModal &&
        <ModalConfirm info="Lote" closemodal={() => setShowConfirmModal(!showConfirmModal)} />
      }

    </Fragment>
  )
}

export default Lotes;
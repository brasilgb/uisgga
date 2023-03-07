import React, { Fragment, useContext, useEffect, useState } from 'react'

import { IconContext } from 'react-icons';
import { IoArrowBack, IoArrowForward, IoCheckmark, IoClose, IoHome, IoCartOutline } from 'react-icons/io5';
import { GiLargePaintBrush } from "react-icons/gi";
import { SAddButtom, SDlButtom, SEdButtom } from '../../Components/Buttons';
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

const Coletas = () => {
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AppContext);
  const [allColetas, setAllColetas] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [idColeta, setIdColeta] = useState();
  const [loadingActive, setLoadingActive] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [messageSearch, setMessageSearch] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getAllColetas = async () => {
      await api.get('coletas')
        .then((response) => {
          setTimeout(() => {
            setAllColetas(response.data.data.sort((a: any, b: any) => (a.idColeta > b.idColeta ? -1 : 1)));
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response.status);
        });
    };
    getAllColetas();
  }, [setLoading])

  const toggleDelete = (id: any) => {
    setShowDeleteModal(!showDeleteModal);
    setIdDelete(id);
  }

  // delete coletas
  const deleteRow = (async (id: any) => {
    await api.delete('coletas', {
      data: { idColeta: id },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        const cic = allColetas.filter((item: any) => item.idColeta !== id);
        setAllColetas(cic);
        setShowDeleteModal(false);
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // edita coletas
  const updateColeta = (async (id: any, ativo: any, data: any, semana: any, semanafinal: any) => {
    setIdColeta(id);
    setLoadingActive(true);
    await api.patch('coletas', {
      idColeta: id,
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
        api.get('coletas')
          .then((response) => {
            setTimeout(() => {
              setLoadingActive(false);
              setAllColetas(response.data.data.sort((a: any, b: any) => (a.idColeta < b.idColeta)));
            }, 500)
          })
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // -> Pagination
  const [newColeta, setNewColeta] = useState(allColetas.slice(0, 50));
  useEffect(() => {
    setNewColeta(allColetas.slice(0, 50));
  }, [allColetas])
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITENS_PER_PAGE;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(allColetas.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const DisplayItems = newColeta
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((coleta: any, index: any) => (
      <STr key={index} head={false} colorRow={index % 2}>
        <>
          <STd>{coleta.idColeta}</STd>
          <STd>{coleta.lotes.lote}</STd>
          <STd>{coleta.aviarios.aviario}</STd>
          <STd>{coleta.coleta}</STd>
          <STd>{coleta.incubaveis}</STd>
          <STd>{coleta.comerciais}</STd>
          <STd>{coleta.posturaDia}</STd>
          <STd>{moment(coleta.dataColeta).format("DD/MM/YYYY HH:mm:ss")}</STd>
          <STd>
            <div className='flex items-center justify-end'>
              <SEdButtom onClick={() => navigate("/coletas/editcoleta", { state: coleta })} />
              <SDlButtom onClick={() => toggleDelete(coleta.idColeta)} />
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
            setNewColeta(response.data.data);
            setLoadingSearch(false);
            setMessageSearch(true);
          } else {
            setNewColeta(response.data.data);
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

  // Reload coletas
  const handleReloadColetas = (() => {
    setLoading(true);
    setTimeout(() => {
      setNewColeta(allColetas);
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
                  <IoCartOutline />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Coletas</h1>
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
              <span className="text-gray-600">Coletas</span>
            </div>

          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>

        <div className="flex items-center justify-between mb-2">
          <div>
            <SAddButtom onClick={() => navigate('/coletas/addcoleta')} />
          </div>

          {messageSearch &&
            <div className="flex items-center justify-start">
              <button onClick={() => handleReloadColetas()} className="flex items-center justify-center" title="Limpar busca">
                <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
                  <div className="bg-gray-200 rounded-l-full px-2 py-1  border border-gray-300">
                    <GiLargePaintBrush className="rotate-90" />
                  </div>
                </IconContext.Provider>
              </button>
              <div className="bg-gray-100 text-base rounded-r-md py-1 px-4  border border-gray-300">Correspondências encontradas: <span className={`${newColeta.length > 0 ? 'text-green-500' : 'text-red-500'}`}>{newColeta.length}</span></div>

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
                    <STh><span>Lote</span></STh>
                    <STh><span>Aviário</span></STh>
                    <STh><span>Num. Coleta</span></STh>
                    <STh><span>Incubáveis</span></STh>
                    <STh><span>Comerciais</span></STh>
                    <STh><span>Postura dia</span></STh>
                    <STh><span>Data e hora</span></STh>
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
        {newColeta.length > itemsPerPage &&
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
        <ModalDelete info="este coleta" closemodal={() => setShowDeleteModal(!showDeleteModal)} deleterow={() => deleteRow(idDelete)} />
      }

    </Fragment>
  )
}

export default Coletas;
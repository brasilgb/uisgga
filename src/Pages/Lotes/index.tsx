import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'

import { IconContext } from 'react-icons';
import { IoArrowBack, IoArrowForward, IoCheckmark, IoClose, IoHome, IoFileTrayStackedOutline } from 'react-icons/io5';
import { GiLargePaintBrush } from "react-icons/gi";
import { SAddButtom, SDlButtom, SEdButtom } from '../../Components/Buttons';
import { SFormSearch, SFormSearchData } from '../../Components/Form/FormSearch';
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

const Lotes = () => {
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AppContext);
  const [allLotes, setAllLotes] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [cicloActive, setCicloActive] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [messageSearch, setMessageSearch] = useState<boolean>(false);
  const searchRef = useRef<any>('');

  useEffect(() => {
    setLoading(true);
    const getAllLotes = async () => {
      await api.get('lotes')
        .then((response) => {
          setCicloActive(response.data.ciclos);
          setTimeout(() => {
            setAllLotes(response.data.data.sort((a: any, b: any) => (a.idLote > b.idLote ? -1 : 1)));
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
    .slice(pagesVisited, pagesVisited + itemsPerPage).sort((a: any, b: any) => (a < b ? -1 : 1))
    .map((lote: any, index: any) => (
      <STr key={index} head={false} colorRow={index % 2}>
        <>
          <STd>{lote.idLote}</STd>
          <STd>{lote.lote}</STd>
          <STd>{lote.femea}</STd>
          <STd>{lote.femeaCapitalizada}</STd>
          <STd>{lote.macho}</STd>
          <STd>{lote.machoCapitalizado}</STd>
          <STd>{lote.femea + lote.macho}</STd>
          <STd>{lote.aviarios.length}</STd>
          <STd>{moment(lote.dataEntrada).format("DD/MM/YYYY")}</STd>
          <STd>
            <div className='flex items-center justify-end'>
              <SEdButtom onClick={() => navigate("/lotes/editlote", { state: lote })} />
              <SDlButtom active={lote.ativo} onClick={() => toggleDelete(lote.idLote)} />
            </div>
          </STd>
        </>
      </STr>
    ));
  // Pagination ->

  // -> sistema de busca
  const handleSubmit = (async () => {
    if (searchRef.current.value === '') {
      setSearchInput(true);
      return;
    }
    let lote = searchRef.current.value;
    await api.post(`searchlote`, {
      lote: lote
    })
      .then((response) => {
        setLoadingSearch(true);
        setSearchInput(false);
        setTimeout(() => {
          if (response.data.data.length > 0) {
            setNewLote(response.data.data);
            setLoadingSearch(false);
            setMessageSearch(true);
          } else {
            setNewLote(response.data.data);
            setLoadingSearch(false);
            setMessageSearch(true);
            return;
          }
        }, 500);

      })
      .catch((err) => {
        console.log(err.response);
      })
  });
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
                  <IoFileTrayStackedOutline />
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
            <SAddButtom active={cicloActive} onClick={() => navigate('/lotes/addlote')} />
          </div>

          {messageSearch &&
            <div className="flex items-center justify-start">
              <button onClick={() => handleReloadLotes()} className="flex items-center justify-center" title="Limpar busca">
                <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
                  <div className="bg-gray-200 rounded-l-full px-2 py-1  border border-gray-300">
                    <GiLargePaintBrush className="rotate-90 text-blue-600" />
                  </div>
                </IconContext.Provider>
              </button>
              <div className="bg-gray-100 text-base rounded-r-md py-1 px-4  border border-gray-300">Correspondências encontradas: <span className={`${newLote.length > 0 ? 'text-green-500' : 'text-red-500'}`}>{newLote.length}</span></div>

            </div>
          }

          <div className="flex">
            <SFormSearch
              refSearch={searchRef}
              loading={loadingSearch}
              handleSubmit={handleSubmit}
              required={searchInput}
            />
          </div>
        </div>

        <div className="rounded-t-lg border overflow-auto">
          <STable>
            <>
              <thead className='bg-gray-200'>

                <STr head={true}>
                  <>
                    <STh><span>#ID</span></STh>
                    <STh><span>Lote</span></STh>
                    <STh><span>Fêmeas</span></STh>
                    <STh><span>Capitalizadas</span></STh>
                    <STh><span>Machos</span></STh>
                    <STh><span>Capitalizados</span></STh>
                    <STh><span>Tot. Aves</span></STh>
                    <STh><span>Aviários</span></STh>
                    <STh><span>Cadastro</span></STh>
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

    </Fragment>
  )
}

export default Lotes;
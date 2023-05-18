import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { IconContext } from 'react-icons';
import { IoArrowBack, IoArrowForward, IoHome, IoFileTrayOutline } from 'react-icons/io5';
import { GiChicken, GiLargePaintBrush } from "react-icons/gi";
import { SAddButtom, SDlButtom, SEdButtom } from '../../Components/Buttons';
import { SFormSearch } from '../../Components/Form/FormSearch';
import SLoading from '../../Components/Loading';
import ReactPaginate from 'react-paginate';
import { SubBar, SubBarLeft, SubBarRight } from '../../Components/SubBar';
import { STable, STd, STh, STr } from '../../Components/Tables';
import { AppContext } from '../../Contexts/AppContext';
import 'animate.css';
import api from '../../Services/api';
import { ModalDelete } from '../../Components/ModalDelete';
import moment from 'moment';
import { ABoxAll } from '../../Components/Boxes';
import { useNavigate } from "react-router-dom";
import { ITENS_PER_PAGE } from "../../Constants";
import { AMessageError } from '../../Components/Messages';

const Pesagens = () => {
  const navigate = useNavigate();
  const { setLoading, loading, cicloActive } = useContext(AppContext);
  const [allPesagens, setAllPesagens] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [messageSearch, setMessageSearch] = useState<boolean>(false);
  const [loteExists, setLoteExists] = useState<boolean>(true);
  const searchRef = useRef<any>('');

  useEffect(() => {
    setLoading(true);
    const getAllPesagens = async () => {
      await api.get('pesagens')
        .then((response) => {
          setTimeout(() => {
            setAllPesagens(response.data.data.sort((a: any, b: any) => (a.idPesagem > b.idPesagem ? -1 : 1)));
            setLoading(false);
          }, 500);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response.status);
        })
    };
    getAllPesagens();
  }, [setLoading])

  const toggleDelete = (id: any) => {
    setShowDeleteModal(!showDeleteModal);
    setIdDelete(id);
  }

  // delete pesagens
  const deleteRow = (async (id: any) => {
    await api.delete('pesagens', {
      data: { idPesagem: id },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        const cic = allPesagens.filter((item: any) => item.idPesagem !== id);
        setAllPesagens(cic);
        setShowDeleteModal(false);
      }).catch(err => {
        console.log(err.response.data);
      });
  });

  // -> Pagination
  const [newPesagem, setNewPesagem] = useState(allPesagens.slice(0, 50));
  useEffect(() => {
    setNewPesagem(allPesagens.slice(0, 50));
  }, [allPesagens])
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = ITENS_PER_PAGE;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(allPesagens.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const DisplayItems = newPesagem
    .slice(pagesVisited, pagesVisited + itemsPerPage).sort((a: any, b: any) => (a < b ? -1 : 1))
    .map((aviario: any, index: any) => (
      <STr key={index} head={false} colorRow={index % 2}>
        <>
          <STd>{aviario.idPesagem}</STd>
          <STd>{aviario.lote}</STd>
          <STd>{aviario.aviario}</STd>
          <STd>{(aviario.box1Femea + aviario.box2Femea + aviario.box2Femea + aviario.box2Femea)}</STd>
          <STd>{(aviario.box1Macho + aviario.box2Macho + aviario.box2Macho + aviario.box2Macho)}</STd>
          <STd>{
            (aviario.box1Femea + aviario.box2Femea + aviario.box2Femea + aviario.box2Femea) +
            (aviario.box1Macho + aviario.box2Macho + aviario.box2Macho + aviario.box2Macho)
          }</STd>
          <STd>{moment(aviario.dataEntrada).format("DD/MM/YYYY")}</STd>
          <STd>
            <div className='flex items-center justify-end'>
              <SEdButtom onClick={() => navigate("/pesagens/editaviario", { state: aviario })} />
              <SDlButtom active={aviario.ativo} onClick={() => toggleDelete(aviario.idPesagem)} />
            </div>
          </STd>
        </>
      </STr>
    ));
  // Pagination ->

  // -> sistema de busca
  const handleSearch = (async () => {
    if (searchRef.current.value === '') {
      setSearchInput(true);
      return;
    }
    let lote = searchRef.current.value;
    await api.post(`searchlote`, {
      lote: lote
    }).then((response) => {
      if (response.data.data.length > 0) {
        const idlote = response.data.data[0].idLote;
        api.post(`searchaviario`, {
          lote: idlote
        }).then((response) => {
          setLoadingSearch(true);
          setSearchInput(false);
          setTimeout(() => {
            setNewPesagem(response.data.data);
            setLoadingSearch(false);
            setMessageSearch(true);
          }, 500);
        });
      } else {
        setLoadingSearch(true);
        setTimeout(() => {
          setNewPesagem([]);
          setLoadingSearch(false);
          setMessageSearch(true);
          return;
        }, 500)
      }
    })

  });
  // Sistema de busca ->

  // Reload pesagens
  const handleReloadPesagens = (() => {
    setLoading(true);
    setTimeout(() => {
      setNewPesagem(allPesagens);
      setLoading(false);
      setMessageSearch(false);
    }, 500)
  });

  // Verify if lotes exists
  useEffect(() => {
    const getLoteExists = (async () => {
      await api.get('lotes')
        .then((response) => {
          let exist = response.data.data;
          if (exist.length > 0) {
            setLoteExists(true);
          } else {
            setLoteExists(false);
          }
        })
    });
    getLoteExists();
  }, [])

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
                  <GiChicken />
                </div>
              </IconContext.Provider>
              <h1 className='text-2xl ml-1 font-medium'>Pesagens</h1>
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
              <span className="text-gray-600">Pesagens</span>
            </div>

          </SubBarRight>
        </>
      </SubBar>

      <ABoxAll>

        <div className="flex items-center justify-between mb-2">
          <div>
            <SAddButtom active={!cicloActive || !loteExists} onClick={() => navigate('/pesagens/addpesagem')} />
          </div>
          {!cicloActive &&
            <AMessageError className="rounded-t-lg !mb-0">Para cadastrar aviários os <span className="bg-yellow-200 font-bold border border-red-400 p-1 rounded-full">ciclos</span> deverão estar cadastrados e ativos</AMessageError>
          }
          {!loteExists &&
            <AMessageError className="rounded-t-lg !mb-0">Para cadastrar aviários os <span className="bg-yellow-200 font-bold border border-red-400 p-1 rounded-full">lotes</span> deverão estar cadastrados</AMessageError>
          }
          {messageSearch &&
            <div className="flex items-center justify-start">
              <button onClick={() => handleReloadPesagens()} className="flex items-center justify-center" title="Limpar busca">
                <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
                  <div className="bg-gray-200 rounded-l-full px-2 py-1  border border-gray-300">
                    <GiLargePaintBrush className="rotate-90 text-blue-600" />
                  </div>
                </IconContext.Provider>
              </button>
              <div className="bg-gray-100 text-base rounded-r-md py-1 px-4  border border-gray-300">Correspondências encontradas: <span className={`${newPesagem.length > 0 ? 'text-green-500' : 'text-red-500'}`}>{newPesagem.length}</span></div>

            </div>
          }

          <div className="flex">
            <SFormSearch
              refSearch={searchRef}
              loading={loadingSearch}
              handleSubmit={handleSearch}
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
                    <STh><span>Aviário</span></STh>
                    <STh><span>Fêmeas</span></STh>
                    <STh><span>Machos</span></STh>
                    <STh><span>Total de Aves</span></STh>
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
        {newPesagem.length > itemsPerPage &&
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
        <ModalDelete info="este aviario" closemodal={() => setShowDeleteModal(!showDeleteModal)} deleterow={() => deleteRow(idDelete)} />
      }
    </Fragment>
  )
}

export default Pesagens;
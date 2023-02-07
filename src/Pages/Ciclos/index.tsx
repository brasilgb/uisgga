import React, { Fragment, useContext, useEffect, useState } from 'react'
import { IconContext } from 'react-icons';
import { IoHome, IoHomeOutline, IoTimer, IoTimerOutline } from 'react-icons/io5';
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

  // --> Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(allCiclos.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allCiclos.slice(startIndex, endIndex);
  // Pagination -->
  
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
              <SAddButtom link='/22' />
            </div>
            <div>
              <SFormSearch />
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

                    <tbody>
                      {currentItems.map((ciclo: any, index: any) => (
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
              <div className='bg-white border-x border-b rounded-b-lg py-2'>
                <Pagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Ciclos;
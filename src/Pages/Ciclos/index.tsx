import React, { Fragment, useEffect, useState } from 'react'
import { SBoxContainer, SBoxFooter, SBoxHeader, SBoxMain } from '../../Components/Boxes';
import SAddButtom from '../../Components/Buttons';
import SFormSearch from '../../Components/Form/FormSearch';
import { SubBar, SubBarLeft, SubBarRight } from '../../Components/SubBar';
import api from '../../Services/api';

const Ciclos = () => {

  const [allCiclos, setAllCiclos] = useState<any>([]);

  useEffect(() => {
    const getAllCiclos = async () => {
      await api.get('ciclos')
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getAllCiclos();
  }, [])
  return (
    <Fragment>
      <SubBar>
        <>
          <SubBarLeft>
            <h1 className='text-3xl font-medium'>Ciclos</h1>
          </SubBarLeft>
          <SubBarRight>

            <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
              <span className="text-gray-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </span>

              <span className="mx-2 text-gray-500 ">/</span>

              <a href="#" className="text-gray-600  hover:underline">Ciclos</a>

            </div>

          </SubBarRight>
        </>
      </SubBar>

      <SBoxContainer>
        <>
          <SBoxHeader>
            <>
              <div>
                <SAddButtom link='/22' />
              </div>
              <div>
                <SFormSearch />
              </div>
            </>
          </SBoxHeader>
          <SBoxMain>
            <>{ }</>

          </SBoxMain>
          <SBoxFooter>
            <>
              FooterSBoxFooter
            </>
          </SBoxFooter>
        </>
      </SBoxContainer>

    </Fragment>
  )
}

export default Ciclos;
import React, { Fragment, useContext } from "react";
import { IconContext } from "react-icons";
import { IoHome, IoTimer } from "react-icons/io5";
import { ABoxAll } from "../../Components/Boxes";
import SLoading from "../../Components/Loading";
import { SubBar, SubBarLeft, SubBarRight } from "../../Components/SubBar";
import { AuthContext } from "../../Context/AuthContext";

const AddCiclo = () => {
  
  const { setLoading, loading } = useContext(AuthContext);
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

      <ABoxAll>
        
      </ABoxAll>
    </Fragment>
  )
}

export default AddCiclo;
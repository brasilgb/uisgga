import React, { useState } from 'react'
import { IconContext } from "react-icons";
import { IoExit, IoPerson } from "react-icons/io5";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className=" bg-white shadow py-4 px-2 md:px-4">
      <div className="flex items-center justify-end">
        <div className="relative">
          <button
          onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="bg-blue-800 rounded-full h-8 w-8 border-2 border-white shadow-md flex items-center justify-center">
              <h1 className="text-lg font-semibold text-white">A</h1>
            </div>
          </button>
          {openMenu &&
            <div className="absolute right-0 top-9 bg-gray-100 border border-white w-72 shadow-lg rounded-md p-2 z-10">
              <ul className="flex flex-col">
                <li className="flex items-center justify-start hover:bg-gray-50 cursor-pointer hover:rounded py-2 px-1">
                  <IconContext.Provider value={{ className: "text-gray-500 text-md" }}>
                    <div>
                      <IoPerson />
                    </div>
                  </IconContext.Provider>
                  <span className="text-base text-gray-500 font-normal ml-2">John Doe</span>
                </li>
                <li>
                  <hr className="my-1 border-gray-200" />
                </li>
                <li className="flex items-center justify-start hover:bg-gray-50 cursor-pointer hover:rounded py-2 px-1">
                  <IconContext.Provider value={{ className: "text-gray-500 text-md ml-0.5" }}>
                    <div>
                      <IoExit />
                    </div>
                  </IconContext.Provider>
                  <span className="text-base text-gray-500 font-normal ml-2">Sair</span>
                </li>
              </ul>
            </div>
          }
        </div>

      </div>
    </header>
  )
}

export default Header;
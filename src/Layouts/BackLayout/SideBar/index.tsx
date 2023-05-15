import React from 'react';
import { IconContext } from 'react-icons';
import { IoBarChartOutline, IoCartOutline, IoChevronUp, IoCogOutline, IoFileTrayOutline, IoFileTrayStackedOutline, IoHomeOutline, IoLockOpenOutline, IoNotificationsOutline, IoPeopleOutline, IoTimerOutline } from 'react-icons/io5';
import { HiOutlineTruck } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { GiChicken } from "react-icons/gi";

const SideBar = () => {

    const activeLink = {
        active: 'flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-[#3b3c4e]',
        inactive: 'flex flex-row items-center h-10 px-3 rounded-lg hover:bg-gray-600 hover:text-gray-100'
    }
    return (
        <aside className='min-h-screen w-64 sm:relative bg-[#2F3044] shadow md:h-full flex-col justify-between hidden sm:flex'>
            <div className="px-2 h-full flex flex-col flex-grow">
                <div className="sidebar-header flex items-center justify-center py-4">
                    <div className="inline-flex">
                        <a href="#" className="inline-flex flex-row items-center">
                            <IconContext.Provider value={{ className: "text-2xl text-gray-50" }}>
                                <div>
                                    <IoBarChartOutline />
                                </div>
                            </IconContext.Provider>
                            <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">Brandname</span>
                        </a>
                    </div>
                </div>
                <div className="sidebar-content px-4 py-6">
                    <ul className="flex flex-col w-full">

                        <li className="my-px">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoHomeOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Home</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/ciclos"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoTimerOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Ciclos</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/lotes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoFileTrayStackedOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Lotes</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/aviarios"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoFileTrayOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Aviários</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/coletas"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoCartOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Coletas</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/envios"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <HiOutlineTruck />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Envio de ovos</span>
                            </NavLink>
                        </li>

                        <li className="text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-3 text-gray-400">Aves</span>
                                </div>
                                <IconContext.Provider value={{ className: "text-base text-gray-400" }} >
                                    <div>
                                        <IoChevronUp />
                                    </div>
                                </IconContext.Provider>

                            </div>
                            <div className="border-l p-1 ml-2 bg-slate-500">
                                <li className="my-px">
                                    <NavLink
                                        to="/mortalidades"
                                        className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                    >
                                        <span className="flex items-center justify-center text-lg">
                                            <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                                <div>
                                                    <GiChicken />
                                                </div>
                                            </IconContext.Provider>
                                        </span>
                                        <span className="ml-3 text-gray-400">Mortalidades</span>
                                    </NavLink>
                                </li>

                                <li className="my-px">
                                    <NavLink
                                        to="/pesagens"
                                        className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                    >
                                        <span className="flex items-center justify-center text-lg">
                                            <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                                <div>
                                                    <GiChicken />
                                                </div>
                                            </IconContext.Provider>
                                        </span>
                                        <span className="ml-3 text-gray-400">Pesagem</span>
                                    </NavLink>
                                </li>
                            </div>

                        </li>

                        <li className="text-white">
                            Ração
                        </li>
                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Recebimento</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Consumo</span>
                            </NavLink>
                        </li>


                        <li className="text-white">
                            Tarefas
                        </li>
                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Recebimento</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Consumo</span>
                            </NavLink>
                        </li>


                        <li className="text-white">
                            Financeiro
                        </li>
                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Recebimento</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Consumo</span>
                            </NavLink>
                        </li>


                        <li className="text-white">
                            Metas
                        </li>
                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Recebimento</span>
                            </NavLink>
                        </li>

                        <li className="my-px">
                            <NavLink
                                to="/racoes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3 text-gray-400">Consumo</span>
                            </NavLink>
                        </li>

                        <li className="text-white">
                            Configurações
                        </li>
                        <li className="my-px">
                            <a
                                href="#"
                                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-400 hover:bg-gray-600 hover:text-gray-100"
                            >
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoCogOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Empresa</span>
                            </a>
                        </li>

                        <li className="my-px">
                            <a
                                href="#"
                                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-400 hover:bg-gray-600 hover:text-gray-100"
                            >
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoCogOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Email</span>
                            </a>
                        </li>

                        <li className="my-px">
                            <a
                                href="#"
                                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-400 hover:bg-gray-600 hover:text-gray-100"
                            >
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoCogOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Backup</span>
                            </a>
                        </li>


                        {/* <li className="my-px">
                            <a
                                href="#"
                                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-400 hover:bg-gray-600 hover:text-gray-100"
                            >
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoNotificationsOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Notificações</span>
                                <span
                                    className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
                                >10</span>
                            </a>
                        </li> */}

                        <li className="my-px">
                            <a
                                href="#"
                                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-400 hover:bg-gray-600 hover:text-gray-100"
                            >
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-400" }} >
                                        <div>
                                            <IoPeopleOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Usuários</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default SideBar;
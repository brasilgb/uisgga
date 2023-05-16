import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoBarChartOutline, IoCartOutline, IoChevronDown, IoChevronUp, IoCogOutline, IoFileTrayOutline, IoFileTrayStackedOutline, IoHomeOutline, IoLockOpenOutline, IoNotificationsOutline, IoPeopleOutline, IoTimerOutline } from 'react-icons/io5';
import { HiOutlineTruck } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { GiChicken, GiHandTruck } from "react-icons/gi";
import { FaTasks, FaCoins, FaCogs } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import 'animate.css';

const SideBar = () => {

    const [openMenu, setOpenMenu] = useState(false);
    const [clicked, setClicked] = useState(0);

    const handleToggle = (index: any) => {

        setClicked(index);


    }

    const activeLink = {
        active: 'flex flex-row items-center h-10 px-3 rounded-lg text-slate-50 bg-slate-500',
        inactive: 'flex flex-row items-center h-10 px-3 rounded-lg text-slate-300 hover:bg-slate-500 hover:text-slate-700'
    }

    return (
        <aside className='min-h-screen w-64 sm:relative bg-slate-600 shadow md:h-full flex-col justify-between hidden sm:flex'>
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
                <div className="sidebar-content py-6">
                    <ul className="flex flex-col w-full">

                        <li className="my-0.5">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <IoHomeOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Home</span>
                            </NavLink>
                        </li>

                        <li className="my-0.5">
                            <NavLink
                                to="/ciclos"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <IoTimerOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Ciclos</span>
                            </NavLink>
                        </li>

                        <li className="my-0.5">
                            <NavLink
                                to="/lotes"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <IoFileTrayStackedOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Lotes</span>
                            </NavLink>
                        </li>

                        <li className="my-0.5">
                            <NavLink
                                to="/aviarios"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <IoFileTrayOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Aviários</span>
                            </NavLink>
                        </li>

                        <li className="my-0.5">
                            <NavLink
                                to="/coletas"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <IoCartOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Coletas</span>
                            </NavLink>
                        </li>

                        <li className="my-0.5">
                            <NavLink
                                to="/envios"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <HiOutlineTruck />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Envio de ovos</span>
                            </NavLink>
                        </li>

                        <li className="my-0.5">
                            <div
                                onClick={() => handleToggle(clicked === 1 ? 0 : 1)}
                                className={`flex items-center h-10 justify-between px-3 hover:bg-slate-500 hover:cursor-pointer text-slate-300 mt-0.5 ${clicked === 1 ? "bg-slate-500 mb-0.5 rounded-t-lg hover:rounded-t-lg" : " hover:rounded-lg"}`}
                            >
                                <div className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <GiChicken />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-3">Aves</span>
                                </div>
                                <IconContext.Provider value={{ className: "text-base" }} >
                                    <div>
                                        {clicked === 1 ? <IoChevronUp /> : <IoChevronDown />}
                                    </div>
                                </IconContext.Provider>
                            </div>

                            {clicked === 1 &&
                                <ul className="p-1 pl-2 rounded-b-lg bg-slate-500 animate__animated animate__fadeIn">
                                    <li className="my-0.5">
                                        <NavLink
                                            to="/mortalidades"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Mortalidades</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Pesagem</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li className="my-0.5">
                            <div
                                onClick={() => handleToggle(clicked === 2 ? 0 : 2)}
                                className={`flex items-center h-10 justify-between px-3 hover:bg-slate-500 hover:cursor-pointer text-slate-300 mt-0.5 ${clicked === 2 ? "bg-slate-500 mb-0.5 rounded-t-lg hover:rounded-t-lg" : " hover:rounded-lg"}`}
                            >
                                <div className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <GiHandTruck />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-3">Ração</span>
                                </div>
                                <IconContext.Provider value={{ className: "text-base" }} >
                                    <div>
                                        {clicked === 2 ? <IoChevronUp /> : <IoChevronDown />}
                                    </div>
                                </IconContext.Provider>

                            </div>
                            {clicked === 2 &&
                                <ul className="p-1 pl-2 rounded-b-lg bg-slate-500 animate__animated animate__fadeIn">
                                    <li className="my-0.5">
                                        <NavLink
                                            to="/mortalidades"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Recebimento</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Consumo</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li className="my-0.5">
                            <div
                                onClick={() => handleToggle(clicked === 3 ? 0 : 3)}
                                className={`flex items-center h-10 justify-between px-3 hover:bg-slate-500 hover:cursor-pointer text-slate-300 mt-0.5 ${clicked === 3 ? "bg-slate-500 mb-0.5 rounded-t-lg hover:rounded-t-lg" : " hover:rounded-lg"}`}
                            >
                                <div className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <FaTasks />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-3">Tarefas</span>
                                </div>
                                <IconContext.Provider value={{ className: "text-base" }} >
                                    <div>
                                        {clicked === 3 ? <IoChevronUp /> : <IoChevronDown />}
                                    </div>
                                </IconContext.Provider>

                            </div>
                            {clicked === 3 &&
                                <ul className="p-1 pl-2 rounded-b-lg bg-slate-500 animate__animated animate__fadeIn">
                                    <li className="my-0.5">
                                        <NavLink
                                            to="/mortalidades"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Tarefas gerais</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Controle diário</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li className="my-0.5">
                            <div
                                onClick={() => handleToggle(clicked === 4 ? 0 : 4)}
                                className={`flex items-center h-10 justify-between px-3 hover:bg-slate-500 hover:cursor-pointer text-slate-300 mt-0.5 ${clicked === 4 ? "bg-slate-500 mb-0.5 rounded-t-lg hover:rounded-t-lg" : " hover:rounded-lg"}`}
                            >
                                <div className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <FaCoins />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-3">Financeiro</span>
                                </div>
                                <IconContext.Provider value={{ className: "text-base" }} >
                                    <div>
                                        {clicked === 4 ? <IoChevronUp /> : <IoChevronDown />}
                                    </div>
                                </IconContext.Provider>

                            </div>
                            {clicked === 4 &&
                                <ul className="p-1 pl-2 rounded-b-lg bg-slate-500 animate__animated animate__fadeIn">
                                    <li className="my-0.5">
                                        <NavLink
                                            to="/mortalidades"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Despesas</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Entradas</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li className="my-0.5">
                            <div
                                onClick={() => handleToggle(clicked === 5 ? 0 : 5)}
                                className={`flex items-center h-10 justify-between px-3 hover:bg-slate-500 hover:cursor-pointer text-slate-300 mt-0.5 ${clicked === 5 ? "bg-slate-500 mb-0.5 rounded-t-lg hover:rounded-t-lg" : " hover:rounded-lg"}`}
                            >
                                <div className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <TbTargetArrow />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-3">Metas</span>
                                </div>
                                <IconContext.Provider value={{ className: "text-base" }} >
                                    <div>
                                        {clicked === 5 ? <IoChevronUp /> : <IoChevronDown />}
                                    </div>
                                </IconContext.Provider>

                            </div>
                            {clicked === 5 &&
                                <ul className="p-1 pl-2 rounded-b-lg bg-slate-500 animate__animated animate__fadeIn">
                                    <li className="my-0.5">
                                        <NavLink
                                            to="/mortalidades"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Eclosão</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Fertilidade</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Produção</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li className="my-0.5">
                            <div
                                onClick={() => handleToggle(clicked === 6 ? 0 : 6)}
                                className={`flex items-center h-10 justify-between px-3 hover:bg-slate-500 hover:cursor-pointer text-slate-300 mt-0.5 ${clicked === 6 ? "bg-slate-500 mb-0.5 rounded-t-lg hover:rounded-t-lg" : " hover:rounded-lg"}`}
                            >
                                <div className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <FaCogs />
                                        </div>
                                    </IconContext.Provider>
                                    <span className="ml-3">Configurações</span>
                                </div>
                                <IconContext.Provider value={{ className: "text-base" }} >
                                    <div>
                                        {clicked === 6 ? <IoChevronUp /> : <IoChevronDown />}
                                    </div>
                                </IconContext.Provider>

                            </div>
                            {clicked === 6 &&
                                <ul className="p-1 pl-2 rounded-b-lg bg-slate-500 animate__animated animate__fadeIn">
                                    <li className="my-0.5">
                                        <NavLink
                                            to="/mortalidades"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Backup</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">E-mail</span>
                                        </NavLink>
                                    </li>

                                    <li className="my-0.5">
                                        <NavLink
                                            to="/pesagens"
                                            className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                                        >
                                            <span className="pl-6">Empresa</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li className="my-0.5">
                            <NavLink
                                to="/users"
                                className={({ isActive }) => isActive ? activeLink.active : activeLink.inactive}
                            >
                                <span className="flex items-center justify-center text-lg">
                                    <IconContext.Provider value={{ className: "text-xl" }} >
                                        <div>
                                            <IoPeopleOutline />
                                        </div>
                                    </IconContext.Provider>
                                </span>
                                <span className="ml-3">Usuários</span>
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default SideBar;
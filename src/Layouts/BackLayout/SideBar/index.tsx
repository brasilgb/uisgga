import React from 'react';
import { IconContext } from 'react-icons';
import { IoBarChartOutline, IoFileTrayOutline, IoFileTrayStackedOutline, IoHomeOutline, IoStorefrontOutline, IoTimerOutline } from 'react-icons/io5';
import { FaWarehouse } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';

const SideBar = () => {

    return (
        <aside className='h-screen w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-50'>

            <div className="sidebar-header flex items-center justify-center py-4">
                <div className="inline-flex">
                    <a href="#" className="inline-flex flex-row items-center">
                        <IconContext.Provider value={{ className: "text-2xl" }}>
                            <div>
                                <IoBarChartOutline />
                            </div>
                        </IconContext.Provider>
                        <span className="leading-10 text-gray-500 text-2xl font-bold ml-1 uppercase">Brandname</span>
                    </a>
                </div>
            </div>
            <div className="sidebar-content px-4 py-6">
                <ul className="flex flex-col w-full">
                    <li className="my-px">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100' : "flex flex-row items-center h-10 px-3 rounded-lg"}
                        >
                            <span className="flex items-center justify-center text-lg text-gray-600">
                                <IconContext.Provider value={{ className: "text-xl text-gray-800" }} >
                                    <div>
                                        <IoHomeOutline />
                                    </div>
                                </IconContext.Provider>
                            </span>
                            <span className="ml-3">Home</span>
                        </NavLink>
                    </li>
                    <li className="my-px">
                        <NavLink
                            to="/ciclos"
                            className={({ isActive }) => isActive ? 'flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100' : "flex flex-row items-center h-10 px-3 rounded-lg"}
                        >
                            <span className="flex items-center justify-center text-lg text-gray-600">
                                <IconContext.Provider value={{ className: "text-xl text-gray-800" }} >
                                    <div>
                                        <IoTimerOutline />
                                    </div>
                                </IconContext.Provider>
                            </span>
                            <span className="ml-3">Ciclos</span>
                        </NavLink>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-600">
                                <IconContext.Provider value={{ className: "text-xl text-gray-800" }} >
                                    <div>
                                        <IoFileTrayStackedOutline />
                                    </div>
                                </IconContext.Provider>
                            </span>
                            <span className="ml-3">Lotes</span>
                        </a>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-600">
                                <IconContext.Provider value={{ className: "text-xl text-gray-800" }} >
                                    <div>
                                        <IoFileTrayOutline />
                                    </div>
                                </IconContext.Provider>
                            </span>
                            <span className="ml-3">Aviarios</span>
                        </a>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-600">
                                <svg
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="ml-3">Profile</span>
                        </a>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-600">
                                <svg
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </span>
                            <span className="ml-3">Notifications</span>
                            <span
                                className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto"
                            >10</span>
                        </a>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-gray-600">
                                <svg
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </span>
                            <span className="ml-3">Settings</span>
                        </a>
                    </li>
                    <li className="my-px">
                        <a
                            href="#"
                            className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="flex items-center justify-center text-lg text-red-400">
                                <svg
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>
                            <span className="ml-3">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideBar;
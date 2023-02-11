import React, { Fragment, useState } from 'react'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
registerLocale("ptBR", ptBR);
interface PropsSearch {
    onclick: any;
}
interface PropsSearchDate {
    selected: any;
    onChange: any;
    onclick: any;
}

export const SFormSearch = ({ onclick }: PropsSearch) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Fragment>
            <form action="#">
                <div className="hidden md:flex relative">
                    <div
                        className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                    >
                        <button
                            onClick={onclick}
                            className="flex items-center justify-center h-10 w-10 border-transparent">
                            <svg
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                    </div>

                    <input
                        id="search"
                        type="text"
                        name="search"
                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                        placeholder="Search..."
                    />
                </div>

            </form>
        </Fragment>
    )
};


export const SFormSearchData = ({ selected, onChange, onclick }: PropsSearchDate) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Fragment>

                <div className="flex relative">
                    <div
                        className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                    >
                        <button
                            onClick={onclick}
                            className="flex items-center justify-center h-10 w-10 border-transparent z-10">
                            <svg
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                    </div>
                    <DatePicker
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                    selected={selected}
                    onChange={onChange}
                    id="dataInicial"
                    name="dataInicial"
                    dateFormat="dd/MM/yyyy"
                    locale='ptBR'
                    />
                </div>
        </Fragment>
    )
};
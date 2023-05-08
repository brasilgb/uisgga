import React, { Fragment } from 'react'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";
import { CgSpinnerTwo } from "react-icons/cg";
registerLocale("ptBR", ptBR);

interface PropsSearch {
    loading: any;
    handleSubmit: any;
    refSearch: any;
    required: any;
}
interface PropsSearchDate {
    loading: any;
    selected: any;
    onChange: any;
    onclick: any;
}

export const SFormSearch = ({ loading, handleSubmit, refSearch, required }: PropsSearch) => {

    return (
        <Fragment>
            <div className="hidden md:flex relative">
                <div
                    className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                >
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="flex items-center justify-center w-10 border-transparent"
                    >
                        <IconContext.Provider value={{ className: "text-2xl" }}>
                            <div>
                                {loading
                                    ? <CgSpinnerTwo className='animate-spin' />
                                    : <IoSearch />
                                }
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
                <input
                    autoComplete="off"
                    ref={refSearch}
                    id="search"
                    type="text"
                    name="search"
                    className={`${required && 'border border-red-700'} text-sm sm:text-base placeholder-gray-500 text-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400`}
                    placeholder="Buscar por lote..."
                />
            </div>
        </Fragment >
    )
};

export const SFormSearchData = ({ loading, selected, onChange, onclick }: PropsSearchDate) => {

    return (
        <Fragment>

            <div className="flex bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-400">
                <div
                    className="inline-flex items-center justify-center left-0 top-0 text-gray-400"
                >
                    <button
                        onClick={onclick}
                        className="flex items-center justify-center w-10 border-transparent"
                    >
                        <IconContext.Provider value={{ className: "text-2xl" }}>
                            <div>
                                {loading
                                    ? <CgSpinnerTwo className='animate-spin' />
                                    : <IoSearch />
                                }
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
                <DatePicker
                    className="text-gray-500 border-y-0 border-r-0 border-gray-300 focus:ring-0 focus:border-gray-300 text-md mr-4 md:mr-2 h-10 w-32  md:w-60"
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
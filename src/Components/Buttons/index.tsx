import React, { Fragment } from 'react'
import { IconContext } from 'react-icons';
import { CgSpinner } from "react-icons/cg";
import { IoAdd, IoArrowBack, IoPencil, IoSave, IoTrash } from 'react-icons/io5';

interface Props {
    onClick: any;
    active?: any;
    disabled?: any;
}

export const SAddButtom = ({ onClick }: Props) => {
    return (
        <Fragment>
            <button
                className='flex items-center px-5 py-2.5 rounded-md shadow-md bg-blue-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80'
                type="button"
                onClick={onClick}
            >
                <IconContext.Provider value={{ className: 'text-xl' }}>
                    <div>
                        <IoAdd />
                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Adicionar</span>
            </button>
        </Fragment>
    )
}

export const SEdButtom = ({ onClick }: Props) => {
    return (
        <Fragment>
            <button
                className='flex items-center mr-2 px-4 py-2 rounded-md shadow-md bg-orange-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80'
                type="button"
                onClick={onClick}
            >
                <IconContext.Provider value={{ className: 'text-xl' }}>
                    <div>
                        <IoPencil />
                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Editar</span>
            </button>
        </Fragment>
    )
}

export const SDlButtom = ({ onClick, active }: Props) => {
    return (
        <Fragment>
            <button
                disabled={active ? true : false}
                onClick={onClick}
                className={`flex items-center justify-start py-1 px-2 rounded shadow-md ${active ? 'bg-gray-200 text-gray-400' : 'bg-red-500 text-white'} transition-opacity ease-in duration-400 opacity-100 hover:opacity-80`}
            >
                <IconContext.Provider value={{ className: "text-md mr-1" }}>
                    <IoTrash />
                </IconContext.Provider>
                <div>Excluir</div>
            </button>
        </Fragment>
    )
}

export const SSaveButtom = ({ loading, disabled }: any) => {
    return (
        <Fragment>
            <button
                disabled={disabled}
                className={`flex items-center justify-center px-5 py-2.5 rounded-md shadow-md ${disabled ? "bg-blue-200 text-gray-100" : "bg-blue-600 text-white"} transition-opacity ease-in duration-400 opacity-100 hover:opacity-80`}
                type="submit"
            >
                <IconContext.Provider value={{ className: 'text-md' }}>
                    <div>
                        {loading
                            ? <CgSpinner className="animate-spin"/>
                            : <IoSave />
                        }

                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Salvar</span>
            </button>
        </Fragment>
    )
}

export const SBackButtom = ({ onClick }: Props) => {
    return (
        <Fragment>
            <button
                onClick={onClick}
                className={`flex items-center justify-start p-2 bg-blue-600 text-white border-2 border-white rounded-full shadow-md transition-opacity ease-in duration-400 opacity-100 hover:opacity-80`}
            >
                <IconContext.Provider value={{ className: "text-lg" }}>
                    <IoArrowBack />
                </IconContext.Provider>
                <div></div>
            </button>
        </Fragment>
    )
}

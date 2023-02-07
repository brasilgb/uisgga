import React, { Fragment } from 'react'
import { IconContext } from 'react-icons';
import { IoAdd, IoPencil, IoTrash } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface Props {
    onClick: any;
    active?: any;
}

export const SAddButtom = ({ onClick }: Props) => {
    return (
        <Fragment>
            <Link
                className='flex items-center px-5 py-2.5 rounded-md shadow-md bg-blue-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80'
                type="button"
                to={onClick}
            >
                <IconContext.Provider value={{ className: 'text-xl' }}>
                    <div>
                        <IoAdd />
                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Adicionar</span>
            </Link>
        </Fragment>
    )
}

export const SEdButtom = ({ onClick }: Props) => {
    return (
        <Fragment>
            <Link
                className='flex items-center mr-2 px-4 py-2 rounded-md shadow-md bg-orange-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80'
                type="button"
                to={onClick}
            >
                <IconContext.Provider value={{ className: 'text-xl' }}>
                    <div>
                        <IoPencil />
                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Editar</span>
            </Link>
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


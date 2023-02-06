import React, { Fragment } from 'react'
import { IconContext } from 'react-icons';
import { IoAdd, IoPencil, IoTrash } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface Props {
    link: string;
}

export const SAddButtom = ({ link }:Props) => {
    return (
        <Fragment>
            <Link
                className='flex items-center px-5 py-2.5 rounded-md shadow-md bg-blue-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80'
                type="button"
                to={ link } 
            >
                <IconContext.Provider value={{ className: 'text-xl'}}>
                    <div>
                        <IoAdd />
                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Adicionar</span>
            </Link>
        </Fragment>
    )
}

export const SEdButtom = ({ link }:Props) => {
    return (
        <Fragment>
            <Link
                className='flex items-center mr-2 px-4 py-2 rounded-md shadow-md bg-orange-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80'
                type="button"
                to={ link } 
            >
                 <IconContext.Provider value={{ className: 'text-xl'}}>
                    <div>
                        <IoPencil />
                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Editar</span>
            </Link>
        </Fragment>
    )
}

export const SDlButtom = ({ link }:Props) => {
    return (
        <Fragment>
            <Link
                className='flex items-center px-4 py-2 rounded-md shadow-md bg-red-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-80'
                type="button"
                to={ link } 
            >
                <IconContext.Provider value={{ className: 'text-xl'}}>
                    <div>
                        <IoTrash />
                    </div>
                </IconContext.Provider>
                <span className='text-md ml-1'>Excluir</span>
            </Link>
        </Fragment>
    )
}


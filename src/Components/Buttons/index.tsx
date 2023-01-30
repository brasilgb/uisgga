import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    link: string;
}
const SAddButtom = ({ link }:Props) => {
    return (
        <Fragment>
            <Link
                className='flex items-center px-5 py-2.5 rounded-md shadow-md bg-blue-600 text-white transition-opacity ease-in duration-400 opacity-100 hover:opacity-90'
                type="button"
                to={ link } 
            >
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg">
                    <path d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"></path>
                </svg>
                <span className='text-md'>Adicionar</span>
            </Link>
        </Fragment>
    )
}

export default SAddButtom;
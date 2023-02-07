import React, { useEffect, useState, Fragment } from 'react';
import ReactDom from 'react-dom';

interface PaginateProps {
    setCurrentPage: any;
    currentPage: any;
    pages: any;
}

const Pagination = (props: PaginateProps) => {

    const handleNextPage = () => {
        props.setCurrentPage(props.currentPage + 1);
    }
    const handlePrevPage = () => {
        props.setCurrentPage(props.currentPage - 1);
    }
    return (
        <Fragment>
            <div className='flex items-center justify-center'>
                <button
                disabled={props.currentPage === (props.pages - props.currentPage) - 1 ? true : false}
                    className='py-2 px-4 mr-1 bg-gray-50 border border-gray-200 rounded-md'
                    onClick={() => handlePrevPage()}
                >
                    {props.currentPage} Anterior {props.pages - 1}
                </button>
                {Array.from(Array(props.pages), (item: any, index: any) => {
                    return <button
                        className='py-2 px-4 mr-1 bg-gray-50 border border-gray-200 rounded-md'
                        value={index} onClick={(e: any) => props.setCurrentPage(e.target.value)}>{index + 1}</button>
                })}
                <button
                    disabled={props.currentPage === props.pages - 1 ? true : false}
                    className='py-2 px-4 mr-1 bg-gray-50 border border-gray-200 rounded-md'
                    onClick={() => handleNextPage()}
                >
                    Próximo
                </button>
            </div>
        </Fragment>
    )
}

export default Pagination;
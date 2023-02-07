import React, { useEffect, useState, Fragment } from 'react';
import ReactDom from 'react-dom';

interface PaginateProps {
    setCurrentPage: any;
    currentPage: number;
    pages: number;
    itemsPerPage: number;
}

const Pagination = ({
    setCurrentPage,
    currentPage,
    pages,
    itemsPerPage
}: PaginateProps) => {

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }
    useEffect(() => {
        function handleNextPage(){
            setCurrentPage(currentPage + 1);
        };
        handleNextPage();
    }, [])
    function handleNextPage(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <Fragment>
            <div className='flex items-center justify-center'>
                <button
                    disabled={currentPage == 0 ? true : false}
                    className='py-2 px-4 mr-1 bg-gray-50 border border-gray-200 rounded-md'
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    {currentPage} Anterior {pages - 1}
                </button>
                {Array.from(Array(pages), (item: any, index: any) =>
                (
                    <button
                        className={`${index == currentPage ? 'bg-gray-500' : 'bg-gray-50'} py-2 px-4 mr-1 border border-gray-200 rounded-md`}
                        value={index}
                        onClick={(e: any) => setCurrentPage(e.target.value)}
                    >
                        {index + 1}
                    </button>
                )
                )}
                <button
                    disabled={currentPage == (pages - 1) ? true : false}
                    className='py-2 px-4 mr-1 bg-gray-50 border border-gray-200 rounded-md'
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Próximo {currentPage + '===' + (pages - 1)}
                </button>
            </div>
        </Fragment>
    )
}

export default Pagination;
import React, { useEffect, useState, Fragment } from 'react';
import ReactDom from 'react-dom';
import ReactPaginate from 'react-paginate';

interface PaginateProps {
    items: any;
}

const MAX_ITEMS = 0;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ items }: PaginateProps) => {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(items.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage * itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);


    return (
        <Fragment>
            <div>
                
            </div>
            <div>
                {Array.from(Array(pages), (item: any, index: any) => {
                    return <button>{index + 1}</button>
                })}
            </div>
        </Fragment>
    )
}

export default Pagination;
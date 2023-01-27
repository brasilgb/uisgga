import React, { Fragment } from 'react'

interface Props {
    children: JSX.Element;
}

export const SBoxContainer = ({ children }: Props) => {
    return (
        <Fragment>
            <div className='mx-4 mb-4 bg-gray-50 rounded-md border border-white shadow'>
                {children}
            </div>
        </Fragment>
    )
}

export const SBoxHeader = ({ children }: Props) => {
    return (
        <Fragment>
            <div className='py-4 bg-gray-50 border-b border-gray-200'>
                {children}
            </div>
        </Fragment>
    )
}

export const SBoxMain = ({ children }: Props) => {
    return (
        <Fragment>
            <div className='py-4 bg-gray-50'>
                {children}
            </div>
        </Fragment>
    )
}

export const SBoxFooter = ({ children }: Props) => {
    return (
        <Fragment>
            <div className='py-4 bg-gray-50 border-t border-gray-200'>
                {children}
            </div>
        </Fragment>
    )
}


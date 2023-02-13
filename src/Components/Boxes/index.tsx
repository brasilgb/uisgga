import React, { Fragment } from 'react'

interface BoxProps {
    children: React.ReactNode;
}

export const ABoxAll = ({ children }: BoxProps) => {
    return (
        <Fragment>
            <div className="px-8">
                <div className="flex-col bg-gray-50 border border-white md:rounded-lg p-2 shadow-md">
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

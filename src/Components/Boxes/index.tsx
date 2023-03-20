import React, { Fragment } from 'react'
import "animate.css";
interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export const ABoxAll = ({ children }: BoxProps) => {
    return (
        <Fragment>
            <div className="px-2 md:px-8 animate__animated animate__fadeIn">
                <div className={`flex-col bg-gray-50 border border-white md:rounded-lg p-2 shadow-md`}>
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

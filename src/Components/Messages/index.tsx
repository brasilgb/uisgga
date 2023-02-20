import React, { Fragment } from 'react'
import { IoAlertCircleSharp, IoCheckmarkCircleSharp } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import 'animate.css';

interface MessagesProps {
    children: React.ReactNode;
    className?: string;
}
export const AMessageError = ({ children, className }: MessagesProps) => {

    return (
        <Fragment>
            <div className={`flex p-2 mb-4 ${className} text-sm text-red-700 bg-red-100 rounded-b-lg dark:bg-red-200 dark:text-red-800 border border-red-200 shadow-sm animate__animated animate__fadeIn`}>
                <IconContext.Provider value={{ color: "", className: "text-xl mr-2" }}>
                    <IoAlertCircleSharp />
                </IconContext.Provider>
                <div>
                    {children}
                </div>
            </div>
        </Fragment>

    )
}

export const AMessageSuccess = ({ children, className }: MessagesProps) => {

    return (
        <Fragment>
            <div className={`flex p-2 mb-4 ${className} text-sm text-green-700 bg-green-100 rounded-b-lg dark:bg-green-200 dark:text-green-800 border border-green-200 shadow-sm animate__animated animate__fadeIn`}>
                <IconContext.Provider value={{ color: "", className: "text-xl mr-2" }}>
                    <IoCheckmarkCircleSharp />
                </IconContext.Provider>
                <div>
                    {children}
                </div>
            </div>
        </Fragment>

    )
}

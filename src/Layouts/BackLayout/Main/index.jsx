import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../SideBar';

const BackLayout = () => {
    return (
        <Fragment>
            <div className='flex flex-row min-h-screen bg-gray-100 text-gray-800 md:ml-0 transition-all duration-150 ease-in'>

                <div className='flex-none'>
                    <SideBar />
                </div>

                <div className='flex flex-col w-full'>
                    <Header />
                    <main className='flex-grow'>
                        <Outlet />
                    </main>
                    <Footer />
                </div>

            </div>
        </Fragment>
    )
}

export default BackLayout;
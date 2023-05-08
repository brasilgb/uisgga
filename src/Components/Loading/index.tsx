import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { CgSpinnerTwo } from 'react-icons/cg';

const SLoading = () => {
    return (
        <Fragment>
            <div className="absolute flex items-center justify-center left-0 top-0 right-0 bottom-0 bg-[#0000020a] z-10">
                <div className="bg-gray-100 border border-white p-2 rounded shadow-md">
                    <IconContext.Provider value={{ className: 'text-4xl text-blue-500' }} >
                        <div>
                            <CgSpinnerTwo className='animate-spin'/>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>

        </Fragment>
    )
}

export default SLoading;
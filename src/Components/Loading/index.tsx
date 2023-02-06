import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { CgSpinnerTwo } from 'react-icons/cg';

const SLoading = () => {
    return (
        <Fragment>
            <div className='absolute top-[50%] left-[50%]'>
                <IconContext.Provider value={{ className: 'text-6xl text-gray-500'}} >
                    <div>
                        <CgSpinnerTwo className='animate-spin' />
                    </div>
                </IconContext.Provider>
            </div>
        </Fragment>
    )
}

export default SLoading;
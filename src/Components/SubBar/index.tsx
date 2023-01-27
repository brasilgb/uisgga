import React, { Fragment } from 'react'

interface Props {
    children: JSX.Element;
}



export const SubBar = ( { children }: Props ) => {
    return (
      <Fragment>
          <div className='flex items-center justify-between px-4 py-5'>
              { children }
          </div>
      </Fragment>
    )
  }

  export const SubBarLeft = ( { children }: Props ) => {
    return (
      <Fragment>
          <div className='flex flex-1 items-center justify-start'>
              { children }
          </div>
      </Fragment>
    )
  }
  export const SubBarRight = ( { children }: Props ) => {
    return (
      <Fragment>
          <div className='flex flex-1 items-center justify-end'>
              { children }
          </div>
      </Fragment>
    )
  }

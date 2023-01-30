import React from 'react'

const Header = () => {
  return (
    <header className=" bg-white shadow py-4 px-4">
      <div className="flex items-center flex-row">
        <div></div>
        <div className="flex ml-auto">
          <a href className="flex flex-row items-center">
            <img
              src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
              alt
              className="h-10 w-10 bg-gray-200 border rounded-full"
            />
            <span className="flex flex-col ml-2">
              <span className="truncate w-20 font-semibold tracking-wide leading-none">John Doe</span>
              <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">Manager</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header;
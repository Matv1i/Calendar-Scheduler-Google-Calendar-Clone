import React from "react"

const Header: React.FC = () => {
  return (
    <div className="w-full py-2 my-2 h-12   px-4 justify-between flex gap-1">
      <div className="flex gap-1  items-center">
        <p className="text-black flex py-0.5 bg-gray-200 rounded-l-lg px-2">
          {"<"}
        </p>
        <p className="bg-gray-200 text-sm px-3  py-1">Today</p>
        <p className="bg-gray-200 px-2 py-0.5 rounded-r-lg">{">"}</p>
      </div>
      <div className="flex justify-center items-center bg-gray-200 px-2 rounded-md gap-3">
        <img
          src="src/assets/pngwing.com (2).png"
          className="object-contain"
          width={23}
        />
        <input placeholder="Search" className="bg-gray-200" />
      </div>
    </div>
  )
}

export default Header

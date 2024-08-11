import React from "react"
import { useCalendar } from "../Context/CalendarContext"
import { isSameDay, format } from "date-fns"

const Header: React.FC = () => {
  const { selectedWeek, selectedDay } = useCalendar()
  return (
    <div className="w-full pt-3  h-30 sticky top-0 z-10    bg-white flex flex-col gap-1">
      <div className="w-full h-full flex justify-between">
        <div className="flex gap-1 mb-2 pl-8 px-5  items-center">
          <p className="text-black flex py-0.5 bg-gray-200 rounded-l-lg px-2">
            {"<"}
          </p>
          <p className="bg-gray-200 text-sm px-3  py-1">Today</p>
          <p className="bg-gray-200 px-2 py-0.5 rounded-r-lg">{">"}</p>
        </div>
        <div className="flex justify-center items-center  bg-gray-200 px-2 rounded-md gap-3">
          <img
            src="src/assets/pngwing.com (2).png"
            className="object-contain"
            width={23}
          />
          <input placeholder="Search" className="bg-gray-200" />
        </div>
      </div>
      <div className="flex-grow grid grid-cols-7 border-l ml-20">
        {selectedWeek.map((day, dayIndex) => {
          const isToday = isSameDay(selectedDay, day)
          return (
            <div
              key={dayIndex}
              className={`relative border-r ${
                isToday ? "bg-gray-100" : "bg-white"
              } cursor-pointer`}
            >
              <div className="flex flex-col items-center py-2 border-b">
                <p className="font-medium">{format(day, "EEE")}</p>
                <p className="text-gray-600">{format(day, "dd")}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Header
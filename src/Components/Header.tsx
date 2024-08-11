import React from "react"
import { useCalendar } from "../Context/CalendarContext"
import { isSameDay, format, setDate } from "date-fns"

const Header: React.FC = () => {
  const {
    selectedWeek,
    selectedDay,
    setSelectedDay,
    goToNextWeek,
    goToPreviousWeek,
  } = useCalendar()
  return (
    <div className="w-full pt-3 dark:bg-black-dark  h-30 sticky top-0 z-10    bg-white flex flex-col gap-1">
      <div className="w-full dark:bg-black-dark h-full flex justify-between">
        <div className="flex gap-1 mb-2 pl-8 px-5 dark:bg-black-dark items-center">
          <p
            className="text-black  cursor-pointer flex   py-0.5 bg-gray-200 rounded-l-lg px-2"
            onClick={goToPreviousWeek}
          >
            {"<"}
          </p>
          <p
            className="bg-gray-200 text-sm px-3 cursor-pointer py-1"
            onClick={() => setSelectedDay(new Date())}
          >
            Today
          </p>
          <p
            className="bg-gray-200 px-2 py-0.5 cursor-pointer rounded-r-lg"
            onClick={goToNextWeek}
          >
            {">"}
          </p>
        </div>
      </div>
      <div className=" dark:bg-black-dark flex-grow grid grid-cols-7 border-l ml-20">
        {selectedWeek.map((day, dayIndex) => {
          const isToday = isSameDay(selectedDay, day)
          return (
            <div
              key={dayIndex}
              className={`dark:bg-black-dark dark:text-white  relative border-r ${
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

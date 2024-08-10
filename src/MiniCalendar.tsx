import React from "react"
import { useCalendar } from "./CalendarContext"
import { format, isSameDay, isSameMonth } from "date-fns"

const MiniCalendar: React.FC = () => {
  const {
    selectedMonth,
    weekDays,
    calendarDays,
    goToNextMonth,
    goToPreviousMonth,
  } = useCalendar()

  const pointers: string[] = [
    "src/assets/blue.png",
    "src/assets/green.png",
    "src/assets/purple.png",
  ]

  return (
    <div className="flex flex-col bg-black-nondark p-2">
      <div className="flex justify-between p-2">
        <div className="flex text-3xl gap-2 font-light">
          <p>{format(selectedMonth, "MMMM")}</p>
          <p className="text-red-600">{selectedMonth.getFullYear()}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={goToPreviousMonth}>{"<"}</button>
          <button onClick={goToNextMonth}>{">"}</button>
        </div>
      </div>

      <div id="calendar" className="grid grid-cols-7 grid-rows-6 gap-1 p-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-xs text-light-gray flex justify-center"
          >
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, selectedMonth)
          const isCurrentDay = isSameDay(day, selectedMonth)

          return (
            <div
              key={index}
              className={`border border-black-nondark p-1 px-2 text-md rounded-full ${
                isCurrentDay ? "bg-sky-400" : "bg-black-nondark"
              } flex flex-col justify-center items-center ${
                isCurrentMonth ? "text-white" : "text-gray-500"
              }`}
            >
              {format(day, "dd")}
              <div className="flex justify-center items-center gap-0.5">
                {pointers.map((pointer, idx) => (
                  <img width={5} src={pointer} key={idx} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MiniCalendar

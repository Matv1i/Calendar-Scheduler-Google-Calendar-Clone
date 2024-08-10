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
    events,
  } = useCalendar()

  const pointers: string[] = ["blue.png", "green.png", "purple.png"]

  return (
    <div className="flex flex-col bg-black-nondark  rounded-lg ">
      <div className="flex justify-between p-2 items-center">
        <div className="text-3xl font-light">
          <p className="inline">{format(selectedMonth, "MMMM")}</p>
          <p className="inline text-red-600 ml-2">
            {selectedMonth.getFullYear()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="text-xl px-2 py-1 rounded-md hover:bg-gray-700"
            onClick={goToPreviousMonth}
          >
            {"<"}
          </button>
          <button
            className="text-xl px-2 py-1 rounded-md hover:bg-gray-700"
            onClick={goToNextMonth}
          >
            {">"}
          </button>
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
          const isCurrentDay = isSameDay(day, new Date())

          const dayEvents = events.filter((event) => isSameDay(day, event.date))

          return (
            <div
              key={index}
              className={`border border-black-nondark  p-2 rounded-full flex flex-col justify-center items-center h-10 ${
                isCurrentDay ? "bg-red-700" : "bg-black-nondark"
              } ${isCurrentMonth ? "text-white" : "text-gray-500"}`}
            >
              {format(day, "dd")}
              <div className="flex justify-center items-center gap-0.5 mt-1">
                {dayEvents.map((event, idx) => (
                  <img
                    key={event.id}
                    width={6}
                    src={`src/assets/${event.color}.png`}
                    alt={event.color}
                    className="object-contain absolute"
                  />
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

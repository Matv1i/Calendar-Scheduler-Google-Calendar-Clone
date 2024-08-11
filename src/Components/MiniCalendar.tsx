import React, { useCallback, useMemo } from "react"
import { useCalendar } from "../Context/CalendarContext"
import { format, isSameDay, isSameMonth } from "date-fns"

const MiniCalendar: React.FC = () => {
  const {
    selectedDay,
    weekDays,
    calendarDays,
    goToNextMonth,
    goToPreviousMonth,
    events,
    setSelectedDay,
  } = useCalendar()

  return (
    <div className="flex flex-col bg-black-nondark dark:bg-black-dark  rounded-lg ">
      <div className="flex justify-between p-2 items-center">
        <div className="text-3xl font-light">
          <p className="inline">{format(selectedDay, "MMMM")}</p>
          <p className="inline text-red-600 ml-2">
            {selectedDay.getFullYear()}
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
          const isCurrentMonth = isSameMonth(day, selectedDay)

          const dayEvents = events.filter((event) => isSameDay(day, event.date))
          const isCurrentDay = isSameDay(day, selectedDay)

          return (
            <div
              key={index}
              onClick={() => setSelectedDay(day)}
              className={` bg-black-nondark dark:bg-black-dark cursor-pointer relative p-2 rounded-full flex flex-col justify-center items-center h-9 ${
                isCurrentDay ? "bg-red-700" : "bg-black-nondark"
              } ${isCurrentMonth ? "text-white" : "text-gray-500"}`}
            >
              {format(day, "dd")}
              <div className="flex justify-center absolute bottom-1 gap-0.5 items-center  mt-1">
                {dayEvents
                  .filter((_edc, index) => index < 3)
                  .map((event) => {
                    if (isCurrentDay) {
                      return
                    }
                    console.log(event.color)
                    return (
                      <img
                        key={event.id}
                        width={6}
                        src={`src/assets/${event.color}.png`}
                        alt={event.color}
                        className="object-contain "
                      />
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MiniCalendar

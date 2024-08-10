import React from "react"
import { useCalendar } from "./CalendarContext"
import MiniCalendar from "./MiniCalendar"
import { format } from "date-fns"

const SideBar: React.FC = () => {
  const { selectedMonth, events } = useCalendar()

  return (
    <div className="text-white bg-black-nondark w-1/5 h-full flex flex-col">
      <div className="flex justify-between items-center p-4">
        <p></p>
        <div className="text-2xl p rounded-md bg-gray-dark px-3 flex justify-center items-center">
          +
        </div>
      </div>

      <MiniCalendar />

      <div className="px-3 overflow-auto flex-grow">
        {events.map((event, index) => (
          <div key={index} className="mb-4">
            <div className="flex w-full justify-between items-center">
              <p className="font-bold text-xl text-light-gray">
                {format(event.date, "EEEE")}
              </p>
              <p className="text-sm font-light text-light-gray">
                {format(event.date, "dd/MM/yy")}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-start gap-1">
                <img
                  width={12}
                  className="object-contain"
                  src={`src/assets/${event.color}.png`}
                  alt="Event pointer"
                />
                <p className="text-light-gray">
                  {event.timeStart}-{event.timeEnd}
                </p>
              </div>
              <p className="text-sm pl-4">{event.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar

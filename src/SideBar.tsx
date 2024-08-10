import React from "react"
import { useCalendar } from "./CalendarContext"
import MiniCalendar from "./MiniCalendar"
import { format } from "date-fns"

// Пример массива событий
const events = [
  {
    time: "8:30 - 10:00",
    description: "Dinner with John",
    pointer: "src/assets/green.png",
  },
  {
    time: "10:30 - 11:00",
    description: "Meeting with Sarah",
    pointer: "src/assets/blue.png",
  },
  {
    time: "12:00 - 13:00",
    description: "Lunch with Team",
    pointer: "src/assets/purple.png",
  },
  {
    time: "8:30 - 10:00",
    description: "Dinner with John",
    pointer: "src/assets/green.png",
  },
  {
    time: "10:30 - 11:00",
    description: "Meeting with Sarah",
    pointer: "src/assets/blue.png",
  },
  {
    time: "12:00 - 13:00",
    description: "Lunch with Team",
    pointer: "src/assets/purple.png",
  },
]

const SideBar: React.FC = () => {
  const { selectedMonth } = useCalendar()

  return (
    <div className="text-white bg-black-nondark w-1/5 h-full flex flex-col">
      <div className="flex justify-between items-center p-4">
        <p></p>
        <div className="text-2xl p rounded-md bg-gray-dark px-3 flex justify-center items-center">
          +
        </div>
      </div>

      <MiniCalendar />

      {/* Контейнер с прокруткой */}
      <div className="px-3 overflow-auto flex-grow">
        {events.map((event, index) => (
          <div key={index} className="mb-4">
            <div className="flex w-full justify-between items-center">
              <p className="font-bold text-xl text-light-gray">
                {format(selectedMonth, "EEEE")}
              </p>
              <p className="text-sm font-light text-light-gray">
                {selectedMonth.toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-start gap-1">
                <img
                  width={12}
                  className="object-contain"
                  src={event.pointer}
                  alt="Event pointer"
                />
                <p className="text-light-gray">{event.time}</p>
              </div>
              <p className="text-sm pl-4">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar

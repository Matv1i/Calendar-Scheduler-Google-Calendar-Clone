import React from "react"
import { useCalendar } from "./CalendarContext"
import MiniCalendar from "./MiniCalendar"
import { format } from "date-fns"

interface Events {
  id: string
  name: string
  date: Date
  timeStart: string
  timeEnd: string
  color: string
}

const SideBar: React.FC = () => {
  const { selectedMonth, events } = useCalendar()

  // Исправленная функция группировки событий по дате
  const groupEventsByDate = () => {
    return events.reduce((groupedEvents, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd")
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = []
      }
      groupedEvents[dateKey].push(event)
      return groupedEvents
    }, {} as Record<string, Events[]>)
  }

  const groupedEvents = groupEventsByDate()

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
        {Object.keys(groupedEvents).map((dateKey, index) => (
          <div key={index} className="mb-4">
            <div className="flex w-full justify-between items-center">
              <p className="font-bold text-xl text-light-gray">
                {format(new Date(dateKey), "EEEE")}
              </p>
              <p className="text-sm font-light text-light-gray">
                {format(new Date(dateKey), "dd/MM/yy")}
              </p>
            </div>
            <div className="flex flex-col">
              {groupedEvents[dateKey].map((event, eventIndex) => (
                <div key={eventIndex} className="flex flex-col">
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar

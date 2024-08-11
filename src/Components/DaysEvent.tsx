import React, { useState } from "react"
import { format, isSameDay as checkSameDay, parse } from "date-fns"
import { useCalendar } from "../Context/CalendarContext"
import FormAddEvent from "../ModalWindow/FormAddEvent"
import Header from "./Header"

const DaysEvent: React.FC = () => {
  const { selectedWeek, events, selectedDay, showModal, setShowModal } =
    useCalendar()

  const [newDate, setDate] = useState<Date | undefined>(undefined)

  const hours: string[] = Array.from({ length: 24 }, (_, i) =>
    format(new Date(0, 0, 0, i), "ha")
  )

  const handleDayClick = (day: Date) => {
    setDate(day)
    setShowModal(true)
  }

  return (
    <div className="w-4/5 h-full z-0 flex flex-col overflow-auto">
      <Header />
      <div className="flex flex-row flex-grow">
        <div className="grid grid-rows-24 w-20 ">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="h-16 flex items-center justify-center text-gray-500"
            >
              {hour}
            </div>
          ))}
        </div>

        <div className="flex-grow grid grid-cols-7 border-l ">
          {selectedWeek.map((day, dayIndex) => {
            const isToday = checkSameDay(selectedDay, day)
            return (
              <div
                key={dayIndex}
                className={`relative border-r ${
                  isToday ? "bg-gray-100" : "bg-white"
                } cursor-pointer`}
                onClick={() => handleDayClick(day)}
              >
                <div className="flex flex-col items-center  border-b"></div>

                <div className="relative h-full">
                  {events
                    .filter((event) => checkSameDay(event.date, day))
                    .map((event, eventIndex) => {
                      const startTime = parse(
                        event.timeStart,
                        "HH:mm",
                        new Date()
                      )
                      const startHour =
                        startTime.getHours() + startTime.getMinutes() / 60

                      const endTime = parse(event.timeEnd, "HH:mm", new Date())
                      const endHour =
                        endTime.getHours() + endTime.getMinutes() / 60

                      const eventHeight = ((endHour - startHour) * 100) / 24

                      return (
                        <div
                          key={eventIndex}
                          className={`absolute snap-y snap-mandatory ${event.color}
                                left-1 right-1 min-h-24 text-white rounded-md p-1`}
                          style={{
                            top: `${(startHour * 100) / 24 + 1}%`,
                            height: `${eventHeight}%`,
                          }}
                        >
                          <p className="text-xs font-semibold  whitespace-normal break-words ">
                            {event.name}
                          </p>
                          <p className="text-xs">{`${event.timeStart} - ${event.timeEnd}`}</p>
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal for Adding Event */}
      {showModal && <FormAddEvent certainDate={newDate} />}

      {/* Modal for Entire Event  */}
    </div>
  )
}

export default DaysEvent

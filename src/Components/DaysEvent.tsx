import React, { useState } from "react"
import { format, isSameDay as checkSameDay, parse } from "date-fns"
import { useCalendar } from "../Context/CalendarContext"
import FormAddEvent from "../ModalWindow/FormAddEvent"
import Header from "./Header"
import { da } from "date-fns/locale"

const DaysEvent: React.FC = () => {
  const { selectedWeek, events, showModal, setShowModal } = useCalendar()

  const [pickedDate, setPickedDate] = useState<Date | null>(null)

  const [newDate, setDate] = useState<Date | undefined>(undefined)
  const [startHour, setStartHour] = useState<number | null>(null)
  const [endHour, setEndHour] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)

  const hours: string[] = Array.from({ length: 24 }, (_, i) =>
    format(new Date(0, 0, 0, i), "ha")
  )

  const handleDayClick = (day: Date, hour: number) => {
    setDate(day)
    setPickedDate(day)
    setStartHour(hour)
    setEndHour(hour)
    setDragging(true)
  }

  const handleMouseUp = () => {
    if (dragging) {
      setShowModal(true)
      setDragging(false)
    }
  }

  const handleMouseEnter = (hour: number) => {
    if (dragging && startHour !== null) {
      setEndHour(hour)
    }
  }

  return (
    <div
      className="flex-1 h-full z-0 flex flex-col overflow-auto"
      onMouseUp={handleMouseUp}
    >
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

        <div className="flex-grow grid grid-cols-7 z-0 border-l">
          {selectedWeek.map((day, dayIndex) => {
            const isToday = checkSameDay(new Date(), day)
            return (
              <div
                key={dayIndex}
                className={`relative border-r ${
                  isToday ? "bg-gray-100" : "bg-white"
                } cursor-pointer`}
              >
                <div className="grid grid-rows-24 w-full">
                  {hours.map((hour, index) => (
                    <div
                      key={hour}
                      className={`h-16 flex border-b items-center justify-center text-gray-500 ${
                        startHour !== null &&
                        endHour !== null &&
                        startHour <= index &&
                        index <= endHour &&
                        pickedDate === day
                          ? "bg-red-200"
                          : ""
                      }`}
                      onMouseDown={() => handleDayClick(day, index)}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseUp={() => setPickedDate(null)}
                    ></div>
                  ))}
                </div>
                <div className="relativ z-10 h-full">
                  {events
                    .filter((event) => checkSameDay(event.date, day))
                    .map((event, eventIndex) => {
                      const startTime = parse(
                        event.timeStart,
                        "HH:mm",
                        new Date()
                      )
                      const startHour =
                        startTime.getHours() +
                        (startTime.getMinutes() / 60 - 0.25)

                      const endTime = parse(event.timeEnd, "HH:mm", new Date())
                      const endHour =
                        endTime.getHours() + (endTime.getMinutes() / 60 - 0.25)

                      const eventHeight = ((endHour - startHour) * 100) / 24

                      return (
                        <div
                          key={eventIndex}
                          className={`absolute snap-y snap-mandatory ${event.color} left-1 right-1 min-h-24 text-white rounded-md p-1`}
                          style={{
                            top: `${(startHour * 100) / 24 + 1}%`,
                            height: `${eventHeight}%`,
                          }}
                        >
                          <p className="text-xs font-semibold whitespace-normal break-words">
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

      {showModal && (
        <FormAddEvent
          certainDate={newDate}
          startHour={startHour}
          endHour={endHour}
        />
      )}
    </div>
  )
}

export default DaysEvent

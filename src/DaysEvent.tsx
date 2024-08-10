import React, { useState } from "react"
import { format, isSameDay, parse } from "date-fns"
import { useCalendar } from "./CalendarContext"
import FormAddEvent from "./FormAddEvent"
import Header from "./Header"

const DaysEvent: React.FC = () => {
  const { selectedWeek, events, addEvent } = useCalendar()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [newDate, setDate] = useState<Date | undefined>(undefined)

  const hours: string[] = Array.from({ length: 24 }, (_, i) =>
    format(new Date(0, 0, 0, i), "ha")
  )

  const handleDayClick = (day: Date) => {
    setDate(day)
    setShowModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setSelectedEventId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedEventId) {
      const updatedEvents = events.filter(
        (event) => event.id !== selectedEventId
      )
      addEvent(updatedEvents)
      setSelectedEventId(null)
      setShowDeleteModal(false)
    }
  }

  return (
    <div className="w-4/5 h-full flex flex-col overflow-auto">
      <Header />
      <div className="flex flex-row flex-grow  ">
        <div className="grid grid-rows-24 w-20  border-r">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="h-24 flex items-center justify-center text-gray-500"
            >
              {hour}
            </div>
          ))}
        </div>

        <div className="flex-grow grid grid-cols-7 border-l ">
          {selectedWeek.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="relative border-r cursor-pointer"
              onClick={() => handleDayClick(day)}
            >
              <div className="flex flex-col items-center py-2 border-b">
                <p className="font-medium">{format(day, "EEE")}</p>
                <p className="text-gray-600">{format(day, "dd")}</p>
              </div>

              <div className="relative h-full">
                {events
                  .filter((event) => isSameDay(event.date, day))
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
                        className={`absolute ${event.color} left-1 right-1 min-h-24  text-white rounded-md p-1`}
                        style={{
                          top: `${(startHour * 100) / 24}%`,
                          height: `${eventHeight}%`,
                        }}
                      >
                        <p className="text-xs font-semibold">{event.name}</p>
                        <p className="text-xs">{`${event.timeStart} - ${event.timeEnd}`}</p>

                        <div className="p-3 absolute flex justify-between w-full bottom-0">
                          <img
                            width={20}
                            className="object-contain opacity-40 transition-opacity duration-300 ease hover:opacity-100"
                            src="src/assets/pngwing.com (3).png"
                            alt="delete"
                          />
                          <p
                            className="text-xl opacity-40 transition-opacity duration-300 ease hover:opacity-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteClick(event.id)
                            }}
                          >
                            x
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Event */}
      {showModal && (
        <FormAddEvent
          certainDate={newDate}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      {/* Modal for Confirming Deletion */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Удалить событие?</h2>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Отмена
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmDelete}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DaysEvent

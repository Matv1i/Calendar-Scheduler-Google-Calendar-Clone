import React from "react"
import { useCalendar } from "../Context/CalendarContext"
import { useState } from "react"
import Popup from "./Popup"

interface Event {
  id: string
  name: string
  date: Date
  timeStart: string
  timeEnd: string
  color: string
  setOpenFullModal: (e: boolean) => void
}

const OpenedEvent: React.FC<Event> = ({
  id,
  name,
  date,
  timeStart,
  timeEnd,
  color,
  setOpenFullModal,
}) => {
  const { events, setEvents } = useCalendar()

  const handleClick = () => {
    setOpenFullModal(false)
  }

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClick()
    }
  }

  const deleteEvent = () => {
    const newArray = events.filter((eventOld) => eventOld.id !== id)
    setEvents(newArray)

    handleClick()
  }

  return (
    <>
      <div
        onClick={closeModal}
        className={`fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 transition-transform duration-300`}
      >
        <div className="bg-white p-4 rounded-md shadow-lg w-1/3">
          <div className="gap-4">
            <div className=" flex w-full ">
              <p className="text-2xl font-bold">{name}</p>
            </div>
            <div className="flex">
              <p>
                {timeStart} - {timeEnd}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="mr-2 px-4 py-2 bg-gray-200 rounded">Edit</button>
            <button
              onClick={deleteEvent}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenedEvent

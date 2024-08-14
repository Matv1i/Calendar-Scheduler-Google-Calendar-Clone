import React from "react"
import { useCalendar } from "../Context/CalendarContext"
import { useState } from "react"
import axios from "../axios.tsx"

import FormAddEvent from "./FormAddEvent"

interface Event {
  id: string
  name: string
  date?: Date
  timeStart: string
  timeEnd: string
  color?: string
}

const OpenedEvent: React.FC<Event> = ({
  id,
  name,

  timeStart,
  timeEnd,
}) => {
  const { depend, setDepend, setOpenFullModal } = useCalendar()

  const [editWindow, setEditWindow] = useState(false)

  const handleClick = () => {
    setOpenFullModal(false)
  }

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClick()
    }
  }

  const deleteEvent = async () => {
    try {
      await axios.delete(`/events/${id}`)
      setDepend(!depend)
    } catch (err) {
      console.error(err)
    }

    handleClick()
  }

  const edit = () => {
    setEditWindow(true)
  }
  //I dont know why but i have a problem with a animation when i wanna close editing window, i press save or cancell and animation start and has a couple frames with OpenedEvent so i solve this problem with hidden state, and when i press idit modal will be hidden and not hidden after i closed Editing windows
  const [hidden, setHidden] = useState(false)

  return (
    <>
      <div
        onClick={closeModal}
        className={`fixed ${
          hidden ? "hidden" : ""
        } inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 transition-transform duration-300`}
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
            <button
              onClick={edit}
              className="mr-2 px-4 py-2 bg-gray-200 rounded"
            >
              Edit
            </button>
            <button
              onClick={deleteEvent}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {editWindow && <FormAddEvent setHidden={setHidden} idOfPost={id} />}
    </>
  )
}

export default OpenedEvent

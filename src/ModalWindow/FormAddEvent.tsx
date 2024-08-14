import React, { useState, useEffect } from "react"
import { useCalendar } from "../Context/CalendarContext"
import { format } from "date-fns"
import axios from "../axios"

type PropsDate = {
  certainDate?: string | null
  setOpenModal?: (smth: boolean) => void
  startHour?: number | null
  endHour?: number
  idOfPost?: string
  setHidden?: (smth: boolean) => void
  name: string
  color: string
}
interface Events {
  id: string
  name: string
  date: Date
  timeStart: string
  timeEnd: string
  color: string
}

const FormAddEvent: React.FC<PropsDate> = ({
  certainDate,
  setOpenModal,
  startHour,
  endHour,
  idOfPost,
  setHidden,
}) => {
  const { setShowModal, events, setOpenFullModal, setDepend, depend } =
    useCalendar()
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [timeStart, setTimeStart] = useState("")
  const [timeEnd, settimeEnd] = useState("")
  const [color, setColor] = useState("")
  const [date, setDate] = useState(new Date())

  const isEditing: boolean = Boolean(id)
  const [animationClass, setAnimationClass] = useState("modal-enter")

  useEffect(() => {
    if (idOfPost) {
      const foundEvent: Events = events.find((event) => event.id === idOfPost)

      setId(idOfPost)
      setTimeStart(foundEvent?.timeStart)
      settimeEnd(foundEvent?.timeEnd)
      setName(foundEvent?.name)
      setColor(foundEvent?.color)
      setDate(foundEvent?.date)
      if (setHidden) {
        setHidden(true)
      }
    }
  }, [idOfPost, setHidden, events])

  useEffect(() => {
    if (certainDate) {
      setDate(certainDate)
    }
    if (startHour !== undefined) {
      setTimeStart(`${String(startHour).padStart(2, "0")}:00`)
    }
    if (endHour !== undefined) {
      settimeEnd(`${String(endHour).padStart(2, "0")}:00`)
    }
  }, [certainDate, startHour, endHour])

  const handleSaveEvent = async () => {
    if (!name || !timeStart || !timeEnd || !color || !date) {
      alert("Please input a full form.")
      return
    }

    const fields = {
      id: id || crypto.randomUUID(),
      name,
      timeStart,
      timeEnd,
      color,
      date,
    }

    try {
      if (isEditing) {
        await axios.patch("/events", fields)
      } else {
        await axios.post("/events", fields)
      }
      setAnimationClass("modal-exit")
      setDepend(!depend)
    } catch (error) {
      console.error(
        "Error while saving event:",
        error.response?.data || error.message || error
      )
    }
  }

  const handleAnimationEnd = () => {
    if (animationClass === "modal-exit") {
      setShowModal(false)
      setOpenModal?.(false)
      setOpenFullModal(false)
      setHidden?.(false)
    }
  }

  const handleClose = () => {
    setAnimationClass("modal-exit")
  }

  const handleColor = (color: string) => {
    setColor(color)
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-20 transition-transform ${
        animationClass === "modal-enter"
          ? "animate-modalFadeIn"
          : "animate-modalFadeOut"
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="bg-white p-4 rounded-md shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">
          {isEditing ? "Edit event" : "New event "}
        </h2>
        <div className="mb-4">
          <label className="block mb-1">Title Of Event:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Start time:</label>
          <input
            type="time"
            step="900"
            className="w-full border p-2 rounded"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">End time:</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={timeEnd}
            onChange={(e) => settimeEnd(e.target.value)}
          />
        </div>
        {!certainDate && (
          <div className="mb-4">
            <label className="block mb-1">Дата:</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={format(date, "yyyy-MM-dd")}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
        )}

        <div className="mb-4 flex gap-2">
          <p>Выберите цвет:</p>
          <div className="flex gap-3">
            <img
              onClick={() => handleColor("bg-blue-spec")}
              width={20}
              className="object-contain cursor-pointer"
              src="src/assets/bg-blue-spec.png"
              alt="blue"
            />
            <img
              onClick={() => handleColor("bg-green-spec")}
              width={20}
              className="object-contain cursor-pointer"
              src="src/assets/bg-green-spec.png"
              alt="green"
            />
            <img
              onClick={() => handleColor("bg-purple-spec")}
              width={20}
              className="object-contain cursor-pointer"
              src="src/assets/bg-purple-spec.png"
              alt="purple"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleSaveEvent}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormAddEvent

import React, { useState, useEffect } from "react"
import { useCalendar } from "./CalendarContext"

type PropsDate = {
  certainDate: Date | undefined
  showModal: boolean
  setShowModal: (show: boolean) => void
}

const FormAddEvent: React.FC<PropsDate> = ({
  certainDate,
  showModal,
  setShowModal,
}) => {
  const { addEvent } = useCalendar()
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: certainDate || new Date(), // Default to current date if certainDate is undefined
    timeStart: "",
    timeEnd: "",
    color: "",
  })

  // Update newEvent.date whenever certainDate changes
  useEffect(() => {
    if (certainDate) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        date: certainDate,
      }))
    }
  }, [certainDate])

  const handleSaveEvent = () => {
    if (!newEvent.name || !newEvent.timeStart || !newEvent.timeEnd) {
      alert("Пожалуйста, заполните все поля.")
      return
    }
    addEvent({ ...newEvent, id: Math.random().toString(36).substr(2, 9) })
    setShowModal(false)
    setNewEvent({
      name: "",
      date: certainDate || new Date(),
      timeStart: "",
      timeEnd: "",
      color: "",
    })
  }

  const handleColor = (color: string) => {
    setNewEvent({ ...newEvent, color })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Добавить новое событие</h2>
        <div className="mb-4">
          <label className="block mb-1">Название события:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Время начала:</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={newEvent.timeStart}
            onChange={(e) =>
              setNewEvent({ ...newEvent, timeStart: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Время окончания:</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={newEvent.timeEnd}
            onChange={(e) =>
              setNewEvent({ ...newEvent, timeEnd: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <p>Pick a color:</p>
          <div className="flex gap-3">
            <img
              onClick={() => handleColor("bg-blue-spec")}
              width={20}
              className="object-contain cursor-pointer"
              src="src/assets/blue.png"
              alt="blue"
            />
            <img
              onClick={() => handleColor("bg-green-spec")}
              width={20}
              className="object-contain cursor-pointer"
              src="src/assets/green.png"
              alt="green"
            />
            <img
              onClick={() => handleColor("bg-purple-spec")}
              width={20}
              className="object-contain cursor-pointer"
              src="src/assets/purple.png"
              alt="purple"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
            onClick={() => setShowModal(false)}
          >
            Отмена
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSaveEvent}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormAddEvent

import React, { useState, useEffect } from "react"
import { useCalendar } from "../Context/CalendarContext"

type PropsDate = {
  certainDate: Date | null
  setOpenModal?: (smth: boolean) => void
  startHour?: number | null
  endHour?: number | null
}

const FormAddEvent: React.FC<PropsDate> = ({
  certainDate,
  setOpenModal,
  startHour,
  endHour,
}) => {
  const { addEvent, setShowModal } = useCalendar()
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: certainDate || "",
    timeStart: "",
    timeEnd: "",
    color: "",
  })

  useEffect(() => {
    console.log(endHour)
    console.log(startHour)
    if (certainDate) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        date: certainDate,
      }))
    }
    if (startHour !== null) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        timeStart: `${String(startHour).padStart(2, "0")}:00`,
      }))
    }
    if (endHour !== null) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        timeEnd: `${String(endHour + 1).padStart(2, "0")}:00`,
      }))
    }
  }, [certainDate, startHour, endHour])

  const handleSaveEvent = () => {
    if (
      !newEvent.name ||
      !newEvent.timeStart ||
      !newEvent.timeEnd ||
      !newEvent.color ||
      !newEvent.date
    ) {
      alert("Please input a full form.")
      return
    }
    addEvent({ ...newEvent, id: Math.random().toString(36).substr(2, 9) })
    setShowModal(false)
    setNewEvent({
      name: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      color: "",
    })
  }

  const handleColor = (color: string) => {
    setNewEvent({ ...newEvent, color })
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 transition-transform duration-300`}
    >
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
            step="900"
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
        {!certainDate && (
          <div className="mb-4">
            <label className="block mb-1">Дата:</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
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
            onClick={() =>
              certainDate ? setShowModal(false) : setOpenModal?.(false)
            }
          >
            Отмена
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
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

import React from "react"
import { useCalendar } from "./CalendarContext"

type Props = {
  setShowDeleteModal: (showDeleteModal: boolean) => void
  id: string
}

const DeleteModal: React.FC<Props> = ({ setShowDeleteModal, id }) => {
  const { events, setEvents } = useCalendar()
  const confirmDelete = (id: string) => {
    const eventReady = events.filter((event) => id !== event.id)
    setEvents(eventReady)
    setShowDeleteModal(false)
  }
  return (
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
            onClick={() => confirmDelete(id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

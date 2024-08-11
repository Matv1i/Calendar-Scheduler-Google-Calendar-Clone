import React, { useState } from "react"
import { useCalendar } from "../Context/CalendarContext"
import MiniCalendar from "./MiniCalendar"
import { format } from "date-fns"
import FormAddEvent from "../ModalWindow/FormAddEvent"
import FutureEvents from "./FutureEvents"

interface Events {
  id: string
  name: string
  date: Date
  timeStart: string
  timeEnd: string
  color: string
}

const SideBar: React.FC = () => {
  const { setShowModal, showModal } = useCalendar()

  return (
    <>
      <div className="text-white bg-black-nondark sticky w-50 h-full flex flex-col">
        <div className="flex justify-between items-center p-4">
          <p className="font-semiserif font-light">My Calendar</p>
          <div
            onClick={() => setShowModal(true)}
            className="text-2xl cursor-pointer rounded-md bg-gray-dark px-3 flex justify-center items-center"
          >
            +
          </div>
        </div>

        <MiniCalendar />
        <FutureEvents />
      </div>

      {showModal && <FormAddEvent />}
    </>
  )
}

export default SideBar

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
  const { setDarkTheme, darkTheme } = useCalendar()

  const [openModal, setOpenModal] = useState(false)

  const NODATA = null

  return (
    <>
      <div className="text-white border-r-red-600 bg-black-nondark dark:bg-black-dark sticky w-80 h-full flex flex-col">
        <div className="flex justify-between items-center p-4">
          <p></p>
          <div
            onClick={() => setOpenModal(true)}
            className="text-2xl cursor-pointer rounded-md bg-black-nondark dark:bg-black-da px-3 flex justify-center items-center"
          >
            +
          </div>
        </div>

        <MiniCalendar />
        <FutureEvents />
      </div>

      {openModal && (
        <FormAddEvent certainDate={NODATA} setOpenModal={setOpenModal} />
      )}
    </>
  )
}

export default SideBar

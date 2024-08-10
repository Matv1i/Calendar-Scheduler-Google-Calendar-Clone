import React from "react"
import SideBar from "./SideBar"
import { CalendarProvider } from "./CalendarContext"
import DaysEvent from "./DaysEvent"

const Calendar = () => {
  return (
    <CalendarProvider>
      <div className="w-full h-screen flex">
        <SideBar />
        <DaysEvent />
      </div>
    </CalendarProvider>
  )
}

export default Calendar

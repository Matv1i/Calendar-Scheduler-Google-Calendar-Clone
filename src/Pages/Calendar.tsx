import SideBar from "../Components/SideBar"
import { CalendarProvider } from "../Context/CalendarContext"
import DaysEvent from "../Components/DaysEvent"
import { useEffect } from "react"

const Calendar = () => {
  useEffect

  useEffect
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

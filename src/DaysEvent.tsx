import React from "react"
import Header from "./Header"
import { useCalendar } from "./CalendarContext"
import { format } from "date-fns"

const DaysEvent: React.FC = () => {
  const { selectedWeek, selectedMonth } = useCalendar()
  console.log(selectedWeek)

  console.log(selectedMonth)
  return (
    <div className="w-4/5 h-full ">
      <Header />
      <div className="flex-col">
        <div></div>
        <div className="h-full grid grid-cols-7">
          {selectedWeek.map((day, index) => (
            <div>{format(day, "EE")}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DaysEvent

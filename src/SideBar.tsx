import React from "react"
import { format, FormatDateOptions } from "date-fns"
interface SideBarProps {
  calendarDays: Date[]
  selectedMonth: Date
}

const SideBar: React.FC<SideBarProps> = ({ calendarDays, selectedMonth }) => {
  return (
    <div className="bg-black-nondark w-1/4 min-h-full">
      <div className="flex flex-col">
        <div className="flex justify-around">
          <p>{format(selectedMonth, "LLLL")}</p>
          <p>{selectedMonth.getFullYear()}</p>
        </div>

        <div id="calendar" className="grid grid-cols-7 grid-rows-5 gap-2">
          {calendarDays.map((day, index) => (
            <div key={index}>{format(day, "dd")}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar

import React, { useMemo, useState } from "react"
import {
  startOfMonth,
  startOfWeek,
  StartOfWeekOptions,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns"
import SideBar from "./SideBar"

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const calendarDays: any = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth))

    const lastWeek = endOfWeek(endOfMonth(selectedMonth))

    return eachDayOfInterval({ start: firstWeekStart, end: lastWeek })
  }, [selectedMonth])

  console.log(calendarDays)

  return (
    <div className="w-full min-h-full">
      <SideBar calendarDays={calendarDays} selectedMonth={selectedMonth} />
    </div>
  )
}

export default Calendar

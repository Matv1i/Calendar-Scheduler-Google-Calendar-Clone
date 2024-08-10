import React, { createContext, useContext, useMemo, useState } from "react"
import {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addMonths, // Импортируем функцию для добавления месяцев
} from "date-fns"

interface CalendarContextProps {
  selectedMonth: Date
  calendarDays: Date[]
  weekDays: string[]
  setSelectedMonth: React.Dispatch<React.SetStateAction<Date>>
  goToNextMonth: () => void // Новая функция для перехода к следующему месяцу
  goToPreviousMonth: () => void // Новая функция для перехода к предыдущему месяцу
  selectedWeek: Date[]
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
)

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const weekDays: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const calendarDays = useMemo(() => {
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth))
    const lastWeek = endOfWeek(endOfMonth(selectedMonth))

    return eachDayOfInterval({ start: firstWeekStart, end: lastWeek })
  }, [selectedMonth])

  const selectedWeek = useMemo(() => {
    const firstweek = startOfWeek(selectedMonth)
    const endweek = endOfWeek(selectedMonth)
    return eachDayOfInterval({ start: firstweek, end: endweek })
  }, [selectedMonth])

  const goToNextMonth = () => {
    setSelectedMonth((prevMonth) => addMonths(prevMonth, 1))
  }

  const goToPreviousMonth = () => {
    setSelectedMonth((prevMonth) => addMonths(prevMonth, -1))
  }

  return (
    <CalendarContext.Provider
      value={{
        selectedMonth,
        calendarDays,
        weekDays,
        setSelectedMonth,
        goToNextMonth,
        goToPreviousMonth,
        selectedWeek,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendar = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider")
  }
  return context
}

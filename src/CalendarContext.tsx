import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"
import {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
} from "date-fns"

interface Events {
  id: string
  name: string
  date: Date
  timeStart: string
  timeEnd: string
  color: string
}

interface CalendarContextProps {
  selectedMonth: Date
  calendarDays: Date[]
  weekDays: string[]
  setSelectedMonth: React.Dispatch<React.SetStateAction<Date>>
  goToNextMonth: () => void
  goToPreviousMonth: () => void
  selectedWeek: Date[]
  events: Events[]
  addEvent: (event: Events) => void
  removeEvent: (id: string) => void
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
)

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [events, setEvents] = useState<Events[]>([])

  useEffect(() => {
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

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

  const addEvent = (event: Events) => {
    setEvents((prevEvents) => [...prevEvents, event])
  }

  const removeEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
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
        events,
        addEvent,
        removeEvent,
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

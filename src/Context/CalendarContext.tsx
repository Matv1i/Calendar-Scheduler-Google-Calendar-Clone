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
  selectedDay: Date
  calendarDays: Date[]
  weekDays: string[]
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  goToNextMonth: () => void
  goToPreviousMonth: () => void
  selectedWeek: Date[]
  events: Events[]
  addEvent: (event: Events) => void
  removeEvent: (id: string) => void
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
)

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date())
  const [events, setEvents] = useState<Events[]>([])
  const [showModal, setShowModal] = useState(false)

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
    const firstWeekStart = startOfWeek(startOfMonth(selectedDay))
    const lastWeek = endOfWeek(endOfMonth(selectedDay))
    return eachDayOfInterval({ start: firstWeekStart, end: lastWeek })
  }, [selectedDay])

  const selectedWeek = useMemo(() => {
    const firstweek = startOfWeek(selectedDay)
    const endweek = endOfWeek(selectedDay)
    return eachDayOfInterval({ start: firstweek, end: endweek })
  }, [selectedDay])

  const goToNextMonth = () => {
    setSelectedDay((prevMonth) => addMonths(prevMonth, 1))
  }

  const goToPreviousMonth = () => {
    setSelectedDay((prevMonth) => addMonths(prevMonth, -1))
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
        selectedDay,
        calendarDays,
        weekDays,
        setSelectedDay,
        goToNextMonth,
        goToPreviousMonth,
        selectedWeek,
        events,
        addEvent,
        removeEvent,
        setEvents,
        setShowModal,
        showModal,
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
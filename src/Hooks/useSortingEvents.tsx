import React from "react"
import { useCalendar } from "../Context/CalendarContext"
import { format, parseISO } from "date-fns"
interface Events {
  id: string
  name: string
  date: Date
  timeStart: string
  timeEnd: string
  color: string
}

const useSortingEvents = () => {
  const { events } = useCalendar()
  const sortEvents = (events: Events[]) => {
    return events.sort((a, b) => {
      const dateA =
        a.date instanceof Date ? a.date : parseISO(a.date as unknown as string)
      const dateB =
        b.date instanceof Date ? b.date : parseISO(b.date as unknown as string)
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime()
      }

      return a.timeStart.localeCompare(b.timeStart)
    })
  }

  const groupEventsByDate = () => {
    const grouped = events.reduce((groupedEvents, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd")
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = []
      }
      groupedEvents[dateKey].push(event)
      return groupedEvents
    }, {} as Record<string, Events[]>)

    Object.keys(grouped).forEach((dateKey) => {
      grouped[dateKey] = sortEvents(grouped[dateKey])
    })

    return Object.keys(grouped)
      .sort((a, b) => {
        const dateA = parseISO(a)
        const dateB = parseISO(b)
        return dateA.getTime() - dateB.getTime()
      })
      .reduce((sortedGroupedEvents, dateKey) => {
        sortedGroupedEvents[dateKey] = grouped[dateKey]
        return sortedGroupedEvents
      }, {} as Record<string, Events[]>)
  }

  return groupEventsByDate()
}

export default useSortingEvents

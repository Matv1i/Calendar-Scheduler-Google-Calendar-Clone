import useSortingEvents from "../Hooks/useSortingEvents"
import { format } from "date-fns"

const FutureEvents: React.FC = () => {
  const groupedEvents = useSortingEvents()

  const truncateText = (text: string, length = 36): string => {
    if (text.length > length) {
      return text.slice(0, length) + "..."
    }
    return text
  }

  return (
    <div className="px-3 overflow-auto flex-grow">
      {Object.keys(groupedEvents).map((dateKey, index) => {
        const formattedDate = format(new Date(dateKey), "MMMM d, yyyy")
        return (
          <div key={index} className="mb-4">
            <div className="flex w-full justify-between items-center">
              <p className="font-bold text-xl text-light-gray">
                {format(new Date(dateKey), "EEEE")}
              </p>
              <p className="text-sm font-light text-light-gray">
                {formattedDate}
              </p>
            </div>
            <div className="flex flex-col">
              {groupedEvents[dateKey].map((event, eventIndex) => (
                <div key={eventIndex} className="flex flex-col">
                  <div className="flex justify-start gap-1">
                    <img
                      width={12}
                      className="object-contain"
                      src={`src/assets/${event.color}.png`}
                      alt="Event pointer"
                    />
                    <p className="text-light-gray">
                      {event.timeStart}-{event.timeEnd}
                    </p>
                  </div>
                  <p className="text-sm pl-4">{truncateText(event.name)}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FutureEvents

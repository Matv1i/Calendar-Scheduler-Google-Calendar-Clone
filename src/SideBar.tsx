import React from "react"
import { format } from "date-fns"

interface SideBarProps {
  weekDays: string[]
  calendarDays: Date[]
  selectedMonth: Date
}

const SideBar: React.FC<SideBarProps> = ({
  weekDays,
  calendarDays,
  selectedMonth,
}) => {
  const pointers: string[] = [
    "src/assets/blue.png",
    "src/assets/green.png",
    "src/assets/purple.png",
  ]
  return (
    <div className="text-white py-4 bg-black-nondark w-1/5 h-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="w-full flex items-ce justify-between">
          <p></p>
          <div className="mr-2  text-2xl p rounded-md bg-gray-dark px-3 flex justify-center items-center">
            +
          </div>
        </div>
        <div className="flex justify-between p-2 ">
          <div className="flex  text-3xl gap-2 font-light">
            <p className="  ">{format(selectedMonth, "MMMM")}</p>
            <p className=" text-red-600">{selectedMonth.getFullYear()}</p>
          </div>

          <div className="flex gap-2">
            <button>{"<"}</button>
            <button>{">"}</button>
          </div>
        </div>

        <div
          id="calendar"
          className="grid grid-cols-7 grid-rows-6 gap-1 p-2 flex-grow overflow-auto"
        >
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="text-xs text-gray-400 flex justify-center"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className="border border-black-nondark  p-1 px-2 text-md rounded-full flex flex-col justify-center  items-center"
            >
              {format(day, "dd")}
              <div className="flex justify-center items-center gap-0.5">
                {pointers.map((pointers, index) => (
                  <img width={5} src={pointers} key={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar

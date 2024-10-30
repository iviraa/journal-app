import React from "react";
import { gradients } from "@/utils/gradients";
import { baseRating, data } from "@/utils/data";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const demoData = {
  15: 2,
  16: 4,
  17: 1,
  18: 3,
  19: 2,
  20: 2,
  21: 4,
  22: 1,
  23: 3,
  24: 5,
  27: 5,
};

export default function Calendar(props) {
  const { demo } = props;
  const year = 2024;
  const month = "October";
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
  const firstDayofMonth = monthNow.getDay();
  const daysInMonth = new Date(
    year,
    Object.keys(months).indexOf(month) + 1,
    0
  ).getDate();

  const daystoDisplay = firstDayofMonth + daysInMonth;
  const numRows = Math.floor(daystoDisplay / 7) + (daystoDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
      {[...Array(numRows).keys()].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className=" grid grid-cols-7 gap-1">
            {dayList.map((dayofWeek, dayofWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayofWeekIndex - (firstDayofMonth - 1);
              let dayDisplay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayofWeekIndex < firstDayofMonth
                  ? false
                  : true;

              let isToday = dayIndex === now.getDate();

              if (!dayDisplay) {
                return <div className=" bg-white" key={dayofWeekIndex}></div>;
              }

              let color = demo
                ? gradients.blue[baseRating[dayIndex]]
                : dayIndex in demoData
                ? gradients.blue[demoData[dayIndex]]
                : "white";

              return (
                <div
                  style={{ background: color }}
                  className={
                    " text-xs sm:text-sm border border-solid p-4 flex items-center rounded-lg justify-between gap-2 " +
                    (isToday ? "border-sky-800 " : "border-sky-200") +
                    (color === "white" ? " text-sky-800" : " text-white ")
                  }
                  key={dayofWeekIndex}
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

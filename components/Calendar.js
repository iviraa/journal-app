"use client";
import React, { useState } from "react";
import { gradients } from "@/utils/gradients";
import { baseRating } from "@/utils/data";
import { Fugaz_One } from "next/font/google";

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
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Calendar({ completeData, demo }) {
  console.log(completeData);

  console.log("this is inside calendar prop", completeData);

  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currMonth]
  );

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);

  console.log(completeData, selectedYear, numericMonth);

  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  console.log("month data", completeData?.[selectedYear]?.[numericMonth]);

  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayofMonth = monthNow.getDay();
  //might be selectedmonth instead of months in this keys
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daystoDisplay = firstDayofMonth + daysInMonth;
  const numRows = Math.floor(daystoDisplay / 7) + (daystoDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 my-4">
        <button className=" mr-auto" onClick={() => handleIncrementMonth(-1)}>
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={
            " text-center text-lg text-sky-800 capitalized " + fugaz.className
          }
        >
          {selectedMonth},{selectedYear}
        </p>
        <button className=" ml-auto" onClick={() => handleIncrementMonth(1)}>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className=" grid grid-cols-7 gap-1 ">
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
                  : dayIndex in data
                  ? gradients.blue[data[dayIndex]]
                  : "white";

                return (
                  <div
                    style={{ background: color }}
                    className={
                      " text-xs sm:text-sm border border-solid p-4 flex items-center rounded-lg justify-between gap-2 " +
                      (isToday
                        ? "border-sky-700 border-2 "
                        : "border-sky-400") +
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
    </div>
  );
}

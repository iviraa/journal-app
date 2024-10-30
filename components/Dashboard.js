import { Fugaz_One } from "next/font/google";
import React from "react";
import Calendar from "./Calendar";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const statuses = {
    num_days: 2,
    next_day_in: "8:20:31",
    date: new Date().toDateString(),
  };

  const moods = {
    happy: "😍",
    sad: "😔",
    excited: "😁",
    confused: "😭",
    angry: "😤",
  };

  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12">
      <div className=" grid grid-cols-3 bg-sky-100 text-sky-800 rounded-xl">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="p-4 flex flex-col gap-1 sm:gap-2">
              <p className="uppercase font-bold text-xs sm:text-sm text-center truncate ">
                {status.replaceAll("_", " ")}
              </p>
              <p
                className={
                  " text-base sm:text-lg text-center truncate " +
                  fugaz.className
                }
              >
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          " text-4xl sm:text-5xl md:text-6xl text-center " + fugaz.className
        }
      >
        How do you
        <span className="textGradient "> feel</span> today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4 justify-around ">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              key={moodIndex}
              className=" p-4 rounded-2xl duration-200 blueShadow bg-sky-100 hover:bg-[#7ab2d3] items-center gap-2 "
            >
              <p className=" text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>{" "}
              <p className={" text-sky-800 " + fugaz.className}>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calendar />
    </div>
  );
}

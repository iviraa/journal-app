"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Login from "./Login";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();


  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;

    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day].value;

          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }
    return {
      num_days: total_number_of_days,
      average_mood: Math.round(
        total_number_of_days === 0 ? 0 : sum_moods / total_number_of_days
      ),
    };
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood) {
    const day = now.getDate();
    console.log(day);
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = {
        value: mood,
        journalTitle: newData[year][month][day]?.journalTitle || "",
        journalEntry: newData[year][month][day]?.journalEntry || "",
      };

      const currentDayValue = newData[year][month][day];

      console.log("currentDayValue", currentDayValue);

      setData(newData);
      console.log("the new value of", data);

      setUserDataObj(newData);

      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: currentDayValue,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  const moods = {
    devastated: "😔",
    sad: "😓",
    meh: "🫤",
    happy: "😁",
    elated: "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }

    setData(userDataObj);

    console.log("the value of", data);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

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
                {status === "num_days" ? "🔥" : ""}
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
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleSetMood(currentMoodValue);
              }}
              key={moodIndex}
              className=" p-4 rounded-2xl duration-200 blueShadow bg-sky-100 hover:bg-[#7ab2d3] items-center gap-2 "
            >
              <p className=" text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
              <p className={" text-sky-800 " + fugaz.className}>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

import { Fugaz_One } from "next/font/google";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Loading from "./Loading";
import Link from "next/link";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Journal() {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});

  const [journalEntryExists, setJournalEntryExists] = useState("");
  const [titleExists, setTitleExists] = useState("");
  const [moodExists, setMoodExists] = useState(0);

  const now = new Date();

  const [thisDay, setThisDay] = useState(now.getDate());
  const [thisMonth, setThisMonth] = useState(now.getMonth());
  const [thisYear, setThisYear] = useState(now.getFullYear());

  const moods = ["😔", "😓", "🫤", "😁", "😍"];

  useEffect(() => {
    const selectedDayInfo = JSON.parse(localStorage.getItem("selectedDayInfo"));
    console.log("selectedDayInfo", selectedDayInfo);

    setThisDay(selectedDayInfo.day);
    console.log("thisDay", thisDay);
    setThisMonth(selectedDayInfo.month);
    console.log("thisMonth", thisMonth);
    setThisYear(selectedDayInfo.year);
    console.log("thisYear", thisYear);
  }, [thisDay, thisMonth, thisYear]);

  // Function to handle journal entry submission
  async function handleSetJournalEntry(title, entry) {
    const day = thisDay;
    const month = thisMonth;
    const year = thisYear;

    try {
      const newData = { ...userDataObj };
      console.log("button has been clicked", newData);

      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = {
        value: newData[year][month][day]?.value || 0,
        journalTitle: title,
        journalEntry: entry,
      };

      const currentDayValue = newData[year][month][day];

      console.log("currentDayValue", currentDayValue);
      setJournalEntryExists(currentDayValue?.journalEntry);
      setTitleExists(currentDayValue?.journalTitle);
      setMoodExists(currentDayValue?.value);

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

  useEffect(() => {
    const day = thisDay;
    const month = thisMonth;
    const year = thisYear;

    const newData = { ...userDataObj };
    console.log("userDataObj", userDataObj);
    console.log("button has been clicked", newData);

    console.log("newData", newData);
    console.log(thisDay, thisMonth, thisYear);
    const currentDayValue = newData[thisYear][thisMonth][thisDay];

    setJournalEntryExists(currentDayValue?.journalEntry);
    setTitleExists(currentDayValue?.journalTitle);
    setMoodExists(currentDayValue?.value);

    console.log("currentDayValue", currentDayValue);
    console.log("journalEntryExists", journalEntryExists);
    console.log("titleExists", titleExists);
    console.log("moodExists", moodExists);
  }, [userDataObj, thisDay, thisMonth, thisYear, journalEntryExists, titleExists, moodExists]);

  useEffect(() => {
    setData(userDataObj);

    console.log("current user", currentUser);
    console.log("user data obj after 1", userDataObj);

    console.log("title", title);
    console.log("entry", entry);
    console.log("data", data);
  }, [userDataObj, title, entry, data, currentUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="  bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      {journalEntryExists && titleExists ? (
        <div className=" mx-auto">
          <h1
            className={
              "text-2xl font-bold text-center mb-8 pb-8 " + fugaz.className
            }
          >
            <span className=" text-gray-600 ">
              Your daily journal on {thisDay},{thisMonth},{thisYear}{" "}
            </span>
          </h1>
          <div className=" flex flex-row justify-around p-4 rounded-2xl ">
            <div className={" text-3xl  textGradient mb-1 " + fugaz.className}>
              Title : {titleExists}
            </div>
            <div
              className={
                " text-3xl  flex flex-row justify-center m-1 " + fugaz.className
              }
            >
              <p className=" textGradient ">
                {" "}
                {moodExists === 0 ? "" : "Mood"}
              </p>{" "}
              {moodExists === 0 ? "" : moods[moodExists - 1]}
            </div>
          </div>
          <div className="p-4 flex mt-6 rounded-2xl bg-gray-100 border-4  border-sky-800 ">
            <div className={" text-xl  mb-1 " + fugaz.className}>
              {journalEntryExists}
            </div>
          </div>
          <div className="flex w-full max-w-[350px] mx-auto m-6 items-center justify-center">
            <Link href="/dashboard">
              <button
                className={
                  " rounded-full overflow-hidden border-2 border-solid border-sky-800 duration-200 hover:opacity-60 " +
                  " text-white bg-sky-800 "
                }
              >
                <p
                  className={
                    " px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 " +
                    fugaz.className
                  }
                >
                  Go to Dashboard
                </p>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <h1
            className={
              "text-4xl font-bold text-center mb-8 pb-8 " + fugaz.className
            }
          >
            <span className="textGradient">Journal Entry</span>
          </h1>

          <div className="space-y-6">
            <div>
              <label
                className={
                  "block text-xl text-center textGradient mb-1 " +
                  fugaz.className
                }
              >
                Title
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What best describes your thoughts?"
              />
            </div>
            <div>
              <label
                className={
                  "block text-xl text-center textGradient mb-1 " +
                  fugaz.className
                }
              >
                Entry
              </label>
              <textarea
                required
                className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                rows={10}
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="What are you proud of accomplishing today?"
              />
            </div>
            <div className="flex w-full max-w-[350px] mx-auto items-center justify-center">
              <button
                onClick={() => handleSetJournalEntry(title, entry)}
                className={
                  " rounded-full overflow-hidden border-2 border-solid border-sky-800 duration-200 hover:opacity-60 " +
                  " text-white bg-sky-800 "
                }
              >
                <p
                  className={
                    " px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 " +
                    fugaz.className
                  }
                >
                  Submit
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

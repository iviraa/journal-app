import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calendar from "./Calendar";
import Link from "next/link";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="py-2 md:py-4 flex flex-col gap-2 sm:gap-6">
      <h1
        className={
          " text-2xl sm:text-3xl md:text-4xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Brief</span> lets you capture your life,
        one <span className="textGradient">moment</span> at a time!
      </h1>
      <p className=" texl-base sm:text-lg md:text-xl text-center w-full max-w-[600px] mx-auto ">
        Life moves fast, but journaling helps you slow down. Spend a few minutes
        each day writing, and discover insights that{" "}
        <span className="font-bold">help you grow.</span>
      </p>
      <CallToAction />
      <Calendar demo />
    </div>
  );
}

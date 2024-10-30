import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1
        className={
          " text-4xl sm:text-5xl md:text-6xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Brief</span> lets you capture your life,
        one <span className="textGradient">moment</span> at a time!
      </h1>
      <p className=" texl-lg sm:text-xl md:text-2xl text-center w-full max-w-[600px] mx-auto ">
        Life moves fast, but journaling helps you slow down. Spend a few minutes
        each day writing, and discover insights that{" "}
        <span className="font-bold">help you grow.</span>
      </p>
      <div className=" grid grid-cols-2 gap-4 w-fit mx-auto">
        <Button text="Log In" />
        <Button text="Sign Up" fill />
      </div>
    </div>
  );
}

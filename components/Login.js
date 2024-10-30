import { Fugaz_One, Lato } from "next/font/google";
import React from "react";
import Button from "./Button";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const lato = Lato({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 ">
      <h3 className={" text-3xl sm:text-4xl md:text-5xl " + fugaz.className}>
        Login
      </h3>
      <p className=" font-semibold">You're one step away!</p>
      <input
        className=" w-full mx-auto max-w-[350px] px-4 py-2 sm:py-3  rounded-full border-2 border-solid border-sky-600 duration-200 hover:border-sky-800 focus:border-sky-950 outline-none"
        placeholder="Email"
      />
      <input
        className=" w-full mx-auto max-w-[350px] px-4 py-2 sm:py-3  rounded-full border-2 border-solid border-sky-600 duration-200 hover:border-sky-800 focus:border-sky-950 outline-none "
        placeholder="Password"
      />
      <div className="flex w-full max-w-[350px] mx-auto items-center justify-center">
        <Button text="Login" full />
      </div>
      <p className="text-center ">
        Don't have an account? <span className=" text-sky-800">Sign Up</span>
      </p>
    </div>
  );
}

"use client";
import { Fugaz_One, Lato } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const lato = Lato({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("Registering a new user");
        await signup(email, password);
      } else {
        console.log("Logging in an existing user");
        await login(email, password);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 ">
      <h3 className={" text-3xl sm:text-4xl md:text-5xl " + fugaz.className}>
        {isRegister ? "Sign Up" : "Log In"}
      </h3>
      <p className=" font-semibold">You&apos;re one step away!</p>
      <input
        className=" w-full mx-auto max-w-[350px] px-4 py-2 sm:py-3  rounded-full border-2 border-solid border-sky-600 duration-200 hover:border-sky-800 focus:border-sky-950 outline-none"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className=" w-full mx-auto max-w-[350px] px-4 py-2 sm:py-3  rounded-full border-2 border-solid border-sky-600 duration-200 hover:border-sky-800 focus:border-sky-950 outline-none "
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex w-full max-w-[350px] mx-auto items-center justify-center">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting..." : "Submit"}
          full
        />
      </div>
      <p className="text-center ">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className=" text-sky-800"
        >
          {isRegister ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

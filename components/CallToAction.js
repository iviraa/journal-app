"use client";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";
import Link from "next/link";
import React from "react";

export default function CallToAction() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="max-w-[600px] w-fit mx-auto">
        <Link href={"/dashboard"}>
          <Button dark fill text="Get Started" />
        </Link>
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href="/dashboard">
        <Button text="Log In" />
      </Link>
      <Link href="/dashboard">
        <Button text="Sign Up" fill />
      </Link>
    </div>
  );
}

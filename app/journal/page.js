import Journal from "@/components/Journal";
import Main from "@/components/Main";
import React from "react";

export const metadata = {
  title: "Brief | Journal",
};

export default function JournalPage() {
  return (
    <Main>
      <Journal />
    </Main>
  );
}

import { Fugaz_One, Inter, Lato, Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";
import { BsJournal } from "react-icons/bs";
import diary from "../public/diary.png";
import Image from "next/image";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

export const metadata = {
  title: "Brief",
  description: "A journaling app that lets you know everything about your day!",
};

export default function RootLayout({ children }) {
  const header = (
    <div className="p-4 sm:p-8 items-center justify-between flex gap-4">
      <Link href="/">
        <h1 className={" text-base textGradient sm:text-lg flex lfex-row items-center " + fugaz.className}>
          <b>Brief</b>
      
          <Image src={diary} alt="diary" width={20} height={20} className="ml-2" />
        </h1>
      </Link>
      <Logout />
    </div>
  );

  const footer = (
    <div className="p-4 sm:p-8 flex items-center ">
      <h1
        className={
          " text-sky-800 text-base sm:text-lg mx-auto " + fugaz.className
        }
      >
        Made with 💙
      </h1>
    </div>
  );

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={
            "w-full max-w-[600px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 " +
            lato.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}

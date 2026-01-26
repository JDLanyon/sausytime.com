import Image from "next/image";

import "@/app/globals.css";
import Button from "./button";


export default function Hero() {
  return (
    <div id="hero" className="flex flex-col items-center h-full p-8 gap-8 text-center z-1">
      <Image
        className="invert mx-auto light:invert-0"
        src="/lotus.svg"
        width={256}
        height={256}
        alt="lotus"
      />
      {/* <h1 className="!font-[family-name:var(--font-doto)]">Home of epic B)</h1> */}
      <p className="z-1 text-[--var(secondary)]">Thanks for visiting my portfolio, start exploring with the options below!</p>
      <div className="z-1 flex gap-4 items-center flex-col md:flex-row">
        <Button text="About" href="/about"/>
        <Button text="Programming" href="/programming"/>
        <Button text="Motion Graphics" href="/motion_graphics"/>
      </div>
    </div>
  )
}

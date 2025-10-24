"use client"

import Button from "./components/button";
import Footer from "./components/footer";
import Hero from "./components/hero";


export default function Home() {

  return (
    <div className="h-screen w-screen relative">
      <img
          className={`hidden lg:block w-full h-full bg-cover absolute z-0 invert dark:invert-0`}
          src="/BG_1920.gif"
          width={1920}
          height={1080}
          alt="lotus"
        />
        {/* mobile BG */}
        <img
          className="block lg:hidden w-full h-full bg-cover absolute z-0 invert dark:invert-0"
          src="/BG_768.gif"
          width={1920}
          height={1080}
          alt="lotus"
        />
      <div className="grid items-center justify-items-center h-screen p-8 gap-16 z-0">
        <main className="flex flex-col gap-8 items-center text-center">
          <Hero />
          <div className="pt-16 flex gap-4 items-center flex-col md:flex-row">
            <Button text="About" href="/about"/>
            <Button text="Programming" href="/programming"/>
            <Button text="Motion Graphics" href="/motion_graphics"/>

          </div>
        </main>
      </div>
      <Footer home_page={true}/>
    </div>
  );
}

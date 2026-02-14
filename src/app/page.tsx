/* eslint-disable @next/next/no-img-element */
'use client'


import Image from 'next/image';
import Link from 'next/link';


import '@/app/globals.css';
import Button from '@/app/components/button';
import Footer from '@/app/components/footer';
import TypeWriter from '@/app/components/typewriter';
import { Glitch } from '@/app/components/glitch/glitch';
import { GlitchLink } from '@/app/components/glitch/glitch_link';
import GlitchText from './components/glitch';
export default function Home() {
  const services = [
    "build a moving website",
    "explore your brand's visual identity",
    "create stream interactions with the use APIs",
    "build custom bots for further community engagement",
    "establish a style guide and theme that represents your work",
    "design spicy stream stingers and transitions",
    "ideate and iteratively forge social branding assets",
    "communicate with transparency during development to deploy a clean and relatable product"
  ]
  const names = [
    "Sausytime",
    "JDLanyon",
    "Jackson",
  ]

  return (
    // scroll container – fills viewport and enables vertical snap scrolling
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* background */}
        <div className="absolute inset-0 -z-10">
          <Image
            className="hidden lg:block object-cover"
            src="/BG_1920.gif"
            alt="lotus background desktop"
            fill
          />
          <Image
            className="block lg:hidden object-cover"
            src="/BG_768.gif"
            alt="lotus background mobile"
            fill
          />
        </div>
      
      {/* hero section – full viewport and snaps to start */}
      <section className="relative h-screen snap-start">
        {/* Hero content – vertically & horizontally centred */}
        <div className="flex flex-col items-center justify-center h-full p-8 gap-8 text-center relative z-10">
          <h3>Thanks for visiting my <strong>designer</strong> portfolio, My name's{' '}
            <GlitchText duration={4000} delay={1000} variance={1000} names={names} />{' '}
            and together we can</h3>
          <TypeWriter headings={services} />
          <Image
            className='invert mx-auto light:invert-0'
            src='/lotus.svg'
            width={256}
            height={256}
            alt='lotus'
          />
          <div className='*:py-2'>
            <p>My professional portfolio can be found at <GlitchLink href="https://jdlanyon.dev">jdlanyon.dev</GlitchLink></p>
            <p>feel free to <GlitchLink href="/contact">reach out</GlitchLink> and <GlitchLink href="/about">learn about my process!</GlitchLink> &lt;3</p>
            <div className='z-1 flex flex-col items-center justify-center md:flex-row'>
              <Button text='About' href='/about'/>
              <Button text='Programming' href='/programming'/>
              <Button text='Motion Graphics' href='/motion_graphics'/>
            </div>
            {/* <p className='z-1 text-[--var(secondary)]'>programming is an artform</p> */}
          </div>
        </div>
      </section>

      {/* 3. Additional full-screen sections (add as many as you need) */}
      <section className="h-screen snap-start">
        {/* Your next section content */}
      </section>

      <section className="h-screen snap-start">
        {/* Another section */}
      </section>

      {/* 4. Footer as its own full-screen snap section (or embed inside the last section) */}
      <section className="h-screen snap-start relative">
        <Footer landingPage={true} />
      </section>
    </div>
  );
}

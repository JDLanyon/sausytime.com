/* eslint-disable @next/next/no-img-element */
'use client'


import Image from 'next/image';

import '@/app/globals.css';
import Button from '@/app/components/button';
import Footer from '@/app/components/footer';
import TypeWriter from '@/app/components/typewriter';
import { Glitch } from '@/app/components/glitch/glitch';
import { GlitchLink } from '@/app/components/glitch/glitch_link';


export default function Home() {
  const services = [
    'build a moving website',
    'explore your brand\'s visual identity',
    'create stream interactions with the use APIs',
    'build custom bots for further community engagement',
    'establish a style and theme that represents your work',
    'design spicy stream stingers and transitions',
    'ideate and iteratively design social branding assets',
    'communicate with transparency during development to deliver relatable clean visuals',
    'blur the line between software development and visual communication'
  ]
  const names = [
    'Sausytime',
    'JDLanyon',
    'Jackson'
  ]

  return (
    // scroll container – fills viewport and enables vertical snap scrolling
    <div className='h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth'>
        {/* background */}
        <div className='absolute inset-0 -z-10'>
          <Image
            className='hidden lg:block object-cover light:invert'
            src='/BG_1920.gif'
            alt='lotus background desktop'
            fill
          />
          <Image
            className='block lg:hidden object-cover light:invert'
            src='/BG_768.gif'
            alt='lotus background mobile'
            fill
          />
        </div>
      
      {/* first section - landing page */}
      <section className='relative flex flex-col h-full items-center text-center snap-start'>
        {/* hero */}
        <h3 className='py-16'>Thank you for taking the time to visit my <strong>designer</strong> portfolio!</h3>
        <h3 className='pb-2'>My name's{' '}
        <Glitch names={names} />
        {' '}and together we'll be able to:</h3>
        <TypeWriter headings={services} />
        {/* lotus :> */}
        <Glitch duration={3000} delay={16000}>
          <Image
            className='invert mx-auto light:invert-0'
            src='/lotus.svg'
            width={256}
            height={256}
            alt='lotus'
          />
        </Glitch>
        <div className='z-1 flex flex-row flex-wrap items-center justify-center gap-2 py-4 whitespace-nowrap'>
          <Button text='About' href='/about'/>
          <Button text='Programming' href='/programming'/>
          <Button text='Motion Graphics' href='/motion_graphics'/>
        </div>
        {/* <p>My professional portfolio can be found at <GlitchLink href='https://jdlanyon.dev'>jdlanyon.dev</GlitchLink></p> */}
        <p>Please feel free to <GlitchLink href='/contact'>reach out</GlitchLink> and <GlitchLink href='/about'>learn about my process!</GlitchLink> &lt;3</p>
        {/* <p className='z-1 text-[--var(secondary)]'>programming is an artform</p> */}
      <Footer landingPage={true} />
      </section>

      <section className='relative h-screen snap-start'>
        <div className='flex flex-col items-center justify-center h-full p-8 gap-8 text-center relative z-10'>
          <p>as you may see there is still much to do here, stay tuned for updates! 😁</p>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from 'next/link'

import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";


export default function About() {
  const photos = ['selfie.jpg', 'road.jpeg', 'moon.jpg', 'seat.jpeg'];
  return (
    <section className="min-h-screen flex flex-col">
      <Nav />
      <div id="content" className="m-16 px-8 py-12 lg:px-32 grow">

        <div className="flex flex-row-reverse items-start justify-items-center">
          <div id="photos" className="w-full flex-col flex-1 gap-8 space-y-4">
            {photos.map((image) => (
              <Image
                key={image}
                className="mx-auto w-full"
                src={`/photos/${image}`}
                // layout="contain"
                width={1000}
                height={1000}
                // sizes="100vw"
                // style={{ width: '100%', height: 'auto' }} // optional
                alt={`Photo ${image}`}
              />
            ))}
          </div>

          <div className="w-full lg:flex-4 md:flex-2 float-left">
              
              <h1>What is this website</h1>
              <p>Welcome to my designer portfolio, aiming to showcase my visual talent. I'm currently working on a developer portfolio while in my final year at QUT.</p>
              <p>This is my first real production project outside of uni, designed with responsive and minimal design in mind, built with Next.js, deployed with cloudflare and self hosted!. More details can be found
                {' '}<Link href={`/programming/portfolio`} passHref className="underline hover:underline-offset-4 text-(--secondary)">here</Link>!</p>
              
              <h1>Who am I?</h1>
              <p>I'm Jackson Lanyon, a massive advocate for self expression combining several disciplines to create immersive visuals.</p>

              <h2>Lotus imagery</h2>
              <p>This flower is something I highly resonate with, blooming after growing through 2 metres of mud.</p>
              
              <h2>Education</h2>
              <p>Currently I&apos;m in my final year studying a <b>Bachelor of Interactive Environments at QUT</b>. Outside of study my focus is on motion graphics and recreational programming.</p>
              
              <h2>Interests</h2>
              <ul>
                <li>Programming</li>
                <li>Early morning bike rides & calisthenics</li>
                <li>Vibing to music</li>
                <li>Gaming</li>
                <li>My core interest in software development came from Minecraft shaping a significant part of my childhood.</li>
              </ul>
              {/* <h2>Goals and ambition</h2> */}


              <h1>What I do</h1>
              <p>There&apos;s something truly nice about viewing programming as an artform and I hope to showcase that in time with high effort video editing.</p>
              <p>Anything from <b>Motion Graphics</b>, <b>Game development</b>, <b>Web Development</b> and <b>Graphic design</b> are where my skills lay</p>
              <br/>
              <p>Currently I'm working on a developer portfolio, completing uni and another real world project 👀</p>
              <h2>Resume</h2>
              <p>Please visit my <Link
                className="underline hover:underline-offset-4 text-(--secondary)"
                href="https://www.linkedin.com/in/jdlanyon/"
                target="_blank"
                rel="noopener noreferrer"
                >LinkedIn</Link>.
              </p>
              <br/>
              <br/>
              <br/>
              <p>This site is continuously being developed and as a result there&apos;s <Link
                className="underline hover:underline-offset-4 text-(--secondary)"
                href="https://github.com/JDLanyon/sausytime.com/issues"
                target="_blank"
                rel="noopener noreferrer"
                >only a few things missing</Link>, if there&apos;s any feedback or suggestions your have lease don&apos;t hesitate to contact me at <Link
                className="underline hover:underline-offset-4 text-(--secondary)"
                href="mailto:jssdl@protonmail.com?subject=Portfolio%20feedback&body=Hi Jackson,<br/><br/>I%20was%20looking%20at%20your%20site"
                target="_blank"
                rel="noopener noreferrer"
                >jssdl@protonmail.com</Link></p>
          </div>
        </div>

      </div>
      <Footer />
    </section>
  );
}

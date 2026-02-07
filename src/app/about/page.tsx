import Image from "next/image";
import Link from 'next/link'

import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";


export default function About() {
  return (
    <section className="min-h-screen flex flex-col">
      <Nav />
      <div id="content" className="px-8 py-12 lg:px-32 grow">

        <div className="grid grid-cols-1 md:grid-cols-6 items-start justify-items-center p-8 gap-8">
          <Image
              className="mx-auto w-full col-span-6 md:row-1 md:col-span-3 md:col-start-4 lg:col-span-2 lg:col-start-5"
              src="/Me.jpg"
              // layout="contain"
              width={1000}
              height={1000}
              // sizes="100vw"
              // style={{ width: '100%', height: 'auto' }} // optional
              alt="Photo of me"
            />
            <div className="w-full col-span-6 float-left md:row-1 md:col-start-1 md:col-span-3 md:col-end-4 lg:col-span-4">
              <h1>Hey o/</h1>
              <p>I&apos;m Jackson Lanyon, an advocate of expression through multimedia, combining several skills to give immersive interaction.</p>
              <p>This site is built with Next.js with responsive minimal design in mind. More details can be found <Link href={`/programming/portfolio`} passHref className="font-bold underline">here!</Link></p>
              <br />

              <h1>Who I am</h1>
              <h2>What's with the lotus?</h2>
              <p>A lotus can grow in difficult conditions, it's a flower that blossoms after growing through mud and water and is something I heavily resonate with.</p>
              
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
              <p>There&apos;s something truly nice about viewing programming as an artform and I hope to eventually represent that through various means.</p>
              <p>This includes anything from <b>Motion Graphics</b>, <b>Game development</b>, <b>Web Development</b>, <b>Graphic design</b> and hopefully more in the future!</p>
              <br/>
              <h2>Resume</h2>
              <p>My resume can curently be found on <Link
                className="hover:underline hover:underline-offset-4 text-(--secondary)"
                href="https://www.linkedin.com/in/jdlanyon/"
                target="_blank"
                rel="noopener noreferrer"
                >LinkedIn</Link>.
              </p>
              <br/>
              <p>This site is continuously being developed and as a result there&apos;s still things missing, if there&apos;s any feedback or suggestions your have lease don&apos;t hesitate to contact me at <a href="mailto:jlany9@hotmail.com?subject=Portfolio%20feedback&body=Hi Jackson,<br/><br/>I%20was%20looking%20at%20your%20site," className="font-bold underline">email</a>:&gt;</p>
            </div>
          </div>

        </div>
      <Footer />
    </section>
  );
}

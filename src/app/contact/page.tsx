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

              <h1 className='animate-idle crt-curvature relative overflow-visible'>
                Heyo o/
                {/* Subtle noise overlay */}
                <span className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px',
                    mixBlendMode: 'overlay'
                  }}
                />
              </h1>

              <br/>
              <p>This site is continuously being developed, there will be info here soon :)</p>
            </div>
          </div>

        </div>
      <Footer />
    </section>
  );
}

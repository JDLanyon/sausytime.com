import Image from "next/image";
import Link from "next/link";
import React from "react";

import { PanelsFromData } from "../components/panel";
import { PROGRAMMING } from "../project_data"
import Button from "../components/button";
import Footer from "../components/footer";
import Nav from "../components/nav";


export default function Programming() {
  return (
    <section className="min-h-[100vh] flex flex-col">
      <Nav />
        <div id="content" className="px-32 py-8 mt-16">

          <div className="flex gap-4 w-full mx-auto items-center justify-center">
            <Button text="Uni Projects" href="#uni" />
          </div>

          <PanelsFromData id="uni" path="/programming/uni" heading="Uni Projects" data={PROGRAMMING.UNI} />
          {/* <PanelsFromData heading="Uni Projects" thumbnails_path="/programming/uni_revisited/" data={PROGRAMMING.UNI_REVISITED} /> */}

        </div>
      <Footer />
    </section>
  );
}

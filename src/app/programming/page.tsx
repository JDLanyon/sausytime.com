import React from "react";

import GeneratePanels from "@/app/components/panel";
import { PROGRAMMING } from "@/app/project_data"
import Button from "@/app/components/button";
import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";


export default function Programming() {
  return (
    <section className="min-h-screen flex flex-col">
      <Nav />
        <div id="content" className="mx-8 md:mx-16 lg:mx-32 py-8 mt-8">
          <div className="flex gap-4 w-full mx-auto items-center justify-center">
            <Button text="Uni Projects" href="#uni" />
          </div>
          <h2 id="uni">Uni Projects</h2>
          <GeneratePanels path="/programming/uni" panel_data={PROGRAMMING.UNI} />
        </div>
      <Footer />
    </section>
  );
}

import { MOTION_GRAPHICS } from "../project_data"
import Link from "next/link";
import Image from "next/image";

import Button from "../components/button";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Panel, {PanelsFromData} from "../components/panel";



export default function MotionGraphics() {
  return (
    <section className="min-h-[100vh] flex flex-col">
      <Nav />
      <div id="content" className="px-32 py-8 mt-16">

          <div className="flex gap-4 w-full mx-auto items-center justify-center">
            <Button text="Snippets" href="#snippets" />
            <Button text="Full Projects" href="#full-projects" />
          </div>

        {/* <Panels heading="Snippets" category={MG_SNIPPETS} />
        <Panels heading="Full Projects" category={MG_FULL_PROJECTS} /> */}

        {/* TODO: Replace the project_data.tsx with dynamically searching in /public/ */}

        <PanelsFromData id="snippets" heading="Snippets" path="/motion_graphics/snippets" data={MOTION_GRAPHICS.SNIPPETS} />
        <PanelsFromData id="full-projects" heading="Full Projects" path="/motion_graphics/full_projects" data={MOTION_GRAPHICS.FULL_PROJECTS} />
        
      </div>
      <Footer />
    </section>
  );
}

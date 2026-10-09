import Link from "next/link";
import { PanelGrid, Button, Footer, Nav } from "@jdlanyon/lotus-library/react";
import { MOTION_GRAPHICS } from "@/app/project_data"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motion Graphics - Sausytime Portfolio",
  description: "Explore motion graphics projects including snippets and full video projects by Sausytime.",
};

export default function MotionGraphics() {
  return (
    <section className="min-h-screen flex flex-col">
      <Nav />
      <div id="content" className="px-32 py-8 mt-16">
        <div className="flex gap-4 w-full mx-auto items-center justify-center">
          <Button text="Snippets" href="#snippets" />
          <Button text="Full Projects" href="#full_projects" />
        </div>
        <h2 id="snippets">Snippets</h2>
        <PanelGrid
          basePath="/motion_graphics/snippets"
          thumbnailPath="/motion_graphics/snippets"
          thumbnailDefaultsId
          linkComponent={Link}
          panels={MOTION_GRAPHICS.SNIPPETS}
        />
        <h2 id="full_projects">Full Projects</h2>
        <PanelGrid
          basePath="/motion_graphics/full_projects"
          thumbnailPath="/motion_graphics/full_projects"
          thumbnailDefaultsId
          linkComponent={Link}
          panels={MOTION_GRAPHICS.FULL_PROJECTS}
        />
      </div>
      <Footer />
    </section>
  );
}

import Image from "next/image";

import Button from "@/app/components/button";
import Modal, { Embed, LocalVideo } from "@/app/components/modal";

import { SiGithub } from "@icons-pack/react-simple-icons";


// TODO: Props
export default async function Project() {
  return (
      <div>
        {/* <div className="flex absolute left-4 top-4 transform">
          <Button text="View on GitHub" href="" target_blank><SiGithub /></Button>
        </div> */}
        <h1 className="text-center m-0 mb-8">Slime Arcade</h1>

        <div className="text-center my-2">
          <b><p>*volume warning* - check volume before playing.</p>
          <p>*epilepsy warning* - flashing images.</p></b>
          <Embed uuid="j9XfWkBNZXA"/>
        </div>
        {/* TODO: write more on this shi */}
        <p className="text-center my-8">More information coming soon {":>"}</p>
      </div>
  )
}
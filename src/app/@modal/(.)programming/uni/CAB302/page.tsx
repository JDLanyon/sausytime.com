import Image from "next/image";
import { Modal } from "@/app/components/modal";
import { Embed, LocalVideo } from "@/app/components/modal_elements";
import Button from "@/app/components/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

// TODO: Props
export default async function Project() {
  return (
    <Modal>
      <div>
        <div className="flex absolute left-4 top-4 transform">
          <Button text="View on GitHub" href="https://github.com/JDLanyon/IFB399_BeeAware_Hive_Inspections" target_blank><SiGithub /></Button>
        </div>
        <h1 className="text-center m-0 mb-8">Task Tank</h1>

        <div className="flex flex-wrap *:p-2">
          <Image
            className="w-1/3"
            src="/programming/uni/CAB302/tank-scene.png"
            width={1000}
            height={1000}
            alt="panel thumbnail"
          />
          <div className="w-2/3">
            <h2>The Team</h2>
            <p>This project took a solid 6 weeks of commitment by the following individuals;</p>
            <br/>
            <ul>
              <li><Link href="https://github.com/ashley-johnsonn" target="_blank" className="font-bold underline">Ashley Johnsonn</Link></li>
              <li><Link href="https://github.com/Hudson-Grosskopf" target="_blank" className="font-bold underline">Hudson Grosskopf</Link></li>
              <li><Link href="https://github.com/mateobr1706" target="_blank" className="font-bold underline"> mateobr1706</Link></li>
              <li><Link href="https://github.com/yoghurt25" target="_blank" className="font-bold underline">Thomas (yoghurt25)</Link></li>
              <li><Link href="https://github.com/Johann-Swanepoel" target="_blank" className="font-bold underline"> Johann Swanepoel</Link></li>
              <li><Link href="https://github.com/JDLanyon" target="_blank" className="font-bold underline">and myself :)</Link></li>
            </ul>

            <br/>
            {/* TODO: add github links to everyone */}
            <p>Our Figma slides present the project much better than I could, a public view can be accessed <Link href="https://www.canva.com/design/DAG1tcwHRAA/mBKupfe7f_7sCC514worYQ/view" target="_blank" className="font-bold underline">here</Link>.</p>
            <p>I hope to expand on this very soon, for now I'm implementing GitHub Readme integration to better integrate my projects.</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
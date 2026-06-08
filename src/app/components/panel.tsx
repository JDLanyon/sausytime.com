import Image from "next/image";
import Link from "next/link";
import Tags from "@/app/components/tags";
import "@/app/globals.css";


interface PanelProps {
  id: string;
  title?: string;
  path?: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
}

interface PanelsFromDataProps {
  id? : string,
  category : string,
  sub_category?: string,
  heading? : string,
  thumbnails_path? : string,
  data : PanelProps[]
}

// the PanelProps[] datatype was big brain fr
// use GeneratePanels() instead
function PanelsFromData({id, category, sub_category, heading, thumbnails_path, data} : PanelsFromDataProps) {
  return (
    <div id={id}>
      <h2>{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min items-center justify-items-center p-8 gap-16">
      {data.map(p => (
        <Link key={`${p.id}`} href={`/${category}/${sub_category}/${p.id}`} passHref>

        {thumbnails_path ?
        <Panel id={p.id} title={p.title} description={p.description} thumbnail={`${thumbnails_path}${p.id}/${p.thumbnail ? p.thumbnail : "thumbnail.png"}`} /> :
        <Panel id={p.id} title={p.title} description={p.description} /> }

        {/* <Panel id={p.id} title={p.title} description={p.description} thumbnail={`${thumbnails_path}${p.id}/thumbnail.png`} /> */}
      </Link>
      ))}
      </div>
    </div>
  );
}

export default function GeneratePanels({path, panel_data} : {path: string, panel_data : PanelProps[]}) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 items-center justify-items-center gap-4">
    {panel_data.map(p => (
        <Link key={`${p.id}`} href={`${path}/${p.id}`} passHref>
        {/* Try to display thumbnail */}
        {p.thumbnail ?
          <Panel id={p.id} title={p.title} description={p.description} path={`${path}/${p.id}`} tags={p.tags} thumbnail={p.thumbnail} /> :
          <Panel id={p.id} title={p.title} description={p.description} path={`${path}/${p.id}`} tags={p.tags} />
        }
        </Link>
    ))}
    </div>
  );
}

export function Panel({id, title, path, thumbnail, description, tags} : PanelProps) {
  // if there's no title use id
  if (!title && id) title=id;

  console.log(`loading ${path}/${thumbnail}`)

  return (
    <div className='group break-inside-avoid w-full transition transform p-4 hover:-translate-y-1 hover:bg-(--primary) hover:text-(--background)'>
      {/* TODO: pointer cursor and trigger modal */}
      <div className='grid my-auto text-center'>
        {path ?
          <Image
          className="mx-auto w-full"
          src={thumbnail ? `${path}/${thumbnail}` : `${path}/thumbnail.png`}
          // layout="contain"
          width={1000}
          height={1000}
          // sizes="100vw"
          // style={{ width: '100%', height: 'auto' }} // optional
          alt="panel thumbnail"
          /> : null
        }
        <h2 className="py-2">{title}</h2>
        <p className="pb-4">{description}</p>
        {tags ? <Tags tags={tags} /> : null}
        {/* {tags ? <p className="bold underline">{tags[0]}</p> : null} */}

      </div>
    </div>
  );
}

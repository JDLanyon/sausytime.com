import Image from "next/image";
import Link from "next/link";

import "../globals.css";


interface PanelProps {
  id: string;
  title?: string;
  path?: string;
  thumbnail?: string;
  description?: string;
}

interface PanelsFromDataProps {
  id? : string,
  path : string,
  heading? : string,
  data : PanelProps[]
}

const imageExists = async (path : string) => {
  return await fetch(`/${path}`, {
    method: "HEAD",
  });
};

// the PanelProps[] datatype was big brain fr
export function PanelsFromData({id, path, heading, data} : PanelsFromDataProps) {
  return (
    <div id={id}>
      <h2>{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-min items-center justify-items-center p-8 gap-16">
      {data.map(p => (
        <Link key={`${p.id}`} href={`${path}/${p.id}`} passHref>
        {p.thumbnail ? 
        <Panel id={p.id} title={p.title} description={p.description} path={`${path}/${p.id}`} thumbnail={p.thumbnail} /> :
        <Panel id={p.id} title={p.title} description={p.description} path={`${path}/${p.id}`} /> }
      </Link>
      ))}
      </div>
    </div>
  );
}

export default function Panel({id, title, path, thumbnail, description} : PanelProps) {
  // if there's no title use id
  if (!title && id) title=id;
  console.log(`loading ${path}/${thumbnail}`);
  // try with thumbnail
  if (path || thumbnail) {
    return (
      <div className="break-inside-avoid w-full transition transform hover:-translate-y-1 hover:bg-[var(--primary)] hover:text-[var(--background)]">
        {/* TODO: pointer cursor and trigger modal */}
        <div className="grid my-auto text-center">
            <Image
            className="mx-auto w-full"
            // try with normal thumbnail path
            src={path ? `${path}/${thumbnail}` : `${path}/thumbnail.png`}
            width={1000}
            height={1000}
            // sizes="100vw"
            // style={{ width: '100%', height: 'auto' }} // optional
            alt="panel thumbnail"
            />
          <h2 className="p-2">{title}</h2>
          <p className="p-2">{description}</p>
        </div>
      </div>
    );
  // no thumbnail or thumbnail.png
  } else {
    console.log(`could not find ${path}/${thumbnail} or ${path}/thumbnail.png, assuming no thumbnail was provided.`)
    return (
      <div className={`break-inside-avoid w-full transition transform m-4 hover:-translate-y-1 hover:bg-[var(--primary)] hover:text-[var(--background)]`}>
        {/* TODO: pointer cursor and trigger modal */}
        <div className="grid my-auto text-center">
          <h2 className="py-2">{title}</h2>
          <p className="pb-4">{description}</p>
        </div>
      </div>
    );
  }
}
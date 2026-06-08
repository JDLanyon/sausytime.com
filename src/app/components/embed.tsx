'use client'

import "@/app/globals.css";

export function Embed({uuid} : {uuid : string}) {
  return (
    <iframe className="mx-auto aspect-2/1" width="60%" src={`https://www.youtube.com/embed/${uuid}`} title="YouTube video player" allow="autoplay; clipboard-write; gyroscope; picture-in-picture; web-share" sandbox="allow-scripts allow-popups allow-presentation"></iframe>
  )
}

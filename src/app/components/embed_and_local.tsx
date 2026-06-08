'use client'

import "@/app/globals.css";

export function EmbedAndLocal({ uuid, file, thumbnail } : {uuid : string, file : string, thumbnail? : string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <iframe className="mx-auto aspect-2/1" width="100%" src={`https://www.youtube.com/embed/${uuid}`} title="YouTube video player" allow="autoplay; clipboard-write; gyroscope; picture-in-picture; web-share" sandbox="allow-scripts allow-popups allow-presentation"></iframe>
    <video className="mx-auto" width="100%" controls preload="none" aria-label="Video player" poster={thumbnail}>
      <source src={file} type="video/mp4" />
      <p>{`Your browser does not support this video :<`}</p>
    </video>
    </div>
  )
}

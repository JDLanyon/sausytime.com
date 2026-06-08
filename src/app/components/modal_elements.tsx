'use client'

import "@/app/globals.css";

export function LocalVideo({ file, thumbnail } : { file : string, thumbnail? : string }) {
  return (
    <video className="mx-auto" width="60%" controls preload="none" aria-label="Video player" poster={thumbnail}>
      <source src={file} type="video/mp4" />
      <p>{`Your browser does not support this video :<`}</p>
    </video>
  )
}

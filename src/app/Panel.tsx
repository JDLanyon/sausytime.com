import styles from './page.module.scss'
import Image from "next/image";
import { InferGetServerSidePropsType } from "next";

// TODO: https://plainenglish.io/blog/how-to-get-props-types-in-nextjs-typescript
export default function Panel({title, imgsrc} : {title: string, imgsrc : string}) {
  return (
    <div className={styles.panel}>
      <div className={styles.panel_bg}>
        <Image
          src={"/images/" + imgsrc}
          layout="fill"
          objectFit="cover"
          alt={"Background Image"}
        />
      </div>

      <div className={styles.panel_fg}>
        <h1>{title}</h1>
        <p>bro like litreily don't even @ me bro</p>
        <a>idk some link to my onlyfans</a>
        <p>image</p>
      </div>

    </div>
  )
}
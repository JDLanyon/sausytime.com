import styles from './page.module.scss'
import Image from "next/image";
import { InferGetServerSidePropsType } from "next";
import Link from 'next/link';

// TODO: https://plainenglish.io/blog/how-to-get-props-types-in-nextjs-typescript
export default function Panel({title, description, page_id, imgsrc} : {title: string, description : string, page_id : string, imgsrc : string}) {
  return (
    <div className={styles.panel}>
      <Link href={`/pages/${page_id}`}>

        {/* background image */}
        <div className={styles.panel_bg}>
            <Image
              src={"/images/" + imgsrc}
              layout="fill"
              objectFit="cover"
              alt={"Background Image"}
            />
        </div>

        {/* forground text */}
        <div className={styles.panel_fg}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

      </Link>
    </div>
  )
}
import Image from 'next/image'
import styles from './page.module.scss'
import Panel from "./Panel"

export default function Home() {
  return (
    <div className={styles.container}>
      {/* TODO: add props to Panel (background image and title) */}
      {/* TODO: style */}
      {/* TODO: reactive styling */}
      <Panel title="1" imgsrc='1.jpg'/>
      <Panel title="2" imgsrc='2.jpg'/>
      <Panel title="3" imgsrc='3.jpg'/>
    </div>
  )
}

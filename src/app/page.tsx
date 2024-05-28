import Image from 'next/image'
import styles from './page.module.scss'
import Panel from "./Panel"

export default function Home() {
  return (
    <div className={styles.container}>
      {/* TODO: add props to Panel (background image and title) */}
      {/* TODO: style */}
      {/* TODO: reactive styling */}
      <Panel title="About" description="What is this site?" page_id="about" imgsrc='1.jpg'/>
      <Panel title="Programming" description="Various projects I've written" page_id="programming" imgsrc='2.jpg'/>
      <Panel title="Motion Graphics" description="mmm... pretty..." page_id="motion_graphics" imgsrc='3.jpg'/>
    </div>
  )
}

import './navbar.scss';
import Link from 'next/link';

// TODO: https://plainenglish.io/blog/how-to-get-props-types-in-nextjs-typescript
export default function Nav() {
  return (
    <div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/pages/about">About</Link></li>
        <li><Link href="/pages/programming">Programming</Link></li>
        <li><Link href="/pages/motion_graphics">Motion Graphics</Link></li>
      </ul>
    </div>
  )
}
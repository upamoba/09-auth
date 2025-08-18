import Link from 'next/link';
import styles from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Home">NoteHub</Link>
      <nav aria-label="Main Navigation">
        <ul className={styles.navigation}>
          <li><Link href="/">Home</Link></li>
          <li><TagsMenu /></li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
import Link from 'next/link';
import styles from './SidebarNotes.module.css';

const TAGS = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <ul className={styles.menuList}>
      {TAGS.map((tag) => {
        
        const href = tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`;
        const label = tag === 'All' ? 'All notes' : tag;
        return (
          <li key={tag} className={styles.menuItem}>
            <Link href={href} className={styles.menuLink}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
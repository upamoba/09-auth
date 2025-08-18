import { ReactNode } from 'react'
import styles from './FilterLayout.module.css'

interface FilterLayoutProps {
  children: ReactNode
  sidebar: ReactNode
}

export default function FilterLayout({
  children,
  sidebar
}: FilterLayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <section className={styles.content}>{children}</section>
    </div>
  )
}
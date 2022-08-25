import styles from './Header.module.css'

export function Header() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span>to</span>do
      </h1>
    </div>
  )
}

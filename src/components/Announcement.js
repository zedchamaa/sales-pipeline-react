// styles
import styles from './Announcement.module.css';

export default function Announcement({ children, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <strong>{title}</strong>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}

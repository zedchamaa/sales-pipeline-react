// styles
import styles from './Modal.module.css';

// pages & components
import CloseIcon from './icons/CloseIcon';

export default function Modal({ children, onClick }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.iconContainer}>
          <CloseIcon
            onClick={onClick}
            stroke={'black'}
            strokeWidth={'4'}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

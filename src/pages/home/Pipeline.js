// styles
import styles from './Pipeline.module.css';

// pages & components
import NavMenu from '../../components/NavMenu';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';

export default function Pipeline() {
  return (
    <div className={styles['page-container']}>
      <div className={styles['sidebar']}>
        <Sidebar />
      </div>
      <div>
        <NavMenu />
      </div>
      <div className={styles['topbar']}>
        <Topbar />
      </div>

      <div className={styles['main-content']}>
        <h1>Pipeline Page</h1>
      </div>
      <div className={styles['footer']}>
        <Footer />
      </div>
    </div>
  );
}

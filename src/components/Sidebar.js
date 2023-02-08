import { NavLink } from 'react-router-dom';

// styles
import styles from './Sidebar.module.css';

// pages & components
import Logo from './Logo';
import PipelineIcon from './icons/PipelineIcon';
import DealsIcon from './icons/DealsIcon';

export default function Sidebar() {
  return (
    <div className={styles['container']}>
      <div className={styles['logo']}>
        <Logo />
      </div>
      <div className={styles['menu-items']}>
        <div className={styles['link-container']}>
          <PipelineIcon />
          <NavLink
            exact
            to='/'
          >
            Pipeline
          </NavLink>
        </div>
        <div className={styles['link-container']}>
          <DealsIcon />
          <NavLink to='/deals'>Deals</NavLink>
        </div>
      </div>
    </div>
  );
}

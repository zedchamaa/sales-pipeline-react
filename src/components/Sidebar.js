import { NavLink } from 'react-router-dom';

// styles
import styles from './Sidebar.module.css';

// pages & components
import Logo from './Logo';
import PipelineIcon from './icons/PipelineIcon';
import DealsIcon from './icons/DealsIcon';

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo
          className={'logo'}
          fillColor='#FCFCFD'
        />
      </div>
      <div className={styles.menuItems}>
        <div className={styles.linkContainer}>
          <PipelineIcon />
          <NavLink to='/'>Pipeline</NavLink>
        </div>
        <div className={styles.linkContainer}>
          <DealsIcon />
          <NavLink to='/deals'>Deals</NavLink>
        </div>
      </div>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// styles
import styles from './Sidebar.module.css';

// pages & components
import Logo from './Logo';
import PipelineIcon from './icons/PipelineIcon';
import DealsIcon from './icons/DealsIcon';

let activeClass = 'link-container-active';
let defaultClass = 'link-container';

export default function Sidebar() {
  const currentPage = window.location.pathname;
  const [classOne, setClassOne] = useState(defaultClass);
  const [classTwo, setClassTwo] = useState(defaultClass);

  // change link container class name based on current page
  useEffect(() => {
    if (currentPage === '/') {
      setClassOne(activeClass);
    } else if (currentPage === '/deals') {
      setClassTwo(activeClass);
    }
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo
          className={'logo'}
          fillColor='#FCFCFD'
        />
      </div>
      <div className={styles.menuItems}>
        <div className={classOne}>
          <PipelineIcon />
          <NavLink to='/'>Pipeline</NavLink>
        </div>
        <div className={classTwo}>
          <DealsIcon />
          <NavLink to='/deals'>Deals</NavLink>
        </div>
      </div>
    </div>
  );
}

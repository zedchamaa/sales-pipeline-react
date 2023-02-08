import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

// styles
import styles from './NavMenu.module.css';

// pages & components
import Logo from './Logo';
import HamburgerMenu from './icons/HamburgerMenu';
import CloseIcon from './icons/CloseIcon';
import PipelineIcon from './icons/PipelineIcon';
import DealsIcon from './icons/DealsIcon';
import AvatarIcon from './icons/AvatarIcon';
import SignoutIcon from './icons/SignoutIcon';
import HorizontalRuleIcon from './icons/HorizontalRuleIcon';

export default function NavMenu() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMobileMenu(true);
    setShowHamburgerMenu(false);
  };

  const handleMenuClose = () => {
    setOpenMobileMenu(false);
    setShowHamburgerMenu(true);
  };

  return (
    <>
      <div>
        {showHamburgerMenu && (
          <div className={styles.container}>
            <Logo />
            <HamburgerMenu onClick={handleMenuOpen} />
          </div>
        )}
      </div>
      {openMobileMenu && (
        <div className={styles.openedMenu}>
          <div className={styles.topMenu}>
            <Logo />
            <CloseIcon onClick={handleMenuClose} />
          </div>
          <div className={styles.menuItems}>
            <div className={styles.linkContainer}>
              <PipelineIcon />
              <NavLink
                exact
                to='/'
              >
                Pipeline
              </NavLink>
            </div>
            <div className={styles.linkContainer}>
              <DealsIcon />
              <NavLink to='/deals'>Deals</NavLink>
            </div>
          </div>
          <div className={styles.bottomContainer}>
            {user && (
              <>
                <div className={styles.userContainer}>
                  <AvatarIcon />
                  {user.displayName}
                </div>
                <div>
                  <HorizontalRuleIcon />
                </div>
                <div className={styles.signoutContainer}>
                  <SignoutIcon />
                  <button
                    className={styles.btn}
                    onClick={logout}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

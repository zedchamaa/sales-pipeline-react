import { Link } from 'react-router-dom';
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

  return (
    <>
      <div>
        <div className={styles['container']}>
          <Logo />
          <HamburgerMenu />
        </div>
      </div>
      <div className={styles['opened-menu']}>
        <div className={styles['top-menu']}>
          <Logo />
          <CloseIcon />
        </div>
        <div className={styles['menu-items']}>
          <div className={styles['link-container']}>
            <PipelineIcon />
            <Link to='/'>Pipeline</Link>
          </div>
          <div className={styles['link-container']}>
            <DealsIcon />
            <Link to='/deals'>Deals</Link>
          </div>
        </div>
        {/* <div>{user}</div> */}
        <div className={styles['signout-container']}>
          {user && (
            <>
              <div className={styles['user']}>
                <AvatarIcon />
                {user.displayName}
              </div>
              <div>
                <HorizontalRuleIcon />
              </div>
              <div>
                <SignoutIcon />
                <button
                  className='btn'
                  onClick={logout}
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

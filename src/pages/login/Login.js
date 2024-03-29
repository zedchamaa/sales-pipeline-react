import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

// styles
import styles from './Login.module.css';

// images
import mockup from '../../assets/images/mockup.png';
import toolbar from '../../assets/images/browser-toolbar.png';

// pages & components
import Logo from '../../components/Logo';
import MailIcon from '../../components/icons/MailIcon';
import LockIcon from '../../components/icons/LockIcon';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // redirect users to forgot password page
  const handleRedirect = () => {
    navigate('/forgot-password');
  };

  // automatically update the footer copyright date
  const currentYear = new Date().getFullYear();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Sales Pipeline (Demo App) by ZED CHAMAA | Login</title>
          <meta
            name='description'
            content='Login to the Sales Pipeline demo app to easily manage your sales pipeline.'
          />
          <meta
            name='keywords'
            content='sales pipeline, free sales pipeline app, manage sales pipeline'
          />
        </Helmet>
      </HelmetProvider>
      <div className={styles.pageContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftContent}>
            <div className={styles.logo}>
              <Logo
                className={'logo-login'}
                fillColor='#3e4784'
              />
            </div>
            <div className={styles.form}>
              <form
                onSubmit={handleSubmit}
                className={styles.formContainer}
              >
                <div className={styles.topContainer}>
                  <h1>Login to your account</h1>
                  <p>Welcome! Please enter your login details.</p>
                </div>
                <div className={styles.demoCredentials}>
                  <div className={styles.demoNote}>Demo Login Details:</div>
                  <div className={styles.demoDetails}>
                    <div className={styles.username}>
                      <div>
                        <MailIcon />
                      </div>
                      <div>dev@zedchamaa.com</div>
                    </div>
                    <div className={styles.password}>
                      <div>
                        <LockIcon />
                      </div>
                      <div>demoapp</div>
                    </div>
                  </div>
                </div>
                <div className={styles.middleContainer}>
                  <div className={styles.labels}>
                    <label>
                      <span>Email</span>
                      <input
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='example@email.com'
                        required
                      />
                    </label>
                    <label>
                      <span>Password</span>
                      <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Enter password'
                        required
                      />
                    </label>
                  </div>
                  <div className={styles.forgotPassword}>
                    <span onClick={handleRedirect}>Forgot password?</span>
                  </div>
                  <div>
                    {!isPending && (
                      <button className={styles.btn}>Login</button>
                    )}
                    {isPending && (
                      <button
                        className={styles.btn}
                        disabled
                      >
                        loading...
                      </button>
                    )}
                  </div>
                </div>
                <div className={styles.bottomContainer}>
                  <p>
                    Don't have an account?{' '}
                    <Link to='/signup'>
                      <strong>Sign Up</strong>
                    </Link>
                  </p>
                  {error && <div className='form-alert'>{error}</div>}
                </div>
              </form>
            </div>
            <div className={styles.copyright}>
              Copyright &copy; {currentYear}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://zedchamaa.com'
              >
                zedchamaa
              </a>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContent}>
            <div className={styles.title}>
              Streamline your sales process and close more deals
            </div>
            <div className={styles.description}>
              Intuitive and easy-to-use sales pipeline software. Track your
              leads, identify your best opportunities, and move them through
              your pipeline with ease.
            </div>
            <div className={styles.toolbar}>
              <img
                src={toolbar}
                alt='toolbar'
              />
            </div>
            <div className={styles.mockup}>
              <img
                src={mockup}
                alt='mockup'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

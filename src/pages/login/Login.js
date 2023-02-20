import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

// styles
import styles from './Login.module.css';

// pages & components
import Announcement from '../../components/Announcement';
import Footer from '../../components/Footer';

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
      <Announcement title={'Demo Login Details'}>
        <p>Email: dev@zedchamaa.com</p>
        <p>Password: demoapp</p>
      </Announcement>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        <div className={styles.topContainer}>
          <h1>Login to your account</h1>
          <p>Welcome! Please enter your details.</p>
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
            {!isPending && <button className={styles.btn}>Login</button>}
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
      <Footer />
    </>
  );
}

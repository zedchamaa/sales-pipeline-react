import { useState, useEffect } from 'react';
import { useResetPassword } from '../../hooks/useResetPassword';
import { useHistory } from 'react-router-dom';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

// styles
import styles from './ForgotPassword.module.css';

// pages & components
import Footer from '../../components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [timerId, setTimerId] = useState('');
  const history = useHistory();
  const { resetPassword, error, isPending } = useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
    setMessage('Check your inbox for further instructions.');

    setTimerId(
      setTimeout(() => {
        history.push('/login');
      }, 3000)
    );
  };

  // clear timer when component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(timerId);
    };
  }, [timerId]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            Sales Pipeline (Demo App) by ZED CHAMAA | Reset Password
          </title>
          <meta
            name='description'
            content='Reset your Sales Pipeline demo app account password.'
          />
          <meta
            name='keywords'
            content='reset password'
          />
        </Helmet>
      </HelmetProvider>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        <div className={styles.topContainer}>
          <h1>Password Reset</h1>
          <p>
            If you're registered, we will email you a link to reset your
            password. Make sure to also check your spam folder for the email.
          </p>
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
          </div>
          <div>
            {!isPending && (
              <button className={styles.btn}>Reset Password</button>
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
          {error && <div className='form-alert'>{error}</div>}
          {!error && message && (
            <div className='form-alert-success'>{message}</div>
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}

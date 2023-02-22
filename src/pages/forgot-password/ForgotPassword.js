import { useState, useEffect } from 'react';
import { useResetPassword } from '../../hooks/useResetPassword';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

// styles
import styles from './ForgotPassword.module.css';

// images
import mockup from '../../assets/images/mockup.png';
import toolbar from '../../assets/images/browser-toolbar.png';

// pages & components
import Logo from '../../components/Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword, error, isPending, message } = useResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
    setEmail('');
  };

  // clear the email input field when the error changes
  useEffect(() => {
    return () => {
      setEmail('');
    };
  }, [error]);

  // automatically update the footer copyright date
  const currentYear = new Date().getFullYear();

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
                <h1>Password Reset</h1>
                <p>
                  If you're registered, we will email you a link to reset your
                  password. Make sure to also check your spam folder for the
                  email.
                </p>
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
                    <div className={styles.alerts}>
                      {error && <div className='form-alert'>{error}</div>}
                      {!error && message && (
                        <div className='form-alert-success'>{message}</div>
                      )}
                    </div>
                  </div>
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

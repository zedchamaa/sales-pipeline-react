import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

// styles
import styles from './Signup.module.css';

// images
import mockup from '../../assets/images/mockup.png';
import toolbar from '../../assets/images/browser-toolbar.png';

// pages & components
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if passwords match and display alert if they don't
    if (password !== confirmPassword) {
      setShowAlert(true);
      return;
    } else {
      setShowAlert(false);
    }

    signup(email, password, displayName);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Sales Pipeline (Demo App) by ZED CHAMAA | Register</title>
          <meta
            name='description'
            content='Register your Sales Pipeline demo app account.'
          />
          <meta
            name='keywords'
            content='free sales process management app, free sales pipeline management app, sales pipeline app demo'
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
                  <h1>Create a new account</h1>
                  <p>Please enter your details.</p>
                </div>

                <div className={styles.middleContainer}>
                  <div className={styles.labels}>
                    <label>
                      <span>Display Name</span>
                      <input
                        type='text'
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                        placeholder='Enter display name'
                        required
                      />
                    </label>
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
                    <label>
                      <span>Confirm Password</span>
                      <input
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder='Confirm password'
                        required
                      />
                    </label>
                    {showAlert && (
                      <div className='form-alert'>*Passwords do not match</div>
                    )}
                  </div>
                  <div>
                    {!isPending && (
                      <button className={styles.btn}>Register</button>
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
                    Have an account?{' '}
                    <Link to='/login'>
                      <strong>Login</strong>
                    </Link>
                  </p>
                  {error && <div className='form-alert'>{error}</div>}
                </div>
              </form>
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

      <Footer />
    </>
  );
}

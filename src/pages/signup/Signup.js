import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';

// styles
import styles from './Signup.module.css';

// pages & components
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
      <form
        onSubmit={handleSubmit}
        className={styles['form-container']}
      >
        <div className={styles['top-container']}>
          <h1>Create a new account</h1>
          <p>Please enter your details.</p>
        </div>

        <div className={styles['middle-container']}>
          <div className={styles['labels']}>
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
          </div>
          <div>
            {!isPending && <button className={styles['btn']}>Register</button>}
            {isPending && (
              <button
                className={styles['btn']}
                disabled
              >
                Loading...
              </button>
            )}
          </div>
        </div>
        <div className={styles['bottom-container']}>
          <p>
            Have an account?{' '}
            <Link to='/login'>
              <strong>Login</strong>
            </Link>
          </p>
          {error && <div className='form-alert'>{error}</div>}
        </div>
      </form>
      <Footer />
    </>
  );
}

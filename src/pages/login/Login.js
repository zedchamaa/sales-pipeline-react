import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles['form-container']}
    >
      <div className={styles['top-container']}>
        <h1>Login to your account</h1>
        <p>Welcome! Please enter your details.</p>
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
        </div>
        <div className={styles['forgot-password']}>
          <h3>Forgot password?</h3>
        </div>
        <div>
          {!isPending && <button className={styles['btn']}>Login</button>}
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
          Don't have an account?{' '}
          <Link to='/signup'>
            <strong>Sign Up</strong>
          </Link>
        </p>
        {error && <div className='form-alert'>{error}</div>}
      </div>
    </form>
  );
}

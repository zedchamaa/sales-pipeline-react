import { useState } from 'react';

// styles
import styles from './ForgotPassword.module.css';

// pages & components
import Footer from '../../components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        <div className={styles.topContainer}>
          <h1>Forgot Password</h1>
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
            <button className={styles.btn}>Reset Password</button>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          {/* {error && <div className='form-alert'>{error}</div>} */}
        </div>
      </form>
      <Footer />
    </>
  );
}

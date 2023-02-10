import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';

// styles
import styles from './DealsForm.module.css';

export default function DealsForm({ uid, onClick }) {
  const { addDocument, response } = useFirestore('deals');
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');
  const [alert, setAlert] = useState('');

  const resetForm = () => {
    setName('');
    setClient('');
    setAmount('');
    setStage('');
    setStatus('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation
    if (stage === '' || stage === 'unknown') {
      setAlert('*select a stage');
      return;
    } else if (status === '' || status === 'unknown') {
      setAlert('*select a status');
      return;
    }

    addDocument({
      uid,
      name,
      client,
      amount: Number(amount),
      stage,
      status,
      created: new Date().toLocaleDateString(),
    });

    // hide the modal
    onClick();
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      resetForm();
    }
  }, [response.success]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Deal Name</span>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='e.g. ABC Company Web App'
            required
          />
        </label>
        <label>
          <span>Client Name</span>
          <input
            type='text'
            onChange={(e) => setClient(e.target.value)}
            value={client}
            placeholder='e.g. ABC Company'
            required
          />
        </label>
        <label>
          <span>Deal Value</span>
          <input
            type='number'
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder='e.g. 25000'
            required
          />
        </label>
        <label>
          <span>Deal Stage</span>
          <select
            className={styles.dropDownMenu}
            onChange={(e) => setStage(e.target.value)}
          >
            <option value='unknown'>Select stage</option>
            <option value='qualified'>Qualified</option>
            <option value='demo'>Demo</option>
            <option value='proposal'>Proposal</option>
            <option value='negotiations'>Negotiations</option>
            <option value='won'>Won</option>
            <option value='lost'>Lost</option>
          </select>
        </label>
        <label>
          <span>Deal Status</span>
          <select
            className={styles.dropDownMenu}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='unknown'>Select status</option>
            <option value='inprogress'>In Progress</option>
            <option value='good'>Good</option>
            <option value='stalled'>Stalled</option>
          </select>
        </label>
        <div className='form-alert'>{alert}</div>
        <div className={styles.footer}>
          <button
            className={styles.cancel}
            onClick={onClick}
          >
            Cancel
          </button>
          <button className={styles.confirm}>Confirm</button>
        </div>
      </form>
    </div>
  );
}

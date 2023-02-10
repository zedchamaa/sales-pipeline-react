import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';

// styles
import styles from './DealsForm.module.css';

// pages & components
import StagesMenu from './StagesMenu';
import StatusMenu from './StatusMenu';

export default function DealsForm({ uid, onClick }) {
  const { addDocument, response } = useFirestore('deals');
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');
  const [alert, setAlert] = useState('');

  // stage drop down menu
  const handleStageChange = (selectedOption) => {
    setStage(selectedOption.value);
  };

  // status drop down menu
  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption.value);
  };

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
    if (stage === '') {
      setAlert('>> select a stage <<');
      return;
    } else if (status === '') {
      setAlert('>> select a status <<');
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
          <StagesMenu onChange={handleStageChange} />
        </label>
        <label>
          <span>Deal Status</span>
          <StatusMenu onChange={handleStatusChange} />
        </label>
        {alert && <div className='form-alert'>{alert}</div>}
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

import { useState, useEffect, useContext } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { ModalContext } from '../context/ModalContext';

// styles
import styles from './DealsForm.module.css';

// pages & components
import StagesMenu from './StagesMenu';
import StatusMenu from './StatusMenu';

export default function DealsForm({ uid }) {
  const { addDocument, response } = useFirestore('deals');
  const { handleCloseModal } = useContext(ModalContext);

  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');
  const [alert, setAlert] = useState('');
  const [dealKeyDown, setDealKeyDown] = useState('');
  const [clientKeyDown, setClientKeyDown] = useState('');

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
    if (!stage) {
      setAlert('Please select a stage');
      return;
    } else if (!status) {
      setAlert('Please select a status');
      return;
    }

    // format the date to the british locale (e.g. 19 February 2023)
    const createdDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // check if user is submitting blank values for deal name and client name
    if (
      name !== '' &&
      dealKeyDown !== 'Space' &&
      dealKeyDown !== 'Backspace' &&
      client !== '' &&
      clientKeyDown !== 'Space' &&
      clientKeyDown !== 'Backspace'
    ) {
      addDocument({
        uid,
        name,
        client,
        amount: Number(amount),
        stage,
        status,
        created: createdDate,
      });
    } else {
      setName('');
      setClient('');
      setAlert('Deal name and client name cannot be blank');
      return;
    }

    // hide the modal
    handleCloseModal();

    // scroll to the top of the page
    window.scrollTo(0, 0);
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      resetForm();
    }
  }, [response.success]);

  // prevent user from submitting the form if deal name is blank
  const handleDealKeyDown = (e) => {
    setDealKeyDown(e.code);
  };

  // prevent user from submitting the form if client name is blank
  const handleClientKeyDown = (e) => {
    setClientKeyDown(e.code);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Deal Name</span>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleDealKeyDown}
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
            onKeyDown={handleClientKeyDown}
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
            type='button'
            className={styles.cancel}
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type='submit'
            className={styles.confirm}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function DealsForm({ uid }) {
  const { addDocument, response } = useFirestore('deals');
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      client,
      amount: Number(amount),
      stage,
      status,
      created: new Date().toLocaleDateString(),
    });
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Deal Name:</span>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Client Name:</span>
          <input
            type='text'
            onChange={(e) => setClient(e.target.value)}
            value={client}
            required
          />
        </label>
        <label>
          <span>Deal Value:</span>
          <input
            type='number'
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </label>
        <label>
          <span>Deal Stage:</span>
          <select onChange={(e) => setStage(e.target.value)}>
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
          <span>Deal Status:</span>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value='unknown'>Select status</option>
            <option value='good'>Good</option>
            <option value='bad'>Bad</option>
          </select>
        </label>
        <button>Submit</button>
        <div className='alert'>{alert}</div>
      </form>
    </>
  );
}

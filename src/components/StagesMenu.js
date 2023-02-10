import Select from 'react-select';

export default function StagesMenu({ onChange }) {
  const stages = [
    { value: 'qualified', label: 'Qualified' },
    { value: 'demo', label: 'Demo' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiations', label: 'Negotiations' },
    { value: 'won', label: 'Won' },
    { value: 'lost', label: 'Lost' },
  ];

  return (
    <Select
      options={stages}
      onChange={onChange}
    />
  );
}

import Select from 'react-select';

export default function StagesMenu({ onChange, stage }) {
  const stages = [
    { value: 'Qualified', label: 'Qualified' },
    { value: 'Demo', label: 'Demo' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Negotiations', label: 'Negotiations' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' },
  ];

  return (
    <Select
      options={stages}
      onChange={onChange}
      placeholder={stage}
    />
  );
}

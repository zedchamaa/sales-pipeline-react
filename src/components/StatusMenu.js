import Select from 'react-select';

export default function StatusMenu({ onChange }) {
  const statuses = [
    { value: 'inprogress', label: 'In Progress' },
    { value: 'good', label: 'Good' },
    { value: 'stalled', label: 'Stalled' },
  ];

  return (
    <Select
      options={statuses}
      onChange={onChange}
    />
  );
}

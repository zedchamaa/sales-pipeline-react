import Select from 'react-select';

export default function StagesMenu({ onChange, stage }) {
  const stages = [
    { value: 'Qualified', label: 'Qualified', fontSize: '1.7rem' },
    { value: 'Demo', label: 'Demo', fontSize: '1.7rem' },
    { value: 'Proposal', label: 'Proposal', fontSize: '1.7rem' },
    { value: 'Negotiations', label: 'Negotiations', fontSize: '1.7rem' },
    { value: 'Won', label: 'Won', fontSize: '1.7rem' },
    { value: 'Lost', label: 'Lost', fontSize: '1.7rem' },
  ];

  const menuContainer = document.body; // or any other container with a max-width set

  return (
    <Select
      options={stages}
      onChange={onChange}
      placeholder={stage}
      menuPortalTarget={menuContainer}
    />
  );
}

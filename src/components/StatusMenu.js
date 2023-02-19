import Select from 'react-select';

export default function StatusMenu({ onChange, status }) {
  const statuses = [
    {
      value: 'In Progress',
      label: 'In Progress',
      color: '#667085',
      backgroundColor: '#F2F4F7',
      width: '153px',
      height: '31px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.7rem',
      fontWeight: '700',
      lineHeight: '14.52px',
    },
    {
      value: 'Success',
      label: 'Success',
      color: '#12B76A',
      backgroundColor: '#D1FADF',
      width: '153px',
      height: '31px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.7rem',
      fontWeight: '700',
      lineHeight: '14.52px',
    },
    {
      value: 'Declined',
      label: 'Declined',
      color: '#F04438',
      backgroundColor: '#FEE4E2',
      width: '153px',
      height: '31px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.7rem',
      fontWeight: '700',
      lineHeight: '14.52px',
    },
  ];

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '#FFFFFF' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: data.color,
        backgroundColor: data.backgroundColor,
      };
    },
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        color: data.color,
        backgroundColor: data.backgroundColor,
        width: data.width,
        height: data.height,
        borderRadius: data.borderRadius,
        display: data.display,
        alignItems: data.alignItems,
        justifyContent: data.justifyContent,
        fontSize: data.fontSize,
        fontWeight: data.fontWeight,
        lineHeight: data.lineHeight,
      };
    },
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (base) => ({
      ...base,
      maxWidth: 300,
    }),
  };

  return (
    <Select
      options={statuses}
      onChange={onChange}
      styles={colorStyles}
      placeholder={status}
      menuPortalTarget={document.body}
    />
  );
}

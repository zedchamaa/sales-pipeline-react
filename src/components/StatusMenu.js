import Select from 'react-select';

export default function StatusMenu({ onChange }) {
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
      fontSize: '1.2rem',
      fontWeight: '700',
      lineHeight: '14.52px',
    },
    {
      value: 'Very Good',
      label: 'Very Good',
      color: '#12B76A',
      backgroundColor: '#D1FADF',
      width: '153px',
      height: '31px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      fontWeight: '700',
      lineHeight: '14.52px',
    },
    {
      value: 'Stalled',
      label: 'Stalled',
      color: '#F04438',
      backgroundColor: '#FEE4E2',
      width: '153px',
      height: '31px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
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
  };

  return (
    <Select
      options={statuses}
      onChange={onChange}
      styles={colorStyles}
    />
  );
}

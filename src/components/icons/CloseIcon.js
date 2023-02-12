import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

export default function CloseIcon({ stroke, strokeWidth }) {
  const { handleCloseModal } = useContext(ModalContext);

  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={handleCloseModal}
    >
      <path
        d='M18 6.5L6 18.5M6 6.5L18 18.5'
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

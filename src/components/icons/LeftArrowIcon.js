export default function LeftArrowIcon({ onClick }) {
  return (
    <svg
      width='42'
      height='42'
      viewBox='0 0 42 42'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <rect
        width='42'
        height='42'
        rx='21'
        fill='#EAECF0'
      />
      <path
        d='M23.25 25.5L18.75 21L23.25 16.5'
        stroke='#344054'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

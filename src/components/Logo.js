import { Link } from 'react-router-dom';

// pages & components
import LogoIcon from './icons/LogoIcon';

export default function Logo({ className, fillColor }) {
  return (
    <div className={className}>
      <LogoIcon fillColor={fillColor} />
      <Link to='/'>SALES PIPELINE</Link>
    </div>
  );
}

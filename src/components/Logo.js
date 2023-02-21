// pages & components
import LogoIcon from './icons/LogoIcon';

export default function Logo({ className, fillColor }) {
  return (
    <div className={className}>
      <LogoIcon fillColor={fillColor} />
      SALES PIPELINE
    </div>
  );
}

import { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Tone } from '../../types/portal';

export interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon: ReactNode;
  tone: Tone;
  children: ReactNode;
  onClick: () => void;
}

export function MetricCard({
  label,
  value,
  suffix,
  icon,
  tone,
  children,
  onClick,
}: MetricCardProps) {
  return (
    <button className="metric" onClick={onClick}>
      <span className="metric-heading">
        <span>{label}</span>
        <span className={`metric-icon tone-${tone}`}>{icon}</span>
      </span>
      <span className="metric-value">
        {value}
        {suffix && <span>{suffix}</span>}
      </span>
      <span className="metric-footnote">{children}</span>
      <ArrowUpRight className="metric-hover-arrow" size={15} />
    </button>
  );
}

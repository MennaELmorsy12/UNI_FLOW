import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <section className={cn('panel', className)} {...props}>
      {children}
    </section>
  );
}

export interface PanelHeaderProps {
  title: string;
  aside?: ReactNode;
  subtitle?: string;
}

export function PanelHeader({ title, aside, subtitle }: PanelHeaderProps) {
  return (
    <div className="panel-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {aside}
    </div>
  );
}

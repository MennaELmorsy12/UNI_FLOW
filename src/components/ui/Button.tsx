import { ButtonHTMLAttributes } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'normal' | 'small';
  busy?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'normal',
  busy = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn('button', `button-${variant}`, size === 'small' && 'button-small', className)}
      disabled={disabled || busy}
      {...props}
    >
      {busy && <LoaderCircle size={16} className="spin" />}
      {children}
    </button>
  );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function IconButton({ label, children, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn('icon-button', className)}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}

export function TextLink({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn('text-link', className)} {...props}>
      {children}
      <ArrowRight size={14} />
    </button>
  );
}

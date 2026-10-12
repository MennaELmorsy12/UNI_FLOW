import { InputHTMLAttributes, useId } from 'react';
import { cn } from '../../utils/cn';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextField({
  label,
  hint,
  error,
  id: suppliedId,
  className,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const id = suppliedId ?? generatedId;
  return (
    <div className={cn('form-field', className)}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="input"
        aria-invalid={!!error}
        aria-describedby={error || hint ? `${id}-hint` : undefined}
        {...props}
      />
      {(hint || error) && (
        <p id={`${id}-hint`} className={error ? 'field-error' : 'field-hint'}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

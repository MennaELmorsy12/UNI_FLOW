import { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { Tone } from '../../types/portal';

export interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return <span className={cn('badge', `tone-${tone}`, className)}>{children}</span>;
}

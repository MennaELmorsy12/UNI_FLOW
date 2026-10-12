import { useState } from 'react';
import type { Tone } from '../../types/portal';

export const STUDENT_AVATAR =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=100&h=100&q=80';

export interface AvatarProps {
  initials?: string;
  src?: string;
  size?: 'small' | 'normal' | 'large';
  tone?: Tone;
}

export function Avatar({ initials = 'AM', src, size = 'normal', tone = 'green' }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`avatar avatar-${size} tone-${tone}`} aria-hidden="true">
      {src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} /> : initials}
    </span>
  );
}

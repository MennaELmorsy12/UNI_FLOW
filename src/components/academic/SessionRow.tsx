import { MapPin } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { formatTime } from '../../utils/format';
import { Badge } from '../ui/Badge';
import type { ClassSession, Course } from '../../types/portal';

export interface SessionRowProps {
  session: ClassSession;
  course: Course;
  next?: boolean;
}

export function SessionRow({ session, course, next = false }: SessionRowProps) {
  const { openDialog } = usePortal();
  return (
    <button
      className={`session-row ${next ? 'session-next' : ''}`}
      onClick={() => openDialog({ type: 'course', id: course.id })}
      aria-label={`${course.title}, ${formatTime(session.start)} to ${formatTime(session.end)}, ${session.location}. View course details.`}
    >
      <span className="session-time">
        <strong>{formatTime(session.start).replace(' AM', '').replace(' PM', '')}</strong>
        <span>{formatTime(session.end)}</span>
      </span>
      <span className={`session-accent accent-${course.tone}`} />
      <span className="session-info">
        <span className="session-title">{course.title}</span>
        <span className="session-meta">
          <span>{course.code}</span>
          <span className="meta-dot" />
          <span>
            <MapPin size={11} />
            {session.location}
          </span>
        </span>
      </span>
      <Badge tone={next ? 'green' : 'neutral'}>
        {next && <span className="status-dot" />}
        {next ? 'Up next' : session.kind}
      </Badge>
    </button>
  );
}

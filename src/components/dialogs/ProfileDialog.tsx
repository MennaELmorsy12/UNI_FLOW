import { ArrowRight, BookOpen, CalendarDays, GraduationCap, UserRound } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function ProfileContent() {
  const { data, notify, openDialog } = usePortal();
  if (!data) return null;
  const { student } = data;

  const initials = student.name
    ? student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'ST';

  const copyId = async () => {
    if (!student.id) {
      notify('No student ID available to copy.', 'error');
      return;
    }
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(student.id);
      notify('Student ID copied to your clipboard.');
    } catch {
      notify('Clipboard access is unavailable in this browser.', 'error');
    }
  };

  return (
    <>
      <div className="profile-intro">
        <Avatar size="large" initials={initials} />
        <h3>{student.name || 'Student Profile'}</h3>
        <p>{student.email || 'No email registered'}</p>
        <Badge tone="green">
          <span className="status-dot" />
          Active student
        </Badge>
      </div>
      <dl className="profile-details">
        <div>
          <dt>
            <UserRound size={15} />
            Student ID
          </dt>
          <dd>{student.id || 'Not assigned'}</dd>
        </div>
        <div>
          <dt>
            <GraduationCap size={15} />
            Program
          </dt>
          <dd>{student.program || 'Not specified'}</dd>
        </div>
        <div>
          <dt>
            <CalendarDays size={15} />
            Academic year
          </dt>
          <dd>
            {student.year ? `${student.year} / ${student.semester}` : 'Current Year'}
          </dd>
        </div>
        <div>
          <dt>
            <BookOpen size={15} />
            Academic advisor
          </dt>
          <dd>{student.advisor || 'Not assigned'}</dd>
        </div>
      </dl>
      <div className="dialog-footer">
        <Button variant="secondary" onClick={() => void copyId()}>
          Copy student ID
        </Button>
        <Button onClick={() => openDialog({ type: 'support' })}>
          Get support
          <ArrowRight size={14} />
        </Button>
      </div>
    </>
  );
}

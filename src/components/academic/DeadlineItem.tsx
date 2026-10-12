import { ChevronRight, Clock3, FileText, FolderClosed, ListChecks } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { dueLabel, formatTime } from '../../utils/format';
import { Badge } from '../ui/Badge';
import type { Assignment, Course } from '../../types/portal';

export interface DeadlineItemProps {
  assignment: Assignment;
  course: Course;
}

export function DeadlineItem({ assignment, course }: DeadlineItemProps) {
  const { openDialog } = usePortal();
  const Icon = assignment.type === 'Project' ? FolderClosed : assignment.type === 'Quiz' ? ListChecks : FileText;
  const tone = assignment.type === 'Project' ? 'blue' : assignment.type === 'Quiz' ? 'purple' : 'amber';

  return (
    <button className="deadline-row" onClick={() => openDialog({ type: 'tasks', id: assignment.id })}>
      <span className={`deadline-icon tone-${tone}`}>
        <Icon size={18} strokeWidth={1.6} />
      </span>
      <span className="deadline-content">
        <span className="item-title">{assignment.title}</span>
        <span className="item-subtitle">
          {course.code} <span className="inline-dot" /> {course.shortTitle}
        </span>
        <span className="deadline-meta">
          <Badge tone={dueLabel(assignment.due) === 'Tomorrow' ? 'red' : 'neutral'}>
            {dueLabel(assignment.due)}
          </Badge>
          <span>
            <Clock3 size={11} />
            {formatTime(assignment.due.slice(11, 16))}
          </span>
        </span>
      </span>
      <ChevronRight size={15} className="row-chevron" />
    </button>
  );
}

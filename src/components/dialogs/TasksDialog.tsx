import { useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, ChevronRight, Clock3, FileText, Info } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/FeedbackStates';
import { SegmentedControl } from '../ui/SegmentedControl';
import { dueLabel, formatDate, formatTime } from '../../utils/format';

export interface TasksContentProps {
  selectedId?: string;
}

export function TasksContent({ selectedId }: TasksContentProps) {
  const { data, openDialog, completeTask, pendingTaskId } = usePortal();
  const [filter, setFilter] = useState<'pending' | 'all' | 'completed'>('pending');
  if (!data) return null;

  const selected = data.assignments.find((item) => item.id === selectedId);
  if (selected) {
    const course = data.courses.find((item) => item.id === selected.courseId)!;
    return (
      <>
        <button className="back-link" onClick={() => openDialog({ type: 'tasks' })}>
          <ArrowLeft size={14} />
          All tasks
        </button>
        <div className="task-detail-heading">
          <span className={`task-detail-icon tone-${course.tone}`}>
            <FileText size={26} />
          </span>
          <div>
            <Badge tone={selected.completed ? 'green' : 'amber'}>
              {selected.completed ? 'Prepared' : selected.type}
            </Badge>
            <h3>{selected.title}</h3>
            <button onClick={() => openDialog({ type: 'course', id: course.id })}>
              {course.code} / {course.shortTitle}
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
        <div className="task-due">
          <CalendarDays size={17} />
          <span>{formatDate(selected.due, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          <Clock3 size={16} />
          <span>{formatTime(selected.due.slice(11, 16))}</span>
        </div>
        <h4>What to prepare</h4>
        <p className="detail-description">{selected.description}</p>
        <p className="inline-notice">
          <Info size={16} />
          This is your preparation checklist. Marking a task as prepared does not submit coursework.
        </p>
        <div className="dialog-footer">
          <span>{selected.completed ? 'Ready for your next step.' : 'One task at a time. You have this.'}</span>
          <Button
            variant={selected.completed ? 'secondary' : 'primary'}
            busy={pendingTaskId === selected.id}
            onClick={() => void completeTask(selected.id, !selected.completed)}
          >
            {selected.completed ? <ArrowLeft size={15} /> : <Check size={15} />}
            {selected.completed ? 'Mark as pending' : 'Mark as prepared'}
          </Button>
        </div>
      </>
    );
  }

  const assignments = data.assignments.filter(
    (assignment) => filter === 'all' || (filter === 'completed' ? assignment.completed : !assignment.completed)
  );

  return (
    <>
      <div className="dialog-toolbar">
        <SegmentedControl
          label="Filter tasks"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'completed', label: 'Prepared' },
            { value: 'all', label: 'All tasks' },
          ]}
        />
        <span className="muted small-text">
          {data.assignments.filter((assignment) => assignment.completed).length} of {data.assignments.length} prepared
        </span>
      </div>
      <div className="task-checklist">
        {assignments.map((assignment) => {
          const course = data.courses.find((item) => item.id === assignment.courseId);
          return (
            <div
              className={`task-checklist-row ${assignment.completed ? 'task-is-complete' : ''}`}
              key={assignment.id}
            >
              <input
                type="checkbox"
                checked={assignment.completed}
                disabled={pendingTaskId !== null}
                aria-label={`Mark ${assignment.title} as ${assignment.completed ? 'pending' : 'prepared'}`}
                onChange={(event) => void completeTask(assignment.id, event.target.checked)}
              />
              <button onClick={() => openDialog({ type: 'tasks', id: assignment.id })}>
                <strong>{assignment.title}</strong>
                <span>
                  {course ? `${course.code} / ${course.shortTitle}` : 'Course Task'}
                </span>
              </button>
              <Badge
                tone={
                  assignment.completed ? 'green' : dueLabel(assignment.due) === 'Tomorrow' ? 'red' : 'neutral'
                }
              >
                {assignment.completed ? 'Prepared' : dueLabel(assignment.due)}
              </Badge>
              <ChevronRight size={15} />
            </div>
          );
        })}
      </div>
      {!assignments.length && (
        <EmptyState
          title={filter === 'pending' ? 'All caught up. Take a breath.' : 'A fresh start'}
          description={
            filter === 'pending'
              ? 'Your preparation checklist is complete.'
              : 'Tasks you mark as prepared will appear here.'
          }
          icon={CheckCircle2}
        />
      )}
      <p className="inline-notice">
        <Info size={15} />
        Your checklist is saved in this browser. Coursework is submitted separately to your instructor.
      </p>
    </>
  );
}

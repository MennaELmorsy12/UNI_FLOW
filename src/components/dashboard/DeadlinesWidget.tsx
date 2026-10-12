import { CircleCheck, MoreHorizontal } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Panel, PanelHeader } from '../ui/Panel';
import { IconButton, TextLink } from '../ui/Button';
import { EmptyState } from '../ui/FeedbackStates';
import { DeadlineItem } from '../academic/DeadlineItem';
import type { Assignment, Course } from '../../types/portal';

export interface DeadlinesWidgetProps {
  assignments: Assignment[];
  courses: Course[];
  limit?: number;
}

export function DeadlinesWidget({
  assignments,
  courses,
  limit = 3,
}: DeadlinesWidgetProps) {
  const { openDialog } = usePortal();
  const pendingTasks = assignments.filter((item) => !item.completed);

  return (
    <Panel className="deadlines-panel">
      <PanelHeader
        title="Upcoming deadlines"
        aside={
          <IconButton label="View all pending tasks" onClick={() => openDialog({ type: 'tasks' })}>
            <MoreHorizontal size={18} />
          </IconButton>
        }
      />
      <div className="deadline-list">
        {pendingTasks.length ? (
          pendingTasks
            .slice(0, limit)
            .map((assignment) => {
              const course = courses.find((c) => c.id === assignment.courseId);
              if (!course) return null;
              return (
                <DeadlineItem
                  key={assignment.id}
                  assignment={assignment}
                  course={course}
                />
              );
            })
        ) : (
          <EmptyState
            title="All caught up"
            description="Everything on your checklist is prepared."
            icon={CircleCheck}
          />
        )}
      </div>
      <div className="panel-bottom">
        <TextLink onClick={() => openDialog({ type: 'tasks' })}>View all tasks</TextLink>
      </div>
    </Panel>
  );
}

import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Panel, PanelHeader } from '../ui/Panel';
import { TextLink } from '../ui/Button';
import { EmptyState } from '../ui/FeedbackStates';
import { SessionRow } from '../academic/SessionRow';
import { dateForDay, formatDate } from '../../utils/format';
import type { ClassSession, Course } from '../../types/portal';

export interface ScheduleWidgetProps {
  sessions: ClassSession[];
  courses: Course[];
  initialDay?: number;
}

export function ScheduleWidget({
  sessions,
  courses,
  initialDay = 0,
}: ScheduleWidgetProps) {
  const { openDialog } = usePortal();
  const [selectedDay, setSelectedDay] = useState(initialDay);

  const daySessions = sessions.filter((session) => session.day === selectedDay);

  return (
    <Panel className="schedule-panel">
      <PanelHeader
        title={
          selectedDay === 0
            ? "Today's schedule"
            : `${formatDate(dateForDay(selectedDay), { weekday: 'long' })}'s schedule`
        }
        aside={
          <TextLink onClick={() => openDialog({ type: 'schedule' })}>
            Full schedule
          </TextLink>
        }
      />
      <div className="week-strip" role="group" aria-label="Choose a day in the week of May 19">
        <span className="week-month">
          MAY<span>2025</span>
        </span>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <button
            key={day}
            className={`week-day ${selectedDay === index ? 'week-day-active' : ''}`}
            aria-pressed={selectedDay === index}
            aria-label={formatDate(dateForDay(index), { weekday: 'long', month: 'long', day: 'numeric' })}
            onClick={() => setSelectedDay(index)}
          >
            <span>{day}</span>
            <strong>{19 + index}</strong>
            {index < 5 ? <i /> : <span className="no-class-dot" />}
          </button>
        ))}
      </div>
      <div className="session-list">
        {daySessions.length ? (
          daySessions.map((session, index) => {
            const course = courses.find((c) => c.id === session.courseId);
            if (!course) return null;
            return (
              <SessionRow
                key={session.id}
                session={session}
                course={course}
                next={selectedDay === 0 && index === 0}
              />
            );
          })
        ) : (
          <EmptyState
            title="No classes scheduled"
            description="No classes for this day."
            icon={CalendarDays}
          />
        )}
      </div>
      <div className="schedule-bottom">
        <span className="small-status-dot" />
        <span>
          {daySessions.length
            ? `${daySessions.length} classes${selectedDay === 0 ? ' today' : ' scheduled'}`
            : 'A class-free day'}
        </span>
        <span>All times are campus local</span>
      </div>
    </Panel>
  );
}

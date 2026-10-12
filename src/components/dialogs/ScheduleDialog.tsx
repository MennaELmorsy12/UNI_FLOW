import { useState } from 'react';
import { Download, Info, LayoutGrid, List } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Button } from '../ui/Button';
import { SegmentedControl } from '../ui/SegmentedControl';
import { dateForDay, downloadCalendar, formatDate, formatTime } from '../../utils/format';

export interface ScheduleContentProps {
  initialTab?: 'classes' | 'exams';
}

export function ScheduleContent({ initialTab = 'classes' }: ScheduleContentProps) {
  const { data, openDialog, notify } = usePortal();
  const [tab, setTab] = useState<'classes' | 'exams'>(initialTab);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  if (!data) return null;
  const { sessions, courses, exams } = data;
  const download = () => {
    downloadCalendar(data, tab === 'exams');
    notify('Your calendar file is ready to import.');
  };
  const timePosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return ((hours + minutes / 60 - 9) / 7) * 100;
  };

  return (
    <>
      <div className="dialog-toolbar">
        <SegmentedControl
          label="Schedule type"
          value={tab}
          onChange={setTab}
          options={[
            { value: 'classes', label: 'Classes' },
            { value: 'exams', label: 'Final exams' },
          ]}
        />
        <Button variant="secondary" size="small" onClick={download}>
          <Download size={14} />
          Export calendar
        </Button>
      </div>
      <div className="schedule-view-heading">
        <div>
          <h3>{tab === 'classes' ? 'May 19 - 23, 2025' : 'June 2 - 9, 2025'}</h3>
          <p>
            {tab === 'classes'
              ? 'Your current teaching week. All times are campus local.'
              : 'Published by the Registration Office. Arrive 15 minutes early.'}
          </p>
        </div>
        <div className="view-toggle" role="group" aria-label="Schedule view">
          <button
            className={view === 'calendar' ? 'is-active' : ''}
            onClick={() => setView('calendar')}
            aria-label="Calendar view"
            aria-pressed={view === 'calendar'}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            className={view === 'list' ? 'is-active' : ''}
            onClick={() => setView('list')}
            aria-label="Table view"
            aria-pressed={view === 'list'}
          >
            <List size={17} />
          </button>
        </div>
      </div>
      {tab === 'classes' && view === 'calendar' && (
        <div className="timetable-scroll">
          <div className="timetable">
            <div className="timetable-header">
              <span />
              <span>
                MON<strong>19</strong>
              </span>
              <span>
                TUE<strong>20</strong>
              </span>
              <span>
                WED<strong>21</strong>
              </span>
              <span>
                THU<strong>22</strong>
              </span>
              <span>
                FRI<strong>23</strong>
              </span>
            </div>
            <div className="timetable-body">
              <div className="timetable-hours">
                {Array.from({ length: 7 }, (_, index) => (
                  <span key={index} style={{ top: `${(index / 7) * 100}%` }}>
                    {index + 9 > 12 ? index - 3 : index + 9}
                    {index + 9 >= 12 ? ' PM' : ' AM'}
                  </span>
                ))}
              </div>
              {[0, 1, 2, 3, 4].map((day) => (
                <div className="timetable-day-column" key={day}>
                  {sessions
                    .filter((session) => session.day === day)
                    .map((session) => {
                      const course = courses.find((item) => item.id === session.courseId);
                      if (!course) return null;
                      return (
                        <button
                          key={session.id}
                          className={`timetable-event tone-${course.tone}`}
                          style={{
                            top: `${timePosition(session.start)}%`,
                            height: `calc(${timePosition(session.end) - timePosition(session.start)}% - 5px)`,
                          }}
                          onClick={() => openDialog({ type: 'course', id: course.id })}
                          aria-label={`${course.title}, ${formatDate(dateForDay(day), { weekday: 'long' })}, ${formatTime(session.start)}, ${session.location}`}
                        >
                          <strong>{course.code}</strong>
                          <span>{course.shortTitle}</span>
                          <span>{formatTime(session.start)}</span>
                          <small>{session.location}</small>
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === 'exams' && view === 'calendar' && (
        <div className="exam-calendar-scroll">
          <div className="exam-calendar">
            <div className="exam-calendar-weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="exam-calendar-days">
              {Array.from({ length: 14 }, (_, index) => {
                const day = index + 1;
                const exam = exams.find((item) => Number(item.date.slice(-2)) === day);
                const course = courses.find((item) => item.id === exam?.courseId);
                return (
                  <div className={`exam-calendar-day ${exam ? 'has-exam' : ''}`} key={day}>
                    <span>{day}</span>
                    {exam && course && (
                      <button
                        className={`exam-calendar-event tone-${course.tone}`}
                        onClick={() => openDialog({ type: 'course', id: course.id })}
                      >
                        <strong>{course.code}</strong>
                        <span>{formatTime(exam.start)}</span>
                        <small>{exam.location}</small>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {view === 'list' && (
        <div className="table-scroll dialog-table">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">COURSE</th>
                <th scope="col">{tab === 'classes' ? 'DAY' : 'DATE'}</th>
                <th scope="col">TIME</th>
                <th scope="col">LOCATION</th>
              </tr>
            </thead>
            <tbody>
              {(tab === 'classes'
                ? sessions.map((session) => ({ ...session, date: dateForDay(session.day) }))
                : exams
              ).map((item) => {
                const course = courses.find((c) => c.id === item.courseId);
                if (!course) return null;
                return (
                  <tr key={item.id}>
                    <td>
                      <button
                        className="text-course-button"
                        onClick={() => openDialog({ type: 'course', id: course.id })}
                      >
                        <strong>{course.code}</strong>
                        <span>{course.shortTitle}</span>
                      </button>
                    </td>
                    <td>{formatDate(item.date, { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                    <td className="nowrap">
                      {formatTime(item.start)} - {formatTime(item.end)}
                    </td>
                    <td>{item.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="inline-notice">
        <Info size={15} />
        {tab === 'classes'
          ? 'This demo uses a fixed week. Calendar exports contain this week only.'
          : 'Student view is read-only. Exam generation and conflict resolution are planned for the Registration Office workspace.'}
      </p>
    </>
  );
}

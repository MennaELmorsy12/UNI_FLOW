import { useState } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowRight, CalendarDays, FileText, Info, MapPin } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/FeedbackStates';
import { SegmentedControl } from '../ui/SegmentedControl';
import { CourseMark } from '../academic/CourseMark';
import { dateForDay, downloadText, formatDate, formatTime } from '../../utils/format';

export interface CourseContentProps {
  id: string;
}

export function CourseContent({ id }: CourseContentProps) {
  const { data, openDialog, notify } = usePortal();
  const [tab, setTab] = useState<'overview' | 'materials' | 'grades' | 'announcements'>('overview');
  const course = data?.courses.find((item) => item.id === id);
  if (!course || !data) {
    return <EmptyState title="Course not found" description="Return to your course list and try again." />;
  }
  const courseSessions = data.sessions.filter((session) => session.courseId === id);

  return (
    <>
      <button className="back-link" onClick={() => openDialog({ type: 'courses' })}>
        <ArrowLeft size={14} />
        All my courses
      </button>
      <div className="course-detail-heading">
        <CourseMark course={course} />
        <div>
          <Badge tone={course.tone}>{course.code}</Badge>
          <h3>{course.title}</h3>
          <span>{course.credits} credit hours / Spring 2025</span>
        </div>
      </div>
      <div className="course-instructor">
        <Avatar initials={course.initials} tone={course.tone} />
        <div>
          <span>Your instructor</span>
          <strong>{course.instructor}</strong>
        </div>
        <div className="course-current-grade">
          <span>Current grade</span>
          <strong>
            {course.grade}
            <small>{course.score}%</small>
          </strong>
        </div>
      </div>
      <SegmentedControl
        label="Course information"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'overview', label: 'Overview' },
          { value: 'materials', label: 'Materials' },
          { value: 'grades', label: 'Grades' },
          { value: 'announcements', label: 'Announcements' },
        ]}
      />
      <div className="course-tab-content">
        {tab === 'overview' && (
          <>
            <h4>About this course</h4>
            <p>{course.description}</p>
            <h4 className="section-spaced">Your weekly classes</h4>
            {courseSessions.map((session) => (
              <div className="course-session-detail" key={session.id}>
                <CalendarDays size={17} />
                <div>
                  <strong>{formatDate(dateForDay(session.day), { weekday: 'long' })}</strong>
                  <span>
                    {formatTime(session.start)} - {formatTime(session.end)}
                  </span>
                </div>
                <span>
                  <MapPin size={13} />
                  {session.location}
                </span>
                <Badge>{session.kind}</Badge>
              </div>
            ))}
            <div className="inline-notice">
              <Info size={15} />
              You're {course.progress}% through the course. Keep your momentum going.
            </div>
          </>
        )}
        {tab === 'materials' && (
          <>
            <h4>Learning materials</h4>
            <p>Sample study resources, ready to take with you.</p>
            {course.materials.map((material) => (
              <button
                className="material-row"
                key={material.title}
                onClick={() => {
                  downloadText(
                    `${course.code}-${material.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`,
                    material.content
                  );
                  notify('Sample learning material downloaded.');
                }}
              >
                <span className={`material-icon tone-${course.tone}`}>
                  <FileText size={21} />
                </span>
                <span>
                  <strong>{material.title}</strong>
                  <span>{material.type} / TXT</span>
                </span>
                <ArrowDownToLine size={17} />
              </button>
            ))}
          </>
        )}
        {tab === 'grades' && (
          <>
            <div className="course-grade-summary">
              <span>Current course average</span>
              <strong>
                {course.score}
                <small>/ 100</small>
              </strong>
              <Badge tone="green">{course.grade}</Badge>
            </div>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">ASSESSMENT</th>
                    <th scope="col">WEIGHT</th>
                    <th scope="col">SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Assignment portfolio', weight: '25%', score: course.score - 2 },
                    { name: 'Midterm examination', weight: '50%', score: course.score },
                    { name: 'Participation & labs', weight: '25%', score: course.score + 2 },
                  ].map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.weight}</td>
                      <td>
                        <strong>{item.score}/100</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="inline-notice">
              <Info size={14} />
              In-progress mock grades. Final examination results are not included.
            </p>
          </>
        )}
        {tab === 'announcements' && (
          <article className="course-announcement">
            <div>
              <Avatar initials={course.initials} tone={course.tone} size="small" />
              <strong>{course.instructor}</strong>
              <span>May 16, 2025</span>
            </div>
            <h4>Week 12 materials are ready</h4>
            <p>
              Please review the latest learning materials before our next class. Bring your questions and be ready to
              work through a few examples together. You're making great progress!
            </p>
            <Button variant="secondary" size="small" onClick={() => setTab('materials')}>
              Browse materials
              <ArrowRight size={14} />
            </Button>
          </article>
        )}
      </div>
    </>
  );
}

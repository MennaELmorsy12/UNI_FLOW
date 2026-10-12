import { ArrowDownToLine, ArrowUpRight, BookOpen } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Panel, PanelHeader } from '../ui/Panel';
import { Avatar } from '../ui/Avatar';
import { IconButton, TextLink } from '../ui/Button';
import { EmptyState } from '../ui/FeedbackStates';
import { CourseMark } from '../academic/CourseMark';
import { downloadText } from '../../utils/format';
import type { Course } from '../../types/portal';

export interface CourseListWidgetProps {
  courses: Course[];
  limit?: number;
}

export function CourseListWidget({
  courses,
  limit = 3,
}: CourseListWidgetProps) {
  const { openDialog, notify } = usePortal();

  return (
    <Panel className="courses-panel">
      <PanelHeader
        title="Your courses"
        aside={
          <TextLink onClick={() => openDialog({ type: 'courses' })}>
            View all {courses.length} courses
          </TextLink>
        }
      />
      {courses.length > 0 ? (
        <div className="table-scroll">
          <table className="data-table course-preview-table">
            <thead>
              <tr>
                <th scope="col">COURSE</th>
                <th scope="col">INSTRUCTOR</th>
                <th scope="col">COURSE PROGRESS</th>
                <th scope="col">CREDITS</th>
                <th scope="col">
                  <span className="sr-only">View course</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.slice(0, limit).map((course) => (
                <tr key={course.id}>
                  <td>
                    <button
                      className="table-course-name"
                      onClick={() => openDialog({ type: 'course', id: course.id })}
                    >
                      <CourseMark course={course} />
                      <span>
                        <strong>{course.title}</strong>
                        <span>{course.code}</span>
                      </span>
                    </button>
                  </td>
                  <td>
                    <span className="instructor-cell">
                      <Avatar initials={course.initials} tone={course.tone} size="small" />
                      {course.instructor}
                    </span>
                  </td>
                  <td>
                    <span className="course-progress">
                      <span className="progress-track">
                        <span style={{ width: `${course.progress}%` }} />
                      </span>
                      <span>{course.progress}%</span>
                    </span>
                  </td>
                  <td>{course.credits}</td>
                  <td>
                    <IconButton
                      label={`View ${course.title}`}
                      onClick={() => openDialog({ type: 'course', id: course.id })}
                    >
                      <ArrowUpRight size={17} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No courses registered"
          description="Your enrolled courses will appear here once registered."
          icon={BookOpen}
        />
      )}
      <div className="courses-note">
        <BookOpen size={13} />
        <span>A good week starts with a little preparation.</span>
        <button
          onClick={() => {
            const contents = [
              'Course,Title,Instructor,Credits',
              ...courses.map((course) => `${course.code},"${course.title}","${course.instructor}",${course.credits}`),
            ].join('\n');
            downloadText('uniflow-my-courses.csv', contents, 'text/csv;charset=utf-8');
            notify('Your course list is ready to download.');
          }}
        >
          <ArrowDownToLine size={13} />
          Export courses
        </button>
      </div>
    </Panel>
  );
}

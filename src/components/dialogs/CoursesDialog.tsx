import { useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/FeedbackStates';
import { CourseMark } from '../academic/CourseMark';

export function CoursesContent() {
  const { data, openDialog } = usePortal();
  const [query, setQuery] = useState('');
  if (!data) return null;
  const courses = data.courses.filter((course) =>
    `${course.title} ${course.code} ${course.instructor}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="search-field">
        <Search size={18} />
        <input
          aria-label="Search your courses"
          placeholder="Search by course, code, or instructor..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="list-heading">
        <span>
          {courses.length} {courses.length === 1 ? 'course' : 'courses'}
        </span>
        <span>
          {data.student.semester} / {data.courses.reduce((sum, course) => sum + course.credits, 0)} credits
        </span>
      </div>
      <div className="browse-course-list">
        {courses.map((course) => (
          <button
            className="browse-course-row"
            key={course.id}
            onClick={() => openDialog({ type: 'course', id: course.id })}
          >
            <CourseMark course={course} />
            <span className="browse-course-info">
              <strong>{course.title}</strong>
              <span>
                {course.code}
                <i className="inline-dot" />
                {course.instructor}
              </span>
              <span className="browse-progress">
                <span className="progress-track">
                  <span style={{ width: `${course.progress}%` }} />
                </span>
                {course.progress}% complete
              </span>
            </span>
            <Badge>{course.credits} credits</Badge>
            <ChevronRight size={17} />
          </button>
        ))}
      </div>
      {!courses.length && (
        <EmptyState
          title="No courses found"
          description="Try a different course code, name, or instructor."
        />
      )}
    </>
  );
}

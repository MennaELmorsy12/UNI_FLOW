import { CheckCircle2, CircleSlash } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/FeedbackStates';

export function AttendanceContent() {
  const { data } = usePortal();
  if (!data) return null;

  const avgAttendance = data.courses.length
    ? Math.round(data.courses.reduce((sum, course) => sum + course.attendance, 0) / data.courses.length)
    : 0;

  return (
    <>
      <div className="attendance-intro">
        <div className="attendance-ring">
          <span>
            {avgAttendance}<small>%</small>
          </span>
        </div>
        <div>
          <h3>Consistency looks good on you.</h3>
          <p>Your overall attendance is {avgAttendance >= 75 ? 'above' : 'below'} the university's 75% minimum.</p>
          <Badge tone={avgAttendance >= 75 ? 'green' : 'amber'}>
            <CheckCircle2 size={12} />
            {avgAttendance >= 75 ? 'In good standing' : 'Review attendance'}
          </Badge>
        </div>
      </div>
      {data.courses.length > 0 ? (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">COURSE</th>
                <th scope="col">ATTENDED</th>
                <th scope="col">ATTENDANCE</th>
              </tr>
            </thead>
            <tbody>
              {data.courses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <span className="grade-course">
                      <strong>{course.code}</strong>
                      <span>{course.shortTitle}</span>
                    </span>
                  </td>
                  <td>{Math.round(course.attendance / 4)} / 25 sessions</td>
                  <td>
                    <span className="attendance-percentage">
                      <span className="progress-track">
                        <span style={{ width: `${course.attendance}%` }} />
                      </span>
                      <strong>{course.attendance}%</strong>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No attendance records"
          description="Attendance records will appear here once sessions are recorded."
          icon={CircleSlash}
        />
      )}
    </>
  );
}

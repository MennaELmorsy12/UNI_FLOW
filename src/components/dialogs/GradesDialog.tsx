import { Download, GraduationCap, TrendingUp, BookOpen } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/FeedbackStates';
import { GpaChart } from '../GpaChart';
import { downloadText } from '../../utils/format';

export function GradesContent() {
  const { data, notify } = usePortal();
  if (!data) return null;

  const gpaDiff = data.student.previousGpa
    ? (data.student.gpa - data.student.previousGpa).toFixed(2)
    : '0.00';
  const hasCourses = data.courses.length > 0;

  return (
    <>
      <div className="academic-summary">
        <div>
          <span>Cumulative GPA</span>
          <strong>
            {data.student.gpa.toFixed(2)}
            <small>/ 4.00</small>
          </strong>
          <Badge tone={Number(gpaDiff) >= 0 ? 'green' : 'amber'}>
            <TrendingUp size={12} />
            {Number(gpaDiff) >= 0 ? `+${gpaDiff}` : gpaDiff} this semester
          </Badge>
        </div>
        <div className="degree-progress">
          <GraduationCap size={27} strokeWidth={1.5} />
          <strong>
            {data.student.earnedCredits}
            <small> / {data.student.requiredCredits || 120}</small>
          </strong>
          <span>credits towards your degree</span>
          <span className="progress-track">
            <span
              style={{
                width: `${data.student.requiredCredits ? (data.student.earnedCredits / data.student.requiredCredits) * 100 : 0}%`,
              }}
            />
          </span>
        </div>
      </div>
      <GpaChart data={data.gpaHistory} />
      <div className="list-heading">
        <h3>{data.student.semester || 'Current Semester'}</h3>
        <Badge>In progress</Badge>
      </div>
      {hasCourses ? (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">COURSE</th>
                <th scope="col">CREDITS</th>
                <th scope="col">SCORE</th>
                <th scope="col">GRADE</th>
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
                  <td>{course.credits}</td>
                  <td>{course.score}%</td>
                  <td>
                    <Badge tone={course.grade === 'B+' ? 'blue' : 'green'}>{course.grade}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No graded courses"
          description="Course assessments and grades will appear here as they are published."
          icon={BookOpen}
        />
      )}
      <div className="dialog-footer">
        <p>Unofficial academic snapshot. Not a transcript.</p>
        <Button
          variant="secondary"
          size="small"
          disabled={!hasCourses}
          onClick={() => {
            downloadText(
              'uniflow-grade-summary.csv',
              [
                'Course,Title,Credits,Score,Grade',
                ...data.courses.map((course) => `${course.code},"${course.title}",${course.credits},${course.score},${course.grade}`),
              ].join('\n'),
              'text/csv;charset=utf-8'
            );
            notify('Your unofficial grade summary is ready.');
          }}
        >
          <Download size={14} />
          Export summary
        </Button>
      </div>
    </>
  );
}

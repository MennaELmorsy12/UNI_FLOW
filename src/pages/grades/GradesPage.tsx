
import { motion } from 'motion/react';
import {
  Award,
  BookOpen,
  TrendingUp,
  Download,
  CheckCircle2,
} from 'lucide-react';

const semesterGrades = [
  {
    code: 'CS301',
    course: 'Database Systems',
    credits: 3,
    score: 92,
    grade: 'A',
    status: 'Passed',
  },
  {
    code: 'CS302',
    course: 'Software Engineering',
    credits: 3,
    score: 88,
    grade: 'B+',
    status: 'Passed',
  },
  {
    code: 'CS303',
    course: 'Computer Networks',
    credits: 3,
    score: 95,
    grade: 'A+',
    status: 'Passed',
  },
  {
    code: 'CS304',
    course: 'Operating Systems',
    credits: 3,
    score: 84,
    grade: 'B',
    status: 'Passed',
  },
  {
    code: 'CS305',
    course: 'Web Development',
    credits: 3,
    score: 90,
    grade: 'A',
    status: 'Passed',
  },
];

export default function GradesPage() {
  const average =
    semesterGrades.reduce((sum, item) => sum + item.score, 0) /
    semesterGrades.length;

  return (
    <motion.div
      className="grades-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="grades-header">
        <div>
          <span className="grades-eyebrow">ACADEMIC RECORD</span>
          <h1>My Grades</h1>
          <p>Track your academic performance and semester results.</p>
        </div>

        <button
          className="grades-export-btn"
          onClick={() => window.print()}
        >
          <Download size={17} />
          Export Results
        </button>
      </div>

      <div className="grades-summary">
        <div className="grades-summary-card">
          <div className="grades-card-icon green">
            <Award size={22} />
          </div>
          <div>
            <p>Semester Average</p>
            <h2>{average.toFixed(1)}%</h2>
            <span className="grades-positive">
              <TrendingUp size={14} /> Current semester
            </span>
          </div>
        </div>

        <div className="grades-summary-card">
          <div className="grades-card-icon blue">
            <BookOpen size={22} />
          </div>
          <div>
            <p>Completed Courses</p>
            <h2>{semesterGrades.length}</h2>
            <span className="grades-muted">This semester</span>
          </div>
        </div>

        <div className="grades-summary-card">
          <div className="grades-card-icon purple">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p>Passed Courses</p>
            <h2>
              {semesterGrades.filter((item) => item.status === 'Passed').length}
            </h2>
            <span className="grades-positive">All courses passed</span>
          </div>
        </div>
      </div>

      <section className="grades-table-section">
        <div className="grades-section-heading">
          <div>
            <h2>Semester Results</h2>
            <p>Fall Semester · Sample results</p>
          </div>

          <span className="grades-semester-badge">2026 / 2027</span>
        </div>

        <div className="grades-table-wrapper">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Credits</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {semesterGrades.map((item) => (
                <tr key={item.code}>
                  <td>
                    <div className="grades-course">
                      <span className="grades-course-icon">
                        <BookOpen size={17} />
                      </span>
                      <div>
                        <strong>{item.course}</strong>
                        <small>{item.code}</small>
                      </div>
                    </div>
                  </td>

                  <td>{item.credits}</td>

                  <td>
                    <div className="grades-score">
                      <strong>{item.score}%</strong>
                      <div className="grades-progress">
                        <span style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="grades-letter">{item.grade}</span>
                  </td>

                  <td>
                    <span className="grades-status">
                      <CheckCircle2 size={14} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="grades-note">
          Note: These are sample results for the interface. Actual grades
          will come from the university database when the API is connected.
        </p>
      </section>
    </motion.div>
  );
}

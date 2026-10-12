import { motion } from 'motion/react';
import { BookOpen, CalendarDays, CircleCheck, ClipboardList, GraduationCap, TrendingUp } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { ErrorState, LoadingState } from '../../components/ui/FeedbackStates';
import {
  MetricCard,
  WelcomeBanner,
  ScheduleWidget,
  DeadlinesWidget,
  PerformanceWidget,
  NotificationsWidget,
  CourseListWidget,
} from '../../components/dashboard';
import { formatDate } from '../../utils/format';
import { DEMO_TODAY } from '../../data/mock';

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function StudentDashboard() {
  const { data, loading, error, reload, openDialog } = usePortal();

  if (loading) return <LoadingState />;
  if (error || !data) return <ErrorState message={error ?? 'Your dashboard is unavailable.'} onRetry={reload} />;

  const { student, courses, sessions, assignments, notifications, gpaHistory } = data;
  const pendingTasks = assignments.filter((item) => !item.completed);
  const attendance = Math.round(courses.reduce((sum, course) => sum + course.attendance, 0) / courses.length);
  const nearDeadlines = pendingTasks.filter((item) => item.due.slice(0, 10) <= '2025-05-22').length;
  const credits = courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <motion.div
      className="dashboard"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      <motion.div variants={reveal} className="page-heading">
        <div>
          <div className="page-title-line">
            <h1>Dashboard</h1>
            <span className="page-title-dot" />
          </div>
          <p>Your campus life, a little more in flow.</p>
        </div>
        <div className="today-label">
          <CalendarDays size={16} strokeWidth={1.6} />
          <span>
            {formatDate(DEMO_TODAY, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </motion.div>

      <motion.div variants={reveal}>
        <WelcomeBanner
          firstName={student.firstName || student.name || 'Student'}
          classCount={sessions.length}
          deadlineCount={nearDeadlines}
        />
      </motion.div>

      <motion.div className="metrics-grid" variants={reveal}>
        <MetricCard
          label="Enrolled courses"
          value={courses.length}
          icon={<BookOpen size={18} strokeWidth={1.7} />}
          tone="green"
          onClick={() => openDialog({ type: 'courses' })}
        >
          <span>{credits} credit hours this semester</span>
        </MetricCard>

        <MetricCard
          label="Cumulative GPA"
          value={student.gpa.toFixed(2)}
          suffix="/ 4.00"
          icon={<GraduationCap size={19} strokeWidth={1.7} />}
          tone="purple"
          onClick={() => openDialog({ type: 'grades' })}
        >
          <span className="positive">
            <TrendingUp size={12} />+{(student.gpa - student.previousGpa).toFixed(2)}
          </span>
          <span>vs. last semester</span>
        </MetricCard>

        <MetricCard
          label="Attendance"
          value={`${attendance}%`}
          icon={<CircleCheck size={18} strokeWidth={1.7} />}
          tone="blue"
          onClick={() => openDialog({ type: 'attendance' })}
        >
          <span className="small-status-dot" />
          <span>You're showing up. Keep it up!</span>
        </MetricCard>

        <MetricCard
          label="Pending tasks"
          value={pendingTasks.length.toString().padStart(2, '0')}
          icon={<ClipboardList size={18} strokeWidth={1.7} />}
          tone="amber"
          onClick={() => openDialog({ type: 'tasks' })}
        >
          <span className="amber-text">
            {pendingTasks.filter((task) => task.due.startsWith('2025-05-20')).length} due tomorrow
          </span>
          <span className="meta-dot" />
          <span>Stay on track</span>
        </MetricCard>
      </motion.div>

      <motion.div className="dashboard-columns" variants={reveal}>
        <ScheduleWidget sessions={sessions} courses={courses} initialDay={0} />
        <DeadlinesWidget assignments={assignments} courses={courses} limit={3} />
      </motion.div>

      <motion.div className="dashboard-columns secondary-columns" variants={reveal}>
        <PerformanceWidget
          gpa={student.gpa}
          gpaHistory={gpaHistory}
          diff={student.gpa - student.previousGpa}
        />
        <NotificationsWidget notifications={notifications} limit={3} />
      </motion.div>

      <motion.div variants={reveal}>
        <CourseListWidget courses={courses} limit={3} />
      </motion.div>
    </motion.div>
  );
}
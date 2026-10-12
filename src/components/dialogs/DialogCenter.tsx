import { usePortal } from '../../context/PortalContext';
import { Modal } from '../ui';
import { AttendanceContent, CourseContent, CoursesContent, GradesContent, ProfileContent, ScheduleContent, TasksContent } from './AcademicDialogs';
import { NotificationsContent, SearchContent, SupportContent } from './UtilityDialogs';
import type { PortalDialog } from '../../types/portal';

const titles: Record<PortalDialog['type'], { title: string; description?: string; wide?: boolean }> = {
  search: { title: 'A little shortcut' },
  schedule: { title: 'Your schedule', description: 'Make room for what matters.', wide: true },
  courses: { title: 'My courses', description: 'Your learning journey, one course at a time.' },
  course: { title: 'Course overview', description: 'Everything you need for your next class.', wide: true },
  grades: { title: 'Your academic progress', description: 'The bigger picture of all your hard work.', wide: true },
  attendance: { title: 'Your attendance', description: 'Every class is another step forward.' },
  tasks: { title: 'Your task list', description: 'A little preparation makes a big difference.' },
  notifications: { title: 'Your notifications', description: 'The important things, all in one place.' },
  profile: { title: 'My profile', description: 'A little about you.' },
  support: { title: 'Here to help', description: "Whatever the question, let's find your next step." },
};

export default function DialogCenter() {
  const { dialog, closeDialog, data } = usePortal();
  if (!dialog || !data) return null;
  const options = titles[dialog.type];
  const key = `${dialog.type}:${'id' in dialog ? dialog.id ?? '' : ''}`;
  return <Modal key={key} {...options} onClose={closeDialog} className={dialog.type === 'search' ? 'search-dialog' : undefined}>
    {dialog.type === 'search' && <SearchContent />}
    {dialog.type === 'schedule' && <ScheduleContent initialTab={dialog.tab} />}
    {dialog.type === 'courses' && <CoursesContent />}
    {dialog.type === 'course' && <CourseContent id={dialog.id} />}
    {dialog.type === 'grades' && <GradesContent />}
    {dialog.type === 'attendance' && <AttendanceContent />}
    {dialog.type === 'tasks' && <TasksContent selectedId={dialog.id} />}
    {dialog.type === 'notifications' && <NotificationsContent selectedId={dialog.id} />}
    {dialog.type === 'profile' && <ProfileContent />}
    {dialog.type === 'support' && <SupportContent />}
  </Modal>;
}
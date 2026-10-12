import {
  LayoutDashboard, BookOpen, BookOpenCheck, CalendarDays, ChartNoAxesCombined,
  Bell, UserRound, Settings, CircleHelp, UsersRound, Upload, ClipboardList,
  SlidersHorizontal, ShieldCheck, CalendarCheck2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Role } from '../types/portal';

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
  group: 'workspace' | 'personal';
  features?: string[];
}

export const roleLabels: Record<Role, string> = {
  student: 'Student', doctor: 'Instructor', registration: 'Registration Office', admin: 'Administrator',
};

const item = (label: string, path: string, icon: LucideIcon, features: string[] = [], group: NavigationItem['group'] = 'workspace'): NavigationItem => ({ label, path, icon, features, group });

export const navigation: Record<Role, NavigationItem[]> = {
  student: [
    item('Dashboard', 'dashboard', LayoutDashboard),
    item('My Courses', 'courses', BookOpen, ['Enrolled courses and instructor information', 'Course materials, grades, and announcements']),
    item('Course Registration', 'registration', BookOpenCheck, ['Available courses and section capacity', 'Add/drop, credit limits, and conflict warnings']),
    item('Schedule', 'schedule', CalendarDays, ['Weekly class timetable', 'Published exam schedule']),
    item('Grades', 'grades', ChartNoAxesCombined, ['Per-semester grade breakdown', 'Cumulative GPA and academic trends']),
    item('Notifications', 'notifications', Bell, ['Your academic notification feed', 'Read status and notification preferences']),
    item('My Profile', 'profile', UserRound, ['Student information and academic advisor', 'Contact details and profile editing'], 'personal'),
    item('Settings', 'settings', Settings, ['Appearance and accessibility', 'Notification and account preferences'], 'personal'),
    item('Help & Support', 'support', CircleHelp, ['Searchable frequently asked questions', 'Contact form and support ticket tracking'], 'personal'),
  ],
  doctor: [
    item('Dashboard', 'dashboard', LayoutDashboard, ['Teaching overview and upcoming classes', 'Grading reminders and recent activity']),
    item('My Courses', 'courses', BookOpen, ['Course details and learning materials', 'Class announcements']),
    item('Students', 'students', UsersRound, ['Searchable student directory', 'Per-course filtering']),
    item('Upload Grades', 'grades', Upload, ['Table-based grade entry and CSV import', 'Save drafts and publish results']),
    item('Notifications', 'notifications', Bell, ['Teaching and course notifications']),
    item('Profile & Settings', 'settings', Settings, ['Instructor profile and preferences'], 'personal'),
  ],
  registration: [
    item('Dashboard', 'dashboard', LayoutDashboard, ['Pending requests and capacity statistics', 'Registration activity overview']),
    item('Registration Requests', 'requests', ClipboardList, ['Review, approve, or reject requests', 'Filters and bulk actions']),
    item('Registration Rules', 'rules', SlidersHorizontal, ['Subject and section status controls', 'Seat caps and rule editing']),
    item('Exam Scheduling', 'exams', CalendarCheck2, ['Generate a mock exam timetable', 'Preview, resolve conflicts, adjust, and publish']),
  ],
  admin: [
    item('Dashboard', 'dashboard', LayoutDashboard, ['System-wide statistics', 'Role and campus activity overview']),
    item('Permissions', 'permissions', ShieldCheck, ['User search and role assignment', 'Granular permission matrix']),
    item('Exam Scheduling', 'exams', CalendarCheck2, ['Generate and preview examination schedules', 'Conflict resolution and publishing']),
  ],
};

export function roleFromPath(pathname: string): Role {
  const segment = pathname.split('/')[1];
  return segment === 'doctor' || segment === 'registration' || segment === 'admin' ? segment : 'student';
}
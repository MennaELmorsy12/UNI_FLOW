export type Role = 'student' | 'doctor' | 'registration' | 'admin';
export type Tone = 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'neutral';

export interface Student {
  id: string;
  name: string;
  firstName: string;
  email: string;
  program: string;
  year: string;
  advisor: string;
  semester: string;
  gpa: number;
  previousGpa: number;
  earnedCredits: number;
  requiredCredits: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  instructor: string;
  initials: string;
  credits: number;
  tone: Tone;
  progress: number;
  attendance: number;
  grade: string;
  score: number;
  description: string;
  materials: { title: string; type: string; content: string }[];
}

export interface ClassSession {
  id: string;
  courseId: string;
  day: number;
  start: string;
  end: string;
  location: string;
  kind: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  due: string;
  type: 'Assignment' | 'Project' | 'Quiz';
  completed: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'registration' | 'grade' | 'exam' | 'announcement';
  read: boolean;
}

export interface Exam {
  id: string;
  courseId: string;
  date: string;
  start: string;
  end: string;
  location: string;
}

export interface GpaPoint {
  semester: string;
  shortLabel: string;
  value: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  message: string;
  createdAt: string;
  status: 'Open' | 'Resolved';
}

export interface DashboardData {
  student: Student;
  courses: Course[];
  sessions: ClassSession[];
  assignments: Assignment[];
  notifications: Notification[];
  exams: Exam[];
  gpaHistory: GpaPoint[];
}

export type PortalDialog =
  | { type: 'search' }
  | { type: 'schedule'; tab?: 'classes' | 'exams' }
  | { type: 'courses' }
  | { type: 'course'; id: string }
  | { type: 'grades' }
  | { type: 'attendance' }
  | { type: 'tasks'; id?: string }
  | { type: 'notifications'; id?: string }
  | { type: 'profile' }
  | { type: 'support' };
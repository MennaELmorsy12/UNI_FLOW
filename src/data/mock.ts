import type { DashboardData, SupportTicket } from '../types/portal';

export const DEMO_TODAY = new Date().toISOString().slice(0, 10);

export const dashboardSeed: DashboardData = {
  student: {
    id: '',
    name: '',
    firstName: '',
    email: '',
    program: '',
    year: '',
    advisor: '',
    semester: '',
    gpa: 0,
    previousGpa: 0,
    earnedCredits: 0,
    requiredCredits: 0,
  },
  courses: [],
  sessions: [],
  assignments: [],
  notifications: [],
  exams: [],
  gpaHistory: [],
};

export const ticketSeed: SupportTicket[] = [];
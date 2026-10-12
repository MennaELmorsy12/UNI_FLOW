import { DEMO_TODAY } from '../data/mock';
import type { DashboardData } from '../types/portal';

export function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
}

export function formatDate(date: string, options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date.length === 10 ? `${date}T12:00:00` : date));
}

export function dateForDay(day: number) {
  const date = new Date(`${DEMO_TODAY}T12:00:00`);
  date.setDate(date.getDate() + day);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function dueLabel(date: string) {
  const difference = Math.round((new Date(`${date.slice(0, 10)}T12:00:00`).getTime() - new Date(`${DEMO_TODAY}T12:00:00`).getTime()) / 86400000);
  if (difference === 0) return 'Today';
  if (difference === 1) return 'Tomorrow';
  return formatDate(date);
}

export function downloadText(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escapeIcs(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export function downloadCalendar(data: DashboardData, exams = false) {
  const events = exams
    ? data.exams.map((exam) => ({ ...exam, name: `${data.courses.find((course) => course.id === exam.courseId)?.title} - Final Exam` }))
    : data.sessions.map((session) => ({ ...session, date: dateForDay(session.day), name: data.courses.find((course) => course.id === session.courseId)?.title ?? 'Class' }));
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const content = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//UniFlow//Student Portal//EN', 'CALSCALE:GREGORIAN',
    ...events.flatMap((event) => [
      'BEGIN:VEVENT', `UID:${event.id}-${event.date}@uniflow.demo`, `DTSTAMP:${timestamp}`,
      `DTSTART:${event.date.replace(/-/g, '')}T${event.start.replace(':', '')}00`,
      `DTEND:${event.date.replace(/-/g, '')}T${event.end.replace(':', '')}00`,
      `SUMMARY:${escapeIcs(event.name)}`, `LOCATION:${escapeIcs(event.location)}`, 'END:VEVENT',
    ]),
    'END:VCALENDAR', '',
  ].join('\r\n');
  downloadText(exams ? 'uniflow-exams.ics' : 'uniflow-week-may-19.ics', content, 'text/calendar;charset=utf-8');
}
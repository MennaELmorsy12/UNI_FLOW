import { BookOpen, CodeXml, Database, Network, PanelsTopLeft, Sigma, type LucideIcon } from 'lucide-react';
import type { Course } from '../../types/portal';

export const courseIcons: Record<string, LucideIcon> = {
  cs201: CodeXml,
  math202: Sigma,
  cs205: Database,
  cs210: Network,
  cs220: PanelsTopLeft,
};

export interface CourseMarkProps {
  course: Course;
  small?: boolean;
}

export function CourseMark({ course, small = false }: CourseMarkProps) {
  const Icon = courseIcons[course.id] ?? BookOpen;
  return (
    <span className={`course-mark tone-${course.tone} ${small ? 'course-mark-small' : ''}`} aria-hidden="true">
      <Icon size={small ? 17 : 20} strokeWidth={1.7} />
    </span>
  );
}

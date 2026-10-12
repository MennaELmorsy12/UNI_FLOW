import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Layers3, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortal } from '../context/PortalContext';
import { navigation, roleFromPath, roleLabels } from '../config/navigation';
import { Badge, Button } from '../components/ui';
import type { PortalDialog } from '../types/portal';

const previews: Record<string, { label: string; dialog: PortalDialog }> = {
  courses: { label: 'Preview my course summary', dialog: { type: 'courses' } },
  schedule: { label: 'Open my schedule', dialog: { type: 'schedule' } },
  grades: { label: 'Preview my academic progress', dialog: { type: 'grades' } },
  notifications: { label: 'Open notification center', dialog: { type: 'notifications' } },
  profile: { label: 'Preview my profile', dialog: { type: 'profile' } },
  support: { label: 'Open help center', dialog: { type: 'support' } },
};

export default function ModulePreview() {
  const { pathname } = useLocation();
  const { courseId } = useParams();
  const { openDialog, theme, toggleTheme } = usePortal();
  const role = roleFromPath(pathname);
  const module = navigation[role].find((item) => pathname.startsWith(`/${role}/${item.path}`));
  const preview = module && role === 'student' ? previews[module.path] : null;
  const title = courseId ? 'Course details' : module?.label ?? 'Workspace';
  const Icon = module?.icon ?? Layers3;

  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="module-page"><div className="page-heading"><div><h1>{title}</h1><p>{roleLabels[role]} workspace</p></div><Badge tone="amber">Next stage</Badge></div><section className="module-preview"><div className="module-art"><span /><Icon size={38} strokeWidth={1.25} /><span /></div><span className="module-eyebrow">A THOUGHTFUL FOUNDATION</span><h2>A little more is on the way.</h2><p>The UniFlow design system and Student dashboard are ready for your review. This dedicated {title.toLowerCase()} page is reserved for the next build stage.</p>{role !== 'student' && <p className="module-role-note">You're previewing the {roleLabels[role].toLowerCase()} navigation, not a completed role dashboard.</p>}<ul className="module-features">{module?.features?.map((feature) => <li key={feature}><CheckCircle2 size={16} />{feature}</li>)}</ul><div className="module-actions">{preview && <Button onClick={() => openDialog(courseId ? { type: 'course', id: courseId } : preview.dialog)}>{preview.label}<ArrowRight size={15} /></Button>}{module?.path === 'settings' && role === 'student' && <Button onClick={toggleTheme}>{theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}Try {theme === 'light' ? 'dark' : 'light'} mode</Button>}<Link className="button button-secondary" to="/student/dashboard"><ArrowLeft size={15} />Back to Student dashboard</Link></div><div className="stage-progress"><span><Check size={13} />Design system</span><i /><span><Check size={13} />Student dashboard</span><i /><span className="stage-next">Your feedback</span></div></section></motion.div>;
}

export function NotFoundPage() {
  return <section className="not-found"><span className="module-eyebrow">404 / A SMALL DETOUR</span><h1>This page is off campus.</h1><p>Let's get you back to somewhere familiar.</p><Link className="button button-primary" to="/student/dashboard"><ArrowLeft size={15} />Back to dashboard</Link></section>;
}
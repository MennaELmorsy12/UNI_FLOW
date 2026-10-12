import {
  CalendarClock,
  CheckCircle,
  Database,
  GraduationCap,
  Layers,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

const modules = [
  {
    icon: Layers,
    tone: 'green',
    title: 'Smart Course Registration',
    description:
      'Dynamically enforces bylaws in real time. GPA ≥ 3.0 allows up to 7 courses (21 credits), while GPA < 3.0 limits registration to 6 courses. Scans prerequisites and locks unavailable courses with clear explanations.',
    tag: 'Bylaw Enforcement',
  },
  {
    icon: CalendarClock,
    tone: 'purple',
    title: 'Automated Exam & Timetable Scheduler',
    description:
      'Eliminates timetable clashes across all academic years. Calculates hall seating distribution automatically, providing dummy-location fallbacks if capacity overflows.',
    tag: 'Algorithmic Scheduling',
  },
  {
    icon: GraduationCap,
    tone: 'blue',
    title: 'Faculty Portal & Exception Management',
    description:
      'Role-based access control for professors to securely upload student grades. Handles academic edge cases such as formal semester freezes, medical postponements, and leaves.',
    tag: 'RBAC & Edge Cases',
  },
  {
    icon: Database,
    tone: 'amber',
    title: 'Automated Results Scraping Engine',
    description:
      'Periodically syncs student grades from existing academy result portals, normalizes data into internal records, and triggers instant GPA recalculation without manual data entry.',
    tag: 'Data Sync & Scraper',
  },
  {
    icon: CheckCircle,
    tone: 'green',
    title: 'Course Materials & Moodle Integration',
    description:
      'A centralized repository for syllabus, lecture slides, assignments, and sample notes. Integrates with Moodle LMS to keep resources and due dates synchronized in one view.',
    tag: 'Unified LMS Hub',
  },
  {
    icon: MessageSquare,
    tone: 'blue',
    title: 'Official Facebook Announcements Feed',
    description:
      'Live social integration pulling announcements and important notices directly from the academy official Facebook group, complete with smart search, tagging, and cached rate limits.',
    tag: 'Graph API Stream',
  },
  {
    icon: Sparkles,
    tone: 'purple',
    title: 'AI Graduation Project Evaluator',
    description:
      'Students submit graduation project proposals and receive instant viability scoring, technical feasibility analysis, and committee alignment suggestions powered by AI.',
    tag: 'Creative AI Mini-Module',
  },
];

export function LandingFeatures() {
  return (
    <section className="landing-section" id="features">
      <div className="landing-container">
        <div className="landing-section-header">
          <span className="landing-section-eyebrow">Comprehensive Architecture</span>
          <h2>Seven Core Modules. Zero Manual Friction.</h2>
          <p>
            UniFlow brings together academic bylaws, campus scheduling, and student engagement into
            a cohesive, modern system.
          </p>
        </div>

        <div className="landing-features-grid">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.title} className="landing-feature-card">
                <div className={`landing-feature-icon tone-${m.tone}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                <div className="landing-feature-tag">
                  <span className="status-dot" />
                  <span>{m.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

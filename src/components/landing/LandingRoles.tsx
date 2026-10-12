import { BookOpen, GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';

const roles = [
  {
    icon: GraduationCap,
    tone: 'green',
    title: 'Student Portal',
    description: 'Personalized academic headquarters for coursework, timetable, and degree progress.',
    features: [
      'Interactive weekly schedule & ICS export',
      'Unofficial GPA progress tracking',
      'Graduation project idea evaluator',
      'Integrated Moodle coursework materials',
    ],
  },
  {
    icon: BookOpen,
    tone: 'purple',
    title: 'Faculty & Professors',
    description: 'Tools for educators to submit grades, track attendance, and manage course offerings.',
    features: [
      'Direct grade uploading to student records',
      'Attendance records management',
      'Summer semester course offerings control',
      'Course announcement broadcasts',
    ],
  },
  {
    icon: UserCheck,
    tone: 'blue',
    title: 'Registration Office',
    description: 'Automated administrative engines for timetabling, exam halls, and academic exceptions.',
    features: [
      'Conflict-free exam timetable algorithm',
      'Hall seating & dummy overflow allocation',
      'Handling freezes and postponements',
      'Student registration approvals',
    ],
  },
  {
    icon: ShieldCheck,
    tone: 'amber',
    title: 'IT & Administration',
    description: 'System health monitoring, scraper job management, and role-based permissions.',
    features: [
      'Strict Role-Based Access Control (RBAC)',
      'Results scraper scheduling & monitoring',
      'Facebook Graph API token management',
      'Platform audit logs & diagnostics',
    ],
  },
];

export function LandingRoles() {
  return (
    <section className="landing-section" id="roles">
      <div className="landing-container">
        <div className="landing-section-header">
          <span className="landing-section-eyebrow">Role-Based Access Control</span>
          <h2>Tailored Workspaces for Every Campus Member</h2>
          <p>
            UniFlow enforces strict role separation so each user receives the exact tools and
            permissions they need.
          </p>
        </div>

        <div className="landing-roles-grid">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="landing-role-card">
                <div className={`landing-role-icon tone-${r.tone}`}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h4>{r.title}</h4>
                <p>{r.description}</p>
                <ul>
                  {r.features.map((feat) => (
                    <li key={feat}>
                      <span className="small-status-dot" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

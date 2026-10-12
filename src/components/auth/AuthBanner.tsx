import { CheckCircle2, School, ShieldCheck } from 'lucide-react';
import { Brand } from '../layout/Brand';

export function AuthBanner() {
  return (
    <div className="auth-panel-brand">
      <div className="auth-brand-top">
        <Brand />
        <h2>Welcome to the Campus Portal</h2>
        <p>
          A unified, error-free college management dashboard. Access course registration,
          exam timetables, and academic records under academy bylaws.
        </p>

        <div className="auth-brand-perks">
          <div className="auth-perk-item">
            <CheckCircle2 size={16} />
            <span>Real-time GPA-based credit hour validation</span>
          </div>
          <div className="auth-perk-item">
            <CheckCircle2 size={16} />
            <span>Conflict-free exam and lecture scheduling</span>
          </div>
          <div className="auth-perk-item">
            <CheckCircle2 size={16} />
            <span>Instant results syncing & GPA recalculation</span>
          </div>
          <div className="auth-perk-item">
            <ShieldCheck size={16} />
            <span>Strict Role-Based Access Control (RBAC)</span>
          </div>
        </div>
      </div>

      <div className="auth-brand-bottom">
        <School size={16} />
        <span>Modern Academy — Westbridge Campus System</span>
      </div>
    </div>
  );
}

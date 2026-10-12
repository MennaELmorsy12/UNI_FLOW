import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export function LandingCta() {
  return (
    <section className="landing-cta">
      <div className="landing-container">
        <div className="landing-cta-box">
          <div
            className="landing-badge"
            style={{ marginBottom: '16px', background: 'var(--surface)' }}
          >
            <Sparkles size={13} />
            <span>MODERN ACADEMY DIGITAL EXPERIENCE</span>
          </div>

          <h2>Experience your academic journey in flow.</h2>
          <p>
            Sign in to access your student dashboard, view your weekly timetable, track degree
            progress, and register for courses under college bylaws.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/login">
              <Button variant="primary">
                Sign In to Campus Portal
                <ArrowRight size={15} />
              </Button>
            </Link>
            <Link to="/student/dashboard">
              <Button variant="secondary">Preview Student View</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

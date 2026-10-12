import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

export function LandingHero() {
  return (
    <section className="landing-hero" id="overview">
      <div className="landing-hero-bg-glow" aria-hidden="true" />
      <div className="landing-container">
        <motion.div
          className="landing-hero-content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="landing-badge">
            <span className="landing-badge-dot" />
            <span>MODERN ACADEMY CAMPUS MANAGEMENT SYSTEM</span>
          </div>

          <h1>
            Academic operations, engineered with <span>precision & flow.</span>
          </h1>

          <p>
            An algorithmic college management dashboard replacing manual bottlenecks with
            real-time bylaw registration, conflict-free exam timetables, automated results scraping,
            and unified student-faculty collaboration.
          </p>

          <div className="landing-hero-actions">
            <Link to="/login">
              <Button variant="primary">
                Access Campus Portal
                <ArrowRight size={15} />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary">Explore Core Modules</Button>
            </a>
          </div>

          {/* Interactive Preview Showcase Card */}
          <motion.div
            className="landing-hero-preview"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="landing-preview-header">
              <div className="landing-preview-pills">
                <span />
                <span />
                <span />
              </div>
              <div className="landing-badge" style={{ margin: 0, padding: '3px 10px', fontSize: '9px' }}>
                <ShieldCheck size={13} />
                Bylaw Validation Engine Active
              </div>
            </div>

            <div className="landing-preview-grid">
              <div className="landing-preview-stat">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong>100%</strong>
                  <CheckCircle2 size={18} color="var(--green)" />
                </div>
                <span>Conflict-Free Exam Timetables</span>
              </div>

              <div className="landing-preview-stat">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong>Dynamic</strong>
                  <TrendingUp size={18} color="var(--purple-ink)" />
                </div>
                <span>GPA-Based Credit Hours (6 or 7 Courses)</span>
              </div>

              <div className="landing-preview-stat">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong>Automated</strong>
                  <Sparkles size={18} color="var(--blue-ink)" />
                </div>
                <span>External Results Scraping & Moodle Hub</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

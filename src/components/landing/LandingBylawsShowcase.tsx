import { useState } from 'react';
import { CheckCircle2, Lock, ShieldCheck, Unlock } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function LandingBylawsShowcase() {
  const [gpaMode, setGpaMode] = useState<'high' | 'standard'>('high');

  const isHighGpa = gpaMode === 'high';

  return (
    <section className="landing-section" id="bylaws" style={{ background: 'var(--surface-muted)' }}>
      <div className="landing-container">
        <div className="landing-section-header">
          <span className="landing-section-eyebrow">Algorithmic Governance</span>
          <h2>Automated College Bylaws in Real-Time</h2>
          <p>
            Human errors in registration limits and prerequisites are eliminated. The system enforces
            every bylaw dynamically on every action.
          </p>
        </div>

        <div className="landing-bylaw-box">
          <div className="landing-bylaw-info">
            <Badge tone="green">
              <ShieldCheck size={12} />
              Modern Academy Bylaws Ruleset
            </Badge>
            <h3 style={{ marginTop: '14px' }}>Transparent, Algorithmic Validation</h3>
            <p>
              Students see exactly why a course is locked or how many credits they can register.
              Faculty and registration staff retain full oversight over summer semester offerings.
            </p>

            <div className="landing-bylaw-rule-item">
              <CheckCircle2 size={18} />
              <div>
                <strong>Dynamic GPA-Based Credit Limits</strong>
                <span>
                  Students with GPA ≥ 3.0 can register for up to 7 courses (21 credits). Students with
                  GPA &lt; 3.0 are capped at 6 courses (18 credits).
                </span>
              </div>
            </div>

            <div className="landing-bylaw-rule-item">
              <CheckCircle2 size={18} />
              <div>
                <strong>Strict Prerequisite History Scanning</strong>
                <span>
                  The engine scans passed coursework. If CS 101 has not been cleared, CS 201 is locked
                  with a transparent on-screen reason.
                </span>
              </div>
            </div>

            <div className="landing-bylaw-rule-item">
              <CheckCircle2 size={18} />
              <div>
                <strong>Summer Semester Dynamic Configuration</strong>
                <span>
                  Department faculty can toggle course availability for summer terms with one click.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Simulator */}
          <div className="landing-bylaw-simulator">
            <div className="simulator-header">
              <span>Interactive Bylaws Preview</span>
              <div className="simulator-toggle">
                <button
                  type="button"
                  className={isHighGpa ? 'active' : ''}
                  onClick={() => setGpaMode('high')}
                >
                  GPA ≥ 3.0
                </button>
                <button
                  type="button"
                  className={!isHighGpa ? 'active' : ''}
                  onClick={() => setGpaMode('standard')}
                >
                  GPA &lt; 3.0
                </button>
              </div>
            </div>

            <div className="simulator-display">
              <div className="simulator-row">
                <span>Simulated GPA</span>
                <strong>{isHighGpa ? '3.82 (High Standing)' : '2.65 (Standard)'}</strong>
              </div>

              <div className="simulator-row">
                <span>Maximum Allowed Courses</span>
                <strong style={{ color: 'var(--green)' }}>
                  {isHighGpa ? '7 Courses (Max 21 Credits)' : '6 Courses (Max 18 Credits)'}
                </strong>
              </div>

              <div className="simulator-row">
                <span>CS 201 (Requires CS 101)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Unlock size={14} color="var(--green)" />
                  <span style={{ color: 'var(--green-ink)', fontWeight: 600 }}>Unlocked (Prereq Met)</span>
                </div>
              </div>

              <div className="simulator-row">
                <span>CS 310 (Requires CS 210)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} color="var(--red-ink)" />
                  <span style={{ color: 'var(--red-ink)', fontWeight: 600 }}>Locked: Needs CS 210</span>
                </div>
              </div>

              <div className="simulator-row">
                <span>Summer Registration</span>
                <Badge tone="purple">Faculty Configured</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

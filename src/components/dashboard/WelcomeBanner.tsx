import { ArrowRight } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export interface WelcomeBannerProps {
  firstName: string;
  classCount?: number;
  deadlineCount?: number;
  illustrationSrc?: string;
  onCtaClick?: () => void;
}

export function WelcomeBanner({
  firstName = 'Student',
  classCount = 0,
  deadlineCount = 0,
  illustrationSrc = '/images/study-illustration.png',
  onCtaClick,
}: WelcomeBannerProps) {
  const { openDialog } = usePortal();

  return (
    <section className="welcome-banner" aria-labelledby="welcome-title">
      <div className="welcome-content">
        <div className="welcome-eyebrow">A NEW WEEK. NEW POSSIBILITIES.</div>
        <h2 id="welcome-title">
          Good morning, {firstName}
          <span className="greeting-dot">.</span>
        </h2>
        <p>
          You've got <strong>{classCount} classes</strong> and{' '}
          <strong>{deadlineCount} upcoming deadlines.</strong>
          <br className="welcome-break" /> Let's make it a productive week.
        </p>
        <button
          className="welcome-cta"
          onClick={onCtaClick ?? (() => openDialog({ type: 'schedule' }))}
        >
          View my schedule
          <ArrowRight size={15} />
        </button>
      </div>
      <div className="welcome-art" aria-hidden="true">
        <img src={illustrationSrc} alt="" fetchPriority="high" />
      </div>
      <span className="welcome-line-art welcome-line-one" aria-hidden="true" />
      <span className="welcome-line-art welcome-line-two" aria-hidden="true" />
    </section>
  );
}

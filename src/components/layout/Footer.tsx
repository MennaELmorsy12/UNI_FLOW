import { ArrowUpRight } from 'lucide-react';

export interface FooterProps {
  onOpenSupport?: () => void;
}

export function Footer({ onOpenSupport }: FooterProps) {
  return (
    <footer className="workspace-footer">
      <span>
        <span className="footer-wordmark">UniFlow</span> A little more organized. A lot more you.
      </span>
      {onOpenSupport && (
        <button onClick={onOpenSupport}>
          Help center <ArrowUpRight size={12} />
        </button>
      )}
    </footer>
  );
}

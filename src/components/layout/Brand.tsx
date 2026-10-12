export interface BrandProps {
  compact?: boolean;
}

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className={`brand ${compact ? 'brand-compact' : ''}`}>
      <span className="brand-mark">
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M8 9v10a6 6 0 0 0 12 0V9"
            stroke="currentColor"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <path
            d="M24 8v10a9 9 0 0 1-9 9"
            stroke="currentColor"
            strokeWidth="3.8"
            strokeLinecap="round"
            opacity=".6"
          />
          <path d="m7 8 8-4 10 4-10 4-8-4Z" fill="currentColor" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-wordmark">
          Uni<span>Flow</span>
          <span className="brand-period">.</span>
        </span>
      )}
    </span>
  );
}

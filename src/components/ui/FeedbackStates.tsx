import { ReactNode } from 'react';
import { CircleAlert, SearchX, type LucideIcon } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon = SearchX,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={27} strokeWidth={1.5} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <EmptyState
      title="A small interruption"
      description={message}
      icon={CircleAlert}
      action={<Button onClick={onRetry}>Try again</Button>}
    />
  );
}

export function LoadingState() {
  return (
    <div className="dashboard-loading" role="status" aria-label="Loading your dashboard">
      <span className="sr-only">Loading your dashboard...</span>
      <div className="skeleton skeleton-heading" />
      <div className="skeleton skeleton-banner" />
      <div className="loading-stats">
        {[0, 1, 2, 3].map((item) => (
          <div className="skeleton" key={item} />
        ))}
      </div>
      <div className="loading-panels">
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Bell, CheckCheck } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/FeedbackStates';
import { SegmentedControl } from '../ui/SegmentedControl';
import { NotificationItem, notificationAppearance } from '../academic/NotificationItem';

export interface NotificationsContentProps {
  selectedId?: string;
}

export function NotificationsContent({ selectedId }: NotificationsContentProps) {
  const { data, openDialog, markRead, notify } = usePortal();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [busy, setBusy] = useState(false);
  if (!data) return null;

  const unread = data.notifications.filter((notification) => !notification.read);
  const selected = data.notifications.find((notification) => notification.id === selectedId);

  if (selected) {
    const { icon: Icon, tone } = notificationAppearance[selected.type];
    return (
      <>
        <button className="back-link" onClick={() => openDialog({ type: 'notifications' })}>
          <ArrowLeft size={14} />
          All notifications
        </button>
        <div className="notification-detail">
          <span className={`notification-detail-icon tone-${tone}`}>
            <Icon size={26} />
          </span>
          <span>{selected.time}</span>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
        </div>
        <div className="dialog-footer">
          <span className="read-status">
            <CheckCheck size={14} />
            Read
          </span>
          {selected.type === 'exam' && (
            <Button onClick={() => openDialog({ type: 'schedule', tab: 'exams' })}>
              View exam schedule
              <ArrowRight size={15} />
            </Button>
          )}
          {selected.type === 'grade' && (
            <Button onClick={() => openDialog({ type: 'grades' })}>
              View my grades
              <ArrowRight size={15} />
            </Button>
          )}
          {!['exam', 'grade'].includes(selected.type) && (
            <Button variant="secondary" onClick={() => openDialog({ type: 'notifications' })}>
              Back to notifications
            </Button>
          )}
        </div>
      </>
    );
  }

  const notifications = filter === 'all' ? data.notifications : unread;

  return (
    <>
      <div className="dialog-toolbar">
        <SegmentedControl
          label="Filter notifications"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'All updates' },
            { value: 'unread', label: `Unread (${unread.length})` },
          ]}
        />
        <Button
          variant="ghost"
          size="small"
          busy={busy}
          disabled={!unread.length}
          onClick={async () => {
            setBusy(true);
            await markRead(unread.map((item) => item.id));
            setBusy(false);
            notify('All notifications marked as read.');
          }}
        >
          <CheckCheck size={15} />
          Mark all read
        </Button>
      </div>
      <div className="full-notification-list">
        {notifications.map((notification) => (
          <NotificationItem notification={notification} key={notification.id} />
        ))}
      </div>
      {!notifications.length && (
        <EmptyState
          title="You're all caught up"
          description="No unread updates. We'll keep the important things here."
          icon={Bell}
        />
      )}
    </>
  );
}

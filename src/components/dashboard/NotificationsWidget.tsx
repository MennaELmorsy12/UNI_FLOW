import { CheckCheck } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { Panel, PanelHeader } from '../ui/Panel';
import { TextLink } from '../ui/Button';
import { NotificationItem } from '../academic/NotificationItem';
import type { Notification } from '../../types/portal';

export interface NotificationsWidgetProps {
  notifications: Notification[];
  limit?: number;
}

export function NotificationsWidget({
  notifications,
  limit = 3,
}: NotificationsWidgetProps) {
  const { openDialog, markRead, notify } = usePortal();
  const unread = notifications.filter((notification) => !notification.read);

  return (
    <Panel className="activity-panel">
      <PanelHeader
        title="Recent notifications"
        aside={<TextLink onClick={() => openDialog({ type: 'notifications' })}>View all</TextLink>}
      />
      <div className="notification-list">
        {notifications.slice(0, limit).map((notification) => (
          <NotificationItem notification={notification} key={notification.id} />
        ))}
      </div>
      <div className="panel-bottom">
        <button
          className="mark-read-link"
          disabled={!unread.length}
          onClick={() => {
            void markRead(unread.map((item) => item.id));
            notify('All caught up. Notifications marked as read.');
          }}
        >
          <CheckCheck size={15} />
          {unread.length ? 'Mark all as read' : "You're all caught up"}
        </button>
      </div>
    </Panel>
  );
}

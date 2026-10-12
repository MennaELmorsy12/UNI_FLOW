import { CalendarClock, CalendarPlus, Megaphone, Trophy, type LucideIcon } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import type { Notification, Tone } from '../../types/portal';

export const notificationAppearance: Record<Notification['type'], { icon: LucideIcon; tone: Tone }> = {
  registration: { icon: CalendarPlus, tone: 'green' },
  grade: { icon: Trophy, tone: 'amber' },
  exam: { icon: CalendarClock, tone: 'purple' },
  announcement: { icon: Megaphone, tone: 'blue' },
};

export interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { openDialog, markRead } = usePortal();
  const { icon: Icon, tone } = notificationAppearance[notification.type];

  return (
    <button
      className="notification-row"
      onClick={() => {
        void markRead([notification.id]);
        openDialog({ type: 'notifications', id: notification.id });
      }}
    >
      <span className={`notification-icon tone-${tone}`}>
        <Icon size={17} strokeWidth={1.7} />
      </span>
      <span className="notification-content">
        <span className="item-title">{notification.title}</span>
        <span className="notification-excerpt">{notification.description.split('. ')[0]}.</span>
        <span className="notification-time">{notification.time}</span>
      </span>
      {!notification.read && <span className="unread-dot" aria-label="Unread" />}
    </button>
  );
}

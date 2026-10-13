import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCheck,
  GraduationCap,
  Info,
  Check,
} from 'lucide-react';

type NotificationType = 'course' | 'exam' | 'grade' | 'general';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: 'New Grade Available',
    message: 'Your Web Development result is now available for review.',
    time: 'Today, 10:30 AM',
    type: 'grade',
    read: false,
  },
  {
    id: 2,
    title: 'Exam Schedule Update',
    message: 'Check your exam timetable for the latest schedule updates.',
    time: 'Yesterday, 2:15 PM',
    type: 'exam',
    read: false,
  },
  {
    id: 3,
    title: 'Course Registration',
    message: 'Remember to review your registered courses for this semester.',
    time: '2 days ago',
    type: 'course',
    read: true,
  },
  {
    id: 4,
    title: 'Welcome to UniFlow',
    message: 'You can use your student portal to access courses and academic records.',
    time: '3 days ago',
    type: 'general',
    read: true,
  },
];

const notificationIcons = {
  course: BookOpen,
  exam: CalendarDays,
  grade: GraduationCap,
  general: Info,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const visibleNotifications = notifications.filter(
    (notification) => filter === 'all' || !notification.read
  );

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  return (
    <motion.div
      className="notifications-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="notifications-header">
        <div>
          <p className="notifications-eyebrow">STAY UPDATED</p>
          <h1>Notifications</h1>
          <p>Keep track of your academic updates and announcements.</p>
        </div>

        <button
          className="notifications-mark-all"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </header>

      <section className="notifications-overview">
        <div className="notifications-overview-icon">
          <Bell size={24} />
        </div>

        <div>
          <h2>
            {unreadCount === 0
              ? 'You are all caught up!'
              : `You have ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`}
          </h2>
          <p>Here are the latest updates from your student portal.</p>
        </div>
      </section>

      <div className="notifications-list-header">
        <h2>Recent Activity</h2>

        <div className="notifications-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>

          <button
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => setFilter('unread')}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      <section className="notifications-list">
        {visibleNotifications.length > 0 ? (
          visibleNotifications.map((notification) => {
            const Icon = notificationIcons[notification.type];

            return (
              <article
                key={notification.id}
                className={`notification-card ${
                  notification.read ? 'is-read' : 'is-unread'
                }`}
              >
                <div className={`notification-icon ${notification.type}`}>
                  <Icon size={21} />
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{notification.title}</h3>

                    {!notification.read && (
                      <span className="notification-unread-dot" />
                    )}
                  </div>

                  <p>{notification.message}</p>

                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>

                {!notification.read && (
                  <button
                    className="notification-read-btn"
                    onClick={() => markAsRead(notification.id)}
                    aria-label={`Mark ${notification.title} as read`}
                    title="Mark as read"
                  >
                    <Check size={17} />
                  </button>
                )}
              </article>
            );
          })
        ) : (
          <div className="notifications-empty">
            <CheckCheck size={35} />
            <h3>No unread notifications</h3>
            <p>You're all caught up. Check back for future updates.</p>
          </div>
        )}
      </section>

      <p className="notifications-note">
        These are sample notifications for the frontend preview.
      </p>
    </motion.div>
  );
}
import { Bell, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react';
import { Avatar, STUDENT_AVATAR } from '../ui/Avatar';
import { IconButton } from '../ui/Button';

export interface TopbarProps {
  mobileOpen: boolean;
  theme: 'light' | 'dark';
  unreadCount: number;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export function Topbar({
  mobileOpen,
  theme,
  unreadCount,
  onOpenMobile,
  onOpenSearch,
  onToggleTheme,
  onOpenNotifications,
  onOpenProfile,
}: TopbarProps) {
  return (
    <header className="topbar">
      <IconButton
        className="mobile-menu"
        label="Open navigation"
        aria-controls="portal-sidebar"
        aria-expanded={mobileOpen}
        onClick={onOpenMobile}
      >
        <Menu size={22} />
      </IconButton>

      <button className="global-search" onClick={onOpenSearch}>
        <Search size={18} strokeWidth={1.8} />
        <span>Search anything...</span>
        <kbd>
          <span className="command-symbol">Ctrl</span> K
        </kbd>
      </button>

      <div className="topbar-actions">
        <span className="semester-label">
          <span className="status-dot" />
          Spring 2025
          <span className="semester-divider" />
          Week 12
        </span>
        <span className="header-divider" />
        <IconButton
          label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={onToggleTheme}
        >
          {theme === 'light' ? <Sun size={20} strokeWidth={1.6} /> : <Moon size={20} strokeWidth={1.6} />}
        </IconButton>
        <IconButton
          label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
          className="header-notifications"
          onClick={onOpenNotifications}
        >
          <Bell size={20} strokeWidth={1.6} />
          {unreadCount > 0 && <span className="bell-dot" />}
        </IconButton>
        <button className="header-avatar" aria-label="Open your profile" onClick={onOpenProfile}>
          <Avatar src={STUDENT_AVATAR} />
          <ChevronDown size={13} />
        </button>
      </div>
    </header>
  );
}

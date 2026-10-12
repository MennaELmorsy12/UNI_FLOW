import { RefObject } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronsUpDown, GraduationCap, School, X, ChevronDown } from 'lucide-react';
import { navigation, roleLabels } from '../../config/navigation';
import { Avatar, STUDENT_AVATAR } from '../ui/Avatar';
import { IconButton } from '../ui/Button';
import { Brand } from './Brand';
import { cn } from '../../utils/cn';
import type { Role, Student } from '../../types/portal';

export interface SidebarProps {
  role: Role;
  mobileOpen: boolean;
  isMobile: boolean;
  sidebarRef: RefObject<HTMLElement | null>;
  unreadCount: number;
  student?: Student;
  onCloseMobile: () => void;
  onRoleChange: (nextRole: Role) => void;
  onOpenProfile: () => void;
}

export function Sidebar({
  role,
  mobileOpen,
  isMobile,
  sidebarRef,
  unreadCount,
  student,
  onCloseMobile,
  onRoleChange,
  onOpenProfile,
}: SidebarProps) {
  return (
    <aside
      id="portal-sidebar"
      ref={sidebarRef}
      className={cn('sidebar', mobileOpen && 'sidebar-open')}
      aria-label={`${roleLabels[role]} workspace navigation`}
      inert={(isMobile && !mobileOpen) || undefined}
    >
      <div className="sidebar-brand">
        <Link to={`/${role}/dashboard`} aria-label="UniFlow dashboard">
          <Brand />
        </Link>
        <IconButton className="mobile-close" label="Close navigation" onClick={onCloseMobile}>
          <X size={20} />
        </IconButton>
      </div>

      <div className="workspace-label">
        <span className="workspace-dot" />
        {roleLabels[role]} workspace
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <div className="nav-group-label">WORKSPACE</div>
        {(['workspace', 'personal'] as const).map((group) => (
          <div className={cn('nav-group', group === 'personal' && 'nav-personal')} key={group}>
            {group === 'personal' && navigation[role].some((item) => item.group === 'personal') && (
              <div className="nav-group-label">PERSONAL</div>
            )}
            {navigation[role]
              .filter((item) => item.group === group)
              .map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={`/${role}/${path}`}
                  className={({ isActive }) => cn('nav-link', isActive && 'nav-active')}
                >
                  <Icon size={19} strokeWidth={1.7} />
                  <span>{label}</span>
                  {role === 'student' && path === 'notifications' && unreadCount > 0 && (
                    <span className="nav-count">{unreadCount}</span>
                  )}
                </NavLink>
              ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="campus-signature">
          <School size={17} strokeWidth={1.5} />
          <span>
            Westbridge University<span>A place to become.</span>
          </span>
        </div>

        {import.meta.env.DEV && (
          <div className="role-switcher">
            <div className="preview-label">
              <span>PREVIEW WORKSPACE</span>
              <span className="dev-label">DEV</span>
            </div>
            <div className="role-select-wrap">
              <GraduationCap size={18} />
              <select
                value={role}
                aria-label="Development role switcher"
                onChange={(event) => onRoleChange(event.target.value as Role)}
              >
                {Object.entries(roleLabels).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronsUpDown size={14} />
            </div>
          </div>
        )}

        <button className="sidebar-profile" onClick={onOpenProfile}>
          <Avatar src={STUDENT_AVATAR} />
          <span>
            <strong>{student?.name || 'Student Profile'}</strong>
            <span>{student?.id ? `Student ID: ${student.id}` : 'Portal User'}</span>
          </span>
          <ChevronDown size={15} />
        </button>
      </div>
    </aside>
  );
}

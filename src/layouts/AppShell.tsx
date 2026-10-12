import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { navigation, roleFromPath } from '../config/navigation';
import { usePortal } from '../context/PortalContext';
import { Sidebar, Topbar, Footer } from '../components/layout';
import type { Role } from '../types/portal';

export default function AppShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const role = roleFromPath(pathname);
  const { data, theme, toggleTheme, openDialog } = usePortal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches);
  const sidebarRef = useRef<HTMLElement>(null);
  const unread = data?.notifications.filter((notification) => !notification.read).length ?? 0;
  const activeItem = navigation[role].find((item) => pathname.startsWith(`/${role}/${item.path}`));

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${activeItem?.label ?? 'Workspace'} | UniFlow`;
  }, [pathname, activeItem?.label]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const updateViewport = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
      if (!event.matches) setMobileOpen(false);
    };
    query.addEventListener('change', updateViewport);
    return () => query.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setMobileOpen(false);
        openDialog({ type: 'search' });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openDialog]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () =>
      Array.from(sidebarRef.current?.querySelectorAll<HTMLElement>('a, button, select') ?? []).filter(
        (element) => element.offsetParent !== null
      );
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
      if (event.key !== 'Tab') return;
      const elements = focusable();
      if (event.shiftKey && document.activeElement === elements[0]) {
        event.preventDefault();
        elements[elements.length - 1]?.focus();
      } else if (!event.shiftKey && document.activeElement === elements[elements.length - 1]) {
        event.preventDefault();
        elements[0]?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [mobileOpen]);

  const changeRole = (nextRole: Role) => navigate(`/${nextRole}/dashboard`);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        role={role}
        mobileOpen={mobileOpen}
        isMobile={isMobile}
        sidebarRef={sidebarRef}
        unreadCount={unread}
        student={data?.student}
        onCloseMobile={() => setMobileOpen(false)}
        onRoleChange={changeRole}
        onOpenProfile={() => {
          setMobileOpen(false);
          openDialog({ type: 'profile' });
        }}
      />

      <div className="workspace" inert={mobileOpen || undefined}>
        <Topbar
          mobileOpen={mobileOpen}
          theme={theme}
          unreadCount={unread}
          onOpenMobile={() => setMobileOpen(true)}
          onOpenSearch={() => openDialog({ type: 'search' })}
          onToggleTheme={toggleTheme}
          onOpenNotifications={() => openDialog({ type: 'notifications' })}
          onOpenProfile={() => openDialog({ type: 'profile' })}
        />

        <main id="main-content" className="main-content" tabIndex={-1}>
          <Outlet />
        </main>

        <Footer onOpenSupport={() => openDialog({ type: 'support' })} />
      </div>
    </div>
  );
}
export { Brand } from '../components/layout/Brand';
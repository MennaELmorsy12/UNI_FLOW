import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, CircleAlert, X } from 'lucide-react';
import { portalService } from '../services/portal';
import type { DashboardData, PortalDialog } from '../types/portal';

interface PortalContextValue {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  dialog: PortalDialog | null;
  openDialog: (dialog: PortalDialog) => void;
  closeDialog: () => void;
  completeTask: (id: string, completed: boolean) => Promise<void>;
  pendingTaskId: string | null;
  markRead: (ids: string[]) => Promise<void>;
  notify: (message: string, kind?: 'success' | 'error') => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

interface ToastMessage {
  message: string;
  kind: 'success' | 'error';
  id: number;
}

function ToastLayer({ toast, dialog, dismiss }: { toast: ToastMessage | null; dialog: PortalDialog | null; dismiss: () => void }) {
  const [target, setTarget] = useState<HTMLElement>(document.body);

  useLayoutEffect(() => {
    // Native dialogs occupy the top layer; feedback must live inside that layer too.
    setTarget(document.querySelector<HTMLDialogElement>('dialog[open]') ?? document.body);
  }, [dialog, toast]);

  return createPortal(
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toast && (
          <motion.div key={toast.id} className={`toast toast-${toast.kind}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            {toast.kind === 'success' ? <CheckCircle2 size={19} /> : <CircleAlert size={19} />}
            <span>{toast.message}</span>
            <button className="icon-button" aria-label="Dismiss notification" onClick={dismiss}><X size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>, target,
  );
}

export function PortalProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const [dialog, setDialog] = useState<PortalDialog | null>(null);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { return localStorage.getItem('uniflow:theme') === 'dark' ? 'dark' : 'light'; }
    catch { return 'light'; }
  });

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    portalService.getDashboard().then((result) => {
      if (active) { setData(result); setLoading(false); }
    }).catch(() => {
      if (active) { setError('We could not load your workspace. Please try again.'); setLoading(false); }
    });
    return () => { active = false; };
  }, [retry]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('uniflow:theme', theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = useCallback((message: string, kind: 'success' | 'error' = 'success') => {
    setToast({ message, kind, id: Date.now() });
  }, []);

  const completeTask = useCallback(async (id: string, completed: boolean) => {
    setPendingTaskId(id);
    try {
      const updated = await portalService.updateAssignment(id, completed);
      setData((current) => current ? { ...current, assignments: current.assignments.map((item) => item.id === id ? updated : item) } : current);
      notify(completed ? 'Marked as prepared. Nice work!' : 'Moved back to your pending tasks.');
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : 'Could not update your task.', 'error');
    } finally { setPendingTaskId(null); }
  }, [notify]);

  const markRead = useCallback(async (ids: string[]) => {
    try {
      const notifications = await portalService.markNotificationsRead(ids);
      setData((current) => current ? { ...current, notifications } : current);
    } catch { notify('Could not update your notifications.', 'error'); }
  }, [notify]);

  const openDialog = useCallback((next: PortalDialog) => setDialog(next), []);
  const closeDialog = useCallback(() => setDialog(null), []);

  return (
    <PortalContext.Provider value={{
      data, loading, error, reload: () => setRetry((value) => value + 1), theme,
      toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
      dialog, openDialog, closeDialog, completeTask, pendingTaskId, markRead, notify,
    }}>
      {children}
      <ToastLayer toast={toast} dialog={dialog} dismiss={() => setToast(null)} />
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error('usePortal must be used inside PortalProvider.');
  return context;
}
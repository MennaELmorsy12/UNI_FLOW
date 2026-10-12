import { dashboardSeed, ticketSeed } from '../data/mock';
import type { Assignment, DashboardData, Notification, SupportTicket } from '../types/portal';

export interface PortalService {
  getDashboard(): Promise<DashboardData>;
  updateAssignment(id: string, completed: boolean): Promise<Assignment>;
  markNotificationsRead(ids: string[]): Promise<Notification[]>;
  getSupportTickets(): Promise<SupportTicket[]>;
  createSupportTicket(input: Pick<SupportTicket, 'subject' | 'category' | 'message'>): Promise<SupportTicket>;
}

const STORAGE_KEY = 'uniflow:workspace';
const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 180));
let dashboard = structuredClone(dashboardSeed);
let tickets = structuredClone(ticketSeed);

// Persist only user interactions, never an entire potentially stale seed dataset.
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.completedIds)) {
      dashboard.assignments = dashboard.assignments.map((item) => ({ ...item, completed: saved.completedIds.includes(item.id) }));
    }
    if (Array.isArray(saved.readIds)) {
      dashboard.notifications = dashboard.notifications.map((item) => ({ ...item, read: item.read || saved.readIds.includes(item.id) }));
    }
    if (Array.isArray(saved.tickets)) {
      tickets = saved.tickets.filter((item: SupportTicket) => typeof item?.id === 'string' && typeof item?.subject === 'string' && typeof item?.message === 'string' && typeof item?.createdAt === 'string' && ['Open', 'Resolved'].includes(item?.status));
    }
  }
} catch {
  // Storage is optional; the mock also works in restricted/private browsers.
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedIds: dashboard.assignments.filter((item) => item.completed).map((item) => item.id),
      readIds: dashboard.notifications.filter((item) => item.read).map((item) => item.id),
      tickets,
    }));
  } catch { /* Keep the in-memory session usable if browser storage is unavailable. */ }
}

const mockPortalService: PortalService = {
  async getDashboard() {
    await delay();
    return structuredClone(dashboard);
  },
  async updateAssignment(id, completed) {
    await delay();
    const assignment = dashboard.assignments.find((item) => item.id === id);
    if (!assignment) throw new Error('This assignment could not be found.');
    assignment.completed = completed;
    persist();
    return { ...assignment };
  },
  async markNotificationsRead(ids) {
    await delay();
    dashboard.notifications = dashboard.notifications.map((item) => ids.includes(item.id) ? { ...item, read: true } : item);
    persist();
    return structuredClone(dashboard.notifications);
  },
  async getSupportTickets() {
    await delay();
    return structuredClone(tickets);
  },
  async createSupportTicket(input) {
    await delay();
    if (!input.subject.trim() || !input.message.trim()) throw new Error('Please complete the subject and message.');
    const ticket: SupportTicket = {
      ...input,
      subject: input.subject.trim(),
      message: input.message.trim(),
      id: `UF-${Date.now().toString().slice(-7)}`,
      createdAt: new Date().toISOString(),
      status: 'Open',
    };
    tickets = [ticket, ...tickets];
    persist();
    return structuredClone(ticket);
  },
};

// Replace this one adapter with an API implementation of PortalService later.
export const portalService: PortalService = mockPortalService;
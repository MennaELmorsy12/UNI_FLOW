import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, LoaderCircle, Search, Send } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { portalService } from '../../services/portal';
import { formatDate } from '../../utils/format';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { EmptyState, ErrorState } from '../ui/FeedbackStates';
import { SegmentedControl } from '../ui/SegmentedControl';
import { TextField } from '../ui/TextField';
import type { SupportTicket } from '../../types/portal';

const faqs = [
  {
    question: 'When can I register for next semester?',
    answer:
      'Fall 2025 registration opens on June 2 at 9:00 AM in this demo. Meet your academic advisor first, and keep your selection within the 18-credit semester limit (up to 21 credits / 7 courses for GPA >= 3.0). Course registration controls are built according to college bylaws.',
  },
  {
    question: 'How is my cumulative GPA calculated?',
    answer:
      "GPA is the total of your grade points multiplied by each course's credit hours, divided by total graded credit hours. The dashboard shows a cumulative GPA on a 4.0 scale. In-progress results are an unofficial snapshot.",
  },
  {
    question: 'Where can I find my exam schedule?',
    answer:
      'Choose "View my schedule" on the dashboard, then switch to "Final exams". You can switch between calendar and table views and download an ICS file for your calendar app.',
  },
  {
    question: 'What happens when I mark a task as prepared?',
    answer:
      'It updates your personal checklist and the pending-task count. It does not upload or submit coursework. Checklist changes are saved in your current browser session.',
  },
  {
    question: 'What if I find a timetable conflict?',
    answer:
      'Use the contact form to record the two course codes and the conflicting date and time. Conflict resolution tools and automated scheduling eliminate exam clashes across academic years.',
  },
];

export function SupportContent() {
  const { notify } = usePortal();
  const [tab, setTab] = useState<'faq' | 'contact' | 'tickets'>('faq');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Course registration');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const filteredFaqs = useMemo(
    () =>
      faqs.filter((faq) =>
        `${faq.question} ${faq.answer}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    portalService
      .getSupportTickets()
      .then((result) => {
        if (active) {
          setTickets(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [retry]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subject.trim().length < 5 || message.trim().length < 15) {
      setFormError('Use at least 5 characters for your subject and 15 for your message.');
      return;
    }
    setFormError('');
    setBusy(true);
    try {
      const ticket = await portalService.createSupportTicket({ subject, category, message });
      setTickets((current) => [ticket, ...current]);
      setSubject('');
      setMessage('');
      setTab('tickets');
      notify('Your inquiry has been recorded.');
    } catch {
      setFormError('Unable to save your message. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SegmentedControl
        label="Support section"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'faq', label: 'Common questions' },
          { value: 'contact', label: 'Ask a question' },
          { value: 'tickets', label: `My inquiries (${tickets.length})` },
        ]}
      />
      {tab === 'faq' && (
        <>
          <div className="search-field">
            <Search size={18} />
            <input
              placeholder="Search common questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search FAQs"
            />
          </div>
          <div className="faq-list">
            {filteredFaqs.map((faq) => {
              const isOpen = expanded === faq.question;
              return (
                <div key={faq.question} className="faq-item">
                  <button
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : faq.question)}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
                  </button>
                  {isOpen && <div className="faq-answer">{faq.answer}</div>}
                </div>
              );
            })}
          </div>
        </>
      )}
      {tab === 'contact' && (
        <form onSubmit={submit} className="support-form">
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Course registration credit limit question"
            error={formError && subject.trim().length < 5 ? 'At least 5 characters required' : undefined}
          />
          <div className="form-field">
            <label htmlFor="ticket-category">Category</label>
            <select
              id="ticket-category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Course registration">Course registration</option>
              <option value="Schedule">Schedule & Examination</option>
              <option value="Grades">Grades & GPA</option>
              <option value="General">General Inquiry</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="ticket-message">Message</label>
            <textarea
              id="ticket-message"
              className="input textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide details about your inquiry..."
            />
          </div>
          {formError && <p className="field-error">{formError}</p>}
          <div className="dialog-footer">
            <Button type="submit" busy={busy}>
              <Send size={15} />
              Submit inquiry
            </Button>
          </div>
        </form>
      )}
      {tab === 'tickets' && (
        <div className="tickets-list">
          {loading && (
            <div className="loading-state">
              <LoaderCircle size={22} className="spin" />
              <span>Loading inquiries...</span>
            </div>
          )}
          {error && <ErrorState message="Could not load your support tickets." onRetry={() => setRetry((r) => r + 1)} />}
          {!loading && !error && !tickets.length && (
            <EmptyState
              title="No inquiries recorded"
              description="When you submit an inquiry or timetable question, it will appear here."
            />
          )}
          {!loading &&
            !error &&
            tickets.map((t) => (
              <div key={t.id} className="ticket-card">
                <div className="ticket-header">
                  <strong>{t.subject}</strong>
                  <Badge tone={t.status === 'Resolved' ? 'green' : 'amber'}>{t.status}</Badge>
                </div>
                <div className="ticket-meta">
                  <span>{t.id}</span>
                  <i className="inline-dot" />
                  <span>{t.category}</span>
                  <i className="inline-dot" />
                  <span>{formatDate(t.createdAt)}</span>
                </div>
                <p className="ticket-message">{t.message}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

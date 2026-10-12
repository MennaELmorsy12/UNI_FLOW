import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, Bell, BookOpen, CalendarDays, CornerDownLeft, FileText, GraduationCap, Search, UserRound, type LucideIcon, CircleHelp } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { navigation } from '../../config/navigation';
import { formatDate } from '../../utils/format';
import { EmptyState } from '../ui/FeedbackStates';
import type { PortalDialog } from '../../types/portal';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  group: string;
  icon: LucideIcon;
  dialog?: PortalDialog;
  path?: string;
}

export function SearchContent() {
  const { data, openDialog, closeDialog } = usePortal();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const shortcuts: SearchResult[] = [
    { id: 'schedule', title: 'My schedule', subtitle: 'Classes and final exams', group: 'Quick links', icon: CalendarDays, dialog: { type: 'schedule' } },
    { id: 'courses', title: 'My courses', subtitle: 'Your Spring 2025 courses', group: 'Quick links', icon: BookOpen, dialog: { type: 'courses' } },
    { id: 'grades', title: 'Grades & GPA', subtitle: 'Your academic progress', group: 'Quick links', icon: GraduationCap, dialog: { type: 'grades' } },
    { id: 'notifications', title: 'Notifications', subtitle: 'The latest from your campus', group: 'Quick links', icon: Bell, dialog: { type: 'notifications' } },
    { id: 'profile', title: 'My profile', subtitle: 'Student ID and program details', group: 'Quick links', icon: UserRound, dialog: { type: 'profile' } },
    { id: 'support', title: 'Help & support', subtitle: 'FAQs and demo support tickets', group: 'Quick links', icon: CircleHelp, dialog: { type: 'support' } },
  ];

  const courseResults: SearchResult[] = (data?.courses ?? []).map((course) => ({
    id: course.id,
    title: course.title,
    subtitle: `${course.code} / ${course.instructor}`,
    group: 'Courses',
    icon: BookOpen,
    dialog: { type: 'course', id: course.id },
  }));

  const taskResults: SearchResult[] = (data?.assignments ?? []).map((assignment) => ({
    id: assignment.id,
    title: assignment.title,
    subtitle: `Due ${formatDate(assignment.due)}`,
    group: 'Tasks',
    icon: FileText,
    dialog: { type: 'tasks', id: assignment.id },
  }));

  const pageResults: SearchResult[] = navigation.student
    .filter((item) => ['dashboard', 'registration', 'settings'].includes(item.path))
    .map((item) => ({
      id: item.path,
      title: item.label,
      subtitle: item.path === 'dashboard' ? 'Your student overview' : 'Reserved for the next stage',
      group: 'Pages',
      icon: item.icon,
      path: `/student/${item.path}`,
    }));

  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? [...shortcuts, ...courseResults, ...taskResults, ...pageResults]
        .filter((result) => `${result.title} ${result.subtitle}`.toLowerCase().includes(normalized))
        .slice(0, 8)
    : shortcuts;

  const choose = (result: SearchResult) => {
    if (result.dialog) openDialog(result.dialog);
    else if (result.path) {
      closeDialog();
      navigate(result.path);
    }
  };

  return (
    <div className="command-palette">
      <div className="command-search">
        <Search size={21} />
        <input
          autoFocus
          value={query}
          placeholder="Find a course, task, or page..."
          role="combobox"
          aria-label="Search your workspace"
          aria-expanded="true"
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-activedescendant={results[active] ? `result-${results[active].id}` : undefined}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setActive((index) => (index + 1) % Math.max(results.length, 1));
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setActive((index) => (index - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
            }
            if (event.key === 'Enter' && results[active]) {
              event.preventDefault();
              choose(results[active]);
            }
          }}
        />
        <kbd>esc</kbd>
      </div>
      <div className="search-results-label">
        {normalized
          ? `${results.length} matching ${results.length === 1 ? 'result' : 'results'}`
          : 'A LITTLE SHORTCUT'}
      </div>
      <div id="search-results" role="listbox" aria-label="Search results" className="command-results">
        {results.map((result, index) => (
          <button
            id={`result-${result.id}`}
            className={`command-result ${index === active ? 'command-result-active' : ''}`}
            key={result.id}
            role="option"
            aria-selected={index === active}
            tabIndex={-1}
            onMouseEnter={() => setActive(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => choose(result)}
          >
            <span className="command-result-icon">
              <result.icon size={18} />
            </span>
            <span>
              <strong>{result.title}</strong>
              <span>{result.subtitle}</span>
            </span>
            <small>{result.group}</small>
            <CornerDownLeft size={14} />
          </button>
        ))}
      </div>
      {!results.length && (
        <EmptyState
          title="Nothing here just yet"
          description={`No matches for "${query}". Try a course code or page name.`}
        />
      )}
      <div className="command-footer">
        <span>
          <kbd>
            <ArrowUp size={10} />
          </kbd>
          <kbd>
            <ArrowDown size={10} />
          </kbd>
          to navigate
        </span>
        <span>
          <kbd>
            <CornerDownLeft size={11} />
          </kbd>
          to open
        </span>
        <span>Made to save you a little time.</span>
      </div>
    </div>
  );
}

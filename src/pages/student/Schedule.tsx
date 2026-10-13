
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CalendarDays,
  BookOpen,
} from 'lucide-react';

const days = [
  { name: 'Sunday', short: 'SUN', date: 11 },
  { name: 'Monday', short: 'MON', date: 12 },
  { name: 'Tuesday', short: 'TUE', date: 13 },
  { name: 'Wednesday', short: 'WED', date: 14 },
  { name: 'Thursday', short: 'THU', date: 15 },
];

const classes = [
  {
    id: 1,
    day: 'Sunday',
    start: '09:00 AM',
    end: '11:00 AM',
    title: 'Database Systems',
    code: 'CS301',
    doctor: 'Dr. Ahmed Hassan',
    room: 'Room 204',
    color: 'green',
  },
  {
    id: 2,
    day: 'Sunday',
    start: '12:00 PM',
    end: '02:00 PM',
    title: 'Software Engineering',
    code: 'CS305',
    doctor: 'Dr. Sara Mohamed',
    room: 'Lab 3',
    color: 'blue',
  },
  {
    id: 3,
    day: 'Monday',
    start: '10:00 AM',
    end: '12:00 PM',
    title: 'Computer Networks',
    code: 'CS302',
    doctor: 'Dr. Mahmoud Ali',
    room: 'Room 105',
    color: 'purple',
  },
  {
    id: 4,
    day: 'Tuesday',
    start: '09:00 AM',
    end: '11:00 AM',
    title: 'Web Development',
    code: 'CS310',
    doctor: 'Dr. Ahmed Hassan',
    room: 'Lab 2',
    color: 'blue',
  },
  {
    id: 5,
    day: 'Tuesday',
    start: '12:00 PM',
    end: '02:00 PM',
    title: 'Artificial Intelligence',
    code: 'CS315',
    doctor: 'Dr. Menna Adel',
    room: 'Room 301',
    color: 'green',
  },
  {
    id: 6,
    day: 'Wednesday',
    start: '11:00 AM',
    end: '01:00 PM',
    title: 'Operating Systems',
    code: 'CS303',
    doctor: 'Dr. Sara Mohamed',
    room: 'Room 210',
    color: 'purple',
  },
  {
    id: 7,
    day: 'Thursday',
    start: '09:00 AM',
    end: '11:00 AM',
    title: 'Software Engineering',
    code: 'CS305',
    doctor: 'Dr. Sara Mohamed',
    room: 'Lab 3',
    color: 'green',
  },
];

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState('All');
  const [weekOffset, setWeekOffset] = useState(0);

  const visibleClasses = classes.filter(
    (course) =>
      selectedDay === 'All' || course.day === selectedDay
  );

  return (
    <main className="schedule-page">
      <div className="schedule-header">
        <div>
          <div className="schedule-eyebrow">
            <CalendarDays size={16} />
            Academic Planner
          </div>

          <h1>My Schedule</h1>

          <p>
            Manage your classes and keep track of your weekly timetable.
          </p>
        </div>

        <div className="schedule-week-control">
          <button
            type="button"
            className="schedule-icon-button"
            onClick={() => setWeekOffset((value) => value - 1)}
            aria-label="Previous week"
          >
            <ChevronLeft size={20} />
          </button>

          <span>
            {weekOffset === 0
              ? 'Current Week'
              : weekOffset > 0
                ? `Week +${weekOffset}`
                : `Week ${weekOffset}`}
          </span>

          <button
            type="button"
            className="schedule-icon-button"
            onClick={() => setWeekOffset((value) => value + 1)}
            aria-label="Next week"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <section className="schedule-summary">
        <article className="schedule-summary-card">
          <div className="schedule-summary-icon green">
            <BookOpen size={21} />
          </div>
          <div>
            <p>Total Classes</p>
            <h2>{classes.length}</h2>
          </div>
        </article>

        <article className="schedule-summary-card">
          <div className="schedule-summary-icon blue">
            <Clock size={21} />
          </div>
          <div>
            <p>Class Days</p>
            <h2>{new Set(classes.map((item) => item.day)).size}</h2>
          </div>
        </article>

        <article className="schedule-summary-card">
          <div className="schedule-summary-icon purple">
            <CalendarDays size={21} />
          </div>
          <div>
            <p>Weekly Hours</p>
            <h2>14 hrs</h2>
          </div>
        </article>
      </section>

      <section className="schedule-content">
        <div className="schedule-section-heading">
          <div>
            <h2>Weekly Timetable</h2>
            <p>Your classes for this week</p>
          </div>

          <span className="schedule-class-count">
            {visibleClasses.length} classes
          </span>
        </div>

        <div className="schedule-day-filters">
          <button
            type="button"
            className={selectedDay === 'All' ? 'active' : ''}
            onClick={() => setSelectedDay('All')}
          >
            All Days
          </button>

          {days.map((day) => (
            <button
              type="button"
              key={day.name}
              className={selectedDay === day.name ? 'active' : ''}
              onClick={() => setSelectedDay(day.name)}
            >
              <span>{day.short}</span>
              {day.name}
            </button>
          ))}
        </div>

        <div className="schedule-class-list">
          {visibleClasses.length > 0 ? (
            visibleClasses.map((course) => (
              <article
                className={`schedule-class-card ${course.color}`}
                key={course.id}
              >
                <div className="schedule-class-time">
                  <strong>{course.start}</strong>
                  <span>{course.end}</span>
                </div>

                <div className="schedule-class-details">
                  <span className="schedule-course-code">
                    {course.code}
                  </span>
                  <h3>{course.title}</h3>
                  <p>{course.doctor}</p>

                  <div className="schedule-class-location">
                    <MapPin size={15} />
                    {course.room}
                  </div>
                </div>

                <div className="schedule-class-day">
                  {course.day}
                </div>
              </article>
            ))
          ) : (
            <div className="schedule-empty">
              <CalendarDays size={30} />
              <h3>No classes scheduled</h3>
              <p>There are no classes for this day.</p>
            </div>
          )}
        </div>
      </section>

      <p className="schedule-note">
        Sample timetable — replace these example classes with the actual
        student schedule when project data is connected.
      </p>
    </main>
  );
}

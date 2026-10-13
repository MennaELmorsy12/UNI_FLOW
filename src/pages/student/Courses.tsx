
import { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  Users,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';

const courses = [
  {
    id: 'CS301',
    name: 'Database Systems',
    instructor: 'Dr. Ahmed Hassan',
    credits: 3,
    progress: 75,
    schedule: 'Sunday · 09:00 AM',
    students: 42,
    color: 'green',
  },
  {
    id: 'CS302',
    name: 'Computer Networks',
    instructor: 'Dr. Mahmoud Ali',
    credits: 3,
    progress: 60,
    schedule: 'Monday · 10:00 AM',
    students: 38,
    color: 'blue',
  },
  {
    id: 'CS305',
    name: 'Software Engineering',
    instructor: 'Dr. Sara Mohamed',
    credits: 3,
    progress: 85,
    schedule: 'Sunday · 12:00 PM',
    students: 45,
    color: 'purple',
  },
  {
    id: 'CS310',
    name: 'Web Development',
    instructor: 'Dr. Ahmed Hassan',
    credits: 3,
    progress: 50,
    schedule: 'Tuesday · 09:00 AM',
    students: 35,
    color: 'orange',
  },
  {
    id: 'CS303',
    name: 'Operating Systems',
    instructor: 'Dr. Sara Mohamed',
    credits: 3,
    progress: 65,
    schedule: 'Wednesday · 11:00 AM',
    students: 40,
    color: 'blue',
  },
  {
    id: 'CS315',
    name: 'Artificial Intelligence',
    instructor: 'Dr. Menna Adel',
    credits: 3,
    progress: 40,
    schedule: 'Tuesday · 12:00 PM',
    students: 32,
    color: 'green',
  },
];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Courses');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.id.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      selectedFilter === 'All Courses' ||
      (selectedFilter === 'In Progress' && course.progress > 0) ||
      (selectedFilter === 'Completed' && course.progress === 100);

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="courses-page">
      <header className="courses-header">
        <div>
          <div className="courses-eyebrow">
            <GraduationCap size={17} />
            Academic Workspace
          </div>

          <h1>My Courses</h1>

          <p>
            Explore your enrolled courses and keep up with your learning.
          </p>
        </div>

        <div className="courses-total-badge">
          <BookOpen size={19} />
          <span>{courses.length} Enrolled Courses</span>
        </div>
      </header>

      <section className="courses-overview">
        <article className="courses-overview-card">
          <div className="courses-overview-icon green">
            <BookOpen size={22} />
          </div>
          <div>
            <span>Total Courses</span>
            <h2>{courses.length}</h2>
          </div>
        </article>

        <article className="courses-overview-card">
          <div className="courses-overview-icon blue">
            <Clock size={22} />
          </div>
          <div>
            <span>Credit Hours</span>
            <h2>{courses.reduce((total, course) => total + course.credits, 0)}</h2>
          </div>
        </article>

        <article className="courses-overview-card">
          <div className="courses-overview-icon purple">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span>In Progress</span>
            <h2>{courses.filter((course) => course.progress > 0 && course.progress < 100).length}</h2>
          </div>
        </article>
      </section>

      <section className="courses-main">
        <div className="courses-toolbar">
          <div>
            <h2>Your Enrolled Courses</h2>
            <p>Manage and review your current semester courses.</p>
          </div>

          <label className="courses-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search courses..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="courses-filters">
          {['All Courses', 'In Progress', 'Completed'].map((filter) => (
            <button
              key={filter}
              type="button"
              className={selectedFilter === filter ? 'active' : ''}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <article
                key={course.id}
                className={`course-card ${course.color}`}
              >
                <div className="course-card-top">
                  <div className={`course-card-icon ${course.color}`}>
                    <BookOpen size={23} />
                  </div>

                  <span className="course-code">{course.id}</span>
                </div>

                <h3>{course.name}</h3>
                <p className="course-instructor">{course.instructor}</p>

                <div className="course-info-row">
                  <span>
                    <Clock size={15} />
                    {course.credits} Credit Hours
                  </span>

                  <span>
                    <Users size={15} />
                    {course.students} Students
                  </span>
                </div>

                <div className="course-progress-header">
                  <span>Course Progress</span>
                  <strong>{course.progress}%</strong>
                </div>

                <div
                  className="course-progress-track"
                  role="progressbar"
                  aria-label={`${course.name} progress`}
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`course-progress-fill ${course.color}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="course-card-footer">
                  <span>{course.schedule}</span>
                  <button
                    type="button"
                    aria-label={`View ${course.name}`}
                    onClick={() => {
                      window.location.href = `/student/courses/${course.id}`;
                    }}
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="courses-empty">
              <Search size={30} />
              <h3>No courses found</h3>
              <p>Try another search or change the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      <p className="courses-note">
        Sample course data for the UI prototype. Connect the page to the
        project data source before using it with real student records.
      </p>
    </main>
  );
}

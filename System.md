# Modern System — Project Specification

Modern System is an advanced, automated college management dashboard designed specifically for **Modern Academy**. The system aims to replace outdated manual processes with an error-free, algorithmic approach to course registration, exam scheduling, and faculty management.

---

## 1. System Core Modules

### A. Advanced Smart Course Registration

This is the core of the student portal. It dynamically enforces all college registration bylaws in real-time, removing human error.

- **Dynamic GPA-Based Credit Hours:**
  - Students with a GPA **≥ 3.0** can register for up to **7 courses**.
  - Students with a GPA **< 3.0** are restricted to a maximum of **6 courses**.

- **Prerequisite Validation:** The system scans the student's academic history. If a course has a prerequisite that hasn't been passed, that course is locked.

- **Transparency UI:** Locked courses must clearly display the exact reason why the student cannot register for them (e.g., _"Locked: Requires passing CS101 first"_).

- **Summer Semester Control:** Faculty members can dynamically decide and configure which specific courses will be available during the summer semester.

### B. Automated Exam & Lecture Scheduling Algorithm

A complex algorithmic scheduler designed to eliminate scheduling conflicts across the entire university.

- **Conflict-Free Exam Scheduling:** The algorithm analyzes individual student registrations across different academic years to ensure zero exam timetable clashes for any student.

- **Seating & Capacity Allocation:** Automatically assigns exam rooms/seats to students based on hall capacities.
  > **Note:** The algorithm focuses on optimal distribution. If campus capacity is insufficient, the system will allow the creation of "dummy locations" as a fallback, flagging the capacity issue for administration.

- **Lecture Timetable Generation:** Beyond exams, the system must generate standard weekly schedules for courses.

### C. Faculty & Administrative Portal

- **Role-Based Access Control (RBAC):** Strict permissions dividing roles between IT admins, professors, registration staff, and students.

- **Grade Management:** Professors can securely upload student grades directly to the dashboard, making them instantly accessible to students.

- **Exception & Edge-Case Handling:** Bulletproof handling for academic anomalies, such as students who register for courses but later have to formally postpone or freeze the semester due to emergencies.

### D. Creative AI Feature (Mini-Module)

- **Project Idea Evaluator:** A dedicated feature where students can submit their graduation project ideas, and an integrated AI analyzes the proposal and outputs a success/viability score (e.g., _"Your idea is 85% viable"_).

### E. Student Results Scraping System

An automated scraping engine that fetches and aggregates student academic results from external sources, eliminating the need for manual result entry.

- **Automated Results Collection:** The scraper periodically pulls student results from the academy's existing result portals and syncs them into the dashboard.

- **Data Normalization:** Fetched results are parsed, validated, and normalized into a consistent internal format before being stored.

- **Instant Visibility:** Once scraped, results become immediately available to students on their dashboard, complete with GPA recalculation and academic standing updates.

- **Scheduled & On-Demand Runs:** Scraping jobs can run on a fixed schedule (e.g., after result publication dates) or be triggered manually by admins.

### F. Course Materials & Moodle Integration

A centralized materials hub that aggregates and serves academic resources, with optional integration into the academy's Moodle LMS.

- **Centralized Materials Repository:** Students can browse and download course materials (lectures, notes, assignments) organized by course and semester.

- **Moodle Connectivity:** The system can connect to the academy's Moodle instance to pull courses, resources, and due dates, keeping everything in sync within a single dashboard.

- **Unified Access:** Students no longer need to jump between platforms — Moodle content is surfaced directly inside Modern System.

### G. Facebook News Feed Integration

A live news module that fetches announcements and updates from the academy's official Facebook group and displays them on the student dashboard.

- **Automated News Fetching:** A background service periodically pulls the latest posts from the designated Facebook group using the Facebook Graph API.

- **Dashboard Feed:** Fetched posts are rendered as a clean, readable news feed on the main dashboard so students stay informed without leaving the platform.

- **Filtering & Categorization:** Posts can be tagged, filtered, and searched (e.g., announcements, events, deadlines) for easier navigation.

- **Caching & Rate-Limiting:** To respect API limits and ensure fast load times, fetched posts are cached and refreshed at sensible intervals.

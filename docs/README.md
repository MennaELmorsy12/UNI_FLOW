# Modern System

> An advanced, automated college management dashboard designed specifically for **Modern Academy**.

Modern System aims to replace outdated manual processes with an error-free, algorithmic approach to course registration, exam scheduling, faculty management, and student engagement.

---

## Overview

Modern System is a comprehensive platform that brings together academic operations, student services, and campus communications into a single unified dashboard. It is built to enforce college bylaws automatically, eliminate scheduling conflicts, and keep students informed and connected.

## Key Modules

| # | Module | Description |
|---|--------|-------------|
| A | **Smart Course Registration** | Real-time, bylaw-enforced registration with GPA-based limits and prerequisite validation. |
| B | **Exam & Lecture Scheduling** | Conflict-free algorithmic scheduling for exams and weekly lectures. |
| C | **Faculty & Admin Portal** | RBAC-secured portal for grade management and academic exception handling. |
| D | **AI Project Evaluator** | A mini-module that scores graduation project ideas for viability. |
| E | **Results Scraping System** | Automated engine that scrapes and syncs student results into the dashboard. |
| F | **Course Materials & Moodle** | Centralized materials hub with optional Moodle LMS integration. |
| G | **Facebook News Feed** | Live dashboard feed pulling announcements from the academy's Facebook group. |

## Features at a Glance

### Smart Course Registration
- GPA **≥ 3.0** → up to **7 courses** | GPA **< 3.0** → max **6 courses**
- Prerequisite locking with transparent, user-facing reasons
- Faculty-controlled summer semester course availability

### Exam & Lecture Scheduling
- Zero student exam clashes across all academic years
- Automatic seating & hall capacity allocation (with dummy-location fallback)
- Auto-generated weekly lecture timetables

### Faculty & Admin Portal
- Role-Based Access Control (IT admins, professors, registration staff, students)
- Secure, instant grade uploads
- Handling of freezes, postponements, and academic edge cases

### Results Scraping
- Periodic and on-demand scraping of student results
- Normalized, validated data storage with instant GPA recalculation

### Course Materials & Moodle
- Centralized repository for lectures, notes, and assignments
- Moodle connectivity for unified, single-dashboard access

### Facebook News Feed
- Automated fetching from the academy's Facebook group via Graph API
- Searchable, categorized news feed on the student dashboard
- Cached and rate-limited for performance

---

## Specification

For the full project specification, see **[System.md](./System.md)**.

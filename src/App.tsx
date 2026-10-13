
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { PortalProvider } from './context/PortalContext';
import AppShell from './layouts/AppShell';
import StartupPage from './pages/landing/StartupPage';
import LoginPage from './pages/auth/LoginPage';
import StudentDashboard from './pages/student/Dashboard';
import Schedule from './pages/student/Schedule';
import Courses from './pages/student/Courses';
import GradesPage from './pages/grades/GradesPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ModulePreview, { NotFoundPage } from './pages/ModulePreview';
import DialogCenter from './components/dialogs/DialogCenter';
import { navigation } from './config/navigation';
import type { Role } from './types/portal';

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <PortalProvider>
          <Routes>
            <Route path="/" element={<StartupPage />} />

            <Route
              path="/landing"
              element={<Navigate to="/" replace />}
            />

            <Route path="/login" element={<LoginPage />} />

            <Route element={<AppShell />}>
              <Route
                path="portal"
                element={<Navigate to="/student/dashboard" replace />}
              />

              {(Object.keys(navigation) as Role[]).map((role) => (
                <Route path={role} key={role}>
                  <Route
                    index
                    element={<Navigate to="dashboard" replace />}
                  />

                  {navigation[role].map((item) => (
                    <Route
                      key={item.path}
                      path={item.path}
                      element={
                        role === 'student' &&
                        item.path === 'dashboard' ? (
                          <StudentDashboard />
                        ) : role === 'student' &&
                          item.path === 'schedule' ? (
                          <Schedule />
                        ) : role === 'student' &&
                          item.path === 'courses' ? (
                          <Courses />
                        ) : role === 'student' &&
                          item.path === 'grades' ? (
                          <GradesPage />
                        ) : role === 'student' &&
                          item.path === 'profile' ? (
                          <ProfilePage />
                        ) : (
                          <ModulePreview />
                        )
                      }
                    />
                  ))}

                  {/* Keep the student notifications page
                      available without adding it to the sidebar */}
                  {role === 'student' && (
                    <Route
                      path="notifications"
                      element={<NotificationsPage />}
                    />
                  )}

                  {(role === 'student' || role === 'doctor') && (
                    <Route
                      path="courses/:courseId"
                      element={<ModulePreview />}
                    />
                  )}
                </Route>
              ))}

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>

          <DialogCenter />
        </PortalProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}
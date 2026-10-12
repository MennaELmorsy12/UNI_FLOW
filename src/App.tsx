import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { PortalProvider } from './context/PortalContext';
import AppShell from './layouts/AppShell';
import StudentDashboard from './pages/student/Dashboard';
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
            <Route element={<AppShell />}>
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              {(Object.keys(navigation) as Role[]).map((role) => <Route path={role} key={role}>
                <Route index element={<Navigate to="dashboard" replace />} />
                {navigation[role].map((item) => <Route key={item.path} path={item.path} element={role === 'student' && item.path === 'dashboard' ? <StudentDashboard /> : <ModulePreview />} />)}
                {(role === 'student' || role === 'doctor') && <Route path="courses/:courseId" element={<ModulePreview />} />}
              </Route>)}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <DialogCenter />
        </PortalProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}

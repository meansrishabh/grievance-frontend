import { createBrowserRouter } from 'react-router';
import { AdminLayout } from './layouts/AdminLayout';
import { OperatorLayout } from './layouts/OperatorLayout';
import { AdminDashboardPage } from './pages/admin/DashboardPage';
import { ComplaintsPage } from './pages/admin/ComplaintsPage';
import { DepartmentsPage } from './pages/admin/DepartmentsPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { OperatorDashboardPage } from './pages/operator/DashboardPage';
import { CallLogsPage } from './pages/operator/CallLogsPage';
import { NewComplaintPage } from './pages/operator/NewComplaintPage';
import { HomePage } from './pages/HomePage';
import { CitizenPortal } from './components/CitizenPortal';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/citizen',
    Component: CitizenPortal,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboardPage },
      { path: 'complaints', Component: ComplaintsPage },
      { path: 'departments', Component: DepartmentsPage },
      { path: 'reports', Component: ReportsPage },
      { path: 'settings', Component: SettingsPage },
    ],
  },
  {
    path: '/operator',
    Component: OperatorLayout,
    children: [
      { index: true, Component: OperatorDashboardPage },
      { path: 'call-logs', Component: CallLogsPage },
      { path: 'new-complaint', Component: NewComplaintPage },
    ],
  },
]);

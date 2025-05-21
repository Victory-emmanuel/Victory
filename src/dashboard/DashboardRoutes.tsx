import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import DashboardLayout from './layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardHome from './pages/DashboardHome';
import ProjectListPage from './pages/ProjectListPage';
import ProjectFormPage from './pages/ProjectFormPage';

export default function DashboardRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
        <Route path="/projects" element={<DashboardLayout><ProjectListPage /></DashboardLayout>} />
        <Route path="/projects/new" element={<DashboardLayout><ProjectFormPage /></DashboardLayout>} />
        <Route path="/projects/edit/:id" element={<DashboardLayout><ProjectFormPage /></DashboardLayout>} />
      </Routes>
    </AuthProvider>
  );
}

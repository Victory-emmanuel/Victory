import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "./layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardHome from "./pages/DashboardHome";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectFormPage from "./pages/ProjectFormPage";
import ContactMessagesPage from "./pages/ContactMessagesPage";

export default function DashboardRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardLayout>
                <DashboardHome />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/projects"
          element={
            <AuthGuard>
              <DashboardLayout>
                <ProjectListPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/projects/new"
          element={
            <AuthGuard>
              <DashboardLayout>
                <ProjectFormPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <AuthGuard>
              <DashboardLayout>
                <ProjectFormPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/contacts"
          element={
            <AuthGuard>
              <DashboardLayout>
                <ContactMessagesPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

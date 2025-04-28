// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

export type UserRole = 'organizer' | 'admin' | 'provider' | 'participant';


interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  currentRole?: UserRole;
}

export const RoleProtectedRoute = ({
  children,
  allowedRoles,
  currentRole
}: ProtectedRouteProps) => {
  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/404" replace />;
  }
  return <>{children}</>;
};
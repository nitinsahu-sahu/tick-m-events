// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { renderFallback } from 'src/routes/sections';

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
  // Handle loading state
  if (currentRole === undefined) {
    return renderFallback;
  }

  if (!currentRole || !allowedRoles?.includes(currentRole)) {
    return <Navigate to="/404" replace />;
  }
  
  return <>{children}</>;
};
// export const RoleProtectedRoute = ({

//   children,
//   allowedRoles,
//   currentRole
// }: ProtectedRouteProps) => {

//   if (!currentRole || !allowedRoles?.includes(currentRole)) {
//     return <Navigate to="/404" replace />;
//   }
//   return <>{children}</>;
// };
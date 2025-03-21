import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AnalyticsPage = lazy(() => import('src/pages/analytics'));
export const EntryValidationPage = lazy(() => import('src/pages/entry-validation'));
export const MarketingEngagenmentPage = lazy(() => import('src/pages/marketing-engagenment'));
export const EventDetailsPage = lazy(() => import('src/pages/event-details'));
export const TicketAndReservationManagementPage = lazy(() => import('src/pages/ticket-and-reservation-management'));
export const StatisticsAndReportsPage = lazy(() => import('src/pages/statistics-and-reports'));
export const VisibilityAndAccessSettingsPage = lazy(() => import('src/pages/visibility-and-access-settings'));
export const TransectionAndPaymentPage = lazy(() => import('src/pages/transection-and-payment'));
export const ServiceProviderAndManageContractsPage = lazy(() => import('src/pages/service-provider-and-manage-contracts'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'blog', element: <BlogPage /> },
        { path: 'analytics', element: <AnalyticsPage /> },
        { path: 'event-details', element: <EventDetailsPage /> },
        { path: 'ticket-and-reservation-management', element: <TicketAndReservationManagementPage /> },
        { path: 'entry-validation', element: <EntryValidationPage /> },
        { path: 'marketing-engagenment', element: <MarketingEngagenmentPage /> },
        { path: 'transection-and-payment', element: <TransectionAndPaymentPage /> },
        { path: 'statistics-and-reports', element: <StatisticsAndReportsPage /> },
        { path: 'visibility-and-access-settings', element: <VisibilityAndAccessSettingsPage /> },
        { path: 'service-provider-and-manage-contracts', element: <ServiceProviderAndManageContractsPage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}

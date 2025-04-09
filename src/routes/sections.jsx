import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { isUserLoggedIn } from 'src/redux/actions';
import Protected from 'src/redux/helper/HOC';
import { TrackingBookedServicesAndProvidersView } from 'src/sections/tracking-of-booked-services-&-providers/view';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const FrontHomePage = lazy(() => import('src/pages/front-home'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const EntryValidationPage = lazy(() => import('src/pages/entry-validation'));
export const MarketingEngagenmentPage = lazy(() => import('src/pages/marketing-engagenment'));
export const EventDetailsPage = lazy(() => import('src/pages/event-details'));
export const TicketAndReservationManagementPage = lazy(() => import('src/pages/ticket-and-reservation-management'));
export const StatisticsAndReportsPage = lazy(() => import('src/pages/statistics-and-reports'));
export const VisibilityAndAccessSettingsPage = lazy(() => import('src/pages/visibility-and-access-settings'));
export const TransectionAndPaymentPage = lazy(() => import('src/pages/transection-and-payment'));

export const ConfirmedServiceCalendarPage = lazy(() => import('src/pages/confirmed-service-calendar'));
export const CustomPhotoAndVideoFiltersforEventsPage = lazy(() => import('src/pages/custom-photo-or-video-filters-for-events'));
export const EventSearchAndDetailsPage = lazy(() => import('src/pages/event-search-and-details'));
export const HomeAndGlobalPage = lazy(() => import('src/pages/home-and-global-view'));
export const HomeAndRecommendationsPage = lazy(() => import('src/pages/home-and-recommendations'));
export const LoyaltyProgramPage = lazy(() => import('src/pages/loyalty-program'));
export const ReservationsAndContractsPage = lazy(() => import('src/pages/reservations-and-contracts'));
export const TicketManagementViewPage = lazy(() => import('src/pages/ticket-management'));
export const TicketPurchaseProcessPage = lazy(() => import('src/pages/ticket-purchase-process'));
export const TicketValidationAtEntryPage = lazy(() => import('src/pages/ticket-validation-at-entry'));

// New
export const TransactionAndPaymentManagementPage = lazy(() => import('src/pages/transaction-&-payment-management'));
export const MessagingAndClientRelationshipPage = lazy(() => import('src/pages/messaging-&-client-relationship'));
export const StatisticsAndPerformancePage = lazy(() => import('src/pages/statistics-&-performance'));
export const SearchAndSelectServiceProvidersPage = lazy(() => import('src/pages/search-&-select-service-providers'));
export const ServiceRequestAndNegotiationPage = lazy(() => import('src/pages/service-request-&-negotiation'));
export const trackingOfBookedServicesAndProvidersPage = lazy(() => import('src/pages/tracking-of-booked-services-&-providers'));
export const GlobalOverviewAndGeneralStatisticsPage = lazy(() => import('src/pages/global-overview-&-general-statistics'));
export const UserManagementPage = lazy(() => import('src/pages/user-management'));
export const TicketingAndTransactionsSupervisionPage = lazy(() => import('src/pages/ticketing-&-transactions-supervision'));
export const MarketplaceAndServiceProviderSupervisionPage = lazy(() => import('src/pages/marketplace-&-service-provider-supervision'));
export const PasswordRecoveryPage = lazy(() => import('src/pages/password-recovery'));
export const ProfileAndServicesManagementPage = lazy(() => import('src/pages/profile-&-services-management'));

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
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth?.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, auth?.authenticate]); // ✅ Remove `auth` from dependencies

  return useRoutes([
    {
      element: (
        <Protected>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </Protected>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'blog', element: <BlogPage /> },
        { path: 'event-details', element: <EventDetailsPage /> },
        { path: 'ticket-and-reservation-management', element: <TicketAndReservationManagementPage /> },
        { path: 'entry-validation', element: <EntryValidationPage /> },
        { path: 'marketing-engagenment', element: <MarketingEngagenmentPage /> },
        { path: 'transection-and-payment', element: <TransectionAndPaymentPage /> },
        { path: 'statistics-and-reports', element: <StatisticsAndReportsPage /> },
        { path: 'visibility-and-access-settings', element: <VisibilityAndAccessSettingsPage /> },
        { path: 'home-and-recommendations', element: <HomeAndRecommendationsPage /> },
        { path: 'event-search-and-details', element: <EventSearchAndDetailsPage /> },
        { path: 'ticket-purchase-process', element: <TicketPurchaseProcessPage /> },
        { path: 'ticket-management', element: <TicketManagementViewPage /> },
        { path: 'ticket-validation-at-entry', element: <TicketValidationAtEntryPage /> },
        { path: 'loyalty-program', element: <LoyaltyProgramPage /> },
        { path: 'custom-photo-or-video-filters-for-events', element: <CustomPhotoAndVideoFiltersforEventsPage /> },
        { path: 'home-and-global-view', element: <HomeAndGlobalPage /> },
        { path: 'reservations-and-contracts', element: <ReservationsAndContractsPage /> },
        { path: 'confirmed-service-calendar', element: <ConfirmedServiceCalendarPage /> },


        // New
        { path: 'transaction-&-payment-management', element: <TransactionAndPaymentManagementPage /> },
        { path: 'messaging-&-client-relationship', element: <MessagingAndClientRelationshipPage /> },
        { path: 'statistics-&-performance', element: <StatisticsAndPerformancePage /> },
        { path: 'search-&-select-service-providers', element: <SearchAndSelectServiceProvidersPage /> },
        { path: 'service-request-&-negotiation', element: <ServiceRequestAndNegotiationPage /> },
        { path: 'tracking-of-booked-services-&-providers', element: <TrackingBookedServicesAndProvidersView /> },
        { path: 'global-overview-&-general-statistics', element: <GlobalOverviewAndGeneralStatisticsPage /> },
        { path: 'user-management', element: <UserManagementPage /> },
        { path: 'ticketing-&-transactions-supervision', element: <TicketingAndTransactionsSupervisionPage /> },
        { path: 'marketplace-&-service-provider-supervision', element: <MarketplaceAndServiceProviderSupervisionPage /> },
        { path: 'password-recovery', element: <PasswordRecoveryPage /> },
        { path: 'profile-&-services-management', element: <ProfileAndServicesManagementPage /> },

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
      path: 'home',
      element: (
        <FrontHomePage />
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

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
import { RoleProtectedRoute } from 'src/redux/helper/RoleWise';
import { TrackingBookedServicesAndProvidersView } from 'src/sections/tracking-of-booked-services-&-providers/view';
import { MultipleDashboard } from 'src/hooks/common-dashbord';

// ----------------------------Organizer Routes------------------------------------------
export const MarketingEngagenmentPage = lazy(() => import('src/pages/marketing-engagenment'));
export const EventDetailsPage = lazy(() => import('src/pages/event-details'));
export const EntryValidationPage = lazy(() => import('src/pages/entry-validation'));
export const TransectionAndPaymentPage = lazy(() => import('src/pages/transection-and-payment'));
export const StatisticsAndReportsPage = lazy(() => import('src/pages/statistics-and-reports'));
export const VisibilityAndAccessSettingsPage = lazy(() => import('src/pages/visibility-and-access-settings'));
export const SearchAndSelectServiceProvidersPage = lazy(() => import('src/pages/search-&-select-service-providers'));

// ----------------------------Admin Routes------------------------------------------
// ----------------------------Participant Routes------------------------------------------
export const EventSearchAndDetailsPage = lazy(() => import('src/pages/event-search-and-details'));

// ----------------------------Service Provider Routes------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const FrontHomePage = lazy(() => import('src/pages/front-home'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const TicketAndReservationManagementPage = lazy(() => import('src/pages/ticket-and-reservation-management'));

export const ConfirmedServiceCalendarPage = lazy(() => import('src/pages/confirmed-service-calendar'));
export const CustomPhotoAndVideoFiltersforEventsPage = lazy(() => import('src/pages/custom-photo-or-video-filters-for-events'));
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

  // Get current user role from auth state
  const currentRole = auth?.user?.role || 'participant'

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
        // Participant Route

        {
          path: 'home-and-recommendations',
          element: <RoleProtectedRoute allowedRoles={['participant']} currentRole={currentRole}><HomeAndRecommendationsPage /></RoleProtectedRoute>
        },
        {
          path: 'event-search-and-details',
          element: <RoleProtectedRoute allowedRoles={['participant']} currentRole={currentRole}><EventSearchAndDetailsPage /></RoleProtectedRoute>
        },
        {
          path: 'ticket-purchase-process',
          element: <RoleProtectedRoute allowedRoles={['participant']} currentRole={currentRole}><TicketPurchaseProcessPage /></RoleProtectedRoute>
        },
        {
          path: 'ticket-management',
          element: <RoleProtectedRoute allowedRoles={['participant']} currentRole={currentRole}><TicketManagementViewPage /></RoleProtectedRoute>
        },
        {
          path: 'ticket-validation-at-entry',
          element: <RoleProtectedRoute allowedRoles={['participant']} currentRole={currentRole}><TicketValidationAtEntryPage /></RoleProtectedRoute>
        },
        {
          path: 'loyalty-program',
          element: <RoleProtectedRoute allowedRoles={['participant']} currentRole={currentRole}><LoyaltyProgramPage /></RoleProtectedRoute>
        },
        {
          path: 'custom-photo-or-video-filters-for-events',
          element: <RoleProtectedRoute allowedRoles={['participant']} currentRole={currentRole}><CustomPhotoAndVideoFiltersforEventsPage /></RoleProtectedRoute>
        },

        // -----------------------**************-------------------------

        // Organizer Route
        
        {
          path: 'statistics-&-reports',
          element: <RoleProtectedRoute allowedRoles={['organizer']} currentRole={currentRole}><StatisticsAndReportsPage /></RoleProtectedRoute>
        },
        {
          path: '/events/add-new',
          element: <RoleProtectedRoute allowedRoles={['organizer']} currentRole={currentRole}><EventDetailsPage /></RoleProtectedRoute>
        },
        {
          path: 'ticket-and-reservation-management',
          element: <RoleProtectedRoute allowedRoles={['organizer']} currentRole={currentRole}><TicketAndReservationManagementPage /></RoleProtectedRoute>
        },
        {
          path: 'marketing-engagenment',
          element: <RoleProtectedRoute allowedRoles={['organizer']} currentRole={currentRole}><MarketingEngagenmentPage /></RoleProtectedRoute>
        },
        {
          path: 'transection-and-payment',
          element: <RoleProtectedRoute allowedRoles={['organizer']} currentRole={currentRole}><TransectionAndPaymentPage /></RoleProtectedRoute>
        },
        {
          path: 'entry-validation',
          element: <RoleProtectedRoute allowedRoles={['organizer']} currentRole={currentRole}><EntryValidationPage /></RoleProtectedRoute>
        },
        {
          path: 'search-&-select-service-providers',
          element: <RoleProtectedRoute allowedRoles={['organizer', 'provider']} currentRole={currentRole}><SearchAndSelectServiceProvidersPage /></RoleProtectedRoute>
        },
        {
          path: 'visibility-and-access-settings',
          element: <RoleProtectedRoute allowedRoles={['organizer']} currentRole={currentRole}><VisibilityAndAccessSettingsPage /></RoleProtectedRoute>
        },

        // -----------------------**************-------------------------

        // Service Provider Route
        {
          path: 'tracking-of-booked-services-&-providers',
          element: <RoleProtectedRoute allowedRoles={['provider']} currentRole={currentRole}><TrackingBookedServicesAndProvidersView /></RoleProtectedRoute>
        },
        {
          path: '/',
          element: <RoleProtectedRoute allowedRoles={['provider']} currentRole={currentRole}><StatisticsAndPerformancePage /> </RoleProtectedRoute>
        },

        {
          path: 'home-and-global-view',
          element: <RoleProtectedRoute allowedRoles={['provider']} currentRole={currentRole}><HomeAndGlobalPage /></RoleProtectedRoute>
        },
        {
          path: 'profile-&-services-management',
          element: <RoleProtectedRoute allowedRoles={['provider', 'admin', 'organizer']} currentRole={currentRole}><ProfileAndServicesManagementPage /></RoleProtectedRoute>
        },
        {
          path: 'confirmed-service-calendar',
          element: <RoleProtectedRoute allowedRoles={['provider']} currentRole={currentRole}><ConfirmedServiceCalendarPage /></RoleProtectedRoute>
        },
        {
          path: 'reservations-and-contracts',
          element: <RoleProtectedRoute allowedRoles={['provider']} currentRole={currentRole}><ReservationsAndContractsPage /></RoleProtectedRoute>
        },
        {
          path: 'transaction-&-payment-management',
          element: <RoleProtectedRoute allowedRoles={['provider']} currentRole={currentRole}><TransactionAndPaymentManagementPage /></RoleProtectedRoute>
        },
        {
          path: 'messaging-&-client-relationship',
          element: <RoleProtectedRoute allowedRoles={['provider']} currentRole={currentRole}><MessagingAndClientRelationshipPage /></RoleProtectedRoute>
        },

        {
          path: 'service-request-&-negotiation',
          element: <RoleProtectedRoute allowedRoles={['organizer', 'provider']} currentRole={currentRole}><ServiceRequestAndNegotiationPage /></RoleProtectedRoute>
        },
        // -----------------------**************-------------------------
        {
          path: 'global-overview-&-general-statistics',
          element: <RoleProtectedRoute allowedRoles={['admin']} currentRole={currentRole}><GlobalOverviewAndGeneralStatisticsPage /></RoleProtectedRoute>
        },
        {
          path: 'user-management',
          element: <RoleProtectedRoute allowedRoles={['admin']} currentRole={currentRole}><UserManagementPage /></RoleProtectedRoute>
        },
        {
          path: 'ticketing-&-transactions-supervision',
          element: <RoleProtectedRoute allowedRoles={['admin']} currentRole={currentRole}><TicketingAndTransactionsSupervisionPage /></RoleProtectedRoute>
        },
        {
          path: '/',
          element: <RoleProtectedRoute allowedRoles={['admin']} currentRole={currentRole}><MarketplaceAndServiceProviderSupervisionPage /></RoleProtectedRoute>
        },
        // -----------------------**************-------------------------

        {
          index: true,
          path: '/',
          element: <RoleProtectedRoute
            allowedRoles={['participant', 'admin', 'organizer', 'provider']}
            currentRole={currentRole}
          >
            <MultipleDashboard />
          </RoleProtectedRoute>
        },

        // { element: <HomePage />, index: true, },

        { path: 'password-recovery', element: <PasswordRecoveryPage /> },
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
      path: '/our-event/:eventId',
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

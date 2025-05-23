import { lazy, Suspense } from 'react';
import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { varAlpha } from 'src/theme/styles';
import { Outlet } from 'react-router-dom';

// Lazy load dashboard components
const HomePage = lazy(() => import('../pages/home'));
const StatisticsAndPerformancePage = lazy(() => import('../pages/statistics-&-performance'));
const HomeAndRecommendationsPage = lazy(() => import('../pages/home-and-recommendations'));
const MarketplaceAndServiceProviderSupervisionPage = lazy(() => import('../pages/marketplace-&-service-provider-supervision'));

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

export function MultipleDashboard() {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const isLoading = useSelector((state: RootState) => state.auth.loading);

    if (isLoading) {
        return renderFallback;
    }

    return (
        <Suspense fallback={renderFallback}>
            <Box className="dashboard-container">
                {(() => {
                    switch (role) {
                        case 'participant':
                            return <HomeAndRecommendationsPage />;
                        case 'admin':
                            return <MarketplaceAndServiceProviderSupervisionPage />;
                        case 'organizer':
                            return <HomePage />;
                        case 'provider':
                            return <StatisticsAndPerformancePage />;
                        default:
                            return <HomePage />;
                    }
                })()}
            </Box>
        </Suspense>
    );
};

export function RootLayout() {
    return (
        <Box className="app-container">
            <Outlet />
        </Box>
    );
};
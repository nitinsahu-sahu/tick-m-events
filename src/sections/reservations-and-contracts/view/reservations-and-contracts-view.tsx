import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { AppDispatch, RootState } from "src/redux/store";
import { getReservationContracts } from "src/redux/actions/provider/reservation-contract";
import { ReservationsTable } from "../reservationTable";


export function ReservationsAndContractsView() {
    const dispatch = useDispatch<AppDispatch>();
    const { resarvationContracts } = useSelector((state: RootState) => state?.providerRC);
    const [viewType, setViewType] = useState<null | "active" | "completed">('active');

    useEffect(() => {
        dispatch(getReservationContracts());
    }, [dispatch]);

    const handleCardButtonClick = (type: "active" | "completed") => {
        setViewType(type);
    };

    return (
        <DashboardContent>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Reservations & Contracts
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Manage your active contracts and view completed projects
                </Typography>
            </Box>

            {/* Metrics Cards */}
            <MatrixThreeCard
                metrics={[
                    {
                        title: "Active Contracts",
                        value: resarvationContracts?.summary?.totalActiveProjects || 0,
                        buttonType: "active"
                    },
                    {
                        title: "Completed Projects",
                        value: resarvationContracts?.summary?.totalCompletedProjects || 0,
                        buttonType: "completed"
                    },
                    {
                        title: "Total Expected Payments",
                        value: `${resarvationContracts?.summary?.overallExpectedPayments || 0} XAF`
                    }
                ]}
                onCardButtonClick={handleCardButtonClick}
            />

            {/* Active Projects Table */}
            {viewType === "active" && resarvationContracts?.activeProjects?.projects && (
                <Box mt={4}>
                    <Typography variant="h5" fontWeight="600" gutterBottom sx={{
                        color: "#2295D4",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        Active Contracts
                        <Typography
                            component="span"
                            sx={{
                                backgroundColor: "#2295D4",
                                color: "white",
                                borderRadius: "50%",
                                width: 24,
                                height: 24,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem"
                            }}
                        >
                            {resarvationContracts.activeProjects.count}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Total Expected Payments: {resarvationContracts.activeProjects.totalExpectedPayments} XAF
                    </Typography>
                    <ReservationsTable
                        projects={resarvationContracts.activeProjects.projects}
                        type="active"
                    />
                </Box>
            )}

            {/* Completed Projects Table */}
            {viewType === "completed" && resarvationContracts?.completedProjects?.projects && (
                <Box mt={4}>
                    <Typography variant="h5" fontWeight="600" gutterBottom sx={{
                        color: "#4CAF50",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}>
                        Completed Projects
                        <Typography
                            component="span"
                            sx={{
                                backgroundColor: "#4CAF50",
                                color: "white",
                                borderRadius: "50%",
                                width: 24,
                                height: 24,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem"
                            }}
                        >
                            {resarvationContracts.completedProjects.count}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Total Payments: {resarvationContracts.completedProjects.totalExpectedPayments} XAF
                    </Typography>
                    <ReservationsTable
                        projects={resarvationContracts.completedProjects.projects}
                        type="completed"
                    />
                </Box>
            )}
        </DashboardContent>
    );
}
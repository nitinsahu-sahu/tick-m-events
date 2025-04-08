import { useState } from "react";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { Box, Button, Stack, Grid, Paper, Typography } from '@mui/material';
import { ConfirmedserviceCalendarTable } from "src/components/tables/confirmed-service-calender-table";
import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { TabWithTableView } from "../tab-with-table";

export function ConfirmedServiceCalendarView() {
    const [activeTab, setActiveTab] = useState('calendar');
    const stats = [
        { title: 'Confirmed Services', value: 15 },
        { title: 'Upcoming Dates', value: 5 },
        { title: 'Available Slots', value: 8 },
    ];
    const expectedPaymentsTableHeader = ["Service", "Location", "Date & Time", "Expected Payment", "Status", "Actions"];
    const expectedPaymentsTableData = [
        { type: "DJ Entertainment", location: "Douala", datetime: "10/02/2025 - 8 PM", payment: "250,000 XAF", status: "Confirmed", action: "View Contract" },
        { type: "DJ Entertainment", location: "Douala", datetime: "10/02/2025 - 8 PM", payment: "250,000 XAF", status: "Confirmed", action: "View Contract" },
    ];
    const confirmedServiceListTableHeader = ["Service", "Location", "Date & Time", "Expected Payment", "Reminders", "Status", "Actions"];
    const confirmedServiceListTableData = [
        { type: "DJ Entertainment", location: "Douala", datetime: "10/02/2025 - 8 PM", payment: "250,000 XAF", reminders: ["1 Week", "3 Days", "3 Hours"], status: "Confirmed", action: "View Contract" },
        { type: "DJ Entertainment", location: "Douala", datetime: "10/02/2025 - 8 PM", payment: "250,000 XAF", reminders: ["1 Week", "3 Days", "3 Hours"], status: "Confirmed", action: "View Contract" },
    ];

    return (
        <DashboardContent>
            <PageTitleSection
                title="Reservations & Contracts"
            />

            <MatrixThreeCard metrics={stats} />
            <TabWithTableView />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                    px: 2,
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ width: { xs: '100%', sm: 'auto' }, alignItems: 'center' }}
                >
                    <Button
                        variant={activeTab === 'calendar' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('calendar')}
                        sx={{
                            borderRadius: '20px',
                            minWidth: { xs: '100%', sm: 140 },
                            bgcolor: activeTab === 'calendar' ? '#0C2D48' : 'transparent',
                            color: activeTab === 'calendar' ? '#fff' : '#0C2D48',
                            borderColor: '#0C2D48',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: activeTab === 'calendar' ? '#0C2D48' : '#f5f5f5',
                            },
                        }}
                    >
                        Calendar View
                    </Button>

                    <Button
                        variant={activeTab === 'services' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('services')}
                        sx={{
                            borderRadius: '20px',
                            minWidth: { xs: '100%', sm: 140 },
                            bgcolor: activeTab === 'services' ? '#0C2D48' : 'transparent',
                            color: activeTab === 'services' ? '#fff' : '#0C2D48',
                            borderColor: '#0C2D48',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: activeTab === 'services' ? '#0C2D48' : '#f5f5f5',
                            },
                        }}
                    >
                        Service List
                    </Button>

                    <Button
                        variant={activeTab === 'reminders' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('reminders')}
                        sx={{
                            borderRadius: '20px',
                            minWidth: { xs: '100%', sm: 200 },
                            bgcolor: activeTab === 'reminders' ? '#0C2D48' : 'transparent',
                            color: activeTab === 'reminders' ? '#fff' : '#0C2D48',
                            borderColor: '#0C2D48',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: activeTab === 'reminders' ? '#0C2D48' : '#f5f5f5',
                            },
                        }}
                    >
                        Reminders & Notifications
                    </Button>
                </Stack>
            </Box>

            <Box mt={4}>
                <Paper
                    elevation={6}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Service List
                    </Typography>
                    <ConfirmedserviceCalendarTable headers={expectedPaymentsTableHeader} data={expectedPaymentsTableData} type="1" />

                </Paper>


            </Box>
            <Box mt={4}>
                <Paper
                    elevation={6}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Confirmed Service List
                    </Typography>

                    <ConfirmedserviceCalendarTable headers={confirmedServiceListTableHeader} data={confirmedServiceListTableData} type="2" />

                </Paper>
            </Box>
        </DashboardContent>
    )
}
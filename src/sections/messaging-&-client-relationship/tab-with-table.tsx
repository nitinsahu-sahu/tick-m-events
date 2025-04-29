import { Box, Button, Paper, Tab, Tabs, Typography, Stack, Grid } from "@mui/material";
import { useState } from "react";
import { ActiveConversationsTableHeaders, ActiveConversationsTableData, SharedFilesDocumentsTableHeader, SharedFilesDocumentsTableData, GeneralConversationsTableHeaders, GeneralConversationsTableData, ChatOrganizerTableHeaders, ChatOrganizerTableData } from "./utills";
import { RequestTabSection } from "./request-tab-section";
import { ChatBox } from "./chatbox";

export function TabWithTableView() {
    const [tabValue, setTabValue] = useState(0);
    const tabLabels = ["Inbox", "Important Messages", "Shared Files", "Conversation History"];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const notifications = [
        {
            id: 1,
            message: 'Your quote needs to be updated.',
            type: 'error',
        },
        {
            id: 2,
            message: 'Reminder: Pending response from the client.',
            type: 'normal',
        },
    ];
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    TabIndicatorProps={{ style: { display: "none" } }}
                    sx={{
                        display: "flex",
                    }}
                >
                    {tabLabels.map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            disableRipple
                            sx={{
                                px: 3,
                                mx: 1,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                color: tabValue === index ? "white !important" : "#0B2E4C", // white for active tab
                                backgroundColor: tabValue === index ? "#0B2E4C" : "transparent",
                                border: tabValue === index ? "none" : "1px solid #ccc",
                                transition: "all 0.3s ease",
                                minWidth: "fit-content",
                                whiteSpace: "nowrap",
                                "&:hover": {
                                    backgroundColor: tabValue === index ? "#002244" : "#f5f5f5",
                                },
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <>
                    <Paper elevation={6}
                        sx={{
                            mt: 3,
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden",
                        }}
                    >
                        <RequestTabSection
                            title="Active Conversations"
                            description=""
                            headers={ActiveConversationsTableHeaders}
                            data={ActiveConversationsTableData}
                            type="1"
                        />
                    </Paper>

                    <Paper elevation={6}
                        sx={{
                            mt: 3,
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden",
                        }}
                    >
                        <RequestTabSection
                            title="Conversations"
                            description=""
                            headers={GeneralConversationsTableHeaders}
                            data={GeneralConversationsTableData}
                            type="2"
                        />
                    </Paper>


                    <Paper elevation={6}
                        sx={{
                            mt: 3,
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden",
                        }}
                    >
                        <RequestTabSection
                            title="Chat with Organizer"
                            description="Project Details"
                            headers={ChatOrganizerTableHeaders}
                            data={ChatOrganizerTableData}
                            type="3"
                        />
                        <ChatBox />

                    </Paper>

                </>

            )}

            {tabValue === 1 && (
                <Paper
                    elevation={6}
                    sx={{
                        mt: 4,
                        p: { xs: 2, sm: 3 },
                        borderRadius: 3,
                        boxShadow: 3,
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 2 }}
                    >
                        Notifications & Important Message Follow-up
                    </Typography>

                    <Paper
                        elevation={1}
                        sx={{
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow:3,
                            border:"1px solid black"
                        }}
                    >
                        {notifications.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    px: { xs: 2, sm: 3 },
                                    py: 2,
                                    display: 'flex',
                                    flexDirection: {
                                        xs: 'column',
                                        sm: 'row',
                                    },
                                    alignItems: {
                                        xs: 'flex-start',
                                        sm: 'center',
                                    },
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    borderBottom: index !== notifications.length - 1 ? '1px solid #e0e0e0' : 'none',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: item.type === 'error' ? 'error.main' : 'text.primary',
                                        fontWeight: item.type === 'error' ? 600 : 400,
                                    }}
                                >
                                    {item.message}
                                </Typography>

                                <Stack direction="row" spacing={1}>
                                    <Button variant="contained" sx={{ backgroundColor: '#0b2f4b', textTransform: 'none' }}>
                                        Mark as Read
                                    </Button>
                                    <Button variant="contained" sx={{ backgroundColor: '#0b2f4b', textTransform: 'none' }}>
                                        Resend Follow-up Message
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                    </Paper>
                </Paper>
            )}
            {tabValue === 2 && (
                <>
                    <Paper elevation={6}
                        sx={{
                            mt: 2,
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 3,
                            overflow: "hidden",
                        }}
                    >
                        <RequestTabSection
                            title="Shared Files & Documents"
                            description="Exchanged Attachments"
                            headers={SharedFilesDocumentsTableHeader}
                            data={SharedFilesDocumentsTableData}
                            type="5"
                        />
                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#0B2E4C",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#002244" },
                                        }}
                                    >
                                        Add a file
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#0B2E4C",
                                            color: "white",
                                            "&:hover": { backgroundColor: "#002244" },
                                        }}
                                    >
                                        Download All Attachments
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </>

            )}
            {tabValue === 3 && (
                <Paper elevation={6}
                    sx={{
                        mt: 2,
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        overflow: "hidden",
                    }}
                >
                    <Typography>History</Typography>
                </Paper>
            )}
        </>
    )
}
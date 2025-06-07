import { Details } from "@mui/icons-material";
import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { ReservationsAndContractsTable } from "src/components/tables/reservations-&-contracts-table";
import { onServiceTableData, onServiceTableHeader, pendingRequestTableData, pendingRequestTableHeaders, requestDetails, serviceContract, signedContractTableData, signedContractTableHeader } from "./utills";
import { RequestTabSection } from "./request-tab-section";



export function TabWithTableView() {
    const [tabValue, setTabValue] = useState(0);
    const tabLabels = ["Pending Requests", "Signed Contracts", "Ongoing & Completed"];

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                    marginTop: 3,
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    TabIndicatorProps={{ style: { display: "none" } }}
                    textColor="inherit"
                    sx={{
                        "& .MuiTabs-scroller": {
                            overflow: "auto !important"
                        }
                    }}
                >
                    {tabLabels.map((label, index) => (
                        <Tab
                            key={index}
                            label={label}
                            sx={{
                                px: { xs: 1, sm: 3 },
                                minWidth: "unset",
                                textTransform: "none",
                                fontWeight: tabValue === index ? "bold" : "normal",
                                color: tabValue === index ? "black" : "gray",
                                fontSize: { xs: "0.75rem", sm: "0.875rem" }
                            }}
                        />
                    ))}
                </Tabs>
            </Paper>

            <Paper elevation={6}
                sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                }}
            >
                {tabValue === 0 && (
                    <RequestTabSection
                        title="Pending Requests"
                        description="Tracks sent proposals and ongoing negotiations with event organizers."
                        headers={pendingRequestTableHeaders}
                        data={pendingRequestTableData}
                        type="1"
                        detailsTitle="Request Details"
                        details={[
                            { label: "Organizer", value: requestDetails.organizer },
                            { label: "Service", value: requestDetails.service },
                            { label: "Budget", value: requestDetails.budget },
                            { label: "Location", value: requestDetails.location },
                            { label: "Date & Time", value: requestDetails.dateTime },
                            { label: "Requirements", value: requestDetails.requirements },
                            { label: "Discussion Status", value: requestDetails.discussionStatus }
                        ]}
                        buttons={[
                            { label: "Contact Client", variant: "contained" },
                            { label: "Accept & Generate Contract", variant: "outlined" }
                        ]}
                    />
                )}
                {tabValue === 1 && (
                    <RequestTabSection
                        title="Signed Contracts"
                        description="Tracks confirmed services with the 10% commission deposit to TICK-M."
                        headers={signedContractTableHeader}
                        data={signedContractTableData}
                        type="2"
                        detailsTitle="Contract Details"
                        details={[
                            { label: "Service", value: serviceContract.service },
                            { label: "Organizer", value: serviceContract.organizer },
                            { label: "Provider", value: serviceContract.provider },
                            { label: "Location", value: serviceContract.location },
                            { label: "Date", value: serviceContract.date },
                            { label: "Amount", value: serviceContract.amount },
                            { label: "Deposit", value: serviceContract.deposit },
                            { label: "Remaining Payment", value: serviceContract.payment },
                            { label: "Terms & Conditions", value: serviceContract["terms & Conditions"] }
                        ]}
                        buttons={[
                            { label: "Download Contract (PDF)", variant: "contained" },
                            { label: "Contact the Organizer", variant: "outlined" }
                        ]}
                    />
                )}
                {tabValue === 2 && (
                    <RequestTabSection
                        title="Ongoing & Completed Services"
                        description="Manage confirmed services and track their progress."
                        headers={onServiceTableHeader}
                        data={onServiceTableData}
                        type="3"
                    />
                )}
            </Paper>







        </>

    )
}
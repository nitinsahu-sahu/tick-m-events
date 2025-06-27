import { Box, Button, Paper, Tab, Tabs, Typography, TextField, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { MatrixThreeCard } from "src/components/matrix-three-cards/matrix-three-cards";
import { metrics, paymentSettings, transactionsPaymentHistoryTableData, transactionsPaymentHistoryTableHeaders } from "./utills";
import { RequestTabSection } from "./request-tab-section";

export function TabWithTableView() {
    const [tabValue, setTabValue] = useState(0);
    // const tabLabels = ["Transactions", "Payment & Commisions", "Invoices & Receipts", "Payment Settings"];
     const tabLabels = ["Transactions", "Payment Settings"];
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const [formValues, setFormValues] = useState(
        paymentSettings.bankingFields.reduce((acc: Record<string, string>, field) => {
            acc[field] = "";
            return acc;
        }, {} as Record<string, string>)
    );
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const [statusFilter, setStatusFilter] = useState("All");
    const [serviceFilter, setServiceFilter] = useState("All");

    // Get unique services for filter
    const uniqueServices = [...new Set(transactionsPaymentHistoryTableData.map(item => item.requestedService))];

    // Filter logic
    const filteredData = transactionsPaymentHistoryTableData.filter((item) => {
        const matchStatus = statusFilter === "All" || item.status === statusFilter;
        const matchService = serviceFilter === "All" || item.requestedService === serviceFilter;
        return matchStatus && matchService;
    });
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
            <MatrixThreeCard metrics={metrics} />
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
                    <>
                        <Typography variant="h5" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                            Transactions & Payment History
                        </Typography>

                        {/* Dropdowns */}
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            {/* Contained style */}
                            <Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                displayEmpty
                                IconComponent={ExpandMoreRoundedIcon}
                                sx={{
                                    backgroundColor: "#0B2E4C",
                                    color: "white",
                                    fontWeight: 500,
                                    borderRadius: 3,
                                    height: "40px",
                                    width: "175px",
                                    fontSize: { xs: "11px", sm: "13px", md: "15px" },
                                    ".MuiOutlinedInput-notchedOutline": { border: "none" },
                                    "& .MuiSelect-icon": {
                                        color: "white",
                                        fontSize: "16px", // makes arrow bigger and bolder
                                        fontWeight: "500",
                                    },
                                }}
                            >
                                <MenuItem value="All" sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}>Filter By Status</MenuItem>
                                <MenuItem value="Received" sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}>Received</MenuItem>
                                <MenuItem value="Pending" sx={{ fontSize: { xs: "11px", sm: "13px", md: "15px" } }}>Pending</MenuItem>
                            </Select>

                            {/* Outlined style */}
                            <Select
                                value={serviceFilter}
                                onChange={(e) => setServiceFilter(e.target.value)}
                                displayEmpty
                                IconComponent={ExpandMoreRoundedIcon}
                                sx={{
                                    backgroundColor: "white",
                                    color: "#000",
                                    fontWeight: 500,
                                    borderRadius: 3,
                                    height: "40px",
                                    width: "175px",
                                    fontSize: {xs:"11px",sm:"13px",md:"15px"},
                                    ".MuiOutlinedInput-notchedOutline": { border: "1px solid #C0C0C0" },
                                    "& .MuiSelect-icon": {
                                        color: "#000",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    },
                                }}
                            >
                                <MenuItem value="All">Filter By Service</MenuItem>
                                {uniqueServices.map((service) => (
                                    <MenuItem key={service} value={service} sx={{fontSize: {xs:"11px",sm:"13px",md:"15px"}}}>
                                        {service}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        {/* Table Component */}
                        <RequestTabSection
                            title="Transactions & Payment History"
                            headers={transactionsPaymentHistoryTableHeaders}
                            data={filteredData}
                            type="1"
                        />
                    </>
                )}
                 {tabValue === 1 && (
                    <>
                        <Typography variant="h6" fontWeight="bold" mb={1}>
                            Payment Settings
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" mb={1}>
                            Configurable Payment Methods
                        </Typography>

                        {[
                            "Mobile Money (MTN MoMo, Orange Money)",
                            "Bank Transfer",
                            "Visa or Master Card"
                        ].map((method) => (
                            <Typography key={method} variant="body2" sx={{ ml: 2 }}>
                                • {method}
                            </Typography>
                        ))}

                        <Typography variant="h6" fontWeight="bold" mt={1}>
                            Banking Information Update
                        </Typography>

                        <Box sx={{ backgroundColor: "#F2F2F2", borderRadius: "12px", p: 3 }}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={3}>
                                {paymentSettings.formTitle}
                            </Typography>

                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                            >
                                {paymentSettings.bankingFields.map((placeholder) => (
                                    <TextField
                                        key={placeholder}
                                        fullWidth
                                        placeholder={placeholder}
                                        value={formValues[placeholder]}
                                        onChange={(e) =>
                                            setFormValues({ ...formValues, [placeholder]: e.target.value })
                                        }
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                backgroundColor: "#FFFFFF",
                                                borderRadius: "12px",
                                                height: "48px"
                                            }
                                        }}
                                    />
                                ))}


                                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                    {paymentSettings.buttons.map((label, index) => (
                                        <Button
                                            type={index === 0 ? "submit" : "button"} // Only first button submits
                                            // onClick={index !== 0 ? () => console.log(`${label} clicked`) : undefined}
                                            key={index}
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#0B2E4C",
                                                color: "white",
                                                borderRadius: "6px",
                                                textTransform: "none",
                                                px: 3,
                                                "&:hover": { backgroundColor: "#002244" }
                                            }}
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        </Box>


                    </>

                )}

                {/* {tabValue === 1 && (
                    <RequestTabSection
                        title="TICK-M Commissions & Deductions"
                        headers={tickCommissionsDeductionsTableHeader}
                        data={tickCommissionsDeductionsTableData}
                        type="2"
                    />
                )}
                {tabValue === 2 && (
                    <>
                        <RequestTabSection
                            title="Invoices & Receipts"
                            headers={InvoicesAndReceiptsTableHeader}
                            data={InvoicesAndReceiptsTableData}
                            type="3"
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 2 }}>
                            <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white", "&:hover": { backgroundColor: "#002244" } }}>
                                Generate an Invoice
                            </Button>
                            <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white", "&:hover": { backgroundColor: "#002244" } }}>
                                Download All My Invoices
                            </Button>
                        </Box>
                    </>

                )}
                */}
            </Paper>
        </>
    )
}
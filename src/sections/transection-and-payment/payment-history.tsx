import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { SelectBar } from "src/components/tables/select-bar";
import { TransactionAndPaymentTable } from "src/components/tables/transaction-&-payment-table";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import { allTableData, tableHeaders, ticketDate, ticketOptions } from "./utils";


export function PaymentHistory() {
    const [selectedTicket, setSelectedTicket] = useState("all"); // Default to "all"
    const [selectedTicketDate, setSelectedTicketDate] = useState("all"); // Default to "all"

    // Filter data based on selections
    const filteredData = allTableData.filter(row => {
        const matchesTicket = selectedTicket === "all" || row.reference === selectedTicket;
        const matchesDate = selectedTicketDate === "all" || row.date === selectedTicketDate;
        return matchesTicket && matchesDate;
    });
    return (
        <>
            <HeadingCommon mt={3} variant="h5" title="Payment History" weight={600} baseSize="33px" />

            <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 }, borderRadius: 3, boxShadow: 3 }}>
                {/* Filters */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack on xs & sm, row on md+
                        alignItems: { xs: "stretch", sm: "stretch", md: "center" }, // Full width on small screens
                        gap: 2, // Maintain spacing
                        flexWrap: "wrap", // Wrap items for better fit
                        mb: 2
                    }}
                >
                    {/* Ticket Category */}
                    <SelectBar
                        title="Reference"
                        options={ticketOptions}
                        value={selectedTicket}
                        onChange={(event) => setSelectedTicket(event.target.value)}
                    />

                    <SelectBar
                        title="Date"
                        options={ticketDate}
                        value={selectedTicketDate}
                        onChange={(event) => setSelectedTicketDate(event.target.value)}
                    />
                </Box>

                {/* Table with filtered data */}
                <TransactionAndPaymentTable
                    headers={tableHeaders}
                    data={selectedTicket === "all" && selectedTicketDate === "all" ? allTableData : filteredData}
                    type="1"
                />
            </Paper>
        </>
    )
}
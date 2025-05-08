import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";
import { TicketCreationAndConfiguration } from "./ticket-creation-&-onfiguration";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function TicketManagement() {
    const theme = useTheme();
    const [showTicketCreation, setShowTicketCreation] = useState(false);

    const ticketManagementTableHeaders = ["Ticket Name", "Price", "Quantity Available", "Ticket Description", "Remaining Stock", "Actions"];
    const ticketManagementTableData = [
        { type: "Standard", price: "20", total: 100, remaining: "Access to general areas", sold: 800, action: "Edit" },
        { type: "VIP", price: "Free", total: "Unlimited", remaining: "Access to VIP areas", sold: 30, action: "Edit" },
    ];

    return (
        <Box>
            <HeadingCommon baseSize="33px" weight={600} variant="h5" title="Ticket Management" />

            <TicketReservationManagementTable headers={ticketManagementTableHeaders} data={ticketManagementTableData} type="1" />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#0B2E4E',
                        color: "#fff",
                        width: "90%",
                        '&:hover': { backgroundColor: '#2196F3' }
                    }}
                    onClick={() => setShowTicketCreation((prev) => !prev)}
                >
                    {showTicketCreation ? "Cancel Adding Ticket" : "Add a Ticket"}
                </Button>
            </Box>

            {showTicketCreation && (
                <Box mt={4}>
                    <TicketCreationAndConfiguration />
                </Box>
            )}
        </Box>
    )
}
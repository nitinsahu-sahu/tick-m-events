import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";
import { TicketCreationAndConfiguration } from "./ticket-creation-&-onfiguration";

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
            <Typography variant="h5" fontSize={{ xs: "24px", sm: "28px", md: "33px" }} color={theme.palette.common.black} fontWeight={600}>
                Ticket Management
            </Typography>
            <TicketReservationManagementTable headers={ticketManagementTableHeaders} data={ticketManagementTableData} type="1" />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.blue.dark,
                        color: "#fff",
                        width: "90%",
                        '&:hover': { backgroundColor: theme.palette.blue.main }
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
import { Typography, IconButton, Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useState } from "react";
import QrReader from 'react-qr-scanner'
import { Iconify } from "src/components/iconify";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import { TICKET_STATUS, tickets } from "./utills";

interface QRScanResult {
  text: string;
  // Add other properties if the QR scanner returns more data
}

const renderTicketDetails = (ticket: typeof tickets[0]) => {
    const details = [
        { label: "Entry Time", value: ticket.time },
        { label: "Name", value: ticket.name },
        { label: "Email", value: ticket.email },
        { label: "Ticket Type", value: ticket.ticketType },
        { label: "Status", value: ticket.status }
    ];

    return (
        <>
            {details.map((detail) => (
                detail.value && (
                    <Typography key={detail.label} variant="body2">
                        <strong>{detail.label}:</strong> {detail.value}
                    </Typography>
                )
            ))}
        </>
    );
};
export function TicketScanner() {
    const [delay] = useState<number>(100);
    const [result, setResult] = useState<string>('No result');

    const handleScan = (data: QRScanResult | null) => {
        if (data) {
            setResult(data.text);
        }
    };

    const handleError = (err: Error) => {
        console.error(err);
    };

    const previewStyle: React.CSSProperties = {
        height: 240,
        width: 320,
    };
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
            <HeadingCommon title="Ticket Scanner" color="#0B2E4C" weight={600} baseSize="33px" />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#0B2E4E',
                        color: "#fff",
                        width: "100%"
                    }}
                >
                    <Iconify icon="mdi:barcode-scan" width={20} height={20} /> Add a Ticket
                </Button>
            </Box>

            <Box display="flex" mt={2} gap={1}>
            
                <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                <p>{result}</p>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#0B2A4A",
                        color: "white",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#0A1E36" }
                    }}
                >
                    Verify
                </Button>
            </Box>

            <Grid container spacing={2} mt={2}>
                {tickets.map(ticket => (
                    <Grid item xs={12} key={ticket.id}>
                        <Card
                            sx={{
                                backgroundColor: TICKET_STATUS[ticket.status].backgroundColor,
                                borderRadius: "12px",
                                padding: "12px",
                                border: "2px solid #ddd",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <CardContent>
                                <HeadingCommon title={ticket.message} baseSize="23px" width={{ md: "34%" }} />
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    my={1}
                                    flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
                                    gap={{ xs: 2, sm: 0, md: 0 }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "green",
                                            color: "white",
                                            borderRadius: "8px",
                                            "&:hover": { backgroundColor: "darkgreen" },
                                            width: { xs: '100%', sm: 'auto', md: 'auto' }
                                        }}
                                    >
                                        Confirm Entry
                                    </Button>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        width={{ xs: '100%', sm: 'auto', md: 'auto' }}
                                        gap={1}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "red",
                                                color: "white",
                                                borderRadius: "8px",
                                                "&:hover": { backgroundColor: "darkred" },
                                                width: { xs: '100%', sm: 'auto', md: 'auto' }
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <IconButton sx={{ ml: 1 }}>
                                            <Iconify icon="mdi:information-outline" />
                                        </IconButton>
                                    </Box>
                                </Box>

                                {ticket.status === "ACCEPTED" && renderTicketDetails(ticket)}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
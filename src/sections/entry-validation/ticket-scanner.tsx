import { Typography, IconButton, Box, Button, Card, Grid, Tooltip } from "@mui/material";
import { useState } from "react";
import QrReader from 'react-qr-scanner'
import { useDispatch } from "react-redux";

import { Iconify } from "src/components/iconify";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { verifyTicketCode, confirmTicketEntry } from "src/redux/actions/eventOrder";
import { AppDispatch } from "src/redux/store";
import { formatTimeToAMPM } from "src/hooks/formate-time";

interface QRScanResult {
    text: string;
    // Add other properties if the QR scanner returns more data
}
interface Ticket {
    _id: string;
    eventId: string;
    tickets: Array<{
        ticketType: string;
        // add other ticket properties as needed
    }>;
    verifyEntry: boolean;
    entryTime?: string;
    userId?: {
        name: string;
        email: string;
        _id: string;
    };
    ticket: null

}

export function TicketScanner() {

    const dispatch = useDispatch<AppDispatch>();
    const [delay] = useState<number>(100);
    const [result, setResult] = useState<string>('No result');
    const [showScanner, setShowScanner] = useState<boolean>(false);
    const [flag, setFlag] = useState<{
        status: string;
        message: string;
        ticket?: Partial<Ticket> | null
    }>({ status: '', message: '' });
    const [isScanning, setIsScanning] = useState(false);
    const [scanMessage, setScanMessage] = useState<string | null>(null);

    const handleScan = (data: QRScanResult | null) => {
        if (data) {
            setResult(data.text);
            setShowScanner(false);
            setIsScanning(false);
            setScanMessage("✅ QR Code scanned successfully!");
            setTimeout(() => setScanMessage(null), 3000); // auto-clear message
        }
    };

    const handleError = (err: Error) => {
        setIsScanning(false);
        setScanMessage("❌ QR Scanner encountered an error.");
        setTimeout(() => setScanMessage(null), 3000);
    };

    const handleVerifyClick = async () => {
        if (!result || result === 'No result') return;
        // Extract ticket code from the result (full URL or path)
        let ticketCode = result;
        try {
            const url = new URL(result);
            const parts = url.pathname.split('/');
            ticketCode = parts[parts.length - 1];
        } catch {

            const parts = result.split('/');
            ticketCode = parts[parts.length - 1];
        }
        try {
            const res = await dispatch(verifyTicketCode({ ticketCode }));
            console.log("Action Result:", res);

            if (res.type === "VERIFY_TICKET_SUCCESS") {
                // Use flag to determine ticket state
                if (res.flag === "granted") {
                    setFlag({ status: "granted", message: res.message, ticket: res.ticket });
                } else if (res.flag === "already") {
                    setFlag({ status: "already", message: "Ticket already used.", ticket: res.ticket });
                } else {
                    setFlag({ status: "invalid", message: "Invalid or expired ticket.", ticket: null });
                }
            } else {
                // Failure case
                setFlag({ status: res.flag || "invalid", message: res.message, ticket: null });
            }
        } catch (error) {
            setFlag({ status: "error", message: "Verification failed. Try again." });
        }
    };


    const handleConfirmEntry = async () => {
        const ticketCode = result?.split('/')?.pop();
        if (!ticketCode) return;

        const now = new Date();
        const entryTime = now.toISOString();

        const res = await dispatch(
            confirmTicketEntry({
                verifyData: {
                    ticketCode
                },
                verifyEntry: true,
                entryTime
            })
        );

        console.log("Confirm Entry Response:", res);

        if (res.type === "ENTER_USER_EVENT_SUCCESS") {
            setFlag((prev) => ({
                ...prev,
                message: res.message,
                ticket: {
                    ...prev.ticket,
                    verifyEntry: res.verifyEntry,
                    entryTime: res.entryTime,
                },
            }));
        } else {
            console.error(res.message);
        }
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
                        width: "100%",
                        flexDirection: "column",
                        position: "relative",
                        minHeight: showScanner ? 260 : "auto", // enough height for QR when open
                        padding: showScanner ? 0 : "6px 16px",
                        overflow: "hidden",
                    }}
                    onClick={() => setShowScanner(prev => !prev)}
                >
                    {!showScanner && (
                        <>
                            <Iconify icon="mdi:barcode-scan" width={20} height={20} />
                            <Box component="span" sx={{ ml: 1 }}>
                                Add a Ticket
                            </Box>
                        </>
                    )}

                    {showScanner && (
                        <QrReader
                            delay={delay}
                            style={{ width: "100%", height: 240 }}
                            onError={handleError}
                            onScan={handleScan}
                        />
                    )}
                    {isScanning && (
                        <Typography align="center" mt={1} color="white">
                            Scanning...
                        </Typography>
                    )}

                    {scanMessage && (
                        <Typography align="center" mt={1} color={scanMessage.includes("✅") ? "white" : "error"}>
                            {scanMessage}
                        </Typography>
                    )}

                </Button>
            </Box>


            <Box display="flex" mt={2} gap={1}>


                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#0B2A4A",
                        color: "white",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#0A1E36" }
                    }}
                    onClick={handleVerifyClick}
                >
                    Verify
                </Button>

            </Box>

            {["granted", "already", "invalid", "error"].includes(flag.status) && (
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                backgroundColor:
                                    flag.status === "granted"
                                        ? "#DFFFE0"
                                        : flag.status === "already"
                                            ? "#FFD9A3"
                                            : flag.status === "invalid"
                                                ? "#FFCCCC"
                                                : "#F0F0F0",
                                borderRadius: "12px",
                                padding: "12px",
                                display: "flex",
                                flexDirection: flag.status === "granted" ? "column" : "row",
                                justifyContent: flag.status === "granted" ? "flex-start" : "space-between",
                                border: "2px solid #ddd",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                gap: flag.status === "granted" ? 2 : 0,
                            }}
                        >
                            <HeadingCommon title={flag.message} baseSize="23px" width={{ md: "34%" }} />

                            {flag.status === "granted" && (
                                <>
                                    <HeadingCommon
                                        title={`Entry Time: ${formatTimeToAMPM(new Date().toISOString())}`}
                                        baseSize="23px"
                                        width={{ md: "34%" }}
                                    />

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        my={1}
                                        flexDirection={{ xs: "column", sm: "row", md: "row" }}
                                        gap={{ xs: 2, sm: 0, md: 0 }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "green",
                                                color: "white",
                                                borderRadius: "8px",
                                                "&:hover": { backgroundColor: "darkgreen" },
                                                width: { xs: "100%", sm: "auto", md: "auto" },
                                            }}
                                            onClick={handleConfirmEntry}
                                            disabled={flag.ticket?.verifyEntry}
                                        >
                                            Confirm Entry
                                        </Button>

                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            width={{ xs: "100%", sm: "auto", md: "auto" }}
                                            gap={1}
                                        >
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    borderRadius: "8px",
                                                    "&:hover": { backgroundColor: "darkred" },
                                                    width: { xs: "100%", sm: "auto", md: "auto" },
                                                }}
                                                onClick={() => {
                                                    setShowScanner((prev) => {
                                                        const nextState = !prev;
                                                        setIsScanning(nextState); // start scanning
                                                        if (!nextState) {
                                                            setScanMessage(null); // clear message on close
                                                        }
                                                        return nextState;
                                                    });

                                                    setResult('No result');
                                                    setFlag({ status: '', message: '', ticket: undefined });
                                                }}

                                            >
                                                Cancel
                                            </Button>
                                            <Tooltip
                                                arrow
                                                disableInteractive
                                                title={
                                                    <Box sx={{ maxWidth: 250, p: 1, pointerEvents: 'none' }}>
                                                        {flag.status === 'granted' && flag.ticket?.userId?.name ? (
                                                            <>
                                                                <HeadingCommon
                                                                    title={`Name: ${flag.ticket.userId.name}`}
                                                                    color="white"
                                                                    baseSize="14px"
                                                                    mt={1}
                                                                />
                                                                <HeadingCommon color="white" title={`Email: ${flag.ticket.userId.email || "N/A"}`} baseSize="12px" />
                                                                <HeadingCommon
                                                                    color="white"
                                                                    title={`Ticket Type: ${flag.ticket?.tickets?.[0]?.ticketType || 'N/A'}`}
                                                                    baseSize="12px"
                                                                />
                                                                <HeadingCommon
                                                                    title={flag?.ticket?.verifyEntry ? "Ticket Status: Verified" : "Ticket Status: Unverified"}
                                                                    baseSize="12px"
                                                                    color="white"
                                                                />
                                                            </>
                                                        ) : (
                                                            <Typography color="white" fontSize="12px">No user data</Typography>
                                                        )}
                                                    </Box>
                                                }
                                            >
                                                <IconButton sx={{ ml: 1 }}>
                                                    <Iconify icon="mdi:information-outline" />
                                                </IconButton>
                                            </Tooltip>


                                        </Box>
                                    </Box>
                                </>
                            )}

                            {flag.status !== "granted" && (
                                <Tooltip
                                    title={
                                        flag.status === "invalid" ? (
                                            <HeadingCommon color="white" title="No data found in this ticket code" baseSize="12px" />
                                        ) : flag.status === "already" ? (
                                            <HeadingCommon color="white" title="Book another ticket" baseSize="12px" />
                                        ) : (
                                            <HeadingCommon color="white" title="An error occurred" baseSize="12px" />
                                        )
                                    }
                                    arrow
                                >
                                    <IconButton sx={{ ml: 1 }}>
                                        <Iconify icon="mdi:information-outline" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            )}




        </Box>
    )
}
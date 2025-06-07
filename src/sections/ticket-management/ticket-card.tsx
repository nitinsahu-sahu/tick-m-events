import { Box, Button, Card, CardContent, Grid, Typography, Avatar, } from "@mui/material";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { formatTimeTo12Hour } from "src/hooks/formate-time";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "../../redux/helper/axios";


export function TicketCard({ ticket }: any) {
    const navigate = useNavigate();
    const [showQr, setShowQr] = useState(false);
    const today = new Date();
    const eventDate = new Date(ticket.eventDate);
    const diffInMs = eventDate.getTime() - today.getTime();
    const daysBefore = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    const isPolicyEnabled = ticket?.isRefundPolicyEnabled;
    const policy = ticket?.refundPolicy || {};
    const isFullRefundAllowed = policy?.fullRefund;
    const fullRefundDays = parseInt(policy?.fullRefundDaysBefore || "0", 10);

    // Check if refund is eligible
    const isRefundable = isPolicyEnabled && isFullRefundAllowed && daysBefore >= fullRefundDays;

    const [openRefundModal, setOpenRefundModal] = useState(false);
    const handleDownloadTicket = async (orderId: string) => {
        try {
            const response = await axios.get(`/event-order/ticket/${orderId}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `ticket-${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error('Error downloading ticket:', error);
        }
    };

    return (
        <Card
            onClick={() => {
                if (!showQr) {
                    navigate(`/our-event/${ticket.eventDetails?._id}`);
                }
            }}
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("${ticket?.eventDetails?.coverImage?.url || './assets/images/event/image.png'}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                overflow: 'visible',
                position: 'relative',
                mt: 4,
                cursor: showQr ? 'default' : 'pointer',
            }}
        >
            <CardContent
                sx={{
                    textAlign: "center",
                    position: "relative",
                    filter: showQr ? "blur(5px)" : "none",
                    transition: "filter 0.3s ease-in-out",
                    userSelect: showQr ? "none" : "auto",
                    pointerEvents: "auto",
                    pt: 7,
                }}>
                <Avatar
                    src="./assets/images/avatar/avatar-1.webp"
                    sx={{
                        width: { xs: "80px", sm: "90px", md: "97px" },
                        height: { xs: "80px", sm: "90px", md: "97px" },
                        position: "absolute",
                        top: -40,
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}

                />
                <Typography variant="h6" fontWeight={600} fontSize={{ xs: "15px", sm: "20px", md: "25px" }} mt={5} color="#0B2E4C">
                    {ticket.eventDetails?.eventName || "Event Name"}
                </Typography>
                <HeadingCommon variant="body2" title={`${ticket.eventDetails?.location} | ${ticket.eventDetails?.date} | ${formatTimeTo12Hour(ticket.eventDetails?.time)}`} baseSize="16px" weight={400} />

                <Typography variant="body2" fontSize={{ xs: "8px", sm: "12px", md: "16px" }} sx={{ color: ticket.statusColor, fontWeight: 700, mt: 1 }}>
                    <span style={{ color: ticket?.verifyEntry ? 'green' : 'red' }}>
                        {ticket?.verifyEntry ? 'Valid' : 'Pending Validation'}
                    </span>
                </Typography>

                <Grid container spacing={1} mt={2} >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            overflowX: "auto",
                            gap: 1,
                            pb: 1,
                        }}
                    >
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowQr((prev) => !prev);
                            }}
                            variant="contained"
                            sx={{
                                backgroundColor: "#0B2E4C",
                                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                "&:hover": {
                                    backgroundColor: "#0B2E4C",
                                },
                            }}
                        >
                            {showQr ? "Hide QR Code" : "Show QR Code"}
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadTicket(ticket?._id);
                            }}
                            variant="contained"
                            sx={{
                                backgroundColor: "#1F8FCD",
                                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                "&:hover": {
                                    backgroundColor: "#1F8FCD",
                                },
                            }}
                        >
                            Download Ticket
                        </Button>

                        {["Share", "Request Refund"].map((text) => (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (text === "Request Refund") {
                                        setOpenRefundModal(true);
                                    }
                                }}
                                key={text}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#1F8FCD",
                                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                    "&:hover": {
                                        backgroundColor: "#1F8FCD",
                                    },
                                }}
                            >
                                {text}
                            </Button>
                        ))}

                    </Box>

                </Grid>
                {/* {showQr && ticket.qrCode && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <img
                            src={ticket.qrCode}
                            alt="QR Code"
                            style={{ width: 150, height: 150 }}
                        />
                    </Box>
                )} */}

                <Button onClick={(e) => e.stopPropagation()} fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#0a2540", color: "white" }}>
                    View Details
                </Button>
            </CardContent>
            {/* QR Code overlay */}
            {showQr && ticket.qrCode && (
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 3,
                        zIndex: 10,
                        padding: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight={600} mb={2} color="#0B2E4C">
                        Your Ticket QR Code
                    </Typography>
                    <Button
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.stopPropagation();
                            }
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            display: 'inline-block' // Maintain img layout
                        }}
                    >
                        <img
                            src={ticket.qrCode}
                            alt="QR Code"
                            style={{ width: 180, height: 180, marginBottom: 16 }}
                        />
                    </Button>
                    <Button

                        onClick={(e) => {
                            e.stopPropagation();
                            setShowQr(false);
                        }}
                        variant="contained"
                        sx={{ backgroundColor: "#0B2E4C", color: "#fff" }}
                    >
                        Close QR Code
                    </Button>
                </Box>
            )}
            {openRefundModal && (
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255,255,255,0.97)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                        zIndex: 20,
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h6" mb={2}>Refund Policy Check</Typography>

                    {!isPolicyEnabled ? (
                        <Box>
                            <Typography color="error" fontWeight={600}>
                                ❌ Refund not applicable as per event&apos;s policy.
                            </Typography>
                            <Typography variant="body2" mt={1} sx={{ textAlign: 'center' }}>
                                No refund policy is applicable for this ticket.
                            </Typography>
                        </Box>
                    ) : ticket.verifyEntry ? (
                        <Typography color="error" mb={2}>
                            ❌ You can&apos;t request a refund after event entry has been verified.
                        </Typography>
                    ) : isRefundable ? (
                        <>
                            <Typography>✨ Full Refund Eligible! ✨</Typography>
                            <Typography component="span" fontWeight="bold" color="inherit">
                                {' '}{ticket.eventDetails?.eventName}
                            </Typography>
                            <Typography>
                                Kicks off in just {daysBefore} day(s)!
                            </Typography>
                            <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "#fff", mb: 1 }}>
                                Confirm Refund
                            </Button>
                        </>
                    ) : (
                        <Box>
                            <Typography color="error" fontWeight={600}>
                                ❌ Refund not applicable as per event&apos;s policy.
                            </Typography>
                            <Typography variant="body2" mt={1}>
                                {isFullRefundAllowed
                                    ? `Full refunds are allowed only if cancelled at least ${fullRefundDays} day(s) before the event.`
                                    : 'This event does not support full refunds.'}
                            </Typography>
                            <Typography variant="body2" mt={0.5}>
                                You are currently only {daysBefore} day(s) away from the event.
                            </Typography>
                        </Box>
                    )}


                    <Button onClick={() => setOpenRefundModal(false)} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            )}

        </Card>
    )
}
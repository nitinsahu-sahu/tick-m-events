import { Box, Button, Card, CardContent, Grid, Typography, Avatar, } from "@mui/material";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { formatTimeTo12Hour } from "src/hooks/formate-time";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { text } from "stream/consumers";
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
    const isPartialRefundAllowed = policy?.partialRefund;
    const partialRefundPercent = parseInt(policy?.partialRefundPercent || "0", 10);

    // Check full refund eligibility
    const isFullRefundEligible = isPolicyEnabled && isFullRefundAllowed && daysBefore >= fullRefundDays;

    // Check partial refund eligibility
    const isPartialRefundEligible = isPolicyEnabled && isPartialRefundAllowed && !isFullRefundEligible && daysBefore > 0;

    // Use this instead of `isRefundable`
    const refundType = isFullRefundEligible
        ? 'full'
        : isPartialRefundEligible
            ? 'partial'
            : null;

    const isRefundable = !!refundType;


    const [openRefundModal, setOpenRefundModal] = useState(false);
    const [isRefunding, setIsRefunding] = useState(false);
    const [refundMessage, setRefundMessage] = useState('');

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

    const handleRefundRequest = async () => {
        setIsRefunding(true);
        setRefundMessage('');
        const totalAmount = ticket.totalAmount || 0;
        let refundAmount = 0;

        if (refundType === 'full') {
            refundAmount = totalAmount;  // full refund amount
        } else if (refundType === 'partial') {
            refundAmount = Math.round(totalAmount * (partialRefundPercent / 100));
        }
        try {
            const payload = {
                userId: ticket.userId,
                orderId: ticket._id,
                reason: 'User initiated refund via portal.',
                refundType,
                refundAmount,
                eventDate: new Date(ticket.eventDate || ticket.eventDetails?.date).toISOString(),
            };

            const response = await axios.post('/refund-request/refund-request', payload);
            setRefundMessage('✅ Refund request submitted successfully!');
            setTimeout(() => {
                setOpenRefundModal(false);
            }, 2000); // close modal after delay
        } catch (error: any) {
            console.error("Refund request failed:", error);
            setRefundMessage(error.response?.data?.message || '❌ Refund request failed.');
        } finally {
            setIsRefunding(false);
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

                        {["Share", "Request Refund"].map((label) => (
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (label === "Request Refund" && !ticket.verifyEntry) {
                                        setOpenRefundModal(true);
                                    }
                                }}
                                key={label}
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
                                {label}
                            </Button>
                        ))}


                    </Box>

                </Grid>

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
                    <img
                        onClick={(e) => e.stopPropagation()}
                        src={ticket.qrCode}
                        alt="QR Code"
                        role="presentation"
                        aria-hidden="true"
                        style={{ width: 180, height: 180, marginBottom: 16 }}
                    />
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
                        backgroundColor: "rgba(255,255,255,0.95)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 20,
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: 4,
                            boxShadow: 6,
                            p: 4,
                            width: "100%",
                            maxWidth: 420,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" mb={2} fontWeight={700} color="primary">
                            Refund Policy Check
                        </Typography>

                        {refundMessage && (
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 2,
                                    color: refundMessage.startsWith('✅') ? 'success.main' : 'error.main',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                }}
                            >
                                {refundMessage}
                            </Typography>
                        )}

                        {!isPolicyEnabled ? (
                            <Typography color="error" fontWeight={600} textAlign="center" mb={2}>
                                ❌Refund not applicable as per event&apos;s policy.
                            </Typography>
                        ) : ticket.verifyEntry ? (
                            <Typography color="error" mb={2} textAlign="center" fontWeight={600}>
                                ❌ You can&apos;t request a refund after event entry has been verified.
                            </Typography>
                        ) : refundType === 'full' ? (
                            <>
                                <Typography variant="h6" color="success.main" mb={1}>✨ Full Refund Eligible!</Typography>
                                <Typography variant="subtitle1" color="text.primary" mb={2} fontWeight={500}>For{' '}
                                    {ticket.eventDetails?.eventName}
                                </Typography>
                                <Typography variant="body2" mb={2}>This event starts in <strong>{daysBefore}</strong> day(s).</Typography>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#0B2E4C", color: "#fff", mb: 1, width: "100%" }}
                                    disabled={isRefunding}
                                    onClick={handleRefundRequest}
                                >
                                    {isRefunding ? 'Processing...' : 'Confirm Full Refund'}
                                </Button>
                            </>
                        ) : refundType === 'partial' ? (
                            <>
                                <Typography variant="h6" color="warning.main" mb={1}>⚠️ Partial Refund Eligible</Typography>
                                <Typography variant="body2" mb={2}>
                                    You’ll receive <strong>{partialRefundPercent}%</strong> of your ticket price.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: "#0B2E4C", color: "#fff", mb: 1, width: "100%" }}
                                    disabled={isRefunding}
                                    onClick={handleRefundRequest}
                                >
                                    {isRefunding ? 'Processing...' : 'Confirm Partial Refund'}
                                </Button>
                            </>
                        ) : (
                            <Box textAlign="center" mb={2}>
                                <Typography color="error" fontWeight={600}>
                                    ❌ Refund not applicable as per event&apos;s policy.
                                </Typography>
                                <Typography variant="body2" mt={1}>
                                    Full refunds require at least <strong>{fullRefundDays}</strong> day(s) notice.
                                </Typography>
                                <Typography variant="body2">
                                    You&apos;re currently only <strong>{daysBefore}</strong> day(s) away.
                                </Typography>
                            </Box>
                        )}

                        <Button
                            onClick={() => setOpenRefundModal(false)}
                            variant="outlined"
                            sx={{ mt: 2, width: "100%" }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            )}


        </Card>
    )
}
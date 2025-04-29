import {
    Box, Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Avatar,
} from "@mui/material";

export const TicketCard = ({ ticket }: any) => (
    <Card sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundImage: `url('./assets/images/event/image.png')`,
        backgroundSize: "auto",
        backgroundPosition: "center",
        overflow: "visible"
    }}>
        <CardContent sx={{ textAlign: "center", position: "relative" }}>
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
                {ticket.title}
            </Typography>
            <Typography variant="body2" color="black" fontWeight={400} fontSize={{ xs: "8px", sm: "12px", md: "16px" }}>
                {ticket.location} | {ticket.date} | {ticket.time}
            </Typography>
            <Typography variant="body2" fontSize={{ xs: "8px", sm: "12px", md: "16px" }} sx={{ color: ticket.statusColor, fontWeight: 700, mt: 1 }}>
                {ticket.status}
            </Typography>

            <Grid container spacing={1} mt={2} >
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    gap: 1,
                    pb: 1
                }}>
                    {["Show QR Code", "Download Ticket", "Share", "Request Refund"].map((text) => (
                        <Button
                            key={text}
                            variant="contained"
                            sx={{
                                backgroundColor: text === "Show QR Code" ? "#0B2E4C" : "#1F8FCD",
                                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                '&:hover': {
                                    backgroundColor: text === "Show QR Code" ? "#0B2E4C" : "#1F8FCD",
                                }
                            }}
                        >
                            {text}
                        </Button>
                    ))}
                </Box>
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#0a2540", color: "white" }}>
                View Details
            </Button>
        </CardContent>
    </Card>
);
import {
    Box, Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

export function TicketHistoryCancelRefundCard  ({ items, index }: any) {

    return (
        <Grid item xs={12} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={500} sx={{ fontSize: { xs: "16px", sm: "20px", md: "24px" } }}>
                        {items?.title}
                    </Typography>
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" } }} color="textSecondary" gutterBottom>
                        {items?.date} - {items?.type}
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: items?.statusColor,
                        fontWeight: "700",
                        fontSize: { xs: "12px", sm: "14px", md: "16px" }
                    }}>
                        {items?.status}
                    </Typography>
                    <Box mt={2} display="flex" gap={2}>
                        {items?.button?.map((btnText: string) => (
                            <Button
                                key={btnText}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#0B2E4C", // Default color if not defined
                                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {btnText}
                            </Button>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}
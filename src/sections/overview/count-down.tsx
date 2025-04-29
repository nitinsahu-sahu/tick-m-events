import { Paper, Typography } from "@mui/material";

export function CountDownView() {
    return (
        <Paper
            elevation={3}
            sx={{
                px: { xs: 1, sm: 2, md: 3 },
                py: 1.5,
                borderRadius: "12px",
                textAlign: "center",
                minWidth: { xs: "120px", sm: "140px", md: "180px" },
            }}
        >
            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                Countdown to Event
            </Typography>
            <Typography
                sx={{
                    fontSize: { xs: "12px", sm: "13px", md: "14px" },
                    fontFamily: "Poppins, sans-serif",
                    color: "#333",
                }}
            >
                4d 23h 51m 7s
            </Typography>
        </Paper>
    )
}
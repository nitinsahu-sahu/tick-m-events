import { Paper, Typography } from "@mui/material";

export function CountDownView() {
    return (
        <Paper
            elevation={3}
            sx={{
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                textAlign: "center",
                minWidth: "180px",
            }}
        >
            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                Countdown to Event
            </Typography>
            <Typography
                sx={{
                    fontSize: "14px",
                    fontFamily: "Poppins, sans-serif",
                    color: "#333",
                }}
            >
                4d 23h 51m 7s
            </Typography>
        </Paper>
    )
}
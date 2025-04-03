import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";



export function CountDownCounter() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Dummy countdown logic for testing UI (set everything to 00)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }, []);



    return (
        <Box mt={3}>
            {/* Countdown Section */}
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: "center",
                    backgroundColor: "#fff",
                }}
            >
                <Typography fontSize={{ xs: "1.2rem", md: "1.5rem" }} fontWeight="bold">
                    Countdown to the Event
                </Typography>
                <Grid container justifyContent="center" spacing={2} mt={1}>
                    {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => (
                        <Grid item key={unit}>
                            <Typography color="primary" fontSize={{ xs: "2rem", md: "2.5rem" }} fontWeight="bold">
                                {Object.values(timeLeft)[index].toString().padStart(2, "0")}
                            </Typography>
                            <Typography>{unit}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
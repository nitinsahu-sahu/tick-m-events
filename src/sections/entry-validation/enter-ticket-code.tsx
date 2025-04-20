import { Box, Button, Grid, TextField } from "@mui/material";

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function EnterTicketCode() {
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
            <HeadingCommon title="Enter Ticket Code" color="#0B2E4C" weight={600} baseSize="33px" />

            <Grid container spacing={2} alignItems="flex-start">
                {/* Enter Ticket Code */}
                <Grid item xs={12} sm={6} md={4}>
                    <HeadingCommon
                        variant="subtitle1"
                        title="Enter Ticket Code"
                        weight={400}
                        baseSize="16px"
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="583-356"
                        size="small"
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 1.5,
                            mb: { xs: 2, sm: 0 },
                            backgroundColor: "#0B2A4A",
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            height: "40px"
                        }}
                    >
                        Verify
                    </Button>
                </Grid>

                {/* Search for Participant */}
                <Grid item xs={12} sm={6} md={4}>
                    <HeadingCommon
                        variant="subtitle1"
                        title="Search for a Participant"
                        weight={400}
                        baseSize="16px"
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Participant ID"
                        size="small"
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 1.5,
                            mb: { xs: 2, sm: 0 },
                            backgroundColor: "#0B2A4A",
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            height: "40px"
                        }}
                    >
                        Validate Entry
                    </Button>
                </Grid>

                {/* Participant Name */}
                <Grid item xs={12} sm={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Participant Name"
                        size="small"
                        sx={{
                            mt: { xs: 0, sm: 3.6 },
                            mb: { xs: 2, md: 0 }
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
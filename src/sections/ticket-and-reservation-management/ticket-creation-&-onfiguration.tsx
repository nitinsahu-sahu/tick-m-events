import { Button,Checkbox,FormControlLabel,Box, Paper, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";

export function TicketCreationAndConfiguration() {
    const theme = useTheme();
    const [personalized, setPersonalized] = useState(true);

    return (
        <Box boxShadow={3} borderRadius={3} mt={3}>
            <Paper sx={{ width: "100%", p: 3, maxWidth: { xs: "800px", sm: "800px", md: "100%" } }}>
                {/* Section Title */}
                <Typography variant="h5" color={theme.palette.blue.contrastText} fontWeight="bold">
                    Ticket Creation & Configuration
                </Typography>

                {/* Table Header */}
                <Box
                    sx={{
                        border: "1px solid #969696",
                        borderRadius: 1,
                        mt: 2,
                        p: 2,
                        bgcolor: "white",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            width: { xs: "100%", sm: "100%", md: "42%" }, // Make it responsive
                            pb: 1,
                            borderBottom: "1px solid #969696",
                            flexWrap: "wrap", // Allow wrapping on smaller screens
                        }}
                    >
                        {["Name", "Price", "Quantity", "Validity", "Options"].map((header) => (
                            <Typography key={header} variant="body2" fontWeight="medium" sx={{ paddingRight: { xs: "10px", sm: "10px", md: "20px" }, fontSize: { xs: "12px", sm: "14px", md: "16px" } }}>
                                {header}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                {/* Form Section */}
                <Typography variant="h6" color={theme.palette.blue.contrastText} fontWeight="bold" sx={{ mt: 3 }}>
                    Create a Ticket Type
                </Typography>

                {/* Inputs - Responsive Grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, // Adjust based on screen size
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <TextField label="Event Name" placeholder="e.g., Tech Conference 2025" fullWidth />
                    <TextField label="Price" placeholder="10000" fullWidth />
                    <TextField label="Available Quantity" placeholder="Enter quantity" fullWidth />
                </Box>

                {/* Description */}
                <TextField label="Ticket Description" placeholder="Description" multiline rows={3} fullWidth sx={{ mt: 2 }} />

                {/* Validity */}
                <TextField label="Validity" placeholder="e.g., Tech Conference 2025" fullWidth sx={{ mt: 2 }} />

                {/* Checkboxes */}
                <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }} />
                        }
                        label="Transferable Ticket (Can be resold or given to another person)"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }}
                                checked={personalized}
                                onChange={(e) => setPersonalized(e.target.checked)}
                            />
                        }
                        label="Personalized Ticket (Participant’s name and account ID required for validation)"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }} />
                        }
                        label="Activation Code (Unique QR Code or manual code for entrance validation)"
                    />
                </Box>

                {/* Buttons - Centered on Mobile */}
                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: { xs: "center", md: "flex-start" },
                    }}
                >
                    <Button variant="contained" sx={{ backgroundColor: theme.palette.blue.contrastText }}>
                        Save & Publish Tickets
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ color: theme.palette.blue.contrastText, backgroundColor: "#E2E2E2" }}
                    >
                        Add Ticket
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
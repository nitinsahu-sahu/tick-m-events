import { Box, Typography, Card, CardContent, Grid, FormControlLabel, Radio, TextField, Switch, Button, RadioGroup } from "@mui/material";
import { useState } from "react";


export function StepperStepFour() {
    const [highlighting, setHighlighting] = useState(false);
    const [autoShare, setAutoShare] = useState(false);
    const [visibility, setVisibility] = useState("public");

    return (
        <Card
            sx={{
                padding: 3,
                marginTop: 4,
                borderRadius: 2,
                border: "2px solid #B3B3B3",
            }}
        >
            <CardContent>
                {/* Section Title */}
                <Typography variant="h6" fontWeight="bold">
                    Publication & Visibility Options
                </Typography>

                {/* Visibility Settings */}
                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                    Visibility Settings
                </Typography>
                <RadioGroup
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    sx={{ marginLeft: 1 }}
                >
                    <FormControlLabel
                        value="public"
                        control={<Radio sx={{ color: "#0B2E4C" }} />}
                        label={
                            <Typography variant="body2">
                                Public Event (Accessible to everyone)
                            </Typography>
                        }
                    />
                    <FormControlLabel
                        value="private"
                        control={<Radio sx={{ color: "#0B2E4C" }} />}
                        label={
                            <Typography variant="body2">
                                Private Event (Accessible via invitation only)
                            </Typography>
                        }
                    />
                </RadioGroup>

                {/* Custom URL Field */}
                <Typography variant="subtitle1" fontWeight="bold" mt={3}>
                    Custom URL:
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    value="e.g. tickm.com/event-tech-2025"
                    disabled
                    sx={{
                        backgroundColor: "#E0E0E0",
                        marginTop: 1,
                        borderRadius: 1,
                    }}
                />

                {/* Promotion & Highlighting */}
                <Typography variant="subtitle1" fontWeight="bold" mt={4}>
                    Promotion & Highlighting
                </Typography>

                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} sm={12}>
                        <Box display="flex" alignItems="center">
                            <Switch
                                checked={highlighting}
                                onChange={() => setHighlighting(!highlighting)}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "#0B2E4C",
                                    },
                                }}
                            />
                            <Typography variant="body2">
                                Enable Homepage Highlighting (Paid option for increased visibility)
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Box display="flex" alignItems="center">
                            <Switch
                                checked={autoShare}
                                onChange={() => setAutoShare(!autoShare)}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "#0B2E4C",
                                    },
                                }}
                            />
                            <Typography variant="body2">
                                Automatically share on Social Media after publication (Facebook, WhatsApp, TikTok...)
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Grid
                    container
                    spacing={2}
                    mt={4}
                    direction={{ sm: "column", md: "row" }}
                    justifyContent="flex-start"
                >
                    <Grid item xs={12} sm="auto">
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: "#0B2E4C",
                                color: "white",
                                borderRadius: 2,
                                px: 5,
                            }}
                        >
                            Publish Event
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: "#B3B3B3",
                                color: "white",
                                borderRadius: 2,
                                px: 5,
                            }}
                        >
                            Save as Draft
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
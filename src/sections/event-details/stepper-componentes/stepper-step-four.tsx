import { Box, Typography, Card, CardContent, Grid, FormControlLabel, Radio, TextField, Switch, Button, RadioGroup } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { eventPublicationCreate } from "src/redux/actions/event.action";

export function StepperStepFour() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [publicationData, setPublicationData] = useState({
        publicEvent: true,  // Set to true initially
        privateEvent: false,
        customUrl: '',
        homepageHighlighting: false,
        autoShareOnSocialMedia: false,
        status: "publish"
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        setPublicationData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' || type === 'switch' ? checked : value
        }));
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setPublicationData(prevData => ({
            ...prevData,
            publicEvent: value === 'public',
            privateEvent: value === 'private'
        }));
    };

    const handleEventCreate = useCallback(async (event: React.FormEvent, isDraft: boolean = false) => {
        event.preventDefault();
        const formEventPublicatinData = new FormData();

        // Update the status based on which button was clicked
        const submissionData = {
            ...publicationData,
            status: isDraft ? "draft" : "publish"
        };
        // Convert boolean values to strings before appending
        formEventPublicatinData.append("autoShareOnSocialMedia", submissionData.autoShareOnSocialMedia.toString());
        formEventPublicatinData.append("customUrl", submissionData.customUrl);
        formEventPublicatinData.append("homepageHighlighting", submissionData.homepageHighlighting.toString());
        formEventPublicatinData.append("privateEvent", submissionData.privateEvent.toString());
        formEventPublicatinData.append("publicEvent", submissionData.publicEvent.toString());
        formEventPublicatinData.append("status", submissionData.status);
        try {
            // Get current search params
            const searchParams = new URLSearchParams(window.location.search);
            const eventId = searchParams.get('eventId'); // Get existing eventId
            const ticketCustomId = searchParams.get('ticketConfigId'); // Get existing eventId
            const eventCustomizationId = searchParams.get('eventCustomiztionId'); // Get existing eventId
            const result = await dispatch(eventPublicationCreate({ formEventPublicatinData, eventId, ticketCustomId, eventCustomizationId }));
            if (result?.status === 201) {
                toast.success(result?.message);
                navigate(`/`);

            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            toast.error("Event creation failed");
        }
        // Here you would typically send the data to your backend
    }, [publicationData, dispatch, navigate]);

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
                <form onSubmit={handleEventCreate}>
                    {/* Section Title */}
                    <Typography variant="h6" fontWeight="bold">
                        Publication & Visibility Options
                    </Typography>

                    {/* Visibility Settings */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                        Visibility Settings
                    </Typography>
                    <RadioGroup
                        sx={{ marginLeft: 1 }}
                        onChange={handleRadioChange}
                        value={publicationData.publicEvent ? "public" : "private"} // Controlled value
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

                    {/* Rest of your form remains the same */}
                    {/* Custom URL Field */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={3}>
                        Custom URL:
                    </Typography>
                    <TextField
                        fullWidth
                        name="customUrl"
                        value={publicationData.customUrl}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="e.g. tickm.com/event-tech-2025"
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
                                    name="homepageHighlighting"
                                    checked={publicationData.homepageHighlighting}
                                    onChange={handleInputChange}
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
                                    name="autoShareOnSocialMedia"
                                    checked={publicationData.autoShareOnSocialMedia}
                                    onChange={handleInputChange}
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
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#0B2E4C",
                                    color: "white",
                                    borderRadius: 2,
                                    px: 5,
                                }}
                                onClick={(e) => handleEventCreate(e, false)} // Will set status to "publish"
                            >
                                Publish Event
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: "#B3B3B3",
                                    color: "white",
                                    borderRadius: 2,
                                    px: 5,
                                }}
                                onClick={(e) => handleEventCreate(e, true)} // Will set status to "draft"
                            >
                                Save as Draft
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}
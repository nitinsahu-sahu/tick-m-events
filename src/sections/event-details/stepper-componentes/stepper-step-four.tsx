import { Box, Typography, Card, CardContent, Grid, FormControlLabel, Radio, TextField, Switch, Button, RadioGroup } from "@mui/material";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { eventPublicationCreate } from "src/redux/actions/event.action";

export function StepperStepFour() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const eventId = searchParams.get('eventId'); // Get existing eventId

    const [publicationData, setPublicationData] = useState({
        visibilityType: "public", // default to public
        customUrl: '',
        homepageHighlighting: false,
        autoShareOnSocialMedia: false,
        status: "publish"
    });

  const rawBaseUrl = import.meta.env.VITE_Live_URL || 'https://tick-m-events.vercel.app';
// remove trailing slash if present
const baseUrl = rawBaseUrl.replace(/\/$/, "");

// always generate with single slash
const link = `${baseUrl}/our-event/${eventId}`;


    // const link = publicationData.visibilityType === "private" ?
    //     `${import.meta.env.VITE_Live_URL || 'https://tick-m-events.vercel.app'}/our-event/${eventId}` :
    //     `${import.meta.env.VITE_Live_URL || 'https://tick-m-events.vercel.app'}/our-event`;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        setPublicationData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' || type === 'switch' ? checked : value
        }));
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        // Generate the appropriate URL based on the selected visibility type
        // const newUrl = value === "private"
        //     ? `${import.meta.env.VITE_Live_URL || 'https://tick-m-events.vercel.app'}/our-event/${eventId}`
        //     : `${import.meta.env.VITE_Live_URL || 'https://tick-m-events.vercel.app'}/our-event`;

          const newUrl = `${baseUrl}/our-event/${eventId}`;
        setPublicationData(prevData => ({
            ...prevData,
            visibilityType: value, // 'public' or 'private'
            customUrl: newUrl    // Update the customUrl with the generated URL
        }));
    };

    const handleEventCreate = useCallback(async (event: React.FormEvent, isDraft: boolean = false) => {
        event.preventDefault();
        setLoading(true);
        const formEventPublicatinData = new FormData();
        setLoading(true);
        // Update the status based on which button was clicked
        const submissionData = {
            ...publicationData,
            status: isDraft ? "draft" : "publish"
        };

        // Convert boolean values to strings before appending
        formEventPublicatinData.append("autoShareOnSocialMedia", submissionData.autoShareOnSocialMedia.toString());
        formEventPublicatinData.append("customUrl", submissionData.customUrl);
        formEventPublicatinData.append("homepageHighlighting", submissionData.homepageHighlighting.toString());
        formEventPublicatinData.append("visibilityType", submissionData.visibilityType);
        formEventPublicatinData.append("status", submissionData.status);

        try {
            // Get current search params
            const ticketCustomId = searchParams.get('ticketConfigId');
            const eventCustomizationId = searchParams.get('eventCustomiztionId');

            const result = await dispatch(eventPublicationCreate({
                formEventPublicatinData,
                eventId,
                ticketCustomId,
                eventCustomizationId
            }));

            if (result?.status === 201) {
                toast.success(result?.message);
                setLoading(false);
                navigate(`/`);
            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            toast.error("Event creation failed");
        }
    }, [publicationData, dispatch, navigate, eventId, searchParams]);

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
                        value={publicationData.visibilityType} // Controlled value
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

                    {/* Event Link Preview */}
                    <Typography variant="subtitle1" fontWeight="bold" mt={3}>
                        Your Event Link:
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#E0E0E0",
                            padding: 2,
                            borderRadius: 1,
                            marginTop: 1,
                            wordBreak: "break-word"
                        }}
                    >
                        <Typography variant="body2">{link}</Typography>
                    </Box>

                    {/* <Grid container spacing={2} mt={1}>
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
                    </Grid> */}

                    {/* Action Buttons */}
                    <Grid
                        container
                        spacing={2}
                        mt={4}
                        direction={{ sm: "column", md: "row" }}
                        justifyContent="flex-start"
                    >
                        <Grid item xs={12} sm="auto">
                            <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                loading={loading}
                                sx={{
                                    backgroundColor: "#0B2E4C",
                                    color: "white",
                                    borderRadius: 2,
                                    px: 5,
                                }}
                                onClick={(e) => handleEventCreate(e, false)}
                            >
                                Publish Event
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}
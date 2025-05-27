import { useCallback, useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Box, Typography, TextField, Select,
    MenuItem, IconButton,
    Grid, FormControl, InputLabel, ListSubheader
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TikTokIcon from '@mui/icons-material/MusicNote';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { eventCreate, fetchAllCategories } from 'src/redux/actions/event.action';
import { AppDispatch, RootState } from 'src/redux/store';

export function StepperStepOne({ handleEventThemeLogo, fileInputRef }: any) {
    const navigate = useNavigate();
    const quillRef = useRef<ReactQuill>(null);
    const dispatch = useDispatch<AppDispatch>();
    // ye dala hai
    const { categories } = useSelector((state: RootState) => state.event);
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    const [eventFormData, setEventFormData] = useState({
        eventName: "",
        date: "",
        time: "",
        location: "",
        eventCategory: "concert",
        eventType: "Public",
        eventFormat: "Online",
        website: "",
        name: "",
        phone: "",
        email: "",
        whatsApp: "",
        facebook: "",
        linkedIn: "",
        tiktok: "",
        childCategory: "",
    });

    const handleEventChange = (event: any) => {
        // event.preventDefault();
        const { name, value } = event.target;
        setEventFormData(prev => ({
            ...prev,
            [name]: String(value), // force string
        }));
    };

    const handleEventCreate = useCallback(async (event: any) => {
        event.preventDefault();
        const formEventData = new FormData();
        const files = fileInputRef.current?.files;
        // Append all form data
        formEventData.append("name", eventFormData.name);
        formEventData.append("email", eventFormData.email);
        formEventData.append("eventName", eventFormData.eventName);
        formEventData.append("date", eventFormData.date);
        formEventData.append("time", eventFormData.time);
        formEventData.append("location", eventFormData.location);
        formEventData.append("category", eventFormData.childCategory || eventFormData.eventCategory);
        formEventData.append("eventType", eventFormData.eventType);
        formEventData.append("format", eventFormData.eventFormat);
        formEventData.append("website", eventFormData.website);
        formEventData.append("number", eventFormData.phone);
        formEventData.append("whatsapp", eventFormData.whatsApp);
        formEventData.append("linkedin", eventFormData.linkedIn);
        formEventData.append("facebook", eventFormData.facebook);
        formEventData.append("tiktok", eventFormData.tiktok);

        formEventData.append("description", quillRef?.current?.value as string);        // Append avatar if it exists
        if (files && files.length > 0) {
            const selectedFile = files[0];
            formEventData.append("coverImage", selectedFile);
        }
        try {
            const res = await dispatch(eventCreate(formEventData));
            const eventId = res?.eventId; // Adjust based on your response structure

            // Add event ID to current URL as search param
            navigate(`?eventId=${eventId}`, { replace: true });

        } catch (error) {
            toast.error("Event creation failed");
        }
    }, [eventFormData, dispatch, navigate, fileInputRef]);

    return (
        <>
            <HeadingCommon variant="h5" baseSize="33px" weight={600} title="Event Information" color="#0B2E4C" />
            <HeadingCommon
                variant="body2"
                baseSize="17px"
                weight={400}
                title="Select the ideal destination to begin your journey with ease"
            />

            <form encType='multipart/form-data' onSubmit={handleEventCreate}>
                <Grid container spacing={2}>
                    {/* Event Details Section */}
                    <Grid item xs={12} sm={12} md={9}>
                        <Grid container spacing={2}>
                            {/* Event Name - Full width on mobile */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputProps={{
                                        style: {
                                            textTransform: "capitalize"
                                        }
                                    }}
                                    required
                                    name="eventName"
                                    type='text'
                                    value={eventFormData.eventName}
                                    onChange={handleEventChange}
                                    fullWidth
                                    label="Event Name"
                                    placeholder="e.g. Tech Conference 2025"
                                />
                            </Grid>

                            {/* Date and Time - Stacked on mobile, side by side on sm */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    name="date"
                                    value={eventFormData.date}
                                    onChange={handleEventChange}
                                    fullWidth
                                    type="date"
                                    label="Select Date"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    name="time"
                                    type='time'
                                    value={eventFormData.time}
                                    onChange={handleEventChange}
                                    fullWidth label="Start Time"
                                />
                            </Grid>
                        </Grid>

                        {/* Second Row - Adjusted for mobile */}
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    label="Event Cover image"
                                    type="file"
                                    fullWidth
                                    required
                                    name='coverImage'
                                    inputRef={fileInputRef}
                                    onChange={handleEventThemeLogo}

                                    // onChange={handleEventBanner}
                                    InputProps={{
                                        sx: {
                                            borderRadius: '10px',
                                            border: '1px solid #ccc',
                                            backgroundColor: '#F9F9F9',
                                        },
                                        inputProps: {
                                            accept: "image/*",  // Move accept here
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="event-category-label">Event Category</InputLabel>
                                    <Select
                                        labelId="event-category-label"
                                        name="childCategory"
                                        value={eventFormData.childCategory}
                                        onChange={handleEventChange}
                                        label="Event Category"
                                        renderValue={(selected) => {
                                            const selectedItem = categories
                                                .flatMap((cat: any) => cat.subcategories || [])
                                                .find((child: any) => child._id === selected);
                                            return selectedItem ? selectedItem.name : 'Select Subcategory';
                                        }}
                                    >
                                        {categories.map((parent: any) => (
                                            parent.subcategories?.length > 0 && [
                                                <ListSubheader key={`header-${parent._id}`}>{parent.name}</ListSubheader>,
                                                ...parent.subcategories.map((child: any) => (
                                                    <MenuItem key={child._id} value={child._id}>
                                                        {child.name}
                                                    </MenuItem>
                                                ))
                                            ]
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="event-type-label"
                                        name="eventType"
                                        value={eventFormData.eventType}
                                        onChange={handleEventChange}
                                    >
                                        <MenuItem value="Public">Public</MenuItem>   {/* Default selected */}
                                        <MenuItem value="Private">Private</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Event Format</InputLabel>
                                    <Select
                                        value={eventFormData.eventFormat}
                                        onChange={handleEventChange}
                                        name="eventFormat"
                                        label="eventFormat"
                                    >
                                        <MenuItem value="In-person">In-person (with a physical location)</MenuItem>
                                        <MenuItem value="Online">Online (with a connection link or streaming platform)</MenuItem>
                                        <MenuItem value="Hybrid">Hybrid (combining both formats)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* Description - Full width always */}
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <ReactQuill
                                placeholder='Enter your event description'
                                theme="snow"
                                style={{ height: '90px', margin: "20px 0px 40px 0px" }}
                                ref={quillRef}
                            />
                        </Grid>
                    </Grid>

                    {/* Map Section - Full width on mobile, smaller on desktop */}
                    <Grid item xs={12} sm={12} md={3}>
                        <Box
                            borderRadius={2}
                            sx={{
                                border: '1px solid #ccc',
                                overflow: 'hidden',
                                height: '100%',
                                minHeight: { xs: 200, sm: 270 } // Adjust height for mobile
                            }}
                        >
                            <Box p={1}>
                                <HeadingCommon width={400} baseSize="16px" title="Enter location" />
                                <TextField
                                    required
                                    inputProps={{
                                        style: {
                                            textTransform: "capitalize"
                                        }
                                    }}
                                    name="location"
                                    type='text'
                                    value={eventFormData.location}
                                    onChange={handleEventChange}
                                    fullWidth
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 40,
                                        },
                                    }}
                                />
                            </Box>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235527.49483336654!2d75.6990332561811!3d22.723888285650915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1744890191451!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps Location"
                            />
                        </Box>

                    </Grid>
                </Grid>

                {/* Organizer Details - Adjusted for mobile */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight="bold">
                            Main Organizer & Contacts
                        </Typography>
                    </Grid>

                    {/* Contact Fields - Full width on mobile */}
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            required
                            inputProps={{
                                style: {
                                    textTransform: "capitalize"
                                }
                            }}
                            name="name"
                            type='text'
                            value={eventFormData.name}
                            onChange={handleEventChange}
                            fullWidth label="Name" placeholder="Your name here" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            required
                            name="phone"
                            type='text'
                            value={eventFormData.phone}
                            onChange={handleEventChange}
                            fullWidth label="Phone" placeholder="(123) 456-789" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            required
                            name="email"
                            type='email'
                            value={eventFormData.email}
                            onChange={handleEventChange}
                            fullWidth label="Email" placeholder="info@email.com" />

                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            name="website"
                            type='text'
                            value={eventFormData.website}
                            onChange={handleEventChange}
                            fullWidth label="Website (optional)"
                        />
                    </Grid>

                    {/* Social Media - Reorganized for mobile */}
                    <Grid item xs={12} md={8}>
                        <Box>
                            <Typography fontSize={14} fontWeight="500" mb={1}>
                                Social Media (Optional):
                            </Typography>
                            <Grid container spacing={1}>
                                {[
                                    { icon: <WhatsAppIcon />, color: 'green', name: "whatsApp", value: eventFormData.whatsApp },
                                    { icon: <FacebookIcon />, color: 'primary', name: "facebook", value: eventFormData.facebook },
                                    { icon: <TikTokIcon />, color: 'black', name: "tiktok", value: eventFormData.tiktok },
                                    { icon: <LinkedInIcon />, color: 'primary', name: "linkedIn", value: eventFormData.linkedIn }
                                ].map((social, index) => (
                                    <Grid item xs={6} sm={3} key={index}>
                                        <Box display="flex" alignItems="center">
                                            <IconButton
                                                sx={{
                                                    padding: "4px",
                                                    mr: 1,
                                                    color: social.color
                                                }}
                                            >
                                                {social.icon}
                                            </IconButton>
                                            <TextField
                                                name={social.name}
                                                type='text'
                                                value={social.value}
                                                onChange={handleEventChange}
                                                fullWidth
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        height: 40,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                {/* Submit Button - Always full width */}
                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    color="inherit"
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Save and proceed to the next step
                </LoadingButton>

            </form>

        </>
    )
}
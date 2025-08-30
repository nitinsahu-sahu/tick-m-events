import {
    Box, FormControl, Button, InputLabel, TextField, CircularProgress, Select, ListSubheader, MenuItem, Avatar,
    SelectChangeEvent, Typography, InputAdornment,
} from "@mui/material";
import { toast } from 'react-toastify';

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { DashboardContent } from "src/layouts/dashboard";
import { fetchAllServiceCategories } from "src/redux/actions";
import { fatchOrgEvents } from "src/redux/actions/organizer/pageEvents";
import { organizerPlaceABid } from "src/redux/actions/organizer/place-a-bid.action";
import { AppDispatch, RootState } from "src/redux/store";
import { EventBreadCrum } from "src/sections/entry-validation/event-status";

interface FormData {
    serviceCategoryId: string;
    eventLocation: string;
    serviceTime: string;
    orgBudget: string;
    orgRequirement: string;
    orgAdditionalRequirement: string
}

interface ApiResult {
    status: number;
    type: string;
    message: any;
    // Add other properties if needed
}

export function AddPlaceABid() {
    const { __events } = useSelector((state: RootState) => state.organizer);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state?.serviceReqCategories);
    const [charCounts, setCharCounts] = useState({
        orgRequirement: 0,
        orgAdditionalRequirement: 0
    });
    const [errors, setErrors] = useState({
        orgRequirement: false,
        orgAdditionalRequirement: false
    });
    const [formData, setFormData] = useState<FormData>({
        serviceCategoryId: "",
        eventLocation: selectedEvent?.location || "", // Pre-fill with event location
        serviceTime: "",
        orgBudget: "",
        orgRequirement: "",
        orgAdditionalRequirement: ""
    });
    const handleEventSelect = (event: Event | null) => {
        setSelectedEvent(event);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Update formData when _SelectedEvent changes
    useEffect(() => {
        if (selectedEvent?.location) {
            setFormData(prev => ({
                ...prev,
                eventLocation: selectedEvent.location
            }));
        }
    }, [selectedEvent?.location]);

    useEffect(() => {
        dispatch(fatchOrgEvents());
        dispatch(fetchAllServiceCategories());
    }, [dispatch])

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const count = value.length; // Count characters, not words


        setCharCounts(prev => ({
            ...prev,
            [name]: count
        }));

        setErrors(prev => ({
            ...prev,
            [name]: count < 100
        }));

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConfirm = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate character counts before submission
        if (charCounts.orgRequirement < 100) {
            toast.error("Full Description must contain at least 100 characters");
            return;
        }

        if (formData.orgAdditionalRequirement && charCounts.orgAdditionalRequirement < 100) {
            toast.error("Additional Options must contain at least 100 characters if provided");
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("eventId", selectedEvent?._id);
        formDataObj.append("serviceCategoryId", formData.serviceCategoryId);
        formDataObj.append("serviceTime", formData.serviceTime);
        formDataObj.append("eventLocation", formData.eventLocation);
        formDataObj.append("orgBudget", formData.orgBudget.toString());
        formDataObj.append("orgRequirement", formData.orgRequirement);
        formDataObj.append("orgAdditionalRequirement", formData.orgAdditionalRequirement);

        try {
            const result = await dispatch(organizerPlaceABid(formDataObj)) as ApiResult;
            if (result?.status === 201) {
                toast.success("Requested Successfully...");
                setFormData({
                    serviceCategoryId: "",
                    eventLocation: selectedEvent?.location || "", // Reset to event location
                    serviceTime: "",
                    orgBudget: "",
                    orgRequirement: "",
                    orgAdditionalRequirement: ""
                });
                setCharCounts({
                    orgRequirement: 0,
                    orgAdditionalRequirement: 0
                });
            } else {
                toast.error(result?.message || "Service creation failed");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    }, [dispatch, formData, selectedEvent, charCounts]);



    return (
        <>
            <EventBreadCrum events={__events} onEventSelect={handleEventSelect} />
            <DashboardContent>
                <Box
                    sx={{
                        p: 3,
                        my: 3,
                        borderRadius: 3,
                        backgroundColor: "#fff",
                        border: "1px solid #E0E0E0",
                        boxShadow: 3,
                    }}
                >
                    <form onSubmit={handleConfirm}>
                        <Box>
                            <HeadingCommon variant="h6" title="Service Accepted Form" />
                            <FormControl fullWidth>
                                <InputLabel id="service-category-label">Type of Service Needed</InputLabel>
                                <Select
                                    labelId="service-category-label"
                                    name="serviceCategoryId"
                                    value={formData.serviceCategoryId}
                                    onChange={handleSelectChange}
                                    required
                                    label="Type of Service Needed"
                                    renderValue={(selected) => {
                                        if (!categories) return 'Loading...';
                                        const selectedItem = categories
                                            ?.flatMap((cat: any) => cat.subcategories || [])
                                            ?.find((child: any) => child._id === selected);
                                        return selectedItem ? selectedItem.name : 'Select Category';
                                    }}
                                    disabled={!categories}
                                >
                                    {!categories ? (
                                        <MenuItem disabled value="">
                                            <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                                                <CircularProgress size={24} />
                                                <Box ml={2}>Loading categories...</Box>
                                            </Box>
                                        </MenuItem>
                                    ) : (
                                        categories?.map((parent: any) => (
                                            parent.subcategories?.length > 0 && [
                                                <ListSubheader key={`header-${parent._id}`}>{parent.name}</ListSubheader>,
                                                ...parent.subcategories.map((child: any) => (
                                                    <MenuItem key={child._id} value={child._id}>
                                                        {child.name}
                                                    </MenuItem>
                                                ))
                                            ]
                                        ))
                                    )}
                                </Select>
                            </FormControl>

                            <TextField
                                required
                                fullWidth
                                label="Event Location"
                                margin="normal"
                                name="eventLocation"
                                value={formData.eventLocation}
                                onChange={handleChange}
                                placeholder="Enter event location"
                                helperText={
                                    <Typography variant="caption" color="textSecondary">
                                        Pre-filled with event location. You can modify it as needed.
                                    </Typography>
                                }
                            />

                            <TextField
                                required
                                fullWidth
                                label="Date and Time of the Service"
                                type="datetime-local"
                                margin="normal"
                                name="serviceTime"
                                value={formData.serviceTime}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                required
                                fullWidth
                                type="text"
                                label="Estimated Budget"
                                margin="normal"
                                placeholder="e.g. 1500 - 2000"
                                name="orgBudget"
                                value={formData.orgBudget}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">XAF</InputAdornment>,
                                }}
                            />

                            <TextField
                                required
                                fullWidth
                                label="Full Description of Requirements"
                                multiline
                                rows={4}
                                margin="normal"
                                name="orgRequirement"
                                value={formData.orgRequirement}
                                onChange={handleTextChange}
                                error={errors.orgRequirement}
                                helperText={
                                    <Typography variant="caption" color={errors.orgRequirement ? "error" : "textSecondary"}>
                                        {charCounts.orgRequirement} characters (Minimum 100 characters required)
                                    </Typography>
                                }
                            />

                            <TextField
                                fullWidth
                                label="Additional Options"
                                multiline
                                rows={4}
                                margin="normal"
                                name="orgAdditionalRequirement"
                                value={formData.orgAdditionalRequirement}
                                onChange={handleTextChange}
                                error={errors.orgAdditionalRequirement && formData.orgAdditionalRequirement.length > 0}
                                helperText={
                                    formData.orgAdditionalRequirement.length > 0 ? (
                                        <Typography variant="caption" color={errors.orgAdditionalRequirement ? "error" : "textSecondary"}>
                                            {charCounts.orgAdditionalRequirement} characters (Minimum 100 characters required if provided)
                                        </Typography>
                                    ) : (
                                        <Typography variant="caption" color="textSecondary">
                                            Optional - If provided, minimum 100 characters required
                                        </Typography>
                                    )
                                }
                            />

                            <Button
                                variant="contained"
                                size="small"
                                type="submit"
                                disabled={errors.orgRequirement ||
                                    (formData.orgAdditionalRequirement.length > 0 && errors.orgAdditionalRequirement)}
                                sx={{
                                    backgroundColor: "#08043bff",
                                    color: 'white',
                                    width: "100%",
                                    mt: 2,
                                    p: 1,
                                    '&:disabled': {
                                        backgroundColor: '#f5f5f5',
                                        color: '#bdbdbd'
                                    }
                                }}
                            >
                                Send Request
                            </Button>
                        </Box>
                    </form>
                </Box>
            </DashboardContent>
        </>
    )
}
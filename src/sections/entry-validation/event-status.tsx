import { Box, Button, Select, MenuItem, Typography, Stack, FormControl,ListSubheader } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllServiceCategories } from "src/redux/actions";
import { AppDispatch, RootState } from "src/redux/store";

interface Event {
    _id: string;
    eventName: string;
    // Add other event properties as needed
}

// Custom Status Chip component
function StatusChip({ label, color }: { label: string; color: string }) {
    return (
        <Box display="flex" alignItems="center" gap={0.5}>
            <CircleIcon sx={{ color, fontSize: 12 }} />
            <Typography fontWeight={500} fontSize={13}>{label}</Typography>
        </Box>
    );
}

export function EventBreadCrum({ _selectEve, view, setView, eventInformation, events, onEventSelect, enableComparison = false }: any) {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine); // Track online status
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(eventInformation || null);
    const [comparisonEvent, setComparisonEvent] = useState<Event | null>(null);
    // Define the specific URL path where the section should appear
    const showSection = location.pathname === '/entry-validation';
    const statisticsAndReport = location.pathname === '/statistics-&-reports';
    const searchAndSelect = location.pathname === '/search-&-select-service-providers';
    const { categories } = useSelector((state: RootState) => state?.serviceReqCategories);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    useEffect(() => {
        if (eventInformation) {
            setSelectedEvent(eventInformation);
        }
    }, [eventInformation]);
    useEffect(() => {
        if (events && events.length > 0 && !selectedEvent && !eventInformation) {
            const firstEvent = events[0];
            setSelectedEvent(firstEvent);
            onEventSelect(firstEvent);
        }
    }, [events, selectedEvent, eventInformation, onEventSelect]);

    useEffect(() => {
        if (_selectEve?.validationOptions?.selectedView) {
            setView(_selectEve.validationOptions.selectedView);
        }
    }, [_selectEve, setView]);

    const handleChange = (e: any) => {
        const selectedId = e.target.value;
        const event = events.find((ev: any) => ev._id === selectedId) || null;
        setSelectedEvent(event);
        onEventSelect?.(event);
    };

    const handleComparisonChange = (e: any) => {
        const selectedId = e.target.value;
        const event = events.find((ev: any) => ev._id === selectedId) || null;
        setComparisonEvent(event);
        // Pass both selected event and comparison event to parent
        onEventSelect?.(selectedEvent, event); // Modified to pass both events
    };

    useEffect(() => {
        dispatch(fetchAllServiceCategories());
    }, [dispatch]);
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            px={2}
            key={eventInformation?._id}
            sx={{
                position: 'sticky',
                top: 70,
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent black (70% opacity)
                backdropFilter: 'blur(8px)', // Adds a frosted glass effect
                py: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: 'background-color 0.3s ease', // Smooth transition effect
                '& .MuiTypography-root': {
                    color: 'white' // Ensure all text is white
                },
                '& .MuiSelect-select': {
                    color: 'white' // Make select text white
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)' // Light border for select
                }
            }}
        >
            {/* Left Section: Event & Status */}
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                <Typography fontWeight={600} fontSize={13} color="#3CB1F1">Event</Typography>
                <Typography color="text.secondary" fontSize={13}>/</Typography>
                <FormControl sx={{ minWidth: 150 }} size="small">
                    <Select
                        value={selectedEvent?._id || ''}
                        onChange={handleChange}
                        displayEmpty
                        size="small"
                        sx={{
                            fontSize: '0.8rem',
                            height: '25px',
                            '& .MuiSelect-select': {
                                padding: '6px 12px'
                            },
                            textTransform: "capitalize"
                        }}
                    >
                        <MenuItem value="" disabled>
                            Select an event
                        </MenuItem>
                        {events?.map((event: any) => (
                            <MenuItem
                                key={event._id}
                                value={event._id}
                                sx={{
                                    fontSize: '0.8rem',
                                    minHeight: '32px',
                                    textTransform: "capitalize"
                                }}
                            >
                                {event.eventName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Right Section: Connection Status + View Buttons */}
            {showSection && (
                <Box display="flex" alignItems="center" gap={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography fontWeight={600} fontSize={13}>Connection Status:</Typography>
                        {isOnline ? (
                            <StatusChip label="Online" color="green" />
                        ) : (
                            <StatusChip label="Offline" color="grey" />
                        )}
                    </Stack>

                    <Box display="flex" gap={1}>
                        <Button
                            variant={view === 'scan' ? 'contained' : 'outlined'}
                            onClick={() => setView('scan')}
                            disabled={view === 'list'} // Disable when list view is active
                            sx={{
                                fontSize: 10,
                                width: 100,
                                color: view === 'scan' ? "white" : "black",
                                bgcolor: view === 'scan' ? "#0B2E4C" : "transparent",
                                border: "1px solid black",
                                '&:hover': {
                                    bgcolor: view === 'scan' ? "#0B2E4C" : "rgba(0,0,0,0.1)"
                                },
                                '&.Mui-disabled': {
                                    color: 'rgba(0, 0, 0, 0.26)',
                                    border: "1px solid rgba(0, 0, 0, 0.12)"
                                }
                            }}
                        >
                            Scan View
                        </Button>
                        <Button
                            variant={view === 'list' ? 'contained' : 'outlined'}
                            onClick={() => setView('list')}
                            disabled={view === 'scan'} // Disable when scan view is active
                            sx={{
                                fontSize: 10,
                                width: 100,
                                color: view === 'list' ? "white" : "black",
                                bgcolor: view === 'list' ? "#0B2E4C" : "transparent",
                                border: "1px solid black",
                                '&:hover': {
                                    bgcolor: view === 'list' ? "#0B2E4C" : "rgba(0,0,0,0.1)"
                                },
                                '&.Mui-disabled': {
                                    color: 'rgba(0, 0, 0, 0.26)',
                                    border: "1px solid rgba(0, 0, 0, 0.12)"
                                }
                            }}
                        >
                            List View
                        </Button>
                    </Box>
                </Box>
            )}

            {/* Right Section: Statistics And Report */}
            {statisticsAndReport && enableComparison && (
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                    <Typography fontWeight={600} fontSize={13} color="#3CB1F1">Comparison Event</Typography>
                    <Typography color="text.secondary" fontSize={13}>/</Typography>
                    <FormControl sx={{ minWidth: 150 }} size="small">
                        <Select
                            value={comparisonEvent?._id || ''}
                            onChange={handleComparisonChange}
                            displayEmpty
                            size="small"
                            sx={{
                                fontSize: '0.8rem',
                                height: '25px',
                                '& .MuiSelect-select': {
                                    padding: '6px 12px'
                                },
                                textTransform: "capitalize"
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select comparison event
                            </MenuItem>
                            {events
                                ?.filter((event: any) => event._id !== selectedEvent?._id) // Filter out the currently selected event
                                .map((event: any) => (
                                    <MenuItem
                                        key={event._id}
                                        value={event._id}
                                        sx={{
                                            fontSize: '0.8rem',
                                            minHeight: '32px',
                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {event.eventName}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Box>
            )}

            {
                searchAndSelect && (
                    <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                        <Typography fontWeight={600} fontSize={13} color="#3CB1F1">Categories</Typography>
                        <Typography color="text.secondary" fontSize={13}>/</Typography>
                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <Select
                                labelId="event-category-label"
                                name="childCategory"
                                // value={eventFormData.childCategory}
                                // onChange={handleEventChange}
                                size="small"
                                sx={{
                                    fontSize: '0.8rem',
                                    height: '25px',
                                    '& .MuiSelect-select': {
                                        padding: '6px 12px'
                                    },
                                    textTransform: "capitalize"
                                }}
                                required
                                renderValue={(selected) => {
                                    const selectedItem = categories
                                        .flatMap((cat: any) => cat.subcategories || [])
                                        .find((child: any) => child._id === selected);
                                    return selectedItem ? selectedItem.name : 'Select Subcategory';
                                }}
                            >
                               
                                {categories?.map((parent: any) => (
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
                    </Box>

                )
            }
        </Box>
    )
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Typography, Button, useMediaQuery, Popover, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { AppDispatch, RootState } from "src/redux/store";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { getRequestsByProvider } from "src/redux/actions/service-request";

import { ServiceRequestModal } from "../../components/modal/service-request-modal";
import "./index.css"

const options = ["View Details", "Contact Organizer", "Modify Availability"];

export const CalenderView = () => {
    const { signedReqests } = useSelector((state: RootState) => state?.serviceRequest);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getRequestsByProvider({ status: "accepted-by-organizer" }));
    }, [ dispatch]);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const eventDays: { [key: string]: string } = {};
    signedReqests.forEach((r: any) => {
        const eventDateKey = new Date(r.eventId?.date).toLocaleDateString("en-CA");
        if (r.projectStatus === "completed") {
            eventDays[eventDateKey] = "gold";
        } else if (r.projectStatus === "ongoing") {
            eventDays[eventDateKey] = "red";
        }
    });


    // Returns the start of the week (Sunday)
    const getWeekStart = (date: Date): Date => {
        const newDate = new Date(date);
        const day = newDate.getDay(); // 0 (Sun) to 6 (Sat)
        newDate.setDate(newDate.getDate() - day);
        return newDate;
    };

    // Returns the end of the week (Saturday)
    const getWeekEnd = (date: Date): Date => {
        const start = getWeekStart(date);
        const newDate = new Date(start);
        newDate.setDate(start.getDate() + 6);
        return newDate;
    };

    // Returns all dates of the current week
    const getCurrentWeekDates = (date: Date): Date[] => {
        const start = getWeekStart(date);
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    };

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    const [value, setValue] = useState(new Date());
    const [viewType, setViewType] = useState<"month" | "week" | "day">("month");

    const [anchorEl, setAnchorEl] = useState(null);
    const [popupDate, setPopupDate] = useState("");

    const handleTileClick = (date: Date, event: any) => {
        const key = date.toLocaleDateString("en-CA");

        const matchedRequest = signedReqests?.find((r: any) => {
            const eventKey = new Date(r.eventId?.date).toLocaleDateString("en-CA");
            return eventKey === key;
        });

        if (matchedRequest) {
            setSelectedRequest(matchedRequest);
            setPopupDate(key);
            setAnchorEl(event.currentTarget);
        } else {
            setSelectedRequest(null);
            setAnchorEl(null);
        }
    };


    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const handlePrev = () => {
        const newDate = new Date(value);
        newDate.setMonth(value.getMonth() - 1);
        setValue(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(value);
        newDate.setMonth(value.getMonth() + 1);
        setValue(newDate);
    };

    const tileContent = ({ date }: { date: Date }) => {
        const key = date.toISOString().split("T")[0];
        if (eventDays[key]) {
            return (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: eventDays[key],
                        borderRadius: "6px",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {date.getDate()}
                </Box>
            );
        }
        return null;
    };

    const handleViewChange = (type: "month" | "week" | "day") => {
        setViewType(type);
    };

    return (
        <Box>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                bgcolor="#1F8FCD"
                p={2}
            >
                <HeadingCommon baseSize="26px" variant="h6" weight={600} title="Service Calendar View" color="white" />

                <Box display="flex" alignItems="center" gap={2}>
                    <Button onClick={handlePrev} sx={{ borderRadius: 3, color: "black", backgroundColor: "white", p: "5px", minWidth: "38px" }}>
                        <ArrowBack />
                    </Button>
                    <Typography variant="h6" color="white">
                        {value.toLocaleString("default", { month: "long" })} {value.getFullYear()}
                    </Typography>
                    <Button onClick={handleNext} sx={{ borderRadius: 3, color: "black", backgroundColor: "white", p: "5px", minWidth: "38px" }}>
                        <ArrowForward />
                    </Button>
                </Box>

                <Box display="flex" gap={1} mt={isXs ? 2 : 0}>
                    <Button
                        variant={viewType === "month" ? "contained" : "outlined"}
                        size="small"
                        sx={{ color: "#0B2E4C", backgroundColor: "white" }}
                        onClick={() => handleViewChange("month")}
                    >
                        Month
                    </Button>
                    <Button
                        variant={viewType === "week" ? "contained" : "outlined"}
                        size="small"
                        sx={{ color: "#0B2E4C", backgroundColor: "white" }}
                        onClick={() => handleViewChange("week")}
                    >
                        Week
                    </Button>
                    <Button
                        variant={viewType === "day" ? "contained" : "outlined"}
                        size="small"
                        sx={{ color: "#0B2E4C", backgroundColor: "white" }}
                        onClick={() => handleViewChange("day")}
                    >
                        Day
                    </Button>
                </Box>

            </Box>

            {/* Calendar */}
            {viewType === "month" && (
                <Box
                    sx={{
                        overflowX: 'auto',
                        '.react-calendar__tile': {
                            height: 65,
                            width: 212,
                            maxWidth: 'none !important',
                        },
                        '.react-calendar': {
                            width: '100%',
                        },
                    }}
                >
                    <Calendar
                        onClickDay={handleTileClick}
                        value={value}
                        tileClassName={({ date }) => {
                            const key = date.toLocaleDateString("en-CA");
                            if (eventDays[key] === "red") return "tile-red";
                            if (eventDays[key] === "gold") return "tile-gold";
                            return "";
                        }}
                        prevLabel={null}
                        nextLabel={null}
                    />
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        {selectedRequest ? (
                            <Box sx={{ p: 2, maxWidth: 300 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {selectedRequest.eventId?.name || "No Title"}
                                </Typography>
                                <Typography variant="body2">
                                    Date: {new Date(selectedRequest.eventId?.date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2">
                                    Time: {new Date(selectedRequest.eventId?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Typography>
                                <Typography variant="body2">
                                    Status: {selectedRequest.contractStatus}
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ p: 2 }}>
                                <Typography>No event</Typography>
                            </Box>
                        )}
                    </Popover>

                </Box>
            )}

            {viewType === "week" && (
                <Box p={2}>
                    <Typography variant="h6" mb={2}>
                        Week of {getWeekStart(value).toDateString()} - {getWeekEnd(value).toDateString()}
                    </Typography>

                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(7, 1fr)"
                        gap={2}
                        sx={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            p: 2,
                            backgroundColor: "#f9f9f9"
                        }}
                    >
                        {getCurrentWeekDates(value).map((date) => {
                            const key = date.toISOString().split("T")[0];
                            const eventColor = eventDays[key];
                            const isToday = date.toDateString() === new Date().toDateString();

                            const bgColor = isToday ? "#1976d2" : eventColor || "#fff";
                            return (
                                <Box
                                    key={key}
                                    onClick={(e) => handleTileClick(date, e)}
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: bgColor,
                                        height: 100,
                                        cursor: "pointer",
                                        p: 1,
                                        boxShadow: eventColor ? 2 : 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        color: isToday ? "white" : bgColor !== "#fff" ? "white" : "black",
                                    }}
                                >
                                    <Typography fontWeight="bold">
                                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                                    </Typography>
                                    <Typography>{date.getDate()}</Typography>
                                </Box>


                            );
                        })}
                    </Box>
                </Box>
            )}


            {viewType === "day" && (
                <Box p={2}>
                    <Typography variant="h6" gutterBottom>
                        Events on {value.toDateString()}
                    </Typography>

                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: "#1976d2", // Blue background
                            color: "white",             // White text
                            boxShadow: 3,
                            textAlign: "center",
                            minHeight: "100px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant="h4">
                            {value.getDate()}
                        </Typography>
                        <Typography variant="subtitle1">
                            {value.toLocaleDateString("en-US", { weekday: "long", month: "long", year: "numeric" })}
                        </Typography>

                        {/* Optional: Show if there's an event */}
                        {eventDays[value.toISOString().split("T")[0]] && (
                            <Typography mt={2}>
                                Event Color: <span style={{ fontWeight: 'bold' }}>{eventDays[value.toISOString().split("T")[0]]}</span>
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}

            {/* Popup Actions */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
            >
                <Box sx={{ p: 1 }}>
                    <Stack spacing={1}>
                        {options.map((option, i) => (
                            <Button
                                key={i}
                                variant="text"
                                fullWidth
                                onClick={() => {
                                    if (option === "View Details") {
                                        setIsModalOpen(true);
                                        handleClose();
                                    }

                                }}
                            >
                                {option}
                            </Button>
                        ))}

                    </Stack>
                </Box>
            </Popover>
            {selectedRequest && (
                <ServiceRequestModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    data={selectedRequest}
                />
            )}

        </Box>
    );
};


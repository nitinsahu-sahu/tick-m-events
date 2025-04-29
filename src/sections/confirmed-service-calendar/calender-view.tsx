import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    Box,
    Typography,
    Button,
    useMediaQuery,
    Popover,
    Stack
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

import "./index.css"

const eventDays: { [key: string]: string } = {
    "2025-03-10": "blue",
    "2025-03-22": "gold",
    "2025-03-26": "red"
};


const options = ["View Details", "Contact Organizer", "Modify Availability"];


export const CalenderView = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));

    const [value, setValue] = useState(new Date(2025, 2, 1)); // March 2025
    const [anchorEl, setAnchorEl] = useState(null);
    const [popupDate, setPopupDate] = useState("");

    const handleTileClick = (date: Date, event: any) => {
        const key = date.toISOString().split("T")[0];
        if (eventDays[key]) {
            setPopupDate(key);
            setAnchorEl(event.currentTarget);
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
                <HeadingCommon baseSize="26px" variant="h6" weight={600} title="Service Calendar View" color="white"/>

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

                <Box display="flex" gap={1} mt={isXs ? 2 : 0} >
                    <Button variant="outlined" size="small" sx={{ color: "#0B2E4C", backgroundColor: "white" }}>Month</Button>
                    <Button variant="outlined" size="small" sx={{ color: "#0B2E4C", backgroundColor: "white" }}>Week</Button>
                    <Button variant="outlined" size="small" sx={{ color: "#0B2E4C", backgroundColor: "white" }}>Days</Button>
                </Box>
            </Box>

            {/* Calendar */}
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
                    tileContent={tileContent}
                    prevLabel={null}
                    nextLabel={null}
                    tileClassName="custom-tile"
                />
            </Box>

            {/* <Calendar
                onClickDay={handleTileClick}
                value={value}
                tileContent={tileContent}
                // calendarType="US"
                prevLabel={null}
                nextLabel={null}
                tileClassName="custom-tile"
            /> */}

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
                            <Button key={i} variant="text" fullWidth>
                                {option}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Popover>
        </Box>
    );
};


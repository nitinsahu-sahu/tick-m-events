import React, { useState } from "react";
import {
  Box, Typography,useMediaQuery, Button, Grid
} from "@mui/material";

import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { PageTitleSection } from "src/components/page-title-section";

import { SearchBar } from "../search-bar";

import "react-quill/dist/quill.snow.css";
import { EventInformation } from "../event-information";
import {SecurityAndConfirmation} from "../security-&-confirm";

export function EventDetailsView() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);


  return (
    <Box sx={{ padding: "20px" }}>
      {/* Title & Search Bar */}
      <PageTitleSection
        title="Create and Manage My Events"
        desc="Lorem ipsum dolor sit amet"
        rightCom={<SearchBar />} // Passing SearchBar component as a prop
      />

      {/* Event Banner */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "200px" : "320px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <img
          src="assets/images/event/event-img.jpg"
          alt="Event Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "bottom",
            borderRadius: "15px",
          }}
        />
      </Box>

      {/* My section */}
      <EventInformation />

      {/* //  security & Confirmation */}
      <SecurityAndConfirmation />
    </Box>
  );
}

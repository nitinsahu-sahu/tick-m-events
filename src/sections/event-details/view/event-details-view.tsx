import React, { useState } from "react";
import {
  Box, Typography, TextField, InputAdornment, useMediaQuery, Button, RadioGroup, FormControlLabel, Radio,
  Switch, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid,
  useTheme,
  Stack,
} from "@mui/material";

import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { PageTitleSection } from "src/components/page-title-section";

import { SearchBar } from "../search-bar";

import "react-quill/dist/quill.snow.css";
import { EventInformation } from "../event-information";

export function EventDetailsView() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);


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

      {/* sales managment */}
      <Card sx={{ padding: 3, marginTop: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Sales Management & Tracking
          </Typography>

          <TableContainer sx={{ overflowX: "auto", borderRadius: "20px" }}>

            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#3AACE7",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      backgroundColor: "#3AACE7"
                    }}
                  >
                    Ticket Type
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", backgroundColor: "#3AACE7" }}>Sold</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", backgroundColor: "#3AACE7" }}>Available</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", backgroundColor: "#3AACE7" }}>
                    Total Revenue
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", backgroundColor: "#3AACE7" }}>Refunds</TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      minWidth: 150,
                      whiteSpace: "nowrap",
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                      backgroundColor: "#3AACE7"
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {/* Standard Row - No Action Button */}
                <TableRow>
                  <TableCell>Standard</TableCell>
                  <TableCell>250</TableCell>
                  <TableCell>250</TableCell>
                  <TableCell>1,250,000 XAF</TableCell>
                  <TableCell>2 canceled</TableCell>
                  <TableCell />
                </TableRow>

                {/* VIP Row - With Action Button */}
                <TableRow>
                  <TableCell>VIP</TableCell>
                  <TableCell>80</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>1,200,000 XAF</TableCell>
                  <TableCell>1 canceled</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth={isMobile}
                      sx={{
                        backgroundColor: "#0B2E4C",
                        color: "white",
                        borderRadius: "12px",
                        textTransform: "none",
                      }}
                    >
                      Process a refund
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Extra Row - Button Only */}
                <TableRow>
                  <TableCell colSpan={5} />
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth={isMobile}
                      sx={{
                        backgroundColor: "#0B2E4C",
                        color: "white",
                        borderRadius: "12px",
                        textTransform: "none",
                      }}
                    >
                      Process a refund
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer Buttons */}
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0B2E4C", color: "white" }}
              fullWidth={isMobile}
            >
              View Detailed Statistics
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0B2E4C", color: "white" }}
              fullWidth={isMobile}
            >
              Send Alert to Buyers
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0B2E4C", color: "white" }}
              fullWidth={isMobile}
            >
              Update Statistics
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* //  security & Confirmation */}
      <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 3, mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Security & Confirmation
          </Typography>

          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
            Event Details
          </Typography>

          {/* Input Fields */}
          <Box sx={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
            <TextField
              sx={{
                width: "50%",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
              defaultValue="Tech Conference 2025"
              variant="outlined"
            />

            {/* Date Picker Field - Fixed Issues */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                    sx: {
                      width: "50%",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white", fontWeight: "bold", borderRadius: "8px" }}>
              Reschedule Event
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#D32F2F", color: "white", fontWeight: "bold", borderRadius: "8px" }}>
              Delete Event
            </Button>
          </Box>

          <Typography variant="caption" sx={{ display: "block", marginTop: "12px", color: "gray" }}>
            All changes saved automatically.
          </Typography>
        </CardContent>
      </Card>

      {/* reschedule section */}

      <Grid container spacing={3} mt={3}>
        {/* Reschedule Box */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              bgcolor: '#f5f5f5',
              borderRadius: 3,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Reschedule Event
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" mb={1}>
                  Select a new date for the event:
                </Typography>
                {/* <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" mb={1}>
                  Select a new Time for the event:
                </Typography>
                {/* <TimePicker
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                /> */}
              </Grid>
            </Grid>

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
              mt={3}
              flexWrap="wrap"
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#0d2847',
                  color: '#fff',
                  borderRadius: '8px',
                  px: 3,
                  '&:hover': { bgcolor: '#0b223c' },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#0d2847',
                  color: '#fff',
                  borderRadius: '8px',
                  px: 3,
                  '&:hover': { bgcolor: '#0b223c' },
                }}
              >
                Confirm Reschedule
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Delete Confirmation Box */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              bgcolor: '#f5f5f5',
              borderRadius: 3,
              boxShadow: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Are you sure?
              </Typography>
              <Typography variant="body2">
                Are you sure you want to delete this event? This action is
                irreversible.
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
              mt={3}
              flexWrap="wrap"
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#0d2847',
                  color: '#fff',
                  borderRadius: '8px',
                  px: 3,
                  '&:hover': { bgcolor: '#0b223c' },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'red',
                  color: '#fff',
                  borderRadius: '8px',
                  px: 3,
                  '&:hover': { bgcolor: '#cc0000' },
                }}
              >
                Yes, Proceed
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

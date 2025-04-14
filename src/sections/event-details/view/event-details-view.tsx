import React, { useState } from "react";
import {
  Box, Typography, TextField, InputAdornment, useMediaQuery, Select,
  MenuItem, Button, IconButton, RadioGroup, FormControlLabel, Radio,
  Switch, Stepper, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid,
  useTheme, Divider,
  Stack,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQuill from "react-quill";
import dayjs, { Dayjs } from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { PageTitleSection } from "src/components/page-title-section";

import { SearchBar } from "../search-bar";

import "react-quill/dist/quill.snow.css";

export function EventDetailsView() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [eventFormat, setEventFormat] = useState("in-person");
  const [description, setDescription] = useState("");
  const [highlighting, setHighlighting] = useState(false);
  const [autoShare, setAutoShare] = useState(false);
  const [visibility, setVisibility] = useState("public");

  const [date, setDate] = useState<Dayjs | null>(dayjs());  // Ensure correct typing
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#FF66A1");
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const data = [
    {
      type: "Standard",
      sold: 250,
      available: 250,
      revenue: "1,250,000 XAF",
      refunds: "2 canceled",
    },
    {
      type: "VIP",
      sold: 80,
      available: 20,
      revenue: "1,200,000 XAF",
      refunds: "1 canceled",
    },
  ];

  // const UploadButton = styled("label")({
  //   display: "inline-block",
  //   backgroundColor: "#F1F1F1",
  //   padding: "8px 12px",
  //   borderRadius: "8px",
  //   cursor: "pointer",
  //   fontSize: "14px",
  //   textAlign: "center",
  // });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return; // Ensure files exist

    const file = event.target.files[0];
    setSelectedLogo(URL.createObjectURL(file));
  };


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

      {/* Event Information Section */}
      <Box sx={{ background: "white", padding: "24px", borderRadius: "15px", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <Stepper activeStep={1} />

        <Typography variant="h5" fontWeight={600} color="#0B2E4C" fontSize={{ xs: "28px", sm: "32px", md: "36px" }}>
          Event Information
        </Typography>
        <Typography fontWeight={400} color="black" fontSize={{ xs: "13px", sm: "15px", md: "17px" }} mb={4}>
          Select the ideal destination to begin your journey with ease
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={4}>
            <TextField label="Event Name" placeholder="e.g., Tech Conference 2025" fullWidth />
            <DatePicker value={date} onChange={setDate} />
            <TimePicker value={time} onChange={setTime} />
            <TextField
              label="Event Location"
              placeholder="Your location here"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        window.open("https://www.google.com/maps")
                      }
                      edge="end"
                    >
                      <LocationOnIcon sx={{ color: "#3AACE7" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </LocalizationProvider>

        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mb={4}>
          <Button variant="outlined" startIcon={<UploadFileIcon />} component="label">
            Upload Image
            <input type="file" hidden />
          </Button>
          <Select value="Concert" fullWidth>
            <MenuItem value="Concert">Concert</MenuItem>
            <MenuItem value="Conference">Conference</MenuItem>
          </Select>
          <Select value="Public" fullWidth>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </Select>
        </Box>

        <Select value={eventFormat} onChange={(e) => setEventFormat(e.target.value)} fullWidth>
          <MenuItem value="in-person">In-person (Physical location)</MenuItem>
          <MenuItem value="online">Online (Streaming platform)</MenuItem>
          <MenuItem value="hybrid">Hybrid (Both formats)</MenuItem>
        </Select>

        <Box mt={4}>
          <ReactQuill value={description} onChange={setDescription} placeholder="Add your event description" />
        </Box>

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
          Save and proceed to the next step
        </Button>
      </Box>

      {/* Event Customization */}
      <Card
        sx={{
          borderRadius: 4,
          padding: 3,
          boxShadow: 3,
          margin: "auto",
          border: "2px solid #E0E0E0",
          marginTop: 4,
        }}
      >
        <CardContent>
          <Grid container spacing={4}>
            {/* Left Section: Theme Selection */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold">
                Event Customization
              </Typography>

              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#1E1E1E" }}>
                Choose Event Theme
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Choose main colors
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
                {["#FF66A1", "#E63946", "#FFD700", "#4A90E2", "#E91E63"].map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: color,
                      borderRadius: "50%",
                      cursor: "pointer",
                      border: selectedColor === color ? "2px solid black" : "none",
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </Box>

              <Typography variant="body2" sx={{ color: "#666", mt: 2 }}>
                Choose Custom Colors
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "32px",
                  background: "linear-gradient(to right, yellow, orange)",
                  borderRadius: "8px",
                  mt: 1,
                  border: "1px solid #ccc",
                }}
              />
            </Grid>

            {/* Right Section: Logo Upload & Frame Selection */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold">
                Add logo
              </Typography>

              <Box
                sx={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFF",
                  boxShadow: 2,
                  border: "1px solid #D3D3D3",
                  overflow: "hidden",
                  marginBottom: 4,
                }}
              >
                {selectedLogo ? (
                  <img src={selectedLogo} alt="Uploaded" width="60px" />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No Logo
                  </Typography>
                )}
              </Box>

              <Grid container spacing={3}>
                {/* Logo Upload Section */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Choose logo
                  </Typography>
                  <label
                    htmlFor="logo-upload"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "#F1F1F1",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Upload Image <CloudUploadIcon fontSize="small" />
                    <input
                      type="file"
                      id="logo-upload"
                      hidden
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files || files.length === 0) return;
                        const file = files[0];
                        setSelectedLogo(URL.createObjectURL(file));
                      }}
                    />
                  </label>
                </Grid>

                {/* Frame Selection Section */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                    Choose Frames
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {["circle", "triangle", "square"].map((frame) => (
                      <Box
                        key={frame}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: frame === "circle" ? "50%" : "4px",
                          border: "2px solid",
                          borderColor: selectedFrame === frame ? "#007BFF" : "#D3D3D3",
                          backgroundColor: "#E0E0E0",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => setSelectedFrame(frame)}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>


      {/*  Publication & Visibility  section */}

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
            direction={isSmall ? "column" : "row"}
            justifyContent="flex-start"
          >
            <Grid item xs={12} sm="auto">
              <Button
                fullWidth={isSmall}
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
                fullWidth={isSmall}
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


      {/* sales managment */}
      <Box>
        <Card sx={{ padding: 3, marginTop: 4, marginBottom: 4 }}>
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
      </Box>


      {/* //  security & Confirmation */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 3, margin: "auto" }}>
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
      </LocalizationProvider>

      {/* reschedule section */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", flexWrap: "wrap", mt: 4, mb: 4 }}>

          {/* Reschedule Event Card */}
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 4,
              boxShadow: 3,
              padding: 3,
              backgroundColor: "#FFF",
            }}
          >
            <CardContent sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: "left" }}>
                Reschedule Event
              </Typography>

              {/* Date & Time Picker Row */}
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                {/* Date Picker */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Select a new date for the event:
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          variant: "outlined",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                {/* Time Picker */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Select a new Time for the event:
                  </Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={selectedTime}
                      onChange={(newValue: Dayjs | null) => setSelectedTime(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          variant: "outlined",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0B2E4C",
                    color: "white",
                    borderRadius: "8px",
                    width: "150px",
                    "&:hover": { backgroundColor: "#09263D" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0B2E4C",
                    color: "white",
                    borderRadius: "8px",
                    width: "180px",
                    "&:hover": { backgroundColor: "#09263D" },
                  }}
                >
                  Confirm Reschedule
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Delete Confirmation Card */}
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 4,
              boxShadow: 3,
              padding: 3,
              backgroundColor: "#FFF",
            }}
          >
            <CardContent sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, mt: 2, textAlign: "left" }}>
                Are you sure?
              </Typography>

              {/* Fixes line break issue exactly like image */}
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  pr: 20,
                  mt: 2,
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                }}
              >
                Are you sure you want to delete this event? This action is&nbsp; <br />
                irreversible.
              </Typography>

              {/* Buttons */}
              <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0B2E4C",
                    color: "white",
                    borderRadius: "8px",
                    minWidth: "120px",
                    fontSize: "14px",
                    textTransform: "none",
                    padding: "6px 16px",
                    "&:hover": { backgroundColor: "#09263D" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#D32F2F",
                    color: "white",
                    borderRadius: "8px",
                    minWidth: "140px",
                    fontSize: "14px",
                    textTransform: "none",
                    padding: "6px 16px",
                    "&:hover": { backgroundColor: "#B71C1C" },
                  }}
                >
                  Yes, Proceed
                </Button>
              </Box>
            </CardContent>
          </Card>


          {/* Delete Confirmation Dialog */}
          <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this event? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)} sx={{ color: "#0B2E4C" }}>
                Cancel
              </Button>
              <Button
                onClick={() => setOpenDeleteDialog(false)}
                sx={{ backgroundColor: "#D32F2F", color: "white" }}
              >
                Delete Event
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

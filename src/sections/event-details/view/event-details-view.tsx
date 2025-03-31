import React, { useState } from "react";
import {
  Box, Typography, TextField, InputAdornment, useMediaQuery, Select,
  MenuItem, Button, IconButton, RadioGroup, FormControlLabel, Radio,
  Switch, Stepper, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQuill from "react-quill";
import EventIcon from "@mui/icons-material/Event";
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
          src="https://s3-alpha-sig.figma.com/img/0fe2/8d2c/b9040ce5285238d2d74fc2a36809e101?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KJrd9bjK7T0ybl8iU71L7gTZlcZuaX9fvR7sp49tLHaWyqvurWUsmu~0sUnx0Z2kkHYZFjAksdIz4yQoahPadTLpBtvC2JMOqZHcWCBhnB-xaPakvuilhVrZZut0~M98zjhlTlqZOrhMNKk1amsJOn-~FRqUqKcfd5Blg26GHf9EERFqzDO2GHZVDP6ldEWXZPqskWGbXqHBqrXhnRgfQPq2DvsoJgS6CisnIqyjmSa8y6VK9oSTKPPzwkIrahd5Fi~t4JGL4QKR3RxyGIoulUn7OfzflWuxjgSWQBakvXrraZC8ceycmTP-kezfbcV1nLMWK-1YUDBcJniEuzl79g__"
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

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Event Information
        </Typography>
        <Typography color="gray" mb={4}>
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
                    <LocationOnIcon />
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
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            {/* Left Section: Theme Selection */}
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Event Customization
              </Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#1E1E1E" }}>
                Choose Event Theme
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Choose main colors
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
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

              {/* Custom Gradient Colors */}
              <Typography variant="body2" sx={{ color: "#666", mt: 2 }}>
                Choose Custom Colors
              </Typography>
              <Box
                sx={{
                  width: "200px",
                  height: "32px",
                  background: "linear-gradient(to right, yellow, orange)",
                  borderRadius: "8px",
                  mt: 1,
                  border: "1px solid #ccc",
                }}
              />
            </Box>

            {/* Right Section: Logo Upload & Frame Selection */}
            <Box sx={{ textAlign: "start" }}>
              <Typography variant="h6" fontWeight="bold">
                Add logo
              </Typography>

              {/* Logo Display Box - Aligned to Start */}
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
                  marginLeft: 0,
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

              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* Logo Upload Section */}
                <Box>
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
                        if (!files || files.length === 0) return; // Ensure files exist

                        const file = files[0];
                        setSelectedLogo(URL.createObjectURL(file));
                      }}
                    />

                  </label>
                </Box>

                {/* Frame Selection Section */}
                <Box>
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
                        onClick={() => setSelectedFrame(frame)} // ✅ Now TypeScript won't complain
                      />

                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>


      <Card sx={{ padding: 3, marginTop: 4, borderRadius: 2, border: "2px solid #B3B3B3" }}>
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
            sx={{ marginLeft: 2 }}
          >
            <FormControlLabel
              value="public"
              control={<Radio sx={{ color: "#0B2E4C" }} />}
              label={<Typography variant="body2">Public Event (Accessible to everyone)</Typography>}
            />
            <FormControlLabel
              value="private"
              control={<Radio sx={{ color: "#0B2E4C" }} />}
              label={<Typography variant="body2">Private Event (Accessible via invitation only)</Typography>}
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
            sx={{ backgroundColor: "#E0E0E0", marginTop: 1, borderRadius: 1 }}
          />

          {/* Promotion & Highlighting */}
          <Typography variant="subtitle1" fontWeight="bold" mt={4}>
            Promotion & Highlighting
          </Typography>
          <Box display="flex" justifyContent="flex-start" mt={2}>
            <Switch
              checked={highlighting}
              onChange={() => setHighlighting(!highlighting)}
              sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#0B2E4C" } }}
            />
            <Typography variant="body2">
              Enable Homepage Highlighting (Paid option for increased visibility)
            </Typography>

          </Box>
          <Box display="flex" justifyContent="flex-start" mt={2}>
            <Switch
              checked={autoShare}
              onChange={() => setAutoShare(!autoShare)}
              sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#0B2E4C" } }}
            />
            <Typography variant="body2">
              Automatically share on Social Media after publication (Facebook, WhatsApp, TikTok...)
            </Typography>

          </Box>

          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-start" mt={4} gap={4}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0B2E4C", color: "white", borderRadius: 2, paddingX: 10 }}
            >
              Publish Event
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#B3B3B3", color: "white", borderRadius: 2, paddingX: 10 }}
            >
              Save as Draft
            </Button>
          </Box>
        </CardContent>
      </Card>
      {/* sales managment */}
      <Box>
        <Card sx={{ padding: 3, marginTop: 4, marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Sales Management & Tracking
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ "&.MuiTableRow-root": { backgroundColor: "#3AACE7" } }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ticket Type</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sold</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Available</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Revenue</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Refunds</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                </TableHead>



                <TableBody>
                  <TableRow>

                    <TableCell>Standard</TableCell>
                    <TableCell>250</TableCell>
                    <TableCell>250</TableCell>
                    <TableCell>1,250,000 XAF</TableCell>
                    <TableCell>2 canceled</TableCell>

                  </TableRow>
                  <TableRow >

                    <TableCell>VIP</TableCell>
                    <TableCell>80</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell>1,200,000 XAF</TableCell>
                    <TableCell>1 canceled</TableCell>
                    <TableCell>
                      <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white" }}>
                        Process a refund
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell>
                      <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white" }}>
                        Process a refund
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ display: "flex", justifyContent: "start", marginTop: "-20px", gap: "8px" }}>
              <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white" }}>
                View Detailed Statistics
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white" }}>
                Send Alert to Buyers
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white" }}>
                Update Statistics
              </Button>
            </div>
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
                      InputProps: {
                        endAdornment: (
                          <IconButton onClick={() => console.log("Date picker clicked")}>
                            <EventIcon />
                          </IconButton>
                        ),
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
                          InputProps: {
                            endAdornment: (
                              <IconButton>
                                <EventIcon />
                              </IconButton>
                            ),
                          },
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
                  </LocalizationProvider>;
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

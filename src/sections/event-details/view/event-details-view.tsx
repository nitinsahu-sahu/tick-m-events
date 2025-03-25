import { 
  Box, Typography, TextField, InputAdornment, useMediaQuery, Select, 
  MenuItem, Button, IconButton, RadioGroup, FormControlLabel, Radio,
  Switch, Stepper, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EventIcon from "@mui/icons-material/Event";
import dayjs, { Dayjs } from "dayjs";

export function EventDetailsView() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [eventFormat, setEventFormat] = useState("in-person");
  const [description, setDescription] = useState("");
  const [highlighting, setHighlighting] = useState(false);
  const [autoShare, setAutoShare] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [date, setDate] = useState<Dayjs | null>(dayjs());  // Ensure correct typing
  const [time, setTime] = useState<Dayjs | null>(dayjs());

  

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Title & Search Bar */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} flexWrap={isMobile ? "wrap" : "nowrap"}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Create and Manage My Events
          </Typography>
          <Typography variant="body2" color="#C8C8C8">
            Lorem ipsum dolor sit amet
          </Typography>
        </Box>

        <TextField
          placeholder="Search here"
          variant="outlined"
          size="small"
          sx={{
            width: "250px",
            backgroundColor: "white",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              paddingLeft: "10px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#A0A0A0" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

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
        <div style={{ display: "flex", justifyContent: "start", marginTop: "-20px" , gap: "8px" }}>
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
    <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 3 , margin: "auto" }}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Security & Confirmation
      </Typography>

      <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
        Event Details
      </Typography>

      {/* Input Fields */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <TextField fullWidth defaultValue="Tech Conference 2025" variant="outlined" />

        <TextField
          fullWidth
          placeholder="mm/dd/yyyy"
          variant="outlined"
          InputProps={{
            endAdornment: <EventIcon />,
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white", fontWeight: "bold", borderRadius: "8px" }}>
          Reschedule Event
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#D32F2F", color: "white", fontWeight: "bold", borderRadius: "8px" }}>
          Delete Event
        </Button>
      </div>

      <Typography variant="caption" sx={{ display: "block", marginTop: "12px", color: "gray" }}>
        All changes saved automatically.
      </Typography>
    </CardContent>
  </Card>
</Box>

  );
}

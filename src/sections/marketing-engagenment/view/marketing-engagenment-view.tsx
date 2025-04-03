import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Card,
  CardContent,
  Checkbox, FormControlLabel, Select, MenuItem ,
 InputAdornment,  
 Radio, RadioGroup
} from '@mui/material';
;

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { DatePicker } from "@mui/x-date-pickers";
import { FaCalendarAlt } from "react-icons/fa";
import { Margin } from '@mui/icons-material';


const data = [
  { name: 'April', sales: 20 },
  { name: 'May', sales: 400000 },
  { name: 'June', sales: 600000 },
  { name: 'July', sales: 900000 },
  { name: 'August', sales: 700000 },
  { name: 'September', sales: 600000 },
  { name: 'October', sales: 500000 },
  { name: 'November', sales: 700000 },
];

const promotionsData = [
  { id: 1, type: 'Spring Discount', date: '2025-03-10', discount: '20%', status: 'Active' },
  { id: 2, type: 'VIP Sale', date: '2025-03-10', discount: '15%', status: 'Active' },
  { id: 3, type: 'Flash Deal', date: '2025-03-10', discount: '25%', status: 'Inactive' },
];

export function MarketingEngagenmentView() {
  const [selectedPromo, setSelectedPromo] = useState(promotionsData[0]);
  const [description, setDescription] = useState(
    'Join us for an unforgettable experience! Get your tickets now!'
  );
  const [reservationLink, setReservationLink] = useState('https://eventbooking.com/my-event');
  const [hashtag, setHashtag] = useState('#AmazingEvent2025');
  const [discountValue,setDiscountValue] = useState('Discount Value e.g., 10.00% off');
  const [startDate,setStartDate] = useState('')
  const [endDate,setEndDate] = useState('')
  const [promoCode,setPromoCode] = useState('')
  const [advantageType,setAdvantageType] = useState('')
  const [usageLimit,setUsageLimit] = useState('') 

  return (
    <DashboardContent>
      <PageTitleSection title="Promotions & Special Offers" desc="Lorem ipsum dolor sit amet" />

{/* Active Promotion */}
<Box
      sx={{
        padding: 3,
        border: "1px solid #00000059",
        boxShadow: "0px 0px 16px 0px #00000040",
        borderRadius: "15px",
        background: "white",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Active Promotions
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#D9D9D9",  }}>
            <TableCell sx={{color:"#000000"}}><b>Type</b></TableCell>
            <TableCell sx={{color:"#000000"}}><b>Date</b></TableCell>
            <TableCell sx={{color:"#000000"}}><b>Discount</b></TableCell>
            <TableCell sx={{color:"#000000"}}><b>Status</b></TableCell>
            <TableCell sx={{color:"#000000"}}><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {promotionsData.map((promo, index) => (
            <TableRow key={index}>
              <TableCell>{promo.type}</TableCell>
              <TableCell>{promo.date}</TableCell>
              <TableCell>{promo.discount}</TableCell>
              <TableCell sx={{ color: promo.status === "Active" ? "green" : "red" }}>
                {promo.status}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: " #0B2E4C", color: "white", marginRight: 1 }}
                  size="small"
                  onClick={() => setSelectedPromo(promo)}
                >
                  Modify
                </Button>
                <Button variant="contained"   sx={{ backgroundColor: " #0B2E4C", color: "white", }}  size="small">
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Promotion Section */}
      <Paper sx={{ p: 3, borderRadius: "15px", background: "#F9F9F9", marginTop: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Edit Promotion
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <TextField fullWidth label="Name" value={selectedPromo.type} />
          <TextField fullWidth label="Date" type="date" defaultValue="2025-06-15" />
          <TextField fullWidth label="Discount" value={selectedPromo.discount} />
          <Select fullWidth value={selectedPromo.status}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </Box>
        <Box display="flex" justifyContent="start" mt={3} gap={2}>
          <Button variant="contained" sx={{ backgroundColor: "#0B2E4C", color: "white" }}>Save</Button>
          <Button variant="contained" sx={{backgroundColor:  "#D9D9D9",color: "#000" }} >Cancel</Button>
        </Box>  
      </Paper>
    </Box>


{/* Promotions & special offer section */}
<Box
        sx={{
          // margin: "auto",
          padding: 3,
          border: '1px solid #00000059',
          boxShadow: '0px 0px 16px 0px #00000040',
          borderRadius: '30px',
          background: 'white',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
<div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <h2 className="text-xl font-semibold mb-4">Promotions & Special Offers</h2>
      <Button
          fullWidth
          sx={{
            bgcolor: '#0B2E4C',
            color: 'white',
            mt: 2,
            mb: 2,  
            padding: '10px',
            borderRadius: '10px',
            '&:hover': { bgcolor: '#083048' },
          }}
        >
    Create a new Promotion
        </Button>

      {/* Promotion Form Section */}
      <Paper sx={{ p: 2, borderRadius: '10px', background: '#f5f5f5' }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Create a Promotion
          </Typography>

      <div>
        {/* Discount Type Checkbox Options */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", marginTop: "20px"  }}>

  {[
    "Percentage Discount",
    "Fixed Value Discount",
    "Group Offer",
    "Early Buyer Discount",
  ].map((label) => (
    <label key={label} className="flex items-center gap-2">
      <input type="checkbox" className="form-checkbox" />
      {label}
    </label>
  ))}
</div>



        {/* Discount Value */}
<Typography variant="body2" fontWeight="bold" mb={1}>
          Discount value
          </Typography>
          <TextField
            fullWidth
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            sx={{ mb: 2 }}
          />

        {/* Ticket Selection */}
      <Typography variant="body2" fontWeight="bold" mb={1}>
        Ticket Selection
      </Typography>
      <Select fullWidth sx={{ mb: 2 }}>
        <MenuItem value="Standard">Standard</MenuItem>
      </Select>
 {/* Validity Period Label */}
 <Typography variant="body2" fontWeight="bold" mb={1}>
        Validity Period
      </Typography>

      {/* Input Fields */}
      <div className="flex gap-4 mb-4">
        {/* Start Date Input */}
        <TextField
           sx={{ width: "48%", }}
          variant="outlined"
          placeholder="mm/dd/yyyy"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FaCalendarAlt className="text-gray-500" />
              </InputAdornment>
            ),
          }}
        />

        {/* End Date Input */}
        <TextField
        sx={{ width: "48%", marginLeft:"4%"}}
          variant="outlined"
          placeholder="mm/dd/yyyy"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FaCalendarAlt className="text-gray-500" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {/* Promo Code */}
      <Typography variant="body2" fontWeight="bold" mb={1}>
        Promo Code (Optional)
      </Typography>
      <TextField
        fullWidth
        placeholder="Promo Code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Advantage Type */}
      <Typography variant="body2" fontWeight="bold" mb={1}>
        Advantage Type
      </Typography>
      <Select fullWidth value={advantageType} onChange={(e) => setAdvantageType(e.target.value)} sx={{ mb: 2 }}>
        <MenuItem value="Discount">Discount</MenuItem>
      </Select>

      {/* Usage Limit */}
      <Typography variant="body2" fontWeight="bold" mb={1}>
        Usage Limit
      </Typography>
      <TextField
        fullWidth
        placeholder="Usage Limit"
        value={usageLimit}
        onChange={(e) => setUsageLimit(e.target.value)}
        sx={{ mb: 2 }}
      />

        {/* Submit Button */}
        <Button
          fullWidth
          sx={{
            bgcolor: '#0B2E4C',
            color: 'white',
            mt: 2,
            padding: '10px',
            borderRadius: '10px',
            '&:hover': { bgcolor: '#083048' },
          }}
        >
    Save Promotion
        </Button>

      </div>
      </Paper>
    </div>
    
</Box>

{/* Notifications & Auto Reminder section */}
<Box
      sx={{
        padding: 3,
        border: "1px solid #00000059",
        boxShadow: "0px 0px 16px 0px #00000040",
        borderRadius: "15px",
        background: "white",
     
     
      }}
    >
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Notifications & Automatic Reminders
      </Typography>
      <Button
        fullWidth
        sx={{
          bgcolor: "#0B2E4C",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          "&:hover": { bgcolor: "#083048" },
        }}
      >
        Create a New Notification
      </Button>

      {/* Select Notification Type */}
      <Typography variant="body2" fontWeight="bold" mt={3} mb={1}>
        Select Notification Type
      </Typography>
      <Select fullWidth defaultValue="Web Push" sx={{ mb: 3 }}>
        <MenuItem value="Web Push">Web Push</MenuItem>
      </Select>

      {/* Recipient Selection */}
      <Typography variant="body1" fontWeight="bold" mb={1}>
        Recipient Selection
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
    
          padding: "12px",  
        
          mb: 3,
        }}
      >
        {[
          "All registered participants (Ticket holders)",
          "Interested participants (Waitlist but no purchase yet)",
          "Pending payment participants (Unfinished reservations)",
        ].map((label) => (
          <label key={label} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm">{label}</span>
          </label>
        ))}
      </Box>

      {/* Enter Message */}
      <Typography fontWeight="bold" mb={1}>
        Enter Message
      </Typography>
      <TextField
        fullWidth
        placeholder="Example: 'Don’t miss the festival! Only 100 tickets left!'"
        sx={{ mb: 3 }}
      />

      {/* Add CTA Button */}
      <Typography fontWeight="bold" mb={1}>
        Add CTA Button
      </Typography>
      <TextField
        fullWidth
        placeholder="CTA Button (e.g., 'Buy Now', 'Reserve', 'Share')"
        sx={{ mb: 3 }}
      />

      {/* Schedule Options */}
      <Typography fontWeight="bold" mb={1}>
        Schedule Options
      </Typography>
      <RadioGroup defaultValue="send-now">
        <FormControlLabel value="send-now" control={<Radio />} label="Send now" />
        <FormControlLabel
          value="schedule"
          control={<Radio />}
          label="Schedule for a specific date/time"
        />
      </RadioGroup>

      {/* Date and Time Selection */}
      <Box sx={{ display: "flex", gap: "16px", mt: 2, mb: 3 }}>
        <Box sx={{ position: "relative", flex: 1 }}>select date
          <TextField fullWidth placeholder="mm/dd/yyyy" />
          <FaCalendarAlt style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
        </Box>
        <Box sx={{ flex: 1 }}>select time
          <TextField fullWidth placeholder="00:00" />
        </Box>
      </Box>

     {/* Real-Time Campaign Statistics */}
<Typography fontWeight="bold" mb={1}>
  Real-Time Campaign Statistics
</Typography>

<Box sx={{ display: "flex", flexDirection: "column", gap: 2 ,mb:4}}>
  {[
    { label: "Open Rate: 0%" },
    { label: "Link Clicks: 0" },
    { label: "Conversions: 0" },
  ].map((item, index) => (
    <Box key={index}>
      <Typography variant="body2" mb={0.5}>{item.label}</Typography>
      <Box sx={{ height: "8px", background: "#E5E7EB", borderRadius: "5px" }} />
    </Box>
  ))}
</Box>


      {/* Send Notifications Button */}
      <Button
        fullWidth
        sx={{
          bgcolor: "#0B2E4C",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          "&:hover": { bgcolor: "#083048" },
        }}
      >
        Send Notifications
      </Button>
    </Box>

      {/* Media sharing  section */}
      <Box
        sx={{
          // margin: "auto",
          padding: 3,
          border: '1px solid #00000059',
          boxShadow: '0px 0px 16px 0px #00000040',
          borderRadius: '30px',
          background: 'white',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Social Media Sharing
        </Typography>

        {/* Social Media Buttons */}
        <Box display="flex" justifyContent="space-around" mb={2}>
          <Button sx={{ bgcolor: '#1877F2', color: 'white', borderRadius: '10px', pl: 4, pr: 4 }}>
            Share on Facebook
          </Button>
          <Button sx={{ bgcolor: '#25D366', color: 'white', borderRadius: '10px', pl: 4, pr: 4 }}>
            Send via WhatsApp
          </Button>
          <Button sx={{ bgcolor: '#000000', color: 'white', borderRadius: '10px', pl: 4, pr: 4 }}>
            Post on TikTok
          </Button>
          <Button sx={{ bgcolor: '#000000', color: 'white', borderRadius: '10px', pl: 4, pr: 4 }}>
            Post on X
          </Button>
          <Button sx={{ bgcolor: '#006294', color: 'white', borderRadius: '10px', pl: 4, pr: 4 }}>
            Share on LinkedIn
          </Button>
        </Box>

        {/* Edit Your Post */}
        <Paper sx={{ p: 2, borderRadius: '10px', background: '#f5f5f5' }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Edit Your Post
          </Typography>

          <Typography variant="body2" fontWeight="bold" mb={1}>
            Event Image
          </Typography>
          <TextField
            type="file"
            fullWidth
            InputProps={{
              sx: {
                borderRadius: '10px',
                border: '1px solid #ccc',
                backgroundColor: '#F9F9F9',
                padding: '10px',
                marginBottom: '4px',
              },
            }}
          />

          <Typography variant="body2" fontWeight="bold" mb={1}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" fontWeight="bold" mb={1}>
            Reservation Link
          </Typography>
          <TextField
            fullWidth
            value={reservationLink}
            onChange={(e) => setReservationLink(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" fontWeight="bold" mb={1}>
            Hashtag
          </Typography>
          <TextField
            fullWidth
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Paper>

        {/* Post Button */}
        <Button
          fullWidth
          sx={{
            bgcolor: '#0B2E4C',
            color: 'white',
            mt: 2,
            padding: '10px',
            borderRadius: '10px',
            '&:hover': { bgcolor: '#083048' },
          }}
        >
          Post
        </Button>
      </Box>
      {/* Marketing perform section */}

      <Box
      className="p-6 bg-gray-100 min-h-screen"
      sx={{
        background: "#FFFFFF",
        border: "1px solid #00000059",
        boxShadow: "0px 0px 16px 0px #00000040",
        borderRadius: "30px",
        padding: "24px",
      
        // margin: "auto",
        mt: 4,
        mb: 4,
      }}
    >
      <Box className="p-6 bg-white rounded-lg">
        <Typography variant="h5" className="font-bold mb-2">
          Marketing Performance & Statistics
        </Typography>
        <Typography variant="body1" className="mb-4">
          Performance Tracking Table
        </Typography>

        {/* Table */}
        <TableContainer
          component={Paper}
          className="rounded-lg"
          sx={{
            borderRadius: "20px",
            // boxShadow: "0px 0px 15px 0px #0000003B",
            mb: 4,
            mt: 4  
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#3AACE7" }}>
                {["Action", "Participants Reached", "Open Rate", "Click Rate", "Sales Conversions"].map((header) => (
                  <TableCell key={header} sx={{ color: "white", fontWeight: "bold", padding: "12px" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ["24h Reminder Notification", "500", "80%", "40%", "100 tickets sold"],
                ["48h Follow-Up", "400", "-", "-", "50 tickets sold"],
              ].map((row, index) => (
                <TableRow key={index} className="border-b border-gray-300">
                  {row.map((cell, i) => (
                    <TableCell key={i} sx={{ padding: "12px" }}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Graph */}
        <Box
          className="bg-white p-4 rounded-lg mt-6 shadow-md"
          sx={{
            background: "#FFFFFF",
            border: "1px solid #00000059",
            boxShadow: "0px 0px 16px 0px #00000040",
            borderRadius: "20px",
            padding: "20px",
            mt: 4,
            mb: 4
          }}
        >
          <Typography variant="h6" className="font-bold mb-2">
            Booking Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3AACE7" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Follow-up Section */}
        <Box
          className="p-4 rounded-lg mt-6 shadow-md border-l-4 border-blue-500"
          sx={{
            background: " #F1F1F1",
            boxShadow: "0px 0px 16px 0px #00000040",
            padding: "30px",
          }}
        >
          <Typography variant="body1" className="font-bold">
            Follow up with participants who viewed the event but didn’t buy. Consider sending a special offer to encourage them to complete their purchase.
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#0B2A4A",
            color: "white",
            borderRadius: "8px",
            marginTop: 2,
            fontWeight: "bold",
            padding: "12px",
            "&:hover": { backgroundColor: "#09324A" },
          }}
        >
          Send Follow-up
        </Button>
      </Box>
    </Box>
    </DashboardContent>
  );
}

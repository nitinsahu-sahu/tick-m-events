import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField, FormControlLabel, Select, MenuItem,
  Radio, RadioGroup, useMediaQuery,
  useTheme, Box
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { promotionGet } from 'src/redux/actions';
import { AppDispatch } from 'src/redux/store';

import { BookingTrends } from "../graph";
import { PromotionsAndOffers } from '../promotion-&-offer';
import { ActivePromotion } from '../active-promotion';


const promotionsData = [
  { id: 1, type: 'Spring Discount', date: '2025-03-10', discount: '20%', status: 'Active' },
  { id: 2, type: 'VIP Sale', date: '2025-03-10', discount: '15%', status: 'Active' },
  { id: 3, type: 'Flash Deal', date: '2025-03-10', discount: '25%', status: 'Inactive' },
];

export function MarketingEngagenmentView() {
  const [selectedPromo, setSelectedPromo] = useState(promotionsData[0]);
  const [onSave, setOnSave] = useState();
  const [onCancel, setOnCancel] = useState();
  const dispatch = useDispatch<AppDispatch>();

  const [description, setDescription] = useState(
    'Join us for an unforgettable experience! Get your tickets now!'
  );
  const [reservationLink, setReservationLink] = useState('https://eventbooking.com/my-event');
  const [hashtag, setHashtag] = useState('#AmazingEvent2025');


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(promotionGet())
  }, [dispatch])

  return (
    <DashboardContent>
      <PageTitleSection title="Promotions & Special Offers" desc="Lorem ipsum dolor sit amet" />

      {/* Active Promotion */}
      <ActivePromotion />

      {/* Promotions & special offer section */}
      <PromotionsAndOffers />

      {/* Notifications & Auto Reminder section */}
      <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: "1px solid black" }}>
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
          onClick={() => setShowCreateForm(true)} 
        >
          Create a New Notification
        </Button>

        {/* Select Notification Type */}
        {showCreateForm && (
          <Paper  sx={{ p: 3, borderRadius: '10px', background: '#f5f5f5', mt:3 }}>
        <Typography variant="body2" fontWeight="bold"  mb={1}>
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
            <label
              key={label}
              htmlFor={`checkbox-${label}`}
              className="flex items-center gap-2"
            >
              <input
                id={`checkbox-${label}`}
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
            <TextField fullWidth placeholder="mm/dd/yyyy" type='date' />
          </Box>
          <Box sx={{ flex: 1 }}>select time
            <TextField fullWidth placeholder="00:00" type='time' />
          </Box>
        </Box>

        {/* Real-Time Campaign Statistics */}
        <Typography fontWeight="bold" mb={1}>
          Real-Time Campaign Statistics
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
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
        </Paper>
        )}
      </Box>

      {/* Media sharing  section */}
      <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: "1px solid black" }}>
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

      <Box p={3} boxShadow={3} bgcolor="white" my={3} borderRadius={3} sx={{ border: "1px solid black" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Marketing Performance & Statistics
        </Typography>
        <Typography variant="body1" mb={4}>
          Performance Tracking Table
        </Typography>

        {/* Responsive Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            overflowX: "auto",
            mb: 4,
          }}
        >
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#3AACE7" }}>
                {["Action", "Participants Reached", "Open Rate", "Click Rate", "Sales Conversions"].map(
                  (header, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "#3AACE7",
                        ...(i === 0 && {
                          borderTopLeftRadius: "20px",
                          borderBottomLeftRadius: "20px",
                        }),
                        ...(i === 4 && {
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                          whiteSpace: "nowrap",
                        }),
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ["24h Reminder Notification", "500", "80%", "40%", "100 tickets sold"],
                ["48h Follow-Up", "400", "-", "-", "50 tickets sold"],
              ].map((row, rowIndex, rowArray) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    ...(rowIndex === rowArray.length - 1 && {
                      "& td:first-of-type": {
                        borderBottomLeftRadius: "20px",
                      },
                      "& td:last-of-type": {
                        borderBottomRightRadius: "20px",
                      },
                    }),
                  }}
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        p: 1.5,
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Responsive Graph Section */}


        <BookingTrends />

        {/* Follow-up Section */}
        <Box
          sx={{
            background: "#F1F1F1",
            p: { xs: 2, sm: 3 },
            borderLeft: "4px solid #3AACE7",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Follow up with participants who viewed the event but didn’t buy. Consider sending a special
            offer to encourage them to complete their purchase.
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#0B2A4A",
            color: "white",
            borderRadius: "8px",
            mt: 2,
            fontWeight: "bold",
            py: 1.5,
            "&:hover": { backgroundColor: "#09324A" },
          }}
        >
          Send Follow-up
        </Button>
      </Box>
    </DashboardContent>
  );
}

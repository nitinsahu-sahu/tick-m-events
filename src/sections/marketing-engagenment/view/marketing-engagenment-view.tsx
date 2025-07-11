import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,Card, CardContent, IconButton,
  TextField, FormControlLabel, Select, MenuItem,
  Radio, RadioGroup,  Box
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { promotionGet } from 'src/redux/actions';
import { AppDispatch } from 'src/redux/store';

import { BookingTrends } from "../graph";
import { PromotionsAndOffers } from '../promotion-&-offer';
import { ActivePromotion } from '../active-promotion';

interface PostData {
  description: string;
  reservationLink: string;
  hashtag: string;
  eventImage: string | null;
}

const promotionsData = [
  { id: 1, type: 'Spring Discount', date: '2025-03-10', discount: '20%', status: 'Active' },
  { id: 2, type: 'VIP Sale', date: '2025-03-10', discount: '15%', status: 'Active' },
  { id: 3, type: 'Flash Deal', date: '2025-03-10', discount: '25%', status: 'Inactive' },
];

export function MarketingEngagenmentView() {
  const [selectedPromo, setSelectedPromo] = useState(promotionsData[0]);
  // const [onSave, setOnSave] = useState();
  // const [onCancel, setOnCancel] = useState();
  const dispatch = useDispatch<AppDispatch>();

  const [description, setDescription] = useState(
    'Join us for an unforgettable experience! Get your tickets now!'
  );
  const [reservationLink, setReservationLink] = useState('https://eventbooking.com/my-event');
  const [hashtag, setHashtag] = useState('#AmazingEvent2025');
  const [savedData, setSavedData] = useState<PostData | null>(null);
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('postData');
    if (data) {
      setSavedData(JSON.parse(data));
    }
  }, []);

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // For preview, create URL
      const imageUrl = URL.createObjectURL(file);
      setEventImage(imageUrl);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('postData');
    if (data) {
      try {
        const parsedData = JSON.parse(data) as PostData;
        setSavedData(parsedData);
        // Optionally, you could also update the individual states:
        setDescription(parsedData.description);
        setReservationLink(parsedData.reservationLink);
        setHashtag(parsedData.hashtag);
        setEventImage(parsedData.eventImage);
      } catch (error) {
        console.error('Failed to parse saved post data', error);
      }
    }
  }, []);

  const handlePost = () => {
    const postData: PostData = {
      description,
      reservationLink,
      hashtag,
      eventImage, // this is the URL for preview (not the actual file)
    };
    // Save to localStorage
    localStorage.setItem('postData', JSON.stringify(postData));
    // Update state to show the card
    setSavedData(postData);
  };

  useEffect(() => {
    dispatch(promotionGet())
  }, [dispatch])

  return (
    <DashboardContent>
      <PageTitleSection title="Promotions & Special Offers"  />

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
          <Paper sx={{ p: 3, borderRadius: '10px', background: '#f5f5f5', mt: 3 }}>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Select Notification Type
            </Typography>
            <Select fullWidth defaultValue="Web Push" sx={{ mb: 3 }}>
              <MenuItem value="Web Push">Web Push</MenuItem>
              <MenuItem value="sms">SMS</MenuItem>
              <MenuItem value="email">Email</MenuItem>
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
        {savedData && (
          <Card sx={{ mb: 3, p: 2, borderRadius: '10px', backgroundColor: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardContent sx={{ flex: 1 }}>
              {savedData.eventImage && (
                <img src={savedData.eventImage} alt="Event" style={{ maxWidth: '100px', borderRadius: '10px', marginBottom: '8px' }} />
              )}
              <Typography variant="subtitle1" fontWeight="bold">
                {savedData.description}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Reservation: <a href={savedData.reservationLink} target="_blank" rel="noreferrer">{savedData.reservationLink}</a>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Hashtag: {savedData.hashtag}
              </Typography>
            </CardContent>

            <IconButton
              color="success"
              sx={{ fontSize: 40 }}
              onClick={() => {
                // Open WhatsApp with the description or reservation link or both
                const message = encodeURIComponent(`${savedData.description}\nReservation: ${savedData.reservationLink}\nHashtag: ${savedData.hashtag}`);
                window.open(`https://wa.me/?text=${message}`, '_blank');
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Card>
        )}

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
            onChange={handleImageChange}
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
          onClick={handlePost}
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

      </Box>
    </DashboardContent>
  );
}

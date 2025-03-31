import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";

const data = [
  { name: "April", sales: 200000 },
  { name: "May", sales: 400000 },
  { name: "June", sales: 600000 },
  { name: "July", sales: 1000000 },
  { name: "August", sales: 800000 },
  { name: "September", sales: 600000 },
  { name: "October", sales: 700000 },
  { name: "November", sales: 900000 },
];

const promotionsData = [
  { id: 1, type: "Spring Discount", date: "2025-03-10", discount: "20%", status: "Active" },
  { id: 2, type: "VIP Sale", date: "2025-03-10", discount: "15%", status: "Active" },
  { id: 3, type: "Flash Deal", date: "2025-03-10", discount: "25%", status: "Inactive" },
];

export function MarketingEngagenmentView() {
  const [promotions, setPromotions] = useState(promotionsData);
  const [description, setDescription] = useState(
    "Join us for an unforgettable experience! Get your tickets now!"
  );
  const [reservationLink, setReservationLink] = useState(
    "https://eventbooking.com/my-event"
  );
  const [hashtag, setHashtag] = useState("#AmazingEvent2025");

  return (
    <DashboardContent>
      <PageTitleSection
        title="Promotions & Special Offers"
        desc="Lorem ipsum dolor sit amet"
      />

      {/* Media sharing  section */}
      <Box
        sx={{
          // margin: "auto",
          padding: 3,
          border: "1px solid #00000059",
          boxShadow: "0px 0px 16px 0px #00000040",
          borderRadius: "30px",
          background: "white",
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Social Media Sharing
        </Typography>

        {/* Social Media Buttons */}
        <Box display="flex" justifyContent="space-around" mb={2}>
          <Button sx={{ bgcolor: "#1877F2", color: "white", borderRadius: "10px", pl: 4, pr: 4 }}>
            Share on Facebook
          </Button>
          <Button sx={{ bgcolor: "#25D366", color: "white", borderRadius: "10px", pl: 4, pr: 4 }}>
            Send via WhatsApp
          </Button>
          <Button sx={{ bgcolor: "#000000", color: "white", borderRadius: "10px", pl: 4, pr: 4 }}>
            Post on TikTok
          </Button>
          <Button sx={{ bgcolor: "#000000", color: "white", borderRadius: "10px", pl: 4, pr: 4 }}>
            Post on X
          </Button>
          <Button sx={{ bgcolor: "#006294", color: "white", borderRadius: "10px", pl: 4, pr: 4 }}>
            Share on LinkedIn
          </Button>
        </Box>

        {/* Edit Your Post */}
        <Paper sx={{ p: 2, borderRadius: "10px", background: "#f5f5f5" }}>
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
                borderRadius: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#F9F9F9",
                padding: "10px",
                marginBottom: "4px"
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
            bgcolor: "#0B2E4C",
            color: "white",
            mt: 2,
            padding: "10px",
            borderRadius: "10px",
            "&:hover": { bgcolor: "#083048" },
          }}
        >
          Post
        </Button>
      </Box>
      {/* Marketing perform section */}

      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
        <Paper
          elevation={3}
          className="p-8 rounded-[30px] shadow-lg border border-[#00000059] w-full max-w-6xl bg-white"
        >
          {/* Header */}
          <Typography
            variant="h6"
            fontWeight="bold"
            className="ml-6 mb-1 text-gray-900 "
            sx={{ marginLeft: "40px", paddingTop: "40px" }}

          >
            Marketing Performance & Statistics
          </Typography>
          <Typography
            variant="body2"
            className="ml-6 mb-6"
            sx={{ marginLeft: "40px" }}
          >
            Performance Tracking Table
          </Typography>

          <TableContainer
            component={Paper}
            className="rounded-lg overflow-hidden border border-gray-300 p-6"
            sx={{ marginLeft: "40px" }}
          >
            <Table>
              <TableHead>
                <TableRow className="bg-[#3AACE7] h-14">
                  {[
                    "Action",
                    "Participants Reached",
                    "Open Rate",
                    "Click Rate",
                    "Sales Conversions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      className="text-white font-bold px-6 py-4"
                      align="left"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ["24h Reminder Notification", "500", "80%", "40%", "100 tickets sold"],
                  ["24h Reminder Notification", "500", "-", "-", "50 tickets sold"],
                ].map((row, index) => (
                  <TableRow key={index} className="border-b border-gray-300 h-12">
                    {row.map((cell, i) => (
                      <TableCell key={i} className="px-6 py-4" align="left">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          {/* Graph */}
          <div className="mt-8 bg-white p-6 rounded-[20px] shadow-md border border-gray-200">
            <Typography variant="subtitle1" fontWeight="bold" className="mb-4">
              Booking Trends
            </Typography>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Booking Before Promotion</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-300 rounded-full" />
                <span>Booking After Promotion</span>
              </div>
              <div className="text-blue-500 font-semibold">Monthly</div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Follow-up Message */}
          <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg mt-8">
            <Typography variant="body2" className="text-gray-700">
              Follow up with participants who viewed the event but didn’t buy.
              Consider sending a special offer to encourage them to complete
              their purchase.
            </Typography>
          </div>

          {/* Send Follow-up Button */}
          <Button
            fullWidth
            variant="contained"
            className="bg-[#0B2E4C] text-white py-3 rounded-lg mt-6 text-lg"
          >
            Send Follow-up
          </Button>
        </Paper>
      </div>
    </DashboardContent>
  )

}
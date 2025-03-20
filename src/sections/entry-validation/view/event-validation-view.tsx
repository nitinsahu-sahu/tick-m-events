import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Iconify } from "src/components/iconify";
import { DashboardContent } from "src/layouts/dashboard";

export function EventValidationView() {
  const [search, setSearch] = useState("");

  // Example ticket data (Replace with API response)
  const tickets = [
    {
      id: 1,
      status: "Accepted",
      message: "Access granted. Welcome!",
      time: "14:30 PM",
      name: "John Doe",
      email: "johndoe@example.com",
      ticketType: "VIP",
      backgroundColor: "#DFFFE0", // Light Green
    },
    {
      id: 2,
      status: "Invalid",
      message: "Invalid ticket",
      backgroundColor: "#FFCCCC", // Light Red
    },
    {
      id: 3,
      status: "Used",
      message: "Ticket already used",
      backgroundColor: "#FFD9A3", // Light Orange
    },
  ];

  return (
    <DashboardContent>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Entry Validation (QR Code Scan)
      </Typography>

      {/* Wrapped Ticket Scanner section inside a bordered and shadowed Box */}
      <Box
        sx={{
          // border: "2px solid #0B2A4A",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        {/* Ticket Scanner Heading */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Ticket Scanner
        </Typography>

        {/* Scan a Ticket Bar */}
        <Box
          sx={{
            backgroundColor: "#0B2A4A",
            color: "white",
            padding: "12px",
            borderRadius: "30px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Iconify icon="mdi:barcode-scan" width={20} height={20} />
          <Typography variant="body1" ml={1}>
            Scan a Ticket
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box display="flex" mb={3} gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Scan a Ticket"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              borderRadius: "8px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0B2A4A",
              color: "white",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#0A1E36" },
            }}
          >
            Verify
          </Button>
        </Box>

        {/* Ticket Results */}
        <Grid container spacing={2}>
          {tickets.map((ticket) => (
            <Grid item xs={12} key={ticket.id}>
              <Card
                sx={{
                  backgroundColor: ticket.backgroundColor,
                  borderRadius: "12px",
                  padding: "12px",
                  border: "2px solid #ddd",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {ticket.message}
                  </Typography>
                  {ticket.status === "Accepted" && (
                    <>
                      <Typography variant="body2">
                        <strong>Entry Time:</strong> {ticket.time}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Name:</strong> {ticket.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Email:</strong> {ticket.email}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Ticket Type:</strong> {ticket.ticketType}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> {ticket.status}
                      </Typography>
                    </>
                  )}

                  {/* Action Buttons */}
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "darkgreen" },
                      }}
                    >
                      Confirm Entry
                    </Button>
                    <Box display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "8px",
                          "&:hover": { backgroundColor: "darkred" },
                        }}
                      >
                        Cancel
                      </Button>
                      <IconButton sx={{ ml: 1 }}>
                        <Iconify icon="mdi:information-outline" />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardContent>
  );
}

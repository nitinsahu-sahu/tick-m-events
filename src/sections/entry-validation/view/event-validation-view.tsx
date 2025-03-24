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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
 
  } from "@mui/material";
  import { Iconify } from "src/components/iconify";
  import { DashboardContent } from "src/layouts/dashboard";
  import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

      const entries = [
    { name: "Jean M.", ticketType: "VIP", entryTime: "18:30", status: "Validated" },
  ];

     const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(search.toLowerCase())
    );

        const data = [
  { name: "Validated Tickets", value: 350, color: "#4CAF50" },
  { name: "Pending Tickets", value: 150, color: "#FFC107" },
  { name: "Invalid Tickets", value: 5, color: "#E53935" },
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

        {/* second section */}
       <Box
  sx={{
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#fff",
    mt: 4,
  }}
>

          {/* Ticket Scanner Heading */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Enter Ticket Code
          </Typography>

      <Grid container spacing={2} alignItems="center">
    {/* Enter Ticket Code Section */}
    <Grid item xs={12} md={4}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Enter Ticket Code
      </Typography>
      <TextField fullWidth variant="outlined" placeholder="583-356" />
      <Button
        variant="contained"
        sx={{
          mt: 1.5,
          mb: 2,
          backgroundColor: "#0B2A4A",
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        Verify
      </Button>
    </Grid>

    {/* Search for a Participant Section */}
    <Grid item xs={12} md={4}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Search for a Participant
      </Typography>
      <TextField fullWidth variant="outlined" placeholder="Enter Participant ID" />
      <Button
        variant="contained"
        sx={{
          mt: 1.5,
          mb: 2,
          backgroundColor: "#0B2A4A",
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        Validate Entry
      </Button>
    </Grid>

    {/* Participant Name Input (Fixed Alignment) */}
    <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: "82px", mb:8}}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1} visibility="hidden">
        Placeholder
      </Typography>
      <TextField fullWidth variant="outlined" placeholder="Enter Participant Name" />
    </Grid>
  </Grid>

          
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

        {/* 3rd section */}
<Box
  sx={{
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#fff",
    mt: 4,
  }}
>
  {/* Entry List Heading */}
  <Typography variant="h5" fontWeight="bold" mb={2}>
    Entry List View
  </Typography>

  {/* Search Field */}
  <TextField fullWidth variant="outlined" placeholder="Search by Name" sx={{ mb: 2 }} />

  {/* Table Section */}
  <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
    <Table>
      <TableHead>
       <TableRow>
  {["Name", "Ticket Type", "Entry Time", "Status"].map((header) => (
    <TableCell
      key={header}
      sx={{
        backgroundColor: "#3AACE7",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {header}
    </TableCell>
  ))}
</TableRow>

      </TableHead>
      <TableBody>
        <TableRow>
          {["Jean M.", "VIP", "18:30", "Validated"].map((data, index) => (
            <TableCell key={index} sx={{ textAlign: "center" }}>
              {data}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>

  {/* Buttons */}
  <Box display="flex" gap={2} mt={2}>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#0B2A4A",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
        textTransform: "none",
      }}
    >
      Download as CSV
    </Button>
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#28A745",
        color: "white",
        fontWeight: "bold",
        borderRadius: "8px",
        textTransform: "none",
      }}
    >
      Download as Excel
    </Button>
  </Box>
</Box>     

        
          <Paper
      sx={{
        padding: "20px",
        borderRadius: "12px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        mt: 4,
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Real-Time Statistics
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total Tickets Sold", value: 500 },
          { label: "Validated Tickets", value: 350 },
          { label: "Pending Tickets", value: 150 },
          { label: "Invalid Tickets", value: 5 },
        ].map((stat, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <Box
              sx={{
                backgroundColor: "#0B2A4A",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                color: "white",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {stat.label}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {stat.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Paper
        sx={{
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body1" fontWeight="bold" mb={2}>
          Entry Data Visualization
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, value }) => `${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Paper>


   <Box
      sx={{
        width: "900px",
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      {/* Main Box */}
      <Box
        sx={{
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#fff",
    mt: 4,
  }}
>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold">
          Offline Mode (PWA)
        </Typography>

        {/* Status */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Status:</strong>{" "}
          <span style={{ fontWeight: "bold", color: "#0B2A4A" }}>
            Online – Sync Enabled
          </span>
        </Typography>

        {/* Stored Entries */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Stored Offline Entries:</strong> 0
        </Typography>
      </Box>
    </Box>

      </DashboardContent>
    )
  }

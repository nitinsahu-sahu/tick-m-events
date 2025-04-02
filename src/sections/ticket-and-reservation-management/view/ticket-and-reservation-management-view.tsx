import { useState } from "react";
import { MenuItem, Select, FormControlLabel, Checkbox, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField, FormControl, InputLabel } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { AnalyticsTable } from "src/components/tables/analytics-table";

import { SearchBar } from "../search-bar";

import("../style.css")

export function TicketAndReservationManagementView() {
  const theme = useTheme();
  const [personalized, setPersonalized] = useState(true);

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["April", "May", "June", "July", "August", "September", "October"],
    },
    stroke: { curve: "smooth" },
    markers: { size: 5 },
    colors: [theme.palette.primary.main],
  };

  const chartSeries = [{ name: "Sales", data: [600, 400, 300, 450, 500, 200, 150] }];
  // Dummy data
  const tickets = [
    {
      name: "Standard",
      price: "20",
      quantity: "100",
      description: "Access to general areas",
      stock: "80",
    },
    {
      name: "VIP",
      price: "Free",
      quantity: "Unlimited",
      description: "Access to VIP areas",
      stock: "30",
    },
  ];

  const tableHeaders = ["Ticket Type", "Price", "Total Stock", "Remaining Stock", "Tickets Sold", "Revenue Generated"];
  const tableData = [
    { type: "Standard", price: "10,000 XAF", total: 500, remaining: 230, sold: 270, revenue: "2,700,000 XAF" },
    { type: "VIP", price: "20,000 XAF", total: 200, remaining: 50, sold: 150, revenue: "3,000,000 XAF" },
    { type: "Advanced", price: "30,000 XAF", total: 300, remaining: 100, sold: 200, revenue: "6,000,000 XAF" },
  ];

  const tableHeadersFirst = ["Ticket Name", "Price", "Quantity Available", "Ticket Description", "Remaining Stock", "Actions"];
  const tableDataFirst = [
    { type: "Standard", price: "20", total: 100, remaining: "Access to general areas", sold: 800, revenue: "2,700,000 XAF" },
    { type: "VIP", price: "Free", total: "Unlimited", remaining: "Access to VIP areas", sold: 30, revenue: "3,000,000 XAF" },
  ];

  const tableHeadersSecond = ["Name", "Email", "Ticket Type", "Purchase Date", "Status", "Actions"];
  const tableDataSecond = [
    { type: "Jean M", price: "jean@email.com", total: "VIP", remaining: "02/02/2025", sold: ["Pending", "Confirmed", "Canceled"], revenue: "Cancel" },
    { type: "Jean M", price: "jean@email.com", total: "VIP", remaining: "02/03/2025", sold: ["Pending", "Confirmed", "Canceled"], revenue: "Cancel" },
    { type: "Jean M", price: "jean@email.com", total: "VIP", remaining: "02/04/2025", sold: ["Pending", "Confirmed", "Canceled"], revenue: "Cancel" },
  ];

  const chartRealTimeOptions: ApexOptions = {
    series: [45, 30, 25], // Ticket Sold, Validation, Remaining
    labels: ["Ticket Sold", "Ticket Validation", "Remaining Tickets"],
    chart: { type: "donut" },
    colors: ["#2395D4", "#002E4E", "#29A71A"], // Match colors from screenshot
    legend: { position: "bottom", markers: { strokeWidth: 8 } },
    dataLabels: { enabled: true },
    responsive: [{ breakpoint: 768, options: { legend: { position: "bottom" } } }],
  };
  return (
    <DashboardContent>
      <PageTitleSection
        title="Ticket & Reservation Management"
        desc="Lorem ipsum dolor sit amet"
        rightCom={<SearchBar />} // Passing SearchBar component as a prop
      />

      {/* Table Section */}
      <AnalyticsTable headers={tableHeadersFirst} data={tableDataFirst} type="1" />



      {/* Add Ticket Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.blue.dark,
            color: "#fff",
            width: "90%",
            "&:hover": { backgroundColor: theme.palette.blue.light },
          }}
        >
          Add a Ticket
        </Button>
      </Box>

      {/* Ticket Creation Section */}
      <Box boxShadow={3} borderRadius={3} mt={3}>
        <Paper sx={{ width: "100%", p: 3, maxWidth: { xs: "800px", sm: "800px", md: "100%" } }}>
          {/* Section Title */}
          <Typography variant="h5" color={theme.palette.blue.contrastText} fontWeight="bold">
            Ticket Creation & Configuration
          </Typography>

          {/* Table Header */}
          <Box
            sx={{
              border: "1px solid #969696",
              borderRadius: 1,
              mt: 2,
              p: 2,
              bgcolor: "white",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                width: { xs: "100%", sm: "100%", md: "42%" }, // Make it responsive
                pb: 1,
                borderBottom: "1px solid #969696",
                flexWrap: "wrap", // Allow wrapping on smaller screens
              }}
            >
              {["Name", "Price", "Quantity", "Validity", "Options"].map((header) => (
                <Typography key={header} variant="body2" fontWeight="medium" sx={{ paddingRight: { xs: "10px", sm: "10px", md: "20px" }, fontSize: { xs: "12px", sm: "14px", md: "16px" } }}>
                  {header}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Form Section */}
          <Typography variant="h6" color={theme.palette.blue.contrastText} fontWeight="bold" sx={{ mt: 3 }}>
            Create a Ticket Type
          </Typography>

          {/* Inputs - Responsive Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, // Adjust based on screen size
              gap: 2,
              mt: 2,
            }}
          >
            <TextField label="Event Name" placeholder="e.g., Tech Conference 2025" fullWidth />
            <TextField label="Price" placeholder="10000" fullWidth />
            <TextField label="Available Quantity" placeholder="Enter quantity" fullWidth />
          </Box>

          {/* Description */}
          <TextField label="Ticket Description" placeholder="Description" multiline rows={3} fullWidth sx={{ mt: 2 }} />

          {/* Validity */}
          <TextField label="Validity" placeholder="e.g., Tech Conference 2025" fullWidth sx={{ mt: 2 }} />

          {/* Checkboxes */}
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }} />
              }
              label="Transferable Ticket (Can be resold or given to another person)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }}
                  checked={personalized}
                  onChange={(e) => setPersonalized(e.target.checked)}
                />
              }
              label="Personalized Ticket (Participant’s name and account ID required for validation)"
            />
            <FormControlLabel
              control={
                <Checkbox sx={{ color: "blue", "&.Mui-checked": { color: "#0B2E4C" } }} />
              }
              label="Activation Code (Unique QR Code or manual code for entrance validation)"
            />
          </Box>

          {/* Buttons - Centered on Mobile */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button variant="contained" sx={{ backgroundColor: theme.palette.blue.contrastText }}>
              Save & Publish Tickets
            </Button>
            <Button
              variant="outlined"
              sx={{ color: theme.palette.blue.contrastText, backgroundColor: "#E2E2E2" }}
            >
              Add Ticket
            </Button>
          </Box>
        </Paper>
      </Box>

      <Box mt={3} boxShadow={3} borderRadius={3} >
        {/* Card Wrapper */}
        <Paper sx={{ p: 3, borderRadius: 2, maxWidth: "1000px", mx: "auto" }}>
          {/* Title */}
          <Typography variant="h5" fontSize={{ xs: 25, sm: 30, md: 40 }} fontWeight="bold" sx={{ mb: 2 }} display="flex" justifyContent="center">
            Sales & Stock Tracking
          </Typography>

          {/* Filters */}
          <Box>
            <Typography
              variant="h5"
              fontSize={{ xs: 20, sm: 25, md: 32 }}
              fontWeight="500"
              sx={{ mb: 2 }}
            >
              Real-time Sales Tracking
            </Typography>
            <Box
              sx={{
                display: "flex",  // Change to flex for better control
                alignItems: "center",
                gap: 3,  // Adjust spacing between elements
                flexWrap: "wrap", // Ensure responsiveness
                mb: 2
              }}
            >
              {/* Ticket Category */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
                  Ticket Category:
                </Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select defaultValue="All" size="small">
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="VIP">VIP</MenuItem>
                    <MenuItem value="Standard">Standard</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Ticket Status */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
                  Ticket Status:
                </Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select defaultValue="All" size="small">
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Sold">Sold</MenuItem>
                    <MenuItem value="Remaining">Remaining</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Date Range */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
                  Date Range:
                </Typography>
                <TextField
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
          </Box>

          {/* Table */}
          <AnalyticsTable headers={tableHeaders} data={tableData} />

          {/* Sales Graph */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Sales Graph
            </Typography>
            <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
          </Box>
        </Paper>
      </Box>

      <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">

        {/* Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Reservation Management
        </Typography>

        {/* Table */}
        {/* <AnalyticsTable data="tableDataSecond" headers={tableHeadersSecond} type="2" /> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#009FE3", color: "white" }}>
                {["Name", "Email", "Ticket Type", "Purchase Date", "Status", "Actions"].map((header) => (
                  <TableCell key={header} sx={{ 
                    color: theme.palette.common.white,
                                    backgroundColor: theme.palette.primary.main,
                    fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3].map((row) => (
                <TableRow key={row}>
                  <TableCell>Jean M</TableCell>
                  <TableCell>jean@email.com</TableCell>
                  <TableCell>VIP</TableCell>
                  <TableCell>02/02/2025</TableCell>
                  <TableCell>
                    <Select size="small" defaultValue="pending">
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" size="small">
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Export Buttons */}
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" sx={{ bgcolor: "#003B73", color: "white" }}>
            Export as CSV
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#003B73", color: "white" }}>
            Export as Excel
          </Button>
        </Box>

        {/* Ticket Validation Section */}
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold">
            Ticket Validation
          </Typography>

          <Box display="flex" flexDirection="column" gap={1} mt={1}>
            <FormControlLabel control={<Checkbox />} label="QR Code Scan" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Manual Entry of Unique Code" />
            <FormControlLabel control={<Checkbox />} label="Validation via Name List & Account ID" />

            <Box display="flex" gap={2} mt={2}>
              <Button variant="contained" sx={{ bgcolor: "#1E3A8A", color: "white" }}>
                Save Changes
              </Button>
              <Button variant="contained" sx={{ bgcolor: "#1E3A8A", color: "white" }}>
                Go to Ticket Validation Page
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Real-time Entry Statistics */}
        <Box
          mt={4}
          p={3}
          borderRadius={3}
          sx={{
            background: "linear-gradient(to right, #ffffff 82%, #2395D4 82%)",
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left Side: Title */}
          <Box flex={1} minWidth="250px">
            <Typography variant="h6" fontWeight={500} color="#002E4E" fontSize={{ xs: 20, sm: 25, md: 43 }}>
              Real-time Entry Statistics
            </Typography>
          </Box>

          {/* Center: Chart */}
          <Box flex={2} minWidth="300px">
            <Chart options={chartRealTimeOptions} series={chartRealTimeOptions.series} type="donut" width="100%" height={250} />
          </Box>
        </Box>

      </Box>

      <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">

        {/* Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Refund & Cancellation Management
        </Typography>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#009FE3", color: "white" }}>
                {["Name", "Email", "Ticket Type", "Purchase Date", "Status", "Actions"].map((header) => (
                  <TableCell key={header} sx={{ color: "white", fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ borderBottom: "1px dashed #ccc" }}>
                <TableCell>Jean M</TableCell>
                <TableCell>jean@email.com</TableCell>
                <TableCell>Standard</TableCell>
                <TableCell>02/02/2025</TableCell>
                <TableCell>
                  <FormControl size="small">
                    <Select defaultValue="in_progress">
                      <MenuItem value="in_progress">In Progress</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="denied">Denied</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="success" size="small">
                    Approve
                  </Button>
                  <Button variant="contained" color="error" size="small" sx={{ ml: 1 }}>
                    Deny
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Refund Policy Configuration */}
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold">
            Refund Policy Configuration
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <FormControlLabel control={<Checkbox />} label="Full Refund available up to X days before the event" />
            <TextField size="small" placeholder="Enter number of days" />

            <FormControlLabel control={<Checkbox defaultChecked />} label="Partial Refund with Fee (% of ticket price retained)" />
            <TextField size="small" placeholder="Enter percentage" />

            <FormControlLabel control={<Checkbox />} label="No Refund after purchasing the ticket" />

            <FormControlLabel control={<Checkbox />} label="No Refunds after a set date" />
            <TextField type="date" size="small" />

            <Button variant="contained" sx={{ bgcolor: "#1E3A8A", color: "white", mt: 2, width: "200px" }}>
              Save Changes
            </Button>
          </Box>
        </Box>

      </Box>
    </DashboardContent>
  )
}
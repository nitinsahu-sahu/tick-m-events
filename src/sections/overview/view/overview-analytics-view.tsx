import { useState } from 'react';
import { ToggleButtonGroup, List, Avatar, ListItemText, IconButton, ListItem, MenuItem, Box, Grid, Button, Card, CardContent, Typography, Paper, Select, Tabs, Tab, Stack, ListItemAvatar, Divider, CardMedia, ToggleButton, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../CustomCalendar.css"; // Custom styling for event indicators
import { DashboardContent } from 'src/layouts/dashboard';
import { Chart } from "src/components/chart";
import { Iconify } from 'src/components/iconify';

import { CountDownView } from '../count-down';
import { AnalyticsCard } from "../analytics-card";
import { latestSales, upcomingEvents, salesRevenuChartSeries, salesRevenuChartOptions, eventList, donutBestSellingChartSeries, donutBestSellingChartOptions, chartrevenuOptions, chartrevenuSeries, chartOptions, donutChartOptions } from "../utils";

export function OverviewAnalyticsView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTicket, setSelectedTicket] = useState("VIP");
  const [selectedTab, setSelectedTab] = useState(0);
  const [ticketType, setTicketType] = useState("VIP");
  const [timeframe, setTimeframe] = useState("monthly");
  const theme = useTheme();
  const up = true;
  const percentage = 75; // Dynamic Percentage Value
  // Define highlighted dates
  const highlightedDates = [
    new Date(2025, 2, 11), // 11 March 2025
    new Date(2025, 2, 15), // 15 March 2025
    new Date(2025, 2, 22), // 22 March 2025
    new Date(2025, 1, 11), // 11 February 2025
  ].map((d) => d.toDateString());


  return (
    <DashboardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 3, md: 5 },
        }}
      >
        {/* Left Side - Dashboard Title & Subtitle */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#000",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#C0C0C0",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Lorem ipsum dolor sit amet
          </Typography>
        </Box>

        {/* Right Side - Countdown Box */}
        <CountDownView />
      </Box>

      <Grid container spacing={2} alignItems="stretch">
        {/* Card 1 - Total Tickets Sold */}
        <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
          <AnalyticsCard
            title="Total Tickets Sold"
            value="215"
            iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
            chartOptions={{ ...chartOptions, colors: [theme.palette.primary.main] }}
            chartSeries={[{ name: "Tickets", data: [10, 20, 15, 25, 2, 34, 50] }]}
            chartType="line"
            chartHeight={110}
          />
        </Grid>

        {/* Card 2 - Revenue Generated */}
        <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
          <AnalyticsCard
            title="Revenue Generated"
            value="$536k"
            iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
            chartOptions={{ ...chartOptions, colors: [theme.palette.blue.dark] }}
            chartSeries={[{ name: "Tickets", data: [10, 20, 15, 25, 20] }]}
            chartType="line"
            chartHeight={110}
          />
        </Grid>

        {/* Card 3 - Remaining Tickets */}
        <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
          <AnalyticsCard
            title="Remaining Tickets"
            value="652"
            iconSrc={up ? "./assets/icons/dashboard/ic_arrow_down.svg" : "./assets/icons/dashboard/ic_arrow_up.svg"}
            chartOptions={{
              ...chartOptions,
              chart: { type: "bar", toolbar: { show: false }, sparkline: { enabled: true } },
              colors: [theme.palette.error.main],
              plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
            }}
            chartSeries={[{ name: "Remaining", data: [5, 10, 8, 15, 10, 20, 50, 22] }]}
            chartType="bar"
            chartHeight={100}
          />
        </Grid>

        {/* Card 4 - Tickets Confirmed */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: "12px", display: "flex", alignItems: "center" }}>
            {/* Left Section */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "600" }}>
                {percentage}% of tickets purchased are confirmed
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                {/* Bullet Icon */}
                <Box
                  component="img"
                  src="./assets/icons/dashboard/ic_arrow_right.svg"
                  width={20}
                  height={20}
                  sx={{
                    fill: theme.palette.success.main
                  }}
                />
                <Typography sx={{ fontSize: "9px", color: "black", fontWeight: 100 }}>
                  Total number of tickets sold:
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "12px", color: "black", fontWeight: "bold" }}>
                215 vs. Number of tickets scanned at the entrance: 100
              </Typography>
            </Box>

            {/* Right Section - Donut Chart */}
            <Box sx={{ width: 90 }}>
              <Chart
                options={donutChartOptions}
                series={[percentage, 100 - percentage]}
                type="donut"
                height={100}
              />
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  mt: -6,
                }}
              >
                {percentage}% <br />
                Attendee Engagement
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on larger screens
          p: 2,
          borderRadius: 3,
          boxShadow: 3,
          my: 4, // Adds top and bottom margin
        }}
      >
        {/* Left Section - Wallet Balance */}
        <CardContent
          sx={{
            flex: 1, // 50% width for both sections
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            borderRadius: 2,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center content vertically
            justifyContent: "center", // Center content horizontally
            textAlign: "center", // Center text
          }}
        >
          <Typography variant="h6">Wallet Balance</Typography>
          <Typography variant="h4" fontWeight="bold">$100.00</Typography>

          {/* Buttons */}
          <Box display="flex" gap={2} mt={1}>
            <Button variant="contained" color="secondary">Withdraw</Button>
            <Button variant="contained" color="warning">Top Up</Button>
          </Box>

          {/* Transaction History */}
          <Typography variant="body2" mt={1}>Transaction History:</Typography>
          <Typography variant="body2">• +$50 (Top-up)</Typography>
          <Typography variant="body2">• -$10 (TXN+4% Commission)</Typography>
        </CardContent>

        {/* Right Section - Sales Chart */}
        <CardContent
          sx={{
            flex: 1, // 50% width for both sections
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // Center chart in column
            // textAlign: "center",
          }}
        >
          <Typography variant="h6">Sales Revenue</Typography>
          <Chart options={chartrevenuOptions} series={chartrevenuSeries} type="line" height={200} />
          <Button variant="contained" sx={{
            mt: 1,
            backgroundColor: theme.palette.blue.dark, // No need for template literals

          }}>Boost Sales</Button>
        </CardContent>
      </Card>

      {/* Best Selling */}
      <Grid container spacing={3} alignItems="stretch">
        {/* Left Card - Best Selling */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, height: "100%", display: "flex", flexDirection: "column" }}>
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" spacing={2}>
              <Typography variant="h6" color="primary">Best Selling</Typography>

              {/* Ticket Type Selector */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>Ticket Type:</Typography>
                <Select value={selectedTicket} onChange={(e) => setSelectedTicket(e.target.value)} size="small" sx={{ minWidth: 100 }}>
                  <MenuItem value="VIP">VIP</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Early Bird">Early Bird</MenuItem>
                </Select>
              </Stack>

              {/* Tabs */}
              <Tabs value={selectedTab} onChange={(e, newVal) => setSelectedTab(newVal)} textColor="primary" variant="scrollable" scrollButtons="auto">
                <Tab label="Monthly" />
                <Tab label="Weekly" />
                <Tab label="Daily" />
              </Tabs>
            </Stack>

            {/* Chart & Info */}
            <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" mt={2} spacing={2} flex={1}>
              <Chart options={donutBestSellingChartOptions} series={donutBestSellingChartSeries} type="donut" height={150} width={150} />

              <Stack spacing={2} flex={1}>
                <Typography variant="body2" color="primary" fontSize={12}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>

                <Stack direction="row" justifyContent="space-between" spacing={2}>
                  {[
                    { color: "#12263F", value: "21,512", label: "Ticket Left" },
                    { color: "#1E88E5", value: "45,612", label: "Ticket Sold" },
                    { color: "#BDBDBD", value: "275", label: "Event Held" },
                  ].map((item, index) => (
                    <Stack key={index}>
                      <Box width={20} height={5} bgcolor={item.color} borderRadius={2} />
                      <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                      <Typography variant="caption" color="gray">{item.label}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        {/* Right Card - Ticket Sold Today */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, backgroundColor: theme.palette.primary.main, color: "#fff", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mt={1}>
              {/* Ticket Sold Info */}
              <Box>
                <Typography variant="h6">Ticket Sold Today</Typography>
                <Typography variant="h3" fontWeight="bold">
                  456,502 <span style={{ fontSize: "16px" }}>pcs</span>
                </Typography>
              </Box>

              {/* Growth Chart */}
              <Box display="flex" alignItems="center">
                <Chart
                  options={{ ...chartOptions, colors: [theme.palette.common.white] }}
                  series={[{ name: "Tickets", data: [10, 20, 15, 25, 2, 34, 50] }]}
                  type="line"
                  height={110}
                  width={100}
                />
                <Box>
                  <Typography variant="body2" sx={{ ml: 1 }}>+4%</Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>from last day</Typography>
                </Box>
              </Box>
            </Box>

            {/* Progress Bar */}
            <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" mt={1} spacing={1}>
              <Typography sx={{ backgroundColor: theme.palette.common.white, color: theme.palette.primary.main, px: 1, borderRadius: 1 }} fontSize="12px">986 pcs left</Typography>
              <Box sx={{ width: "100%", height: 8, backgroundColor: theme.palette.blue.light, borderRadius: 4, overflow: "hidden" }}>
                <Box sx={{ width: "80%", height: "100%", backgroundColor: theme.palette.common.white }} />
              </Box>
            </Stack>

            <Typography variant="body2" mt={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>View Detail →</Typography>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ py: 3, minHeight: "100vh" }}>
        <Grid container spacing={3}>

          {/* Recent Event List */}
          <Grid item xs={12} md={8}>
            {/* Recent event list */}
            <Card>
              <CardContent>
                <Typography variant="h6" color={theme.palette.primary.main} gutterBottom>
                  Recent Event List
                </Typography>
                <Grid container spacing={3}>
                  {eventList.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event._id}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          padding: 2,
                          boxShadow: 3,
                          borderRadius: 2,
                          alignItems: "center",
                          textAlign: { xs: "center", sm: "left" },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={event.img}
                          alt={event.name}
                          sx={{
                            width: { xs: "100%", sm: 100 },
                            height: 85,
                            borderRadius: 2,
                            objectFit: "cover",
                          }}
                        />
                        <CardContent sx={{ flex: 1, pt: 0 }}>
                          <Typography
                            variant="h6"
                            color={theme.palette.primary.main}
                            sx={{ fontWeight: 500, fontSize: { xs: 14, sm: 16 } }}
                          >
                            {event.name}
                          </Typography>
                          <Typography variant="body2" color={theme.palette.common.black}>
                            {event.location}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            {`${event.description.split(" ").slice(0, 5).join(" ")}...`}
                          </Typography>
                        </CardContent>

                        {/* Icons Section */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: { xs: "center", sm: "flex-start" },
                          }}
                        >
                          {/* Price */}
                          <Stack alignItems="center" spacing={0.5}>
                            <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                              <IconButton color="primary">
                                <Iconify width={20} icon="gg:dollar" />
                              </IconButton>
                            </Avatar>
                            <Typography color="primary" fontSize={{ xs: 10, sm: 12 }}>
                              {event.cost}
                            </Typography>
                          </Stack>

                          {/* Stock */}
                          <Stack alignItems="center" spacing={0.5}>
                            <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                              <IconButton
                                sx={{ color: event.stock === "0" ? "black" : "primary" }}
                              >
                                <Iconify width={20} icon="ix:ticket-filled" />
                              </IconButton>
                            </Avatar>
                            <Typography
                              fontSize={{ xs: 10, sm: 12 }}
                              sx={{ color: event.stock === "0" ? "black" : "#007bff" }}
                            >
                              {event.stock === "0" ? "SOLD OUT" : `${event.stock} pcs Left`}
                            </Typography>
                          </Stack>

                          {/* Date */}
                          <Stack alignItems="center" spacing={0.5}>
                            <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                              <IconButton color="primary">
                                <Iconify width={20} icon="simple-line-icons:calender" />
                              </IconButton>
                            </Avatar>
                            <Typography fontSize={{ xs: 10, sm: 12 }} color="primary">
                              {event.Date}
                            </Typography>
                          </Stack>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: theme.palette.blue.dark,
                    fontSize: { xs: 12, sm: 14 },
                  }}
                >
                  Load More
                </Button>
              </CardContent>
            </Card>


            <Box display="flex" gap={2} flexWrap="wrap" sx={{ py: 3 }}>
              {/* Latest Sales */}
              <Card sx={{ flex: 1, minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Latest Sales
                  </Typography>
                  {latestSales.map((sales, index) => (
                    <List key={index} sx={{ paddingTop: "0px", paddingX: 0 }}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src={sales.img}
                            sx={{ width: 40, height: 40 }}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={sales.name} secondary="Purchased event tickets" />
                      </ListItem>
                      <Divider />
                    </List>
                  ))}
                </CardContent>
              </Card>

              {/* Sales Revenue Chart */}
              <Card sx={{ flex: 1, minWidth: 300, p: 2 }}>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "center", md: "center" }}
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ textAlign: { xs: "center", md: "left" }, flexWrap: "wrap" }}
                  >
                    <Typography variant="h6" color="primary">Sales Revenue</Typography>

                    {/* Ticket Type Selector */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>Ticket Type:</Typography>
                      <Select
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        size="small"
                        sx={{ minWidth: 100, maxWidth: "100%" }}
                      >
                        <MenuItem value="VIP">VIP</MenuItem>
                        <MenuItem value="Standard">Standard</MenuItem>
                        <MenuItem value="Early Bird">Early Bird</MenuItem>
                      </Select>
                    </Stack>
                  </Stack>

                  {/* Timeframe Toggle Buttons */}
                  <Box
                    display="flex"
                    justifyContent={{ xs: "center", md: "space-between" }}
                    sx={{ width: "100%", mt: 1, mb: 2 }}
                  >
                    <ToggleButtonGroup
                      value={timeframe}
                      exclusive
                      onChange={(e, newValue) => setTimeframe(newValue)}
                      sx={{ flexWrap: "wrap", justifyContent: "center" }}
                    >
                      <ToggleButton value="monthly">Monthly</ToggleButton>
                      <ToggleButton value="weekly">Weekly</ToggleButton>
                      <ToggleButton value="daily">Daily</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  {/* Chart */}
                  <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Chart
                      options={salesRevenuChartOptions}
                      series={salesRevenuChartSeries}
                      type="line"
                      height={250}
                      width="100%"
                    />
                  </Box>
                </CardContent>
              </Card>

            </Box>

          </Grid>

          {/* Calendar & Upcoming Events */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 2, width: "100%" }}>
              <Box padding={3}>
                <Calendar
                  value={currentDate}
                  tileClassName={({ date }) => {
                    const today = new Date().toDateString();
                    if (highlightedDates.includes(date.toDateString()) && date.toDateString() !== today) {
                      return "highlight";
                    }
                    return null;
                  }}
                />
              </Box>

              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Upcoming Events
                </Typography>

                {upcomingEvents.map((event) => (
                  <Box
                    key={event._id}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{
                      marginBottom: 2,
                      flexDirection: { xs: "column", sm: "row" }, // Stacks on mobile, row on larger screens
                      textAlign: { xs: "center", sm: "left" }, // Center align text on mobile
                      width: "100%"
                    }}
                  >
                    {/* Date Circle */}
                    <Box
                      sx={{
                        backgroundColor: "#F5FCFA",
                        width: 60,
                        height: 70,
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0, // Prevents shrinking on small screens
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {event.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.day}
                      </Typography>
                      <Avatar sx={{ width: 12, height: 12, bgcolor: "navy", mt: 1 }} />
                    </Box>

                    {/* Event Details */}
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="body1" fontWeight="500" fontSize={14}>
                        {event.name}
                      </Typography>

                      <Box
                        display="flex"
                        justifyContent={{ xs: "center", sm: "space-between" }}
                        alignItems="center"
                        flexWrap="wrap"
                        gap={1}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Ticket Sold
                        </Typography>
                        <Typography variant="caption" fontWeight="bold">
                          {event.sold}/{event.total}
                        </Typography>
                      </Box>

                      <Box display="flex" justifyContent={{ xs: "center", sm: "flex-start" }}>
                        <LinearProgress
                          variant="determinate"
                          value={((event?.sold ?? 0) / (event?.total ?? 1)) * 100}
                          sx={{
                            width: { xs: "100%", sm: 100 },
                            height: 6,
                            borderRadius: 5,
                            bgcolor: "#E0E0E0",
                            marginTop: 1
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>

          </Grid>

        </Grid>
      </Box>

    </DashboardContent>
  );
}
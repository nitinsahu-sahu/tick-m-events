import { useState } from 'react';
import { useMediaQuery, ToggleButtonGroup, List, Avatar, ListItemText, IconButton, ListItem, MenuItem, Box, Grid, Button, Card, CardContent, Typography, Select, Stack, ListItemAvatar, Divider, CardMedia, ToggleButton, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../CustomCalendar.css"; // Custom styling for event indicators
import { DashboardContent } from 'src/layouts/dashboard';
import { Chart } from "src/components/chart";
import { Iconify } from 'src/components/iconify';
import { PageTitleSection } from 'src/components/page-title-section';

import { CountDownView } from '../count-down';
import { latestSales, upcomingEvents, salesRevenuChartSeries, salesRevenuChartOptions, eventList, donutBestSellingChartSeries, donutBestSellingChartOptions, chartrevenuOptions, chartrevenuSeries, chartOptions, donutChartOptions } from "../utils";
import { AnalyticsFourCards } from '../analytics-four-card';
import { BestSelling } from '../best-selling';

export function OverviewAnalyticsView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTicket, setSelectedTicket] = useState("VIP");
  const [selectedTab, setSelectedTab] = useState(0);
  const [ticketType, setTicketType] = useState("VIP");
  const [timeframe, setTimeframe] = useState("monthly");
  const theme = useTheme();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down("sm")); // Show mobile/tablet view
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // Show desktop view
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
      <PageTitleSection
        title="Ticket & Reservation Management"
        desc="Lorem ipsum dolor sit amet"
        rightCom={<CountDownView />} // Passing SearchBar component as a prop
      />

      <AnalyticsFourCards
        up={up}
        chartOptions={chartOptions}
        percentage={percentage}
        donutChartOptions={donutChartOptions}
      />

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
            backgroundColor: '#0B2E4E', // No need for template literals

          }}>Boost Sales</Button>
        </CardContent>
      </Card>


      {/* Best Selling */}
      <BestSelling
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        donutBestSellingChartOptions={donutBestSellingChartOptions}
        donutBestSellingChartSeries={donutBestSellingChartSeries}
        chartOptions={chartOptions}
      />


      <Box sx={{ py: 3, minHeight: "100vh" }}>
        <Grid container spacing={3}>

          {/* Recent Event List */}
          <Grid item xs={12} md={8}>
            {/* Recent event list */}
            {isDesktop && (
              <Card>
                <CardContent>
                  <Typography variant="h6" color={theme.palette.primary.main} gutterBottom>
                    Recent Event List
                  </Typography>
                  <Grid container spacing={3}>
                    {eventList.map((event) => (
                      <Grid item xs={12} key={event._id}>
                        <Card sx={{ display: "flex", padding: 2, boxShadow: 3, borderRadius: 2 }}>
                          <CardMedia component="img" image={event.img} alt={event.name} sx={{ width: 100, height: 85, borderRadius: 2 }} />
                          <CardContent sx={{ flex: 1, pt: 0 }}>
                            <Typography variant="h6" color={theme.palette.primary.main} sx={{ fontWeight: 500 }}>
                              {event.name}
                            </Typography>
                            <Typography variant="body2" color={theme.palette.common.black}>
                              {event.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                              {`${event.description.split(" ").slice(0, 5).join(" ")}...`}
                            </Typography>
                          </CardContent>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton color="primary">
                                  <Iconify width={20} icon="gg:dollar" />
                                </IconButton>
                              </Avatar>
                              <Typography color="primary" fontSize={12}>{event.cost}</Typography>
                            </Stack>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton sx={{ color: event.stock === "0" ? "black" : "primary" }}>
                                  <Iconify width={20} icon="ix:ticket-filled" />
                                </IconButton>
                              </Avatar>
                              <Typography fontSize={12} sx={{ color: event.stock === "0" ? "black" : "#007bff" }}>
                                {event.stock === "0" ? "SOLD OUT" : `${event.stock} pcs Left`}
                              </Typography>
                            </Stack>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton color="primary">
                                  <Iconify width={20} icon="simple-line-icons:calender" />
                                </IconButton>
                              </Avatar>
                              <Typography fontSize={12} color="primary">{event.Date}</Typography>
                            </Stack>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: '#0B2E4E' }}>
                    Load More
                  </Button>
                </CardContent>
              </Card>
            )}

            {isMobileTablet && (
              <Card>
                <CardContent>
                  <Typography variant="h6" color={theme.palette.primary.main} gutterBottom>
                    Recent Event List
                  </Typography>
                  <Grid container spacing={3}>
                    {eventList.map((event) => (
                      <Grid item xs={12} key={event._id}>
                        <Card sx={{ display: "flex", flexDirection: "column", padding: 2, boxShadow: 3, borderRadius: 2 }}>

                          {/* Image Section */}
                          <CardMedia component="img" image={event.img} alt={event.name} sx={{ width: "100%", height: 120, borderRadius: 2, objectFit: "cover" }} />

                          {/* Content Section */}
                          <CardContent sx={{ textAlign: "center", pt: 1 }}>
                            <Typography variant="h6" color={theme.palette.primary.main} sx={{ fontWeight: 500 }}>
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
                          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 2, mt: 2 }}>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton color="primary">
                                  <Iconify width={20} icon="gg:dollar" />
                                </IconButton>
                              </Avatar>
                              <Typography color="primary" fontSize={12}>{event.cost}</Typography>
                            </Stack>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton sx={{ color: event.stock === "0" ? "black" : "primary" }}>
                                  <Iconify width={20} icon="ix:ticket-filled" />
                                </IconButton>
                              </Avatar>
                              <Typography fontSize={12} sx={{ color: event.stock === "0" ? "black" : "#007bff" }}>
                                {event.stock === "0" ? "SOLD OUT" : `${event.stock} pcs Left`}
                              </Typography>
                            </Stack>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton color="primary">
                                  <Iconify width={20} icon="simple-line-icons:calender" />
                                </IconButton>
                              </Avatar>
                              <Typography fontSize={12} color="primary">{event.Date}</Typography>
                            </Stack>
                          </Box>

                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: '#0B2E4E' }}>
                    Load More
                  </Button>
                </CardContent>
              </Card>
            )}

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
import { useEffect, useState } from 'react';
import { useMediaQuery, ToggleButtonGroup, List, Avatar, ListItemText, IconButton, ListItem, MenuItem, Box, Grid, Button, Card, CardContent, Typography, Select, Stack, ListItemAvatar, Divider, CardMedia, ToggleButton, LinearProgress, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from "react-calendar";
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import "react-calendar/dist/Calendar.css";
import "../CustomCalendar.css"; // Custom styling for event indicators

import { DashboardContent } from 'src/layouts/dashboard';
import { Chart } from "src/components/chart";
import { Iconify } from 'src/components/iconify';
import { PageTitleSection } from 'src/components/page-title-section';
import { recommTrandingPopularEventFetch } from 'src/redux/actions/home-recommendation.action';
import { AppDispatch, RootState } from 'src/redux/store';
import { truncateText } from 'src/hooks/description-cutting';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

import { CountDownView } from '../count-down';
import { latestSales, salesRevenuChartSeries, salesRevenuChartOptions, donutBestSellingChartSeries, donutBestSellingChartOptions, chartrevenuOptions, chartrevenuSeries, chartOptions, donutChartOptions } from "../utils";
import { AnalyticsFourCards } from '../analytics-four-card';
import { BestSelling } from '../best-selling';

function getDayNumber(dateString: any) {
  // Method 1: Fastest (string manipulation)
  return dateString.split('-')[2];
}

function getDayName(dateString: string): string {
  const date = new Date(dateString);

  // Use Number.isNaN instead of global isNaN
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Returns full day name (e.g., "Saturday")
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function OverviewAnalyticsView() {
  const { upcomingEvents, latestEvents } = useSelector((state: RootState) => state?.homeRecom);
  const dispatch = useDispatch<AppDispatch>();
  const eventDates = latestEvents?.map((event: any) => new Date(event.date).toDateString());

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTicket, setSelectedTicket] = useState("VIP");
  const [selectedTab, setSelectedTab] = useState(0);
  const [ticketType, setTicketType] = useState("VIP");
  const [timeframe, setTimeframe] = useState("monthly");
  const theme = useTheme();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down("sm")); // Show mobile/tablet view
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // Show desktop view
  const up = true;
  const percentage = 75;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch(recommTrandingPopularEventFetch());
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, [dispatch]);

  return (
    <DashboardContent>
      <PageTitleSection
        title="Dashboard"
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
                  <HeadingCommon variant="h5" color="text.secondary" baseSize="20px" title="Recent Event List" />
                  {/* Loading/Empty State */}
                  {!upcomingEvents && (
                    <Box textAlign="center" py={4}>
                      <CircularProgress size={24} />
                    </Box>
                  )}
                  {upcomingEvents?.length === 0 && (
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="text.secondary"
                      sx={{ py: 3 }}
                    >
                      No events found
                    </Typography>
                  )}
                  <Grid container spacing={3}>
                    {upcomingEvents?.slice(0, 3).map((event: any) => (
                      <Grid item xs={12} key={event._id}>
                        <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                          <HeadingCommon variant="h6" color={theme.palette.primary.main} baseSize="20px" title={event.eventName} />

                          <Box display="flex" mt={1}>
                            <CardMedia component="img" image={event?.coverImage?.url} alt={event.eventName} sx={{ width: 150, height: 85, borderRadius: 2 }} />
                            <CardContent sx={{ flex: 1, pt: 0 }}>
                              <Typography variant="body2" color={theme.palette.common.black}>
                                {event.location}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" >
                                {ReactHtmlParser(truncateText(event?.description))}
                              </Typography>
                            </CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Stack alignItems="center" spacing={0.5}>
                                <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                  <IconButton color="primary">
                                    <Iconify width={20} icon="ep:sold-out" />
                                  </IconButton>
                                </Avatar>
                                <Typography color="primary" fontSize={12}>{event.soldTicket || 0} Sold</Typography>
                              </Stack>
                              <Stack alignItems="center" spacing={0.5}>
                                <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                  <IconButton sx={{ color: "primary" }}>
                                    <Iconify width={20} icon="ix:ticket-filled" />
                                  </IconButton>
                                </Avatar>
                                <Typography fontSize={12} color="primary">
                                  {event.ticketQuantity === "0"
                                    ? "Unlimited"
                                    : `${Number(event.ticketQuantity)} pcs`}
                                </Typography>
                              </Stack>
                              <Stack alignItems="center" spacing={0.5}>
                                <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                  <IconButton color="primary">
                                    <Iconify width={20} icon="simple-line-icons:calender" />
                                  </IconButton>
                                </Avatar>
                                <Typography fontSize={12} color="primary">{event.date}</Typography>
                              </Stack>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  {/* Conditionally show "Load More" only if 4+ events exist */}
                  {upcomingEvents?.length >= 4 && (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: '#0B2E4E' }}
                    >
                      Load More
                    </Button>
                  )}
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
                    {upcomingEvents.slice(0, 3).map((event: any) => (
                      <Grid item xs={12} key={event._id}>
                        <Card sx={{ display: "flex", flexDirection: "column", padding: 2, boxShadow: 3, borderRadius: 2 }}>

                          {/* Image Section */}
                          <CardMedia component="img" image={event.coverImage.url} alt={event.eventName} sx={{ width: "100%", height: 120, borderRadius: 2, objectFit: "cover" }} />

                          {/* Content Section */}
                          <CardContent sx={{ textAlign: "center", pt: 1 }}>
                            <Typography variant="h6" color={theme.palette.primary.main} sx={{ fontWeight: 500 }}>
                              {event.eventName}
                            </Typography>
                            <Typography variant="body2" color={theme.palette.common.black}>
                              {event.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                              {ReactHtmlParser(truncateText(event?.description))}
                            </Typography>
                          </CardContent>

                          {/* Icons Section */}
                          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 2, mt: 2 }}>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton color="primary">
                                  <Iconify width={20} icon="ep:sold-out" />
                                </IconButton>
                              </Avatar>
                              <Typography color="primary" fontSize={12}>{event.soldTicket || 0} Sold</Typography>

                            </Stack>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton sx={{ color: "primary" }}>
                                  <Iconify width={20} icon="ix:ticket-filled" />
                                </IconButton>
                              </Avatar>
                              <Typography fontSize={12} color="primary">
                                {Number(event.ticketQuantity)} total pcs
                              </Typography>
                            </Stack>
                            <Stack alignItems="center" spacing={0.5}>
                              <Avatar sx={{ bgcolor: "#f0f8ff" }}>
                                <IconButton color="primary">
                                  <Iconify width={20} icon="simple-line-icons:calender" />
                                </IconButton>
                              </Avatar>
                              <Typography fontSize={12} color="primary">{event.date}</Typography>
                            </Stack>
                          </Box>

                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Link to='/our-event' target='__blank'>
                    <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: '#0B2E4E' }}>
                      Load More
                    </Button>
                  </Link>

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
                    const dateString = date.toDateString();

                    // Highlight if the date is in eventDates and not today
                    if (eventDates?.includes(dateString) && dateString !== today) {
                      return "highlight";
                    }
                    return null;
                  }}
                />
              </Box>

              <CardContent>
                <HeadingCommon variant="h5" color="text.secondary" baseSize="20px" title="Upcoming Events" />


                {!latestEvents || latestEvents.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                      color: "text.secondary"
                    }}
                  >
                    <Typography variant="h6">No events found</Typography>
                  </Box>
                ) : (
                  latestEvents.slice(0, 3).map((event: any) => (
                    <Box
                      key={event._id}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      sx={{
                        marginBottom: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        textAlign: { xs: "center", sm: "left" },
                        width: "100%"
                      }}
                    >
                      {/* Date Circle */}
                      <Box
                        sx={{
                          backgroundColor: "#F5FCFA",
                          borderRadius: 1,
                          p: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <HeadingCommon variant="h5" baseSize="28px" weight={600} title={getDayNumber(event.date)} />
                        <HeadingCommon variant="h5" color="text.secondary" baseSize="14px" title={getDayName(event.date)} />

                        <Avatar sx={{ width: 12, height: 12, bgcolor: "navy", mt: 1 }} />
                      </Box>

                      {/* Event Details */}
                      <Box sx={{ width: "100%" }}>
                        <HeadingCommon variant="h5" color="text.secondary" baseSize="14px" title={event.eventName} />
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
                            {event.soldTicket || 0}/{event.ticketQuantity === '0' ? 'Unlimited' : event.ticketQuantity}
                          </Typography>
                        </Box>

                        <Box display="flex" justifyContent={{ xs: "center", sm: "flex-start" }}>
                          <LinearProgress
                            variant="determinate"
                            value={((event?.soldTicket ?? 0) / (event?.ticketQuantity ?? 1)) * 100}
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
                  ))
                )}
              </CardContent>
            </Card>

          </Grid>

        </Grid>
      </Box>

    </DashboardContent>
  );
}
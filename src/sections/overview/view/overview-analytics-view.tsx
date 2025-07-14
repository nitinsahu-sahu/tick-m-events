import { useEffect, useState } from 'react';
import {
  useMediaQuery, List, Avatar, ListItemText, IconButton, ListItem, MenuItem, Box,
  Grid, Button, Card, CardContent, Typography, Select, Stack, ListItemAvatar,
  Divider, CardMedia, ToggleButton, LinearProgress, CircularProgress, SelectChangeEvent
} from '@mui/material';
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
import { AppDispatch, RootState } from 'src/redux/store';
import { truncateText } from 'src/hooks/description-cutting';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { EventBreadCrum } from 'src/sections/entry-validation/event-status';
import { fetchLatestSales, recommTrandingPopularEventFetch } from 'src/redux/actions/home-recommendation.action';

import { CountDownView } from '../count-down';
import {
  donutBestSellingChartSeries, donutBestSellingChartOptions, chartrevenuSeries,
  chartOptions, donutChartOptions, getChartOptions, TicketTypes,
  TimePeriod, ChartData, ticketSalesData
} from "../utils";
import { AnalyticsFourCards } from '../analytics-four-card';
import { BestSelling } from '../best-selling';
import { WalletBalance } from '../wallet-revenue';

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
  const { upcomingEvents, latestEvents, latestSales } = useSelector((state: RootState) => state?.homeRecom);
  const eventDates = latestEvents?.map((event: any) => new Date(event.date).toDateString());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [ticketType, setTicketType] = useState<TicketTypes>('VIP');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly');
  const [chartData, setChartData] = useState<ChartData>({
    series: [{ name: 'Sales', data: [] }],
    options: getChartOptions([])
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTicket, setSelectedTicket] = useState("VIP");
  const theme = useTheme();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down("sm")); // Show mobile/tablet view
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // Show desktop view
  const up = true;
  const percentage = 75;

  const handleEventSelect = (event: Event | null) => {
    setSelectedEvent(event);
    // Do something with the selected event data
  };

  useEffect(() => {
    dispatch(recommTrandingPopularEventFetch());
    dispatch(fetchLatestSales());
  }, [dispatch]);



  // Generate appropriate x-axis categories based on time period
  const getCategories = (period: TimePeriod): string[] => {
    switch (period) {
      case 'daily':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'weekly':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'];
      case 'monthly':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
      default:
        return [];
    }
  };

  // Update chart when filters change
  useEffect(() => {
    const data = ticketSalesData[ticketType][timePeriod];
    const categories = getCategories(timePeriod);

    setChartData({
      series: [{ name: 'Sales', data }],
      options: getChartOptions(categories)
    });
  }, [ticketType, timePeriod]);

  // Event handlers with proper typing
  const handleTicketTypeChange = (event: SelectChangeEvent<TicketTypes>) => {
    setTicketType(event.target.value as TicketTypes);
  };

  const handleTimePeriodChange = (event: SelectChangeEvent<TimePeriod>) => {
    setTimePeriod(event.target.value as TimePeriod);
  };
  return (
    <DashboardContent>
      <EventBreadCrum events={upcomingEvents} onEventSelect={handleEventSelect} />

      <PageTitleSection
        title="Dashboard"
        rightCom={<CountDownView selectedEvent={selectedEvent} />} // Passing SearchBar component as a prop
      />

      <AnalyticsFourCards
        up={up}
        chartOptions={chartOptions}
        percentage={percentage}
        donutChartOptions={donutChartOptions}
      />

      <WalletBalance />

      {/* Best Selling */}
      <BestSelling
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
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

                  {upcomingEvents?.length === 0 && (
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="text.secondary"
                      sx={{ py: 3 }}
                    >
                      No upcoming events found
                    </Typography>
                  )}
                  <Grid container spacing={3}>
                    {
                      upcomingEvents?.slice(0, 3).map((event: any) => (
                        <Grid item xs={12} key={event._id}>
                          <Link to={`/our-event/${event._id}`} target='__blank' style={{textDecoration:"none"}}>

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
                          </Link>

                        </Grid>
                      ))
                    }
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
                    {upcomingEvents?.slice(0, 3)?.map((event: any) => (
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
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Latest Sales
                </Typography>
                {latestSales?.length > 0 ? (
                  latestSales?.slice(0, 4)?.map((list: any, index: any) => (
                    <List key={index} sx={{ pt: "0px", px: 0 }}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src={list.user.avatar?.url}
                            sx={{ width: 40, height: 40 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ textTransform: "capitalize" }}
                          primary={list.user.name}
                          secondary={`Purchased ${list.eventName} tickets`}
                        />
                      </ListItem>
                      <Divider />
                    </List>
                  ))
                ) : (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 100
                  }}>
                    <Typography variant="body1" color="textSecondary">
                      No ticket purchases yet
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
            <Card sx={{ mt: 3 }}>
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
                      onChange={handleTicketTypeChange}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      {Object.keys(ticketSalesData).map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                  <Stack direction="row" alignItems="center" mt={3} spacing={1}>
                    <Typography variant="body2">Time Period:</Typography>
                    <Select
                      value={timePeriod}
                      onChange={handleTimePeriodChange}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </Stack>
                </Stack>

                {/* Chart */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={250}
                    width="100%"
                  />
                </Box>
              </CardContent>
            </Card>
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
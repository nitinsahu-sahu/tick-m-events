import { useEffect, useState } from 'react';
import {
  useMediaQuery, SelectChangeEvent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import "react-calendar/dist/Calendar.css";
import "../CustomCalendar.css"; // Custom styling for event indicators
import { fatchOrgEvents } from 'src/redux/actions/organizer/pageEvents';
import { DashboardContent } from 'src/layouts/dashboard';
import { PageTitleSection } from 'src/components/page-title-section';
import { AppDispatch, RootState } from 'src/redux/store';
import { EventBreadCrum } from 'src/sections/entry-validation/event-status';
import { fetchLatestSales, recommTrandingPopularEventFetch } from 'src/redux/actions/home-recommendation.action';

import { CountDownView } from '../count-down';
import {
  donutBestSellingChartSeries, donutBestSellingChartOptions,
  chartOptions, donutChartOptions, getChartOptions, TicketTypes,
  TimePeriod, ChartData, ticketSalesData
} from "../utils";
import { AnalyticsFourCards } from '../analytics-four-card';
import { BestSelling } from '../best-selling';
import { WalletBalance } from '../wallet-revenue';
import { RecentEventList } from '../recent-event-list';

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
  const { __events } = useSelector((state: RootState) => state?.organizer);
  const eventDates = latestEvents?.map((event: any) => new Date(event.date).toDateString());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [ticketType, setTicketType] = useState<TicketTypes>('VIP');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly');
  const [chartData, setChartData] = useState<ChartData>({
    series: [{ name: 'Sales', data: [] }],
    options: getChartOptions([])
  });
  const currentDate = new Date()
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
    dispatch(fatchOrgEvents());
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
    <>
      <EventBreadCrum events={__events} onEventSelect={handleEventSelect} />

      <DashboardContent>

        <PageTitleSection
          title="Dashboard"
          rightCom={<CountDownView selectedEvent={selectedEvent} />} // Passing SearchBar component as a prop
        />

        <AnalyticsFourCards
          up={up}
          chartOptions={chartOptions}
          percentage={percentage}
          donutChartOptions={donutChartOptions}
          selectedEvent={selectedEvent}
        />

        <WalletBalance selectedEvent={selectedEvent} />


        {/* Best Selling */}
        <BestSelling
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          donutBestSellingChartOptions={donutBestSellingChartOptions}
          donutBestSellingChartSeries={donutBestSellingChartSeries}
          chartOptions={chartOptions}
          selectedEvent={selectedEvent}
        />

        <RecentEventList
          isDesktop={isDesktop}
          isMobileTablet={isMobileTablet}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          timePeriod={timePeriod}
          handleTimePeriodChange={handleTimePeriodChange}
          upcomingEvents={upcomingEvents}
          latestSales={latestSales}
          latestEvents={latestEvents}
          currentDate={currentDate}
          eventDates={eventDates}
          getDayNumber={getDayNumber}
          getDayName={getDayName}
          selectedEvent={selectedEvent}
        />

      </DashboardContent>
    </>

  );
}
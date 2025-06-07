import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useSelector } from 'react-redux';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { MatrixThreeCard } from 'src/components/matrix-three-cards/matrix-three-cards';
import { RootState } from 'src/redux/store';

import { TicketHistoryCancelRefundCard } from '../t-h-c-r';
import { TicketCard } from '../ticket-card';
import axios from "../../../redux/helper/axios";

interface EventDetails {
  eventName: string;
  date: string;
}

interface TicketItem {
  ticketType: string;
}

// You can reuse this for each ticket in the list
interface Ticket {
  eventDetails?: EventDetails;
  tickets: TicketItem[];
  qrCode: string;
  verifyEntry: string;
}

export function TicketManagementView() {
  const [activeTab, setActiveTab] = useState('Active Tickets');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { _id } = useSelector((state: RootState) => state?.auth?.user);
  const [upcomingQrTicket, setUpcomingQrTicket] = useState<Ticket | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get(`/event-order/user/${_id}`);
        const allTickets: Ticket[] = response.data;
        setTickets(allTickets);

        const upcomingTicket = allTickets
          .filter(ticket => {
            const dateStr = ticket.eventDetails?.date;
            const eventDate = dateStr ? new Date(dateStr) : null;
            return eventDate !== null &&
              !Number.isNaN(eventDate.getTime()) &&
              eventDate > new Date() &&
              ticket.qrCode;
          })
          .sort((a, b) => {
            const dateA = new Date(a.eventDetails?.date || '');
            const dateB = new Date(b.eventDetails?.date || '');
            return dateA.getTime() - dateB.getTime();
          })[0];

        setUpcomingQrTicket(upcomingTicket || null);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }

    if (_id) {
      fetchTickets();
    }
  }, [_id]);

  const now = new Date();

  const activeCount = tickets.filter(ticket => {
    if (!ticket.eventDetails?.date) return false;
    const eventDate = new Date(ticket.eventDetails.date);
    return eventDate > now;
  }).length;

  const expiredCount = tickets.filter(ticket => {
    if (!ticket.eventDetails?.date) return false;
    const eventDate = new Date(ticket.eventDetails.date);
    return eventDate <= now;
  }).length;

  const metrics = [
    { title: 'Total', value: (tickets?.length ?? 0).toString() },
    { title: 'Active', value: (activeCount ?? 0).toString() },
    { title: 'Refunded', value: '2' }, // Replace with real data when available
    { title: 'Expired', value: (expiredCount ?? 0).toString() },
  ];

  const ticketHistory = [
    {
      title: 'Urban Music Festival',
      date: '10/02/2024',
      type: 'VIP',
      status: 'Used',
      statusColor: 'green',
      button: ['Download Invoice', 'Leave a Review'],
    },
    {
      title: 'Urban Music Festival',
      date: '10/02/2024',
      type: 'VIP',
      status: 'Expired',
      statusColor: 'red',
      button: ['Download Invoice', 'Leave a Review'],
    },
  ];

  const cancelAndRefund = [
    {
      title: 'Urban Music Festival',
      date: '10/02/2024',
      type: 'VIP',
      money: '',
      status: 'In Progress',
      statusColor: 'green',
      btnColor: '#0B2E4C',
      button: ['Request Refund'],
    },
    {
      title: 'Startup Summit 2025',
      date: '15/04/2025',
      type: 'Standard',
      money: '1000 XAF',
      status: 'Denied',
      statusColor: 'red',
    },
  ];

  const tabNames = ['Active Tickets', 'History', 'Cancellations & Refunds'];

  return (
    <DashboardContent>
      <PageTitleSection title="Ticket Management" />

      {/* Tabs */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { md: 'center' },
              flexWrap: { xs: 'nowrap', sm: 'wrap' },
              overflowX: { xs: 'auto', sm: 'visible' },
              gap: 2,
              pb: 1,
            }}
          >
            {tabNames.map((text) => (
              <Button
                key={text}
                variant="contained"
                onClick={() => handleTabChange(text)}
                sx={{
                  backgroundColor: activeTab === text ? '#0B2E4C' : '#818181',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  minWidth: '150px',
                  '&:hover': {
                    backgroundColor: activeTab === text ? '#0B2E4C' : '#818181',
                  },
                }}
              >
                {text}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>

      <MatrixThreeCard metrics={metrics} sm={3} md={3} />

      {/* Conditionally Render Each Tab Section */}
      {activeTab === 'Active Tickets' && (
        <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            mb={3}
            fontSize={{ xs: '20px', sm: '26px', md: '34px' }}
          >
            My Active Tickets
          </Typography>

          {tickets?.length > 0 ? (
            <Grid container spacing={3} mt={3}>
              {tickets.slice(0, 2).map((ticketc, index) => (
                <Grid item xs={12} sm={6} md={6} key={index} mb={6}>
                  <TicketCard ticket={ticketc} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary" mt={2}>
              You don&apos;t have any active tickets.
            </Typography>
          )}
        </Box>
      )}


      {activeTab === 'History' && (
        <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            mb={3}
            fontSize={{ xs: '20px', sm: '26px', md: '34px' }}
          >
            Ticket History
          </Typography>
          <Grid container spacing={3}>
            {ticketHistory.map((ticket, index) => (
              <TicketHistoryCancelRefundCard
                key={index}
                items={ticket}
                index={index}
                type="Cancel"
              />
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 'Cancellations & Refunds' && (
        <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            mb={3}
            fontSize={{ xs: '20px', sm: '26px', md: '34px' }}
          >
            Cancellations & Refunds
          </Typography>
          <Grid container spacing={3}>
            {cancelAndRefund.map((ticket, index) => (
              <TicketHistoryCancelRefundCard
                key={index}
                items={ticket}
                index={index}
                type="Cancel"
              />
            ))}
          </Grid>

          <Grid container mt={3}>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize={{ xs: '16px', sm: '20px', md: '24px' }}
                  >
                    Refund Policy
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>Free cancellation up to 7 days before the event.</li>
                    <li>Partial refund (-20%) between 7 and 3 days before the event.</li>
                    <li>No refund after purchasing a ticket.</li>
                    <li>No refund if canceled within 48 hours of the event.</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* QR Code Section (Shown regardless of tab) */}
      {upcomingQrTicket && upcomingQrTicket.eventDetails ? (
        <Box boxShadow={3} borderRadius={3} mt={3} p={{ xs: 1, md: 3 }}>
          <Typography
            variant="h5"
            fontWeight={600}
            mb={3}
            fontSize={{ xs: '20px', sm: '26px', md: '34px' }}
          >
            QR Code & Ticket Validation
          </Typography>
          <Box display="flex" justifyContent="center">
            <Card
              sx={{
                width: { xs: '100%', sm: '400px', md: '450px', lg: '500px' },
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={600}
                  fontSize={{ xs: '18px', sm: '22px', md: '26px' }}
                >
                  {upcomingQrTicket.eventDetails.eventName}
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                  {upcomingQrTicket.eventDetails.date} - {upcomingQrTicket.tickets?.[0]?.ticketType}
                </Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#0a2540', color: '#fff' }}>
                  <img
                    src={upcomingQrTicket.qrCode}
                    alt="QR Code"
                    style={{ width: 180, height: 180, marginBottom: 16 }}
                  />
                </Button>
              </Box>
            </Card>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'red', color: '#fff', fontWeight: 'bold' }}
            >
              {upcomingQrTicket?.verifyEntry ? 'Valid' : 'Pending Validation'}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <Typography variant="h6" color="text.secondary" fontWeight="500" textAlign="center">
            <QrCodeIcon sx={{ fontSize: 100, mb: 1 }} />
            No upcoming event
          </Typography>
        </Box>
      )}
    </DashboardContent>
  );
}
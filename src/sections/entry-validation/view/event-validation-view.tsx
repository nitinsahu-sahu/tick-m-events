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
  useTheme,
  useMediaQuery
} from "@mui/material";
import Chart from "react-apexcharts";

import { Iconify } from "src/components/iconify";
import { DashboardContent } from "src/layouts/dashboard";
import { PageTitleSection } from "src/components/page-title-section";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { EventValidationTable } from "src/components/tables/event-validation-table";

import { CHART_OPTIONS, CHART_SERIES, entries, entryValidationData, entryValidationHeaders, STATS_DATA, TICKET_STATUS, tickets } from "../utills";

export function EventValidationView() {
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Example ticket data


  const filteredEntries = entries.filter(entry =>
    entry.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderTicketDetails = (ticket: typeof tickets[0]) => {
    const details = [
      { label: "Entry Time", value: ticket.time },
      { label: "Name", value: ticket.name },
      { label: "Email", value: ticket.email },
      { label: "Ticket Type", value: ticket.ticketType },
      { label: "Status", value: ticket.status }
    ];

    return (
      <>
        {details.map((detail) => (
          detail.value && (
            <Typography key={detail.label} variant="body2">
              <strong>{detail.label}:</strong> {detail.value}
            </Typography>
          )
        ))}
      </>
    );
  };

  function renderActionButtons() {

    return (
      <Box
        display="flex"
        justifyContent="space-between"
        my={1}
        flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
        gap={{ xs: 2, sm: 0, md: 0 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "green",
            color: "white",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "darkgreen" },
            width: { xs: '100%', sm: 'auto', md: 'auto' }
          }}
        >
          Confirm Entry
        </Button>

        <Box
          display="flex"
          alignItems="center"
          width={{ xs: '100%', sm: 'auto', md: 'auto' }}
          gap={1}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "darkred" },
              width: { xs: '100%', sm: 'auto', md: 'auto' }
            }}
          >
            Cancel
          </Button>
          <IconButton sx={{ ml: 1 }}>
            <Iconify icon="mdi:information-outline" />
          </IconButton>
        </Box>
      </Box>
    );
  };
  const renderSectionBox = (children: React.ReactNode, mt = 4) => (
    <Box
      sx={{
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#fff",
        mt
      }}
    >
      {children}
    </Box>
  );

  return (
    <DashboardContent>
      <PageTitleSection
        title="Entry Validation (QR Code Scan)"
        desc="Lorem ipsum dolor sit amet"
      />

      {/* Ticket Scanner Section */}
      {renderSectionBox(
        <>
          <HeadingCommon title="Ticket Scanner" color="#0B2E4C" weight={600} baseSize="33px" />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.blue.dark,
                color: "#fff",
                width: "100%"
              }}
            >
              <Iconify icon="mdi:barcode-scan" width={20} height={20} /> Add a Ticket
            </Button>
          </Box>

          <Box display="flex" mt={2} gap={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Scan a Ticket"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ borderRadius: "8px" }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0B2A4A",
                color: "white",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#0A1E36" }
              }}
            >
              Verify
            </Button>
          </Box>

          <Grid container spacing={2} mt={2}>
            {tickets.map(ticket => (
              <Grid item xs={12} key={ticket.id}>
                <Card
                  sx={{
                    backgroundColor: TICKET_STATUS[ticket.status].backgroundColor,
                    borderRadius: "12px",
                    padding: "12px",
                    border: "2px solid #ddd",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <CardContent>
                    <HeadingCommon title={ticket.message} baseSize="23px" width={{ md: "34%" }} />
                    {renderActionButtons()}

                    {ticket.status === "ACCEPTED" && renderTicketDetails(ticket)}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>,
        0 // No margin top for first section
      )}

      {/* Ticket Code Section */}
      {renderSectionBox(
        <>
          <HeadingCommon title="Enter Ticket Code" color="#0B2E4C" weight={600} baseSize="33px" />

          <Grid container spacing={2} alignItems="flex-start">
            {/* Enter Ticket Code */}
            <Grid item xs={12} sm={6} md={4}>
              <HeadingCommon
                variant="subtitle1"
                title="Enter Ticket Code"
                weight={400}
                baseSize="16px"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="583-356"
                size="small"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 1.5,
                  mb: { xs: 2, sm: 0 },
                  backgroundColor: "#0B2A4A",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  height: "40px"
                }}
              >
                Verify
              </Button>
            </Grid>

            {/* Search for Participant */}
            <Grid item xs={12} sm={6} md={4}>
              <HeadingCommon
                variant="subtitle1"
                title="Search for a Participant"
                weight={400}
                baseSize="16px"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Participant ID"
                size="small"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 1.5,
                  mb: { xs: 2, sm: 0 },
                  backgroundColor: "#0B2A4A",
                  color: "white",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  height: "40px"
                }}
              >
                Validate Entry
              </Button>
            </Grid>

            {/* Participant Name */}
            <Grid item xs={12} sm={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Participant Name"
                size="small"
                sx={{
                  mt: { xs: 0, sm: 3.6 },
                  mb: { xs: 2, md: 0 }
                }}
              />
            </Grid>
          </Grid>
        </>
      )}

      {/* Entry List Section */}
      {renderSectionBox(
        <>
          <HeadingCommon title="Entry List View" color="#0B2E4C" weight={600} baseSize="33px" />

          <TextField fullWidth variant="outlined" placeholder="Search by Name" sx={{ mb: 2 }} />

          <EventValidationTable headers={entryValidationHeaders} data={entryValidationData} />

          <Box display="flex" gap={2} mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0B2A4A",
                color: "white",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none"
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
                textTransform: "none"
              }}
            >
              Download as Excel
            </Button>
          </Box>
        </>
      )}

      {/* Statistics Section */}
      {renderSectionBox(
        <>
          <HeadingCommon title="Real-Time Statistics" color="#0B2E4C" weight={600} baseSize="33px" />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {STATS_DATA.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Button
                  fullWidth
                  sx={{
                    backgroundColor: "#0B2A4A",
                    padding: {
                      xs: "12px",  // Smaller padding on mobile
                      sm: "15px"   // Standard padding on larger screens
                    },
                    borderRadius: "8px",
                    textAlign: "center",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,        // Space between label and value
                    minHeight: {
                      xs: "80px",  // Compact on mobile
                      sm: "auto"   // Natural height on larger screens
                    },
                    '&:hover': {
                      backgroundColor: "#0A1E36" // Darker shade on hover
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight="bold" sx={{
                    fontSize: {
                      xs: "0.875rem",  // Slightly smaller on mobile
                      sm: "1rem"       // Standard size on larger screens
                    }
                  }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{
                    fontSize: {
                      xs: "1.25rem",  // Smaller on mobile
                      sm: "1.5rem"    // Standard size on larger screens
                    }
                  }}>
                    {stat.value}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>

          <Paper
            sx={{
              mt: 2,
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <HeadingCommon title="Entry Data Visualization" baseSize="33px" />
            <Chart
              options={CHART_OPTIONS}
              series={CHART_SERIES}
              type="pie"
              height={isMobile ? 280 : 320}
            />
          </Paper>
        </>
      )}

      {/* Offline Mode Section */}
      {renderSectionBox(
        <>
          <HeadingCommon title="Offline Mode (PWA)" color="#0B2E4C" weight={600} baseSize="33px" />

          <Typography variant="body1">
            <strong>Status:</strong>{" "}
            <span style={{ fontWeight: "bold", color: "#0B2A4A" }}>
              Online – Sync Enabled
            </span>
          </Typography>
          <Typography variant="body1">
            <strong>Stored Offline Entries:</strong> 0
          </Typography>
        </>
      )}
    </DashboardContent>
  );
}
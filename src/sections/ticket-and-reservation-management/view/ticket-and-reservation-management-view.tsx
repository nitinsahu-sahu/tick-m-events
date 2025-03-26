import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { PageTitleSection } from "src/components/page-title-section";
import { DashboardContent } from "src/layouts/dashboard";
import { SearchBar } from "../search-bar";



export function TicketAndReservationManagementView() {
  const theme = useTheme();

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
  return (
    <DashboardContent>
      <PageTitleSection
        title="Ticket & Reservation Management"
        desc="Lorem ipsum dolor sit amet"
        rightCom={<SearchBar />} // Passing SearchBar component as a prop
      />

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#2395D4"}}>
            <TableRow sx={{ backgroundColor: "#2395D4", color: "#fff" }}>
              {["Ticket Name", "Price", "Quantity Available", "Ticket Description", "Remaining Stock", "Actions"].map((header) => (
                <TableCell key={header} sx={{ color: "#fff", fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tickets.map((ticket, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0" }}>
                <TableCell sx={{ fontWeight: "bold" }}>{ticket.name}</TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" defaultValue={ticket.price} />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" defaultValue={ticket.quantity} />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" defaultValue={ticket.description} />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>{ticket.stock}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ backgroundColor: "#0e2d4d", color: "#fff", "&:hover": { backgroundColor: "#0b243d" } }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Ticket Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0e2d4d",
            color: "#fff",
            width: "250px",
            "&:hover": { backgroundColor: "#0b243d" },
          }}
        >
          Add a Ticket
        </Button>
      </Box>
    </DashboardContent>
  )
}
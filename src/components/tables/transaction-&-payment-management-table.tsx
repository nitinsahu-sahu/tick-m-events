import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  Paper,
  TableHead,
  TableCell,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function TransactionAndPaymentManagementTable({
  headers,
  data,
  type,
}: {
  headers: string[];
  type: string;
  data: any[];
}) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                align="center"
                sx={{
                  bgcolor: "#1F8FCD",
                  fontWeight: "bold",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  color: theme.palette.common.white,
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: "#e0e0e0",
                position: "relative",
                "&:not(:last-child)": {
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "96%",
                    borderBottom: "1px solid #C3C3C3",
                  },
                },
              }}
            >
              {/* Render only if type is "0" or "1" */}
              {(type === "0" || type === "1") && (
                <>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {row.date}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {row.requestedService}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {row.location}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {row.amount}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {row.commision}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {row.receivedAmount}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {row.paymentMethod}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: row.status === "Pending" ? "#F69809" : "#46B800",
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell align="center">
                    {row.actions?.map((action: string, idx: number) => (
                      <Button
                        key={idx}
                        variant={
                          action.trim() === "View Details" ||
                          action.trim() === "Download"
                            ? "contained"
                            : "outlined"
                        }
                        size="small"
                        sx={{
                          marginX: 0.5,
                          color:
                            action.trim() === "View Details" ||
                            action.trim() === "Download"
                              ? "white"
                              : "black",
                          borderColor: "gray",
                          backgroundColor:
                            action.trim() === "View Details" ||
                            action.trim() === "Download"
                              ? "#0B2E4C"
                              : "white",
                        }}
                      >
                        {action}
                      </Button>
                    ))}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

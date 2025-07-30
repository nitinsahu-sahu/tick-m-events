import {
    Typography,TableContainer, Table, TableRow, TableBody, Paper, TableHead, TableCell
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { formatEventDate, formatTimeToAMPM } from "src/hooks/formate-time";

const documentTypeLabels: Record<string, string> = {
  passport: "Passport",
  driving_license: "Driving License",
  national_id: "National ID",
};

export function KycDocVerificationTable({
    headers,
    data,
}: {
    headers: string[];
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
                    {data?.length < 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                <Typography variant="body1" color="textSecondary">
                                    No KYC Documents Found for Verification.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data?.map((row: any) => (
                            <TableRow key={row._id} sx={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #E1E1E1" }}>
                                {/* Your existing table cells */}
                                <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, fontWeight: "normal" }}>
                                    {row.user.name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, fontWeight: "normal" }}>
                                    {documentTypeLabels[row?.identityDocuments?.[0]?.type] || 'Unknown'}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, fontWeight: "normal" }}>
                                    {formatEventDate(row.updatedAt)}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, fontWeight: "normal" }}>
                                    abc
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: { xs: "0.8rem", sm: "1rem" }, fontWeight: "normal" }}>
                                    abc
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>
        </TableContainer>
    );
}

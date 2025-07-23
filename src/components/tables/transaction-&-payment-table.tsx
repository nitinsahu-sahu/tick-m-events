import { TableContainer, Table, TableRow, TableBody, Paper, TableHead, TableCell, Button, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useState } from "react";
import { PaymentHistoryModal } from "../modal/payment-history-model";

export function TransactionAndPaymentTable({ headers =[], data =[], type }: any) {
 
    const [open, setOpen] = useState({open: false, rowData: null});
    const theme = useTheme();
    
    return (
        <TableContainer component={Paper}>
            <Table>
                {/* Table Header */}
                <TableHead>
                    <TableRow sx={{ bgcolor: "#E1E1E1" }}>
                        {headers.map((header: string) => (
                            <TableCell
                                key={header}
                                sx={{
                                    textAlign:'center',
                                    fontWeight: "bold",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: theme.palette.common.black,
                                    backgroundColor: "#E1E1E1",
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {data.map((row: any, index: number) => (
                        <TableRow key={index} sx={{ backgroundColor: "#f5f5f5",borderBottom:"2px solid #E1E1E1" }}>
                            {Object.keys(row).map((key, idx) => (
                                <TableCell
                                    key={idx}
                                    sx={{
                                    textAlign:'center',

                                        fontSize: { xs: "0.8rem", sm: "1rem" },
                                        fontWeight: "normal",
                                        ...(key === 'status' && {
                                            color: 'white',
                                            fontWeight: 'bold',
                                            borderRadius: '4px',
                                            textAlign: 'center',
                                            ...(row[key] === 'Approved' && {
                                                color: '#4caf50',
                                            }),
                                            ...(row[key] === 'Rejected' && {
                                                color: '#f44336',
                                            }),
                                            ...(row[key] === 'Pending' && {
                                                color: '#ff9800',
                                            }),
                                        }),
                                    }}
                                >
                                    {key === "details" && type === "1" ? (
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#0B2E4E',
                                                color: theme.palette.common.white,
                                                "&:hover": { backgroundColor: "#0b243d" },
                                                fontSize: { xs: "0.7rem", sm: "1rem" },
                                                width: { xs: "100%", sm: "auto" }
                                            }}
                                            onClick={() => setOpen({ open: true, rowData: row })}
                                        >
                                            {row[key]}
                                        </Button>
                                    ) : key === "action" && type === "2" ? (
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {row[key].map((action: string, actionIdx: number) => (
                                                <Button
                                                    key={actionIdx}
                                                    variant="contained"
                                                    disabled={row.status === "Approved"}
                                                    sx={{
                                                        backgroundColor: action === 'Accept' 
                                                            ? theme.palette.success.main 
                                                            : theme.palette.error.main,
                                                        color: 'white',
                                                        "&:hover": { 
                                                            backgroundColor: action === 'Accept' 
                                                                ? theme.palette.success.dark 
                                                                : theme.palette.error.dark 
                                                        },
                                                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                                        px: 2,
                                                        textTransform: 'none'
                                                    }}
                                                >
                                                    {action}
                                                </Button>
                                            ))}
                                        </Box>
                                    ) : key === "action" && type === "3" ? (
                                        <Box sx={{ gap: 1 }}>
                                            {row[key].map((action: string, actionIdx: number) => (
                                                <Button
                                                    key={actionIdx}
                                                    variant="contained"
                                                    disabled={row.status === "Pending"}
                                                    sx={{
                                                        backgroundColor: action.includes('PDF') 
                                                            ? '#1C8BC8' // Red for PDF
                                                            : '#67C81C', // Green for Excel
                                                        color: 'white',
                                                        "&:hover": { 
                                                            backgroundColor: action.includes('PDF') 
                                                                ? '#c62828' // Darker red
                                                                : '#2e7d32' // Darker green
                                                        },
                                                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                                        px: 2,
                                                        textTransform: 'none',
                                                        minWidth: { xs: '100px', sm: '120px' }
                                                    }}
                                                    startIcon={
                                                        action.includes('PDF') 
                                                            ? <PictureAsPdfIcon /> 
                                                            : <GridOnIcon />
                                                    }
                                                >
                                                    {action}
                                                </Button>
                                            ))}
                                        </Box>
                                    ) : key === "action" && type === "5" ? (
                                        <Box sx={{ display: 'flex', gap: 1, justifyContent:"center"}}>
                                             {row.status !== 'Approved' && row[key].map((action: string, actionIdx: number) => (
                                                <Button
                                                    key={actionIdx}
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: action === 'Accept'
                                                            ? theme.palette.success.main
                                                            : theme.palette.error.main,
                                                        color: 'white',
                                                        "&:hover": {
                                                            backgroundColor: action === 'Accept'
                                                                ? theme.palette.success.dark
                                                                : theme.palette.error.dark
                                                        },
                                                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                                                        px: 2,
                                                        textTransform: 'none'
                                                    }}
                                                >
                                                    {action}
                                                </Button>
                                            ))}
 
                                        </Box>
                                    ):(
                                        row[key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>

                <PaymentHistoryModal
                    open={open.open}
                    rowData={open.rowData}
                    onClose={() => setOpen({ open: false, rowData: null })}
                />
            </Table>
        </TableContainer>
    );
}
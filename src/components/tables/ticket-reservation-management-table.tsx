import { TableContainer, Typography, CircularProgress, Table, TableRow, TableBody, Paper, TableHead, TableCell, Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { updateTicketType } from "src/redux/actions/ticket-&-reservation-management.action";
import { formatEventDate } from "src/hooks/formate-time";

interface ApiResult {
    status: number;
    type: string;
    message: any;
}

export function TicketReservationManagementTable({
    headers,
    data,
    type,
}: {
    headers: string[];
    type: string;
    data: any[];
}) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<any>({});
    const dispatch = useDispatch<AppDispatch>();

    const handleEditClick = (row: any) => {
        setEditingId(row._id);
        setEditedData({
            _id: row._id,
            price: row.price,
            quantity: row.quantity,
            ticketDescription: row.ticketDescription
        });
    };

    const handleFieldChange = (field: string, value: string) => {
        setEditedData({
            ...editedData,
            [field]: value
        });
    };

    const handleApplyClick = async () => {
        try {
            const result = await dispatch(updateTicketType({ editedData }));
            if ((result as ApiResult)?.status === 200) {

                toast.success(result.message);

                setEditingId(null);
                setEditedData({});
            }
        } catch (error) {
            toast.error(error.message);
        }
        // Reset editing state

    };

    // Only render if type is 1

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
                                    color: 'white',
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {!data || data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={headers.length} align="center" sx={{ py: 4 }}>
                                <CircularProgress size={15} />
                            </TableCell>
                        </TableRow>
                    ) : (
                        data?.map((row, index) => (
                            <TableRow key={row._id} sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0" }}>
                                <TableCell align="center" sx={{ fontWeight: "bold", textTransform: 'capitalize' }}>
                                    {row.name || row.userId.name}
                                </TableCell>
                                {
                                    type === "3" || type === "4" ? <TableCell align="center">
                                        {row.userId.email}
                                    </TableCell> : <TableCell align="center" >
                                        {editingId === row._id ? (
                                            <TextField
                                                value={editedData.price}
                                                onChange={(e) => handleFieldChange('price', e.target.value)}
                                                sx={{ width: '100px' }}
                                                size="small"
                                            />
                                        ) : (
                                            <span style={{ textTransform: row.price ? 'uppercase' : 'capitalize' }}>{row.price || row.email}</span>
                                        )}
                                    </TableCell>
                                }

                                {
                                    type === "3" || type === "4" ? (
                                        <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                            {row.tickets && row.tickets.length > 0
                                                ? row.tickets
                                                    .map((t: any) => t.ticketType)
                                                    .join(" | ")
                                                : "-"}
                                        </TableCell>
                                    ) : <TableCell align="center" >
                                        {editingId === row._id ? (
                                            <TextField
                                                value={editedData.quantity}
                                                onChange={(e) => handleFieldChange('quantity', e.target.value)}
                                                sx={{ width: '100px' }}
                                                size="small"
                                            />
                                        ) : (
                                            <span style={{ textTransform: 'capitalize' }}>{row.quantity || row.resrvationTicketType}</span>
                                        )}
                                    </TableCell>
                                }


                                {
                                    type === '3' || type === "4" ?
                                        <TableCell align="center">{formatEventDate(row.createdAt)}</TableCell> : <TableCell align="center" >
                                            {editingId === row._id ? (
                                                <TextField
                                                    value={editedData.ticketDescription}
                                                    onChange={(e) => handleFieldChange('ticketDescription', e.target.value)}
                                                    multiline
                                                    rows={3}
                                                    sx={{ width: '200px' }}
                                                    size="small"
                                                />
                                            ) : (
                                                type === "1" ? ReactHtmlParser(row?.ticketDescription) :
                                                    type === '3' || type === '4' ?
                                                        row.purchaseDate : row.quantity === "Unlimited" ?
                                                            row.quantity : parseInt(row.quantity, 10) - parseInt(row.sold || 0, 10)
                                            )}
                                        </TableCell>
                                }


                                {

                                    type === "3" || type === "4" ?
                                        <TableCell align="center" sx={{ textTransform: "capitalize" }} >{row.paymentStatus}</TableCell>
                                        :
                                        <TableCell align="center" >
                                            {type === "3" ?
                                                row.reservationStatus : type === "1" ? row.quantity === "Unlimited" ?
                                                    row.quantity : parseInt(row.quantity, 10) - parseInt(row.sold || 0, 10) :
                                                    `${row.sold === undefined ? 0 : row.sold}` || 0}
                                        </TableCell>
                                }

                                {type === "3" || type === '4' ? null : <TableCell align="center">
                                    {
                                        type === "1" ? editingId === row._id ? (
                                            <Button
                                                variant="contained"
                                                onClick={handleApplyClick}
                                                sx={{
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    "&:hover": {
                                                        backgroundColor: "#388E3C"
                                                    },
                                                    fontSize: { xs: "0.7rem", sm: "1rem" },
                                                    width: { xs: "100%", sm: "auto" },
                                                }}
                                            >
                                                Apply
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                onClick={() => handleEditClick(row)}
                                                sx={{
                                                    backgroundColor: '#0B2E4E',
                                                    color: 'white',
                                                    "&:hover": {
                                                        backgroundColor: "#0b243d"
                                                    },
                                                    fontSize: { xs: "0.7rem", sm: "1rem" },
                                                    width: { xs: "100%", sm: "auto" },
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        ) : <span>
                                            {row.price === "Free"
                                                ? row.price
                                                : `${parseInt(row.price, 10) * parseInt(row.sold || 0, 10)} XAF`
                                            }
                                        </span>
                                    }
                                </TableCell>}
                                {
                                    type === "4" ? <TableCell align="center">
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 1, // Adds 8px gap between buttons
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Button
                                                variant="contained"
                                                size="small" // Makes button smaller
                                                sx={{
                                                    backgroundColor: '#0B2E4E',
                                                    color: 'white',
                                                    "&:hover": {
                                                        backgroundColor: "#0b243d"
                                                    },
                                                    fontSize: { xs: "0.65rem", sm: "0.8rem" }, // Smaller font
                                                    padding: { xs: "4px 8px", sm: "6px 12px" }, // Tighter padding
                                                    minWidth: 'auto' // Allows button to shrink
                                                }}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    "&:hover": {
                                                        backgroundColor: "darkred" // Changed to darkred for better hover state
                                                    },
                                                    fontSize: { xs: "0.65rem", sm: "0.8rem" },
                                                    padding: { xs: "4px 8px", sm: "6px 12px" },
                                                    minWidth: 'auto'
                                                }}
                                            >
                                                Deny
                                            </Button>
                                        </Box>
                                    </TableCell> : null
                                }
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
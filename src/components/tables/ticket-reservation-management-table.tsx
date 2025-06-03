import { TableContainer, Typography, CircularProgress, Table, TableRow, TableBody, Paper, TableHead, TableCell, Button, TextField } from "@mui/material";
import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/redux/store";
import { updateTicketType } from "src/redux/actions/ticket-&-reservation-management.action";

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
        console.log('====================================');
        console.log(editedData);
        console.log('====================================');
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
                                    {row.name}
                                </TableCell>

                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {editingId === row._id ? (
                                        <TextField
                                            value={editedData.price}
                                            onChange={(e) => handleFieldChange('price', e.target.value)}
                                            sx={{ width: '100px' }}
                                            size="small"
                                        />
                                    ) : (
                                        <span style={{ textTransform: 'uppercase' }}>{row.price}</span>
                                    )}
                                </TableCell>

                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {editingId === row._id ? (
                                        <TextField
                                            value={editedData.quantity}
                                            onChange={(e) => handleFieldChange('quantity', e.target.value)}
                                            sx={{ width: '100px' }}
                                            size="small"
                                        />
                                    ) : (
                                        <span style={{ textTransform: 'capitalize' }}>{row.quantity}</span>
                                    )}
                                </TableCell>

                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
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
                                        type === "1" ? ReactHtmlParser(row?.ticketDescription) : parseInt(row.quantity,10) - parseInt(row.sold,10)
                                    )}
                                </TableCell>

                                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {row.sold || 0}
                                </TableCell>

                                <TableCell align="center">
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
                                        ) : row.price === "Free" ? row.price : parseInt(row.price, 10) * parseInt(row.sold, 10)
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

{/* <TableRow
    key={index}
    sx={{
        backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
    }}
>
    <TableCell align="center" sx={{ fontWeight: "bold" }}>
        {row.type || row.ticketType || row.name}
    </TableCell>

    {/* Conditionally Render based on type */}
// {
//     type === "1" ?
//         <>
//             {[row.price, row.total, row.remaining].map((value, i) => (
//                 <TableCell key={i} align="center">
//                     {value}
//                 </TableCell>
//             ))}
//         </>
//         :
//         type === "3" || type === "4" ?
//             <>
//                 {[row.email, row.resrvationTicketType, row.purchaseDate].map((value, i) => (
//                     <TableCell key={i} align="center">
//                         {value}
//                     </TableCell>
//                 ))}
//             </>
//             :
//             <>
//                 {[row.price, row.totalStock, row.remainingStock].map((value, i) => (
//                     <TableCell key={i} align="center">
//                         {value}
//                     </TableCell>
//                 ))}
//             </>
// }


// {
//     row.status ? (
//         <TableCell align="center">
//             {row.status}
//         </TableCell>
//     ) : (
//         <TableCell align="center">
//             {row.sold || row.ticketSold || row.reservationStatus}
//         </TableCell>
//     )
// }

// {
//     type === '3' ? null : <TableCell align="center">
//         {
//             type === "1" ? <Button
//                 variant="contained"
//                 sx={{
//                     backgroundColor: '#0B2E4E',
//                     color: 'white',
//                     "&:hover": {
//                         backgroundColor: "#0b243d"
//                     },
//                     fontSize: { xs: "0.7rem", sm: "1rem" },
//                     width: { xs: "100%", sm: "auto" },
//                 }}
//             >
//                 {row.action}
//             </Button>
//                 : type === "4" ?
//                     row.refundAction.map((action: any) => (
//                         <Button variant="outlined" size="small" sx={{ marginX: 0.5, color: action === "Deny" ? "white" : "black", borderColor: "gray", backgroundColor: action === "Deny" ? "#FF0000" : "white" }}>{action}</Button>
//                     ))
//                     // <>
//                     //     <Button variant="outlined" size="small" sx={{ marginX: 0.5, color: "black", borderColor: "gray" }}>Small</Button>
//                     //     <Button variant="contained" size="small" sx={{ marginX: 0.5, backgroundColor: "#FF0000", borderColor: "gray" }} >Small</Button>
//                     // </>

//                     :
//                     row.revenue || row.revenueGenerated

//         }

//     </TableCell>
// }


// </TableRow > */}
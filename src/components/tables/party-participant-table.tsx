import { useState } from 'react';
import { Typography, TableContainer, Table, TableRow, TableBody, Paper, TableHead, TableCell, Button, Box, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function ParticipantTable({ headers, data }: any) {
    const theme = useTheme();
    const [quantities, setQuantities] = useState<Record<string, number>>(
        data.reduce((acc: Record<string, number>, item: any) => {
            acc[item.id] = parseInt(item.selection, 10) || 1; // Added radix 10
            return acc;
        }, {})
    );

    const handleIncrement = (id: string) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const handleDecrement = (id: string) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0) // Prevent negative values
        }));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: "#E1E1E1" }}>
                        {headers.map((header: string) => (
                            <TableCell
                                key={header}
                                align="center"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: theme.palette.common.white,
                                    backgroundColor: "#1F8FCD",
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row: any) => (
                        <TableRow key={row.id} sx={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #E1E1E1" }}>
                            {Object.keys(row).map((key) => (
                                <TableCell
                                    key={key}
                                    align="center"
                                    sx={{
                                        fontSize: { xs: "0.8rem", sm: "1rem" },
                                        fontWeight: "normal",
                                    }}
                                >
                                    {key === "selection" ? (
                                        row[key] === "Insufficient Points" ? (
                                            <Typography sx={{ color: "#ff9800", fontWeight: 600 }}>
                                                {row[key]}
                                            </Typography>
                                        ) : (
                                            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleDecrement(row.id)}
                                                    sx={{ 
                                                        backgroundColor: theme.palette.grey[300],
                                                        '&:hover': { backgroundColor: theme.palette.grey[400] },
                                                        '&:disabled': { opacity: 0.5 }
                                                    }}
                                                    disabled={quantities[row.id] <= 0}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography>{quantities[row.id]}</Typography>
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleIncrement(row.id)}
                                                    sx={{ 
                                                        backgroundColor: theme.palette.grey[300],
                                                        '&:hover': { backgroundColor: theme.palette.grey[400] }
                                                    }}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )
                                    ) : (
                                        row[key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
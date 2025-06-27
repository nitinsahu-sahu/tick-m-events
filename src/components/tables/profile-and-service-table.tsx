import {
    TableContainer,
    Typography,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableHead,
    TableCell,
    Button,
} from "@mui/material";
import { memo, useState } from "react";
import { HeadingCommon } from "../multiple-responsive-heading/heading";

const ProfileAndServiceTable = ({
    headers,
    data,
    onModify,
    activeSection,
    setActiveSection
}: {
    headers: string[];
    activeSection: any;
    data: any[];
    setActiveSection: any
    onModify: (rowData: any) => void;  // Add this prop
}) => {

    const [editingRowId, setEditingRowId] = useState<string | null>(null);

    const handleModifyClick = (rowData: any) => {
        setEditingRowId(rowData._id);
        setActiveSection('update');
        onModify(rowData);
    };

    const handleAddClick = () => {
        setEditingRowId(null);
        setActiveSection('add');
    };
    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
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
                                <HeadingCommon weight={400} baseSize="15px" title="No Active services available" variant="body1" color="textSecondary" />
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, index) => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    backgroundColor: "#EEEEEE",
                                    position: "relative",
                                    '&:not(:last-child)': {
                                        '&::after': {
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
                                <TableCell align="center" sx={{ fontWeight: "bold", textTransform: "capitalize", width: "35%" }}>
                                    {row.serviceType}
                                </TableCell>
                                <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                    {row.budget}
                                </TableCell>
                                <TableCell align="center" sx={{ textTransform: "capitalize" }}>
                                    {row.eventLocation}
                                </TableCell>
                                {/* Table cells remain the same */}
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            marginX: 0.5,
                                            color: "white",
                                            borderColor: "gray",
                                            backgroundColor: "#0B2E4C"
                                        }}
                                        onClick={() => handleModifyClick(row)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            marginX: 0.5,
                                            color: "white",
                                            borderColor: "gray",
                                            backgroundColor: "#0B2E4C"
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default memo(ProfileAndServiceTable)


import { Box, Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCSVExport, useExcelExport } from "src/hooks/downloadable";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { EventValidationTable } from "src/components/tables/event-validation-table";
import { AppDispatch, RootState } from "src/redux/store";
import { eventOrderFetch } from "src/redux/actions/eventOrder";

import { entryValidationHeaders } from "./utills";


export function EntryListView() {
  const dispatch = useDispatch<AppDispatch>();

    const { verifiedOrders } = useSelector((state: RootState) => state?.order);
    const [searchTerm, setSearchTerm] = useState('');
    const exportToExcel = useExcelExport();
    const exportToCSV = useCSVExport();
    useEffect(() => {
        dispatch(eventOrderFetch())
    }, [dispatch]);
    // Filter data based on search term
    const filteredData = useMemo(() =>
        verifiedOrders?.filter((item: any) =>
            item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [searchTerm, verifiedOrders]
    );

    const handleExcelExport = () => {
        exportToExcel(filteredData, {
            fileName: 'entry_list',
            sheetName: 'Entry List'
        });
    };

    const handleCSVExport = () => {
        exportToCSV(verifiedOrders, {
            fileName: 'entry_list',
            headers: ['Name', 'Ticket Type', 'Entry Time', 'Status'],
            fieldNames: ['name', 'ticketType', 'entryTime', 'verifyEntry'] // Map to your actual data properties
        });
    };
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
            <HeadingCommon title="Entry List View" color="#0B2E4C" weight={600} baseSize="33px" />
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by Name"
                sx={{ mb: 2 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <EventValidationTable headers={entryValidationHeaders} data={filteredData} />

            {
                filteredData?.length ? <Box display="flex" gap={2} mt={2}>
                    <Button
                        variant="contained"
                        onClick={handleCSVExport}

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
                        onClick={handleExcelExport}

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
                </Box> : null
            }

        </Box>
    )
}
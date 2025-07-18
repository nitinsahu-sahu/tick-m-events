import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { AppDispatch, RootState } from 'src/redux/store';
import { TicketReservationManagementTable } from "src/components/tables/ticket-reservation-management-table";
import { getUniqueFileName } from "src/hooks/download_unique_name";
import { useCSVExport, useExcelExport } from "src/hooks/downloadable";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { validateViewUpdate } from "../../redux/actions/event.action";

export function ReservationManagement({ orderList }: any) {
    const { order } = orderList
    console.log("iii", orderList);
    const exportToExcel = useExcelExport();
    const exportToCSV = useCSVExport();
    
    const chartRealTimeOptions: ApexOptions = {
        series: [45, 30, 25], // Ticket Sold, Validation, Remaining
        labels: ["Ticket Sold", "Ticket validated", "Remaining Tickets"],
        chart: { type: "donut" },
        colors: ["#2395D4", "#002E4E", "#29A71A"], // Match colors from screenshot
        legend: { position: "bottom", markers: { strokeWidth: 8 } },
        dataLabels: { enabled: true },
        responsive: [{ breakpoint: 768, options: { legend: { position: "bottom" } } }],
    };

    const reservationManagementTableHeaders = ["Name", "Email", "Ticket Type", "Purchase Date", "Status"];

    const transformDataForExport = (orders: any[]) =>
        orders.map(item => ({
            name: item.userId.name,
            email: item.userId.email,
            createdAt: item.createdAt,
            paymentStatus: item.paymentStatus,
            ticketType: item.tickets.map((t: any) => t.ticketType).join(' | '),
        }));

    const handleExcelExport = () => {
        const exportData = transformDataForExport(order);
        exportToExcel(exportData, {
            fileName: getUniqueFileName('reservation_management_table'),
            sheetName: 'Reservation Entry List'
        });
    };

    const handleCSVExport = () => {
        const exportData = transformDataForExport(order);
        exportToCSV(exportData, {
            fileName: getUniqueFileName('reservation_management_table'),
            headers: ['Name', 'Email', 'Purchase Date', 'Payment Status', 'Ticket Type'],
            fieldNames: ['name', 'email', 'createdAt', 'paymentStatus', 'ticketType']
        });
    };

    const dispatch = useDispatch<AppDispatch>();
    const [validationTypes, setValidationTypes] = useState<string[]>([]);
    const [initialValidationTypes, setInitialValidationTypes] = useState<string[]>([]);

    const areArraysEqual = (arr1: string[], arr2: string[]) =>
        [...arr1].sort().join(',') === [...arr2].sort().join(',');

    useEffect(() => {
        if (orderList?.validationView) {
            setValidationTypes(orderList.validationView);
            setInitialValidationTypes(orderList.validationView);
        }
    }, [orderList]);

    const handleValidationTypeChange = (type: string) => {
        setValidationTypes(prev => {
            if (type === 'listName') {
                return prev.includes('listName') ? prev.filter(t => t !== 'listName') : [...prev, 'listName'];
            }
             if (type === 'listCode') {
                return prev.includes('listCode') ? prev.filter(t => t !== 'listCode') : [...prev, 'listCode'];
            }
            if (type === 'scan') {
                return prev.includes('scan') ? prev.filter(t => t !== 'scan') : [...prev, 'scan'];
            }
            return prev;
        });
    };

    const handleSaveValidationChanges = async () => {
        if (!orderList?._id) return;

        try {
            await dispatch(validateViewUpdate(orderList._id, validationTypes));
            setInitialValidationTypes(validationTypes); // reset comparison baseline
            toast.success("Changes saved successfully...");
            
        } catch (error) {
            toast.error("Failed to update validation preferences.");
        }
    };
    const isModified = !areArraysEqual(validationTypes, initialValidationTypes);
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
            <HeadingCommon
                baseSize="33px"
                weight={600}
                variant="h5"
                title="Reservation Management"
                color="#0B2E4E"
            />

            {/* Table */}
            <TicketReservationManagementTable data={order} headers={reservationManagementTableHeaders} type="3" />

            {/* Export Buttons */}
            <Box mt={2} display="flex" gap={2}>
                <Button onClick={handleCSVExport}
                    variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white" }}>
                    Export as CSV
                </Button>
                <Button onClick={handleExcelExport} variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white" }}>
                    Export as Excel
                </Button>
            </Box>

            {/* Ticket Validation Section */}
            <Box mt={3}>
                <HeadingCommon
                    baseSize="30px"
                    weight={600}
                    variant="h5"
                    title="Ticket Validation"
                    color="#0B2E4E"
                />
                <Box display="flex" flexDirection="column" gap={1} mt={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={validationTypes.includes('scan')}
                                onChange={() => handleValidationTypeChange('scan')}
                            />
                        }
                        label="QR Code Scan"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={validationTypes.includes('listCode')}
                                onChange={() => handleValidationTypeChange('listCode')}
                            />
                        }
                        label="Manual Entry of Unique Code"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={validationTypes.includes('listName')}
                                onChange={() => handleValidationTypeChange('listName')}
                            />
                        }
                        label="Validation via Name List & Account ID"
                    />
                    <Box display="flex" gap={2} mt={2}>
                        <Button
                            onClick={handleSaveValidationChanges}
                            variant="contained"
                            sx={{
                                bgcolor: isModified ? "#0B2E4C" : "grey.500",
                                color: "white",
                                cursor: isModified ? 'pointer' : 'not-allowed'
                            }}
                            disabled={!isModified}
                        >
                            Save Changes
                        </Button>

                        <Link to='/entry-validation'>
                            <Button variant="contained" sx={{ bgcolor: "#0B2E4C", color: "white" }}>
                                Go to Ticket Validation Page
                            </Button>
                        </Link>
                    </Box>

                </Box>


            </Box>

            {/* Real-time Entry Statistics */}
            <Box
                mt={4}
                p={3}
                borderRadius={3}
                sx={{
                    background: "linear-gradient(to right, #ffffff 82%, #2395D4 82%)",
                    boxShadow: 3,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {/* Left Side: Title */}
                <Box flex={1} minWidth="250px">
                    <Typography variant="h6" fontWeight={500} color="#002E4E" fontSize={{ xs: 20, sm: 25, md: 43 }}>
                        Real-time Entry Statistics
                    </Typography>
                </Box>

                {/* Center: Chart */}
                <Box flex={2} minWidth="300px">
                    <Chart options={chartRealTimeOptions} series={chartRealTimeOptions.series} type="donut" width="100%" height={250} />
                </Box>
            </Box>

        </Box>
    )
}
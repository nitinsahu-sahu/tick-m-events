import {
    Button,
    Typography,
    Paper,
    TextField, Box, Grid,
    MenuItem, Select
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import PromotionAndOfferTable from 'src/components/tables/promotin-and-offer-table';
import { AppDispatch, RootState } from 'src/redux/store';
import { promotionUpdate } from 'src/redux/actions';
import { promotionTableHeaders } from './utill';


interface ApiResult {
    status: number;
    type: string;
    message: any;
    // Add other properties if needed
}

export function ActivePromotion() {
    const dispatch = useDispatch<AppDispatch>();
    const { promotions } = useSelector((state: RootState) => state?.promotionList);
    const [promotionRowData, setPromotionRowData] = useState({
        _id: "",
        discountValue: "",
        ticketSelection: "",
        validityPeriodStart: "",
        advantageType: "",
        status: ""
    });

    const handleModify = useCallback((rowData: any) => {
        setPromotionRowData(prev => {
            // Only update if values actually changed
            if (prev._id === rowData._id &&
                prev.discountValue === rowData.discountValue &&
                prev.ticketSelection === rowData.ticketSelection &&
                prev.validityPeriodStart === rowData.validityPeriodStart &&
                prev.advantageType === rowData.advantageType &&
                prev.status === rowData.status) {
                return prev;
            }
            return {
                _id: rowData._id,
                discountValue: rowData.discountValue,
                ticketSelection: rowData.ticketSelection,
                validityPeriodStart: rowData.validityPeriodStart,
                advantageType: rowData.advantageType,
                status: rowData.status
            };
        });
    }, []);

    const handlePromotionUpdateChange = (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        const { name, value } = event.target;
        setPromotionRowData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePomotionsUpdate = useCallback(async (event: any) => {
        event.preventDefault();
        const formEventData = new FormData();
        formEventData.append("advantageType", promotionRowData.advantageType);
        formEventData.append("validityPeriodStart", promotionRowData.validityPeriodStart);
        formEventData.append("discountValue", promotionRowData.discountValue);
        formEventData.append("status", promotionRowData.status);
        try {
            const result = await dispatch(promotionUpdate({formEventData, _id:promotionRowData._id}));
            if ((result as ApiResult)?.status === 201) {
                toast.success(result?.message);
                setPromotionRowData({
                    _id: "",
                    discountValue: "",
                    ticketSelection: "",
                    validityPeriodStart: "",
                    advantageType: "",
                    status: ""
                })
            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            toast.error("Promotion creation failed");
        }
    }, [promotionRowData,dispatch])

    return (
        <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: "1px solid black" }}>
            <Typography variant="h6" fontWeight="bold" >
                Active Promotions
            </Typography>

            {/* Filter Header Section */}
            <Box mt={3} display="flex" justifyContent="start"
                sx={{
                    gap: 3, // spacing between labels
                    pb: 1,
                    overflowX: "auto",
                    borderBottom: "4px solid #ccc",
                    width: "fit-content",
                }}
            >
                {["Type", "Discount", "Ticket Type", "Validity", "Status"].map((label, index) => (
                    <Typography
                        key={index}
                        variant="subtitle2"
                        sx={{
                            fontWeight: 500,
                            color: "#000",
                            textAlign: "left",
                            paddingBottom: "4px",
                        }}
                    >
                        {label}
                    </Typography>
                ))}
            </Box>

            {/* Responsive Table */}
            <PromotionAndOfferTable
                headers={promotionTableHeaders}
                data={promotions}
                onModify={handleModify}  // Pass the handler
            />

            {/* Edit Promotion Section */}
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    backgroundColor: "#F2F2F2",
                    mt: 3,
                    border: "1px solid black"
                }}
            >
                <form onSubmit={handlePomotionsUpdate}>

                    <Typography variant="h6" fontWeight="bold" mb={3}>
                        Edit Promotion
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Name */}
                        <Grid item xs={12} sm={6}>
                            <Typography fontSize="13px" fontWeight={500} mb={1}>
                                Name
                            </Typography>
                            <TextField
                                fullWidth
                                inputProps={{
                                    style: { textTransform: 'capitalize' }
                                }}
                                sx={{
                                    '& input': {
                                        textTransform: 'capitalize'
                                    }
                                }}
                                size="small"
                                placeholder="Spring Discount"
                                name="advantageType"
                                value={promotionRowData.advantageType}
                                onChange={handlePromotionUpdateChange}
                            />
                        </Grid>

                        {/* Date */}
                        <Grid item xs={12} sm={6}>
                            <Typography fontSize="13px" fontWeight={500} mb={1}>
                                Date
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                type="date"
                                name="validityPeriodStart"
                                value={promotionRowData.validityPeriodStart}
                                onChange={handlePromotionUpdateChange}

                            />
                        </Grid>

                        {/* Discount */}
                        <Grid item xs={12} sm={6}>
                            <Typography fontSize="13px" fontWeight={500} mb={1}>
                                Discount
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="20%"
                                name="discountValue"
                                value={promotionRowData.discountValue}
                                onChange={handlePromotionUpdateChange}
                            />
                        </Grid>

                        {/* Status */}
                        <Grid item xs={12} sm={6}>
                            <Typography fontSize="13px" fontWeight={500} mb={1}>
                                Status
                            </Typography>
                            <Select fullWidth size="small"
                                name="status"
                                value={promotionRowData.status || ""} // Fallback to empty string if undefined
                                onChange={handlePromotionUpdateChange}>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inActive">In Active</MenuItem>
                                <MenuItem value="block">Block</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    {/* Buttons */}
                    <Box
                        mt={4}
                        display="flex"
                        // justifyContent={isMobile ? "center" : "flex-start"}
                        // flexDirection={isMobile ? "column" : "row"}
                        gap={2}
                    >
                        <Button
                            variant="contained"
                            type='submit'
                            sx={{
                                backgroundColor: "#0B2E4C",
                                color: "#fff",
                                px: 4,
                                "&:hover": {
                                    backgroundColor: "#093b65",
                                },
                            }}
                        // onClick={onSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#D9D9D9",
                                color: "#000",
                                px: 4,
                                "&:hover": {
                                    backgroundColor: "#c0c0c0",
                                },
                            }}
                        // onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}
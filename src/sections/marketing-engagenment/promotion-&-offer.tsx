import { LoadingButton } from '@mui/lab';
import {
    Button, Typography, Paper, TextField, Checkbox, FormControlLabel, Select, MenuItem, Box, Grid
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { promotionCreate } from 'src/redux/actions/promotionAndOffer';
import { AppDispatch } from 'src/redux/store';

interface ApiResult {
    status: number;
    type: string;
    message: any;
    // Add other properties if needed
}

export function PromotionsAndOffers() {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedDiscounts, setSelectedDiscounts] = useState({
        percentageDiscount: false,
        fixedValueDiscount: false,
        groupOffer: false,
        earlyBuyerDiscount: false
    });
    const [promotionFormData, setPromotionFormData] = useState({
        discountValue: "",
        ticketSelection: "vip",
        validityPeriodStart: "",
        validityPeriodEnd: "",
        promoCode: "",
        advantageType: "discount",
        usageLimit: ""
    });

    const handlePromotionChange = (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        const { name, value } = event.target;
        setPromotionFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setSelectedDiscounts(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };
    const handlePomotionsCreate = useCallback(async (event: any) => {
        event.preventDefault();
        const formEventData = new FormData();

        // Append all form data
        formEventData.append("discountValue", promotionFormData.discountValue);
        formEventData.append("ticketSelection", promotionFormData.ticketSelection);
        formEventData.append("validityPeriodEnd", promotionFormData.validityPeriodEnd);
        formEventData.append("validityPeriodStart", promotionFormData.validityPeriodStart);
        formEventData.append("promoCode", promotionFormData.promoCode);
        formEventData.append("advantageType", promotionFormData.advantageType);
        formEventData.append("usageLimit", promotionFormData.usageLimit);
        formEventData.append("promotionType", JSON.stringify(selectedDiscounts));
        try {
            const result = await dispatch(promotionCreate(formEventData));
            if ((result as ApiResult)?.status === 201) {
                toast.success(result?.message);
                setPromotionFormData({
                    discountValue: "",
                    ticketSelection: "vip",
                    validityPeriodStart: "",
                    validityPeriodEnd: "",
                    promoCode: "",
                    advantageType: "discount",
                    usageLimit: ""
                })
                setSelectedDiscounts(
                    {
                        percentageDiscount: false,
                        fixedValueDiscount: false,
                        groupOffer: false,
                        earlyBuyerDiscount: false
                    }
                )
            } else {
                toast.error(result?.message);
            }

        } catch (error) {
            toast.error("Promotion creation failed");
        }
    }, [promotionFormData, selectedDiscounts, dispatch]);

    return (
        <Box p={3} boxShadow={3} mt={3} borderRadius={3} sx={{ border: "1px solid black" }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Promotions & Special Offers
            </Typography>

            <Button
                fullWidth
                sx={{
                    bgcolor: "#0B2E4C",
                    color: "white",
                    mb: 3,
                    py: 1.5,
                    borderRadius: "10px",
                    "&:hover": { bgcolor: "#083048" },
                }}
            >
                Create a new Promotion
            </Button>

            <Paper sx={{ p: 3, borderRadius: "10px", background: "#f5f5f5" }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Create a Promotion
                </Typography>
                <form onSubmit={handlePomotionsCreate}>

                    {/* Discount Type Checkboxes */}
                    <Grid container spacing={2} mb={3}>
                        {[
                            { label: "Percentage Discount", name: "percentageDiscount" },
                            { label: "Fixed Value Discount", name: "fixedValueDiscount" },
                            { label: "Group Offer", name: "groupOffer" },
                            { label: "Early Buyer Discount", name: "earlyBuyerDiscount" }
                        ].map((option) => (
                            <Grid item xs={12} sm={6} md={3} key={option.name}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name={option.name}
                                            checked={selectedDiscounts[option.name as keyof typeof selectedDiscounts]}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={option.label}
                                    sx={{ fontSize: "14px" }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Discount Value */}
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                        Discount value
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name="discountValue"
                        placeholder='Discount Value e.g., 2,000 XAF'
                        type='text'
                        value={promotionFormData.discountValue}
                        onChange={handlePromotionChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Ticket Selection */}
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                        Ticket Selection
                    </Typography>
                    <Select fullWidth defaultValue="standard" sx={{ mb: 2 }}
                        name="ticketSelection"
                        value={promotionFormData.ticketSelection}
                        onChange={handlePromotionChange}>
                        <MenuItem value="standard">Standard</MenuItem>
                        <MenuItem value="vip">Vip</MenuItem>
                    </Select>

                    {/* Validity Period */}
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                        Validity Period
                    </Typography>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                placeholder="Start Date (mm/dd/yyyy)"
                                required
                                name="validityPeriodStart"
                                type='date'
                                value={promotionFormData.validityPeriodStart}
                                onChange={handlePromotionChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                placeholder="End Date (mm/dd/yyyy)"
                                name="validityPeriodEnd"
                                type='date'
                                value={promotionFormData.validityPeriodEnd}
                                onChange={handlePromotionChange}
                            />
                        </Grid>
                    </Grid>

                    {/* Promo Code */}
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                        Promo Code (Optional)
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Promo Code"
                        name="promoCode"
                        type='text'
                        inputProps={{
                            style: { textTransform: 'uppercase' }
                        }}
                        sx={{
                            '& input': {
                                textTransform: 'uppercase'
                            }
                        }}
                        value={promotionFormData.promoCode}
                        onChange={handlePromotionChange}
                    />

                    {/* Advantage Type */}
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                        Advantage Type
                    </Typography>
                    <Select
                        fullWidth
                        name="advantageType"
                        value={promotionFormData.advantageType}
                        onChange={handlePromotionChange}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="discount">Discount</MenuItem>
                        <MenuItem value="spring discount">Spring Discount</MenuItem>
                        <MenuItem value="vip sale">VIP Sale</MenuItem>
                        <MenuItem value="flash deal">Flash Deal</MenuItem>
                    </Select>

                    {/* Usage Limit */}
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                        Usage Limit
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Usage Limit"
                        name="usageLimit"
                        type='number'
                        value={promotionFormData.usageLimit}
                        onChange={handlePromotionChange}
                        sx={{ mb: 2 }}
                    />

                    {/* Submit Button */}
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        color="inherit"
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: "#0B2E4C", "&:hover": { backgroundColor: "#083048" } }}
                    >
                        Save Promotion
                    </LoadingButton>
                </form>
            </Paper>
        </Box>
    )
}
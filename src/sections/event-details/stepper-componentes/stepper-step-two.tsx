import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Switch,
    FormControlLabel,
    RadioGroup,
    Radio,
    Checkbox,
    InputAdornment,
    IconButton,
    FormControl,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import { useCallback, useState } from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from 'src/redux/store';
import { Iconify } from 'src/components/iconify';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { ticketConfigCreate } from 'src/redux/actions/event.action';

export function StepperStepTwo() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [fullRefundCheck, setFullRefundCheck] = useState(false);
    const [noRefundAfterDateCheck, setNoRefundAfterDateCheck] = useState(false);
    const [refundEnabled, setRefundEnabled] = useState(false);
    const [partialRefundCheck, setPartialRefundCheck] = useState(false);
    const [payStatus, setPayStatus] = useState('paid');
    const [ticketConfigData, setTicketConfigData] = useState({
        purchaseDeadlineDate: "",
        isPurchaseDeadlineEnabled: "true",
        paymentMethods: "Cash",
        fullRefundDaysBefore: "",
        partialRefundPercent: "",
        noRefundDate: '',
        isRefundPolicyEnabled: false,
    });

    // State to manage ticket rows
    const [ticketRows, setTicketRows] = useState([
        {
            id: 1,
            ticketType: '',
            price: '0 XAF',
            isLinkPramotion: false,
            totalTickets: '0',
            description: '',
            isLimitedSeat: true
        }
    ]);
    const handleTickteConfigChange = (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        const { name, value } = event.target;
        setTicketConfigData((prevData) => ({ ...prevData, [name]: value }));
    };
    // Add a new row
    const addRow = () => {
        setTicketRows([
            ...ticketRows,
            { id: Date.now(), isLimitedSeat: true, ticketType: '', price: '', isLinkPramotion: false, totalTickets: '', description: '' }
        ]);
    };

    // Update field values
    const handleChange = (id: any, field: any, value: any) => {
        setTicketRows(
            ticketRows.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    // Remove a row by ID
    const removeRow = (id: any) => {
        if (ticketRows.length > 1) { // Prevent removing the last row
            setTicketRows(ticketRows.filter(row => row.id !== id));
        }
    };

    const handleTicketConfig = useCallback(async (event: any) => {
        event.preventDefault();
        const formEventData = new FormData();

        formEventData.append("tickets", JSON.stringify(ticketRows));
        formEventData.append("purchaseDeadlineDate", ticketConfigData.purchaseDeadlineDate);
        formEventData.append("isPurchaseDeadlineEnabled", ticketConfigData.isPurchaseDeadlineEnabled);
        formEventData.append("paymentMethods", ticketConfigData.paymentMethods);
        formEventData.append("isRefundPolicyEnabled", refundEnabled.toString());
        formEventData.append("fullRefundCheck", fullRefundCheck.toString());
        formEventData.append("fullRefundDaysBefore", ticketConfigData.fullRefundDaysBefore);
        formEventData.append("partialRefundPercent", ticketConfigData.partialRefundPercent);
        formEventData.append("partialRefundCheck", partialRefundCheck.toString());
        formEventData.append("noRefundDate", ticketConfigData.noRefundDate);
        formEventData.append("payStatus", payStatus);
        formEventData.append("noRefundAfterDateCheck", noRefundAfterDateCheck.toString());


        try {
            // Get current search params
            const searchParams = new URLSearchParams(window.location.search);
            const eventId = searchParams.get('eventId'); // Get existing eventId
            const res = await dispatch(ticketConfigCreate({ formEventData, eventId }));

            const ticketConfigId = res?.ticketConfigId; // Adjust based on your response structure

            // Add event ID to current URL as search param
            navigate(`?eventId=${eventId}&ticketConfigId=${ticketConfigId}`, { replace: true });
        } catch (error) {
            toast.error("Server Error");
        }
    }, [navigate, payStatus, dispatch, ticketRows, ticketConfigData, fullRefundCheck, refundEnabled, partialRefundCheck, noRefundAfterDateCheck]);

    const handlePayStatus = (newValue: any) => {
        setPayStatus(newValue)
        setTicketRows([
            {
                id: 1,
                ticketType: '',
                price: '0 XAF',
                isLinkPramotion: false,
                totalTickets: '0',
                description: '',
                isLimitedSeat: true
            }
        ])
        setTicketConfigData({
            purchaseDeadlineDate: "",
            isPurchaseDeadlineEnabled: "true",
            paymentMethods: newValue === 'free' ? '' : "Cash",
            fullRefundDaysBefore: "",
            partialRefundPercent: "",
            noRefundDate: '',
            isRefundPolicyEnabled: false,
        })
    }
    return (
        <Box sx={{ p: 1, maxWidth: '100%', width: '100%' }}>
            <HeadingCommon variant="h6" title="Ticket Configuration" weight={600} baseSize="33px" />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>Ticket Type:</Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={payStatus}
                    exclusive
                    onChange={(event: any, newValue: any) => {
                        if (newValue !== null) {

                            handlePayStatus(newValue);
                        }
                    }}
                    aria-label="Payment Status"
                >
                    <ToggleButton value="paid" aria-label="paid">
                        Paid Event
                    </ToggleButton>
                    <ToggleButton value="free" aria-label="free">
                        Free Event
                    </ToggleButton>

                </ToggleButtonGroup>
            </Box>
            <form encType='multipart/form-data' onSubmit={handleTicketConfig}>
                {ticketRows.map((row, index) => (
                    <Grid container spacing={2} alignItems="center" key={row.id} sx={{ mt: index > 0 ? 2 : 0, alignItems: "flex-start" }}>
                        {/* Ticket Types */}
                        <Grid item xs={12} sm={5} md={3}>
                            <TextField
                                fullWidth
                                required
                                inputProps={{
                                    style: {
                                        textTransform: "capitalize"
                                    }
                                }}
                                label="Ticket Types"
                                placeholder="Standard, VIP, Premium"
                                value={row.ticketType}
                                onChange={(e) => handleChange(row.id, 'ticketType', e.target.value)}
                            />
                        </Grid>

                        {/* Price per Ticket */}
                        {
                            payStatus === 'free' ? null : <Grid item xs={12} sm={5} md={3}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Price for each ticket"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    placeholder="0 XAF"
                                    value={row.price}
                                    onChange={(e) => handleChange(row.id, 'price', e.target.value)}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={row.isLinkPramotion}
                                                onChange={(e) =>
                                                    handleChange(row.id, "isLinkPramotion", e.target.checked)
                                                }
                                            />
                                        }
                                        label="Link to an existing promotion"
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px',
                                            },
                                            mr: 1,
                                        }}
                                    />
                                </Box>
                            </Grid>
                        }


                        {/* Total Tickets */}
                        <Grid item xs={12} sm={5} md={payStatus === 'free' ? 4 : 3}>
                            <TextField
                                fullWidth
                                label="Total Tickets"
                                placeholder="100"
                                value={row.totalTickets}
                                onChange={(e) => handleChange(row.id, 'totalTickets', e.target.value)}
                            />
                            <Box key={row.id} sx={{ width: "100%" }}>
                                <RadioGroup
                                    name="isLimitedSeat"
                                    value={row.isLimitedSeat.toString()}
                                    onChange={(event) => handleChange(row.id, 'isLimitedSeat', event.target.value === 'true')}
                                    sx={{
                                        mt: 1,
                                        display: 'flex',
                                        flexDirection: 'row', // Explicitly set to row (default)
                                        alignItems: 'center' // Vertical alignment
                                    }}
                                >
                                    <FormControlLabel
                                        value="true"
                                        control={<Radio size="small" />} // Smaller radio button
                                        label="Limited"
                                        sx={{
                                            marginRight: 2, // Additional right margin
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px',
                                                fontWeight: 500,
                                                color: 'text.primary'
                                            }
                                        }}
                                    />
                                    <FormControlLabel
                                        value="false"
                                        control={<Radio size="small" />}
                                        label="Unlimited Seats"
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px',
                                                fontWeight: 500,
                                                color: 'text.primary'
                                            }
                                        }}
                                    />
                                </RadioGroup>
                            </Box>
                        </Grid>

                        {/* Ticket Description */}
                        <Grid item xs={12} sm={5} md={payStatus === 'free' ? 4 : 2}>
                            <TextField
                                fullWidth
                                label="Description"
                                placeholder="Access to all areas"
                                value={row.description}
                                onChange={(e) => handleChange(row.id, 'description', e.target.value)}
                            />
                        </Grid>

                        {/* Action Buttons (Add/Remove) */}
                        <Grid item xs={12} sm={2} md={1} >
                            <Box >
                                {/* Plus Button (only on last row) */}
                                {index === ticketRows.length - 1 && (
                                    <IconButton onClick={addRow} color="primary" sx={{ p: "18px" }}>
                                        <Iconify icon="ic:round-plus" />
                                    </IconButton>
                                )}

                                {/* Minus Button (show on all rows except the last one) */}
                                {index !== ticketRows.length - 1 && (
                                    <IconButton onClick={() => removeRow(row.id)} color="error" sx={{ p: "18px" }}>
                                        <Iconify icon="ic:round-minus" />
                                    </IconButton>
                                )}
                            </Box>

                        </Grid>
                    </Grid>
                ))}

                <Box mt={2}>
                    <Grid container spacing={3}>
                        {/* Purchase Deadline */}
                        <Grid item xs={12} md={payStatus === 'free' ? 12 : 3}>
                            <Typography fontWeight="bold">Purchase deadline</Typography>
                            <Box display="flex" flexDirection="column" mt={1}>
                                <TextField
                                    value={ticketConfigData.purchaseDeadlineDate}
                                    onChange={handleTickteConfigChange}
                                    fullWidth
                                    required
                                    name="purchaseDeadlineDate"
                                    type="date"
                                    label="Select Date"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <RadioGroup
                                    name="isPurchaseDeadlineEnabled" // Make sure the name matches your state field
                                    value={ticketConfigData.isPurchaseDeadlineEnabled.toString()}
                                    onChange={handleTickteConfigChange}
                                    sx={{
                                        mt: 1,
                                        display: 'flex',
                                        flexDirection: 'row', // Explicitly set to row (default)
                                        alignItems: 'center' // Vertical alignment
                                    }}
                                >
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px',
                                                fontWeight: 500,
                                                color: 'text.primary'
                                            }
                                        }} value="true" control={<Radio />} label="Enabled" />
                                    <FormControlLabel
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px',
                                                fontWeight: 500,
                                                color: 'text.primary'
                                            }
                                        }}
                                        value="false" control={<Radio />} label="Disabled" />
                                </RadioGroup>
                            </Box>
                        </Grid>

                        {/* Accepted Payment Methods */}
                        {
                            payStatus === 'free' ? null : <Grid item xs={12} md={3}>
                                <Typography fontWeight="bold">Accepted payment methods</Typography>
                                <Box
                                    border={1}
                                    borderRadius={2}
                                    p={2}
                                    mt={1}
                                    sx={{ borderColor: '#ccc', minHeight: '150px' }}
                                >
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="payment-methods"
                                            name="paymentMethods" // Make sure the name matches your state field
                                            value={ticketConfigData.paymentMethods}
                                            onChange={handleTickteConfigChange}
                                        >
                                            <FormControlLabel
                                                value="Mobile Money"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Box display="flex" alignItems="center">
                                                        <PaymentIcon sx={{ mr: 1 }} />
                                                        <HeadingCommon baseSize="14px" title="Mobile Money" />
                                                    </Box>
                                                }
                                                sx={{ margin: 0 }} // Remove default margin
                                            />

                                            <FormControlLabel
                                                value="Credit Card"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Box display="flex" alignItems="center">
                                                        <CreditCardIcon sx={{ mr: 1 }} />
                                                        <HeadingCommon baseSize="14px" title="Credit Card" />
                                                    </Box>
                                                }
                                                sx={{ margin: 0 }}
                                            />

                                            <FormControlLabel
                                                value="Cash"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Box display="flex" alignItems="center">
                                                        <MoneyIcon sx={{ mr: 1 }} />
                                                        <HeadingCommon baseSize="14px" title="Cash" />
                                                    </Box>
                                                }
                                                sx={{ margin: 0 }}
                                            />

                                            <FormControlLabel
                                                value="Bank Transfer"
                                                control={<Radio size="small" />}
                                                label={
                                                    <Box display="flex" alignItems="center">
                                                        <AccountBalanceIcon sx={{ mr: 1 }} />
                                                        <HeadingCommon baseSize="14px" title="Bank Transfer" />
                                                    </Box>
                                                }
                                                sx={{ margin: 0 }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                        }

                        {/* Refund Policy */}
                        {
                            payStatus === 'free' ? null : <Grid item xs={12} md={4}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography fontWeight="bold" mb={1}>
                                        Refund policy
                                    </Typography>
                                    <Switch
                                        name="isRefundPolicyEnabled"
                                        checked={refundEnabled}
                                        onChange={(e) => setRefundEnabled(e.target.checked)}
                                    />
                                </Box>


                                {refundEnabled && (
                                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={fullRefundCheck}
                                                        onChange={(e) => setFullRefundCheck(e.target.checked)}
                                                        name="fullRefundCheck"
                                                    />
                                                }
                                                label="Full Refund Available up to X days before the event:"
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '11px',
                                                        fontWeight: 'bold',
                                                    }
                                                }}
                                            />
                                            <TextField
                                                name="fullRefundDaysBefore"
                                                type="text"
                                                value={ticketConfigData.fullRefundDaysBefore}
                                                onChange={handleTickteConfigChange}
                                                fullWidth
                                                size="small"
                                                placeholder="Enter number of days"
                                                sx={{ mt: 1 }}
                                            />
                                        </Box>

                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={partialRefundCheck}
                                                        onChange={(e) => setPartialRefundCheck(e.target.checked)}
                                                        name="partialRefundC"

                                                    />
                                                }
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '11px',  // Set font size to 20px
                                                        // You can add other typography styles here if needed
                                                        fontWeight: 'bold',
                                                        // color: 'text.primary',
                                                    }
                                                }}
                                                label="Partial Refund with Fee (% of ticket price retained):"
                                            />
                                            <TextField
                                                name="partialRefundPercent"
                                                value={ticketConfigData.partialRefundPercent}
                                                onChange={handleTickteConfigChange}
                                                fullWidth
                                                size="small"
                                                placeholder="Enter percentage"
                                                sx={{ mt: 1 }}
                                            />
                                        </Box>

                                        <Box>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={noRefundAfterDateCheck}
                                                        onChange={(e) => setNoRefundAfterDateCheck(e.target.checked)}
                                                        name="partialRefundC"

                                                    />
                                                }
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: '11px',  // Set font size to 20px
                                                        // You can add other typography styles here if needed
                                                        fontWeight: 'bold',
                                                        // color: 'text.primary',
                                                    }
                                                }}
                                                label="Partial Refund with Fee (% of ticket price retained):"
                                            />
                                            <TextField
                                                name="noRefundDate"
                                                value={ticketConfigData.noRefundDate}
                                                onChange={handleTickteConfigChange}
                                                fullWidth
                                                type="date"
                                                size="small"
                                                sx={{ mt: 1 }}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        }


                        {/* Save Tickets Button */}

                        <Grid item xs={12} md={payStatus === 'free' ? 12 : 2} >
                            <LoadingButton
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{ color: "black", backgroundColor: "#2295D4" }}
                            >
                                {
                                    payStatus === 'free' ? 'Activate Free Entry' : 'Save Tickets'
                                }

                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </form>
            {/* Physical Sales Points */}
            <Box mt={6}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Physical Ticket Sales Points
                </Typography>
                <RadioGroup row defaultValue="own">
                    <FormControlLabel
                        value="activate"
                        control={<Radio />}
                        label="Activate Physical Ticket Sales Points"
                    />
                    <FormControlLabel
                        value="own"
                        control={<Radio />}
                        label="Use my own physical point of sales"
                    />
                </RadioGroup>

                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Location Name" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Address" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label="Contact" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField
                            fullWidth
                            label="Available Ticket Types"
                            placeholder="Standard, VIP, Premium"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Sales Start" type="date" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Sales End" type="date" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Limit on Tickets Sold per Location" placeholder="500" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" sx={{ color: "white", backgroundColor: "#0B2E4C" }}>
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

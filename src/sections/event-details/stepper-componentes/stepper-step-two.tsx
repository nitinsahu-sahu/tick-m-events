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
    FormControl
} from '@mui/material';
//   import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Iconify } from 'src/components/iconify';
import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';

export function StepperStepTwo() {
    const [refundEnabled, setRefundEnabled] = useState(false);
    const [ticketLimitType, setTicketLimitType] = useState('limited');
    const [purchaseDeadline, setPurchaseDeadline] = useState<string | null>(null);
    const [partialRefund, setPartialRefund] = useState(true);
    // State to manage ticket rows
    const [ticketRows, setTicketRows] = useState([
        { id: 1, type: '', price: '', total: '', description: '' }
    ]);

    // Add a new row
    const addRow = () => {
        setTicketRows([
            ...ticketRows,
            { id: Date.now(), type: '', price: '', total: '', description: '' }
        ]);
    };

    // Remove a row by ID
    const removeRow = (id: any) => {
        if (ticketRows.length > 1) { // Prevent removing the last row
            setTicketRows(ticketRows.filter(row => row.id !== id));
        }
    };

    // Update field values
    const handleChange = (id: any, field: any, value: any) => {
        setTicketRows(
            ticketRows.map(row =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };
    return (
        <Box sx={{ p: 1, maxWidth: '100%', width: '100%' }}>
            <HeadingCommon variant="h6" title="Ticket Configuration" weight={600} baseSize="33px" />

            {ticketRows.map((row, index) => (
                <Grid container spacing={2} alignItems="center" key={row.id} sx={{ mt: index > 0 ? 2 : 0, alignItems: "flex-start" }}>
                    {/* Ticket Types */}
                    <Grid item xs={12} sm={5} md={3}>
                        <TextField
                            fullWidth
                            label="Ticket Types"
                            placeholder="Standard, VIP, Premium"
                            value={row.type}
                            onChange={(e) => handleChange(row.id, 'type', e.target.value)}
                        />
                    </Grid>

                    {/* Price per Ticket */}
                    <Grid item xs={12} sm={5} md={3}>
                        <TextField
                            fullWidth
                            label="Price for each ticket"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            placeholder="0.00"
                            value={row.price}
                            onChange={(e) => handleChange(row.id, 'price', e.target.value)}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormControlLabel
                                value="existing"
                                control={<Radio size="small" />}
                                label="Link to an existing promotion"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '11px',  // Set font size to 10px
                                    },
                                    mr: 1,  // Optional: Add right margin for spacing
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Total Tickets */}
                    <Grid item xs={12} sm={5} md={3}>
                        <TextField
                            fullWidth
                            label="Total Tickets"
                            placeholder="100"
                            value={row.total}
                            onChange={(e) => handleChange(row.id, 'total', e.target.value)}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <FormControlLabel
                                value="limited"
                                control={<Radio size="small" />}
                                label="Limited"
                                onChange={() => setTicketLimitType('limited')}
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '11px',  // Set font size to 10px
                                    },
                                    mr: 1,  // Optional: Add right margin for spacing
                                }}
                            />
                            <FormControlLabel
                                value="unlimited"
                                control={<Radio size="small" />}
                                label="Unlimited seats"
                                onChange={() => setTicketLimitType('unlimited')}
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '11px',  // Set font size to 10px
                                    },
                                    mr: 1,  // Optional: Add right margin for spacing
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Ticket Description */}
                    <Grid item xs={12} sm={5} md={2}>
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
                    <Grid item xs={12} md={3}>
                        <Typography fontWeight="bold">Purchase deadline</Typography>
                        <Box display="flex" flexDirection="column" mt={1}>
                            <TextField
                                value={purchaseDeadline}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                    setPurchaseDeadline(e.target.value)
                                  }
                                fullWidth type="date" label="Select Date" InputLabelProps={{ shrink: true }}
                            />
                            <RadioGroup row defaultValue="enabled" sx={{ mt: 1 }}>
                                <FormControlLabel value="enabled" control={<Radio />} label="Enabled" />
                                <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
                            </RadioGroup>
                        </Box>
                    </Grid>

                    {/* Accepted Payment Methods */}
                    <Grid item xs={12} md={3}>
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
                                    name="payment-methods"
                                // value={selectedPaymentMethod} // You'll need to manage this state
                                // onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="mobile-money"
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
                                        value="credit-card"
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
                                        value="cash"
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
                                        value="bank-transfer"
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

                    {/* Refund Policy */}
                    <Grid item xs={12} md={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight="bold" mb={1}>
                                Refund policy
                            </Typography>
                            <Switch
                                checked={refundEnabled}
                                onChange={(e) => setRefundEnabled(e.target.checked)}
                            />
                        </Box>


                        {refundEnabled && (
                            <Box display="flex" flexDirection="column" gap={2} mt={2}>
                                <Box>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Full Refund Available up to X days before the event:"
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px',  // Set font size to 20px
                                                // You can add other typography styles here if needed
                                                fontWeight: 'bold',
                                                // color: 'text.primary',
                                            }
                                        }}
                                    />
                                    <TextField
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
                                                checked={partialRefund}
                                                onChange={(e) => setPartialRefund(e.target.checked)}
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
                                        fullWidth
                                        size="small"
                                        placeholder="Enter percentage"
                                        sx={{ mt: 1 }}
                                    />
                                </Box>

                                <Box>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                fontSize: '11px',  // Set font size to 20px
                                                // You can add other typography styles here if needed
                                                fontWeight: 'bold',
                                                // color: 'text.primary',
                                            }
                                        }}
                                        label="No Refunds after a set date"
                                    />
                                    <TextField
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

                    {/* Save Tickets Button */}
                    <Grid item xs={12} md={2} >
                        <Button sx={{
                            backgroundColor: "#2295D4", color: "black", '&:hover': {
                                bgcolor: '#1976d2',
                            },
                        }}>
                            Save Tickets
                        </Button>
                    </Grid>
                </Grid>
            </Box>

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
                        <Button fullWidth variant="contained" sx={{color:"white", backgroundColor:"#0B2E4C"}}>
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

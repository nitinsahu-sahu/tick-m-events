import { useState } from 'react';
import { Box, Button, Card, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { formatEventDate, formatTimeTo12Hour } from "src/hooks/formate-time";
import { availablePromoCodes, PromoCode } from './utill';
import { PurchaseModal } from './tickte-purchase-modal';


export function TrackingSystem({ tickets, location, date, time, eventId, eventName }: any) {
    // Initialize state for ticket quantities
    const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>(() => {
        const initialQuantities: Record<string, number> = {};
        tickets?.forEach((ticket: any) => {
            ticket.tickets.forEach((item: any) => {
                initialQuantities[item._id] = 0;
            });
        });
        return initialQuantities;
    });
    const [modalOpen, setModalOpen] = useState(false);
    // Promo code state
    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
    const [promoError, setPromoError] = useState('');
    // Check if event has passed
    const eventDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    const isEventPassed = currentDateTime > eventDateTime;
    // Define available promo codes


    // Handle increment
    const handleIncrement = (ticketId: string, maxTickets?: string) => {
        setTicketQuantities(prev => {
            // If there's a max tickets limit and we've reached it, don't increment
            if (maxTickets !== undefined && prev[ticketId] >= parseInt(maxTickets, 10)) {
                return prev;
            }
            return {
                ...prev,
                [ticketId]: prev[ticketId] + 1
            };
        });
    };

    // Handle decrement
    const handleDecrement = (ticketId: string) => {
        setTicketQuantities(prev => {
            // Don't go below 0
            if (prev[ticketId] <= 0) {
                return prev;
            }
            return {
                ...prev,
                [ticketId]: prev[ticketId] - 1
            };
        });
    };

    // Calculate subtotal before any discounts
    const calculateSubtotal = () => {
        let subtotal = 0;
        tickets?.forEach((ticket: any) => {
            ticket.tickets.forEach((item: any) => {
                const quantity = ticketQuantities[item._id] || 0;
                // Extract numeric value from price string (assuming format like "10,000 XAF")
                const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                subtotal += quantity * price;
            });
        });
        return subtotal;
    };

    // Apply promo code
    const applyPromoCode = () => {
        setPromoError('');
        const promo = availablePromoCodes.find(p => p.code === promoInput.toUpperCase());

        if (!promo) {
            setPromoError('Invalid promo code');
            return;
        }

        const subtotal = calculateSubtotal();

        // Check minimum purchase if required
        if (promo.minPurchase && subtotal < promo.minPurchase) {
            setPromoError(`Minimum purchase of ${promo.minPurchase.toLocaleString()} XAF required`);
            return;
        }

        setAppliedPromo(promo);
    };

    // Remove promo code
    const removePromoCode = () => {
        setAppliedPromo(null);
        setPromoInput('');
    };

    // Calculate discount based on applied promo
    const calculateDiscount = () => {
        if (!appliedPromo) return 0;

        const subtotal = calculateSubtotal();

        switch (appliedPromo.type) {
            case 'percentage':
                // Type guard to ensure value exists for percentage type
                if (appliedPromo.value === undefined) {
                    console.error('Percentage promo code is missing value');
                    return 0;
                }
                return subtotal * (appliedPromo.value / 100);

            case 'simple':
                // Type guard to ensure value exists for simple type
                if (appliedPromo.value === undefined) {
                    console.error('Simple promo code is missing value');
                    return 0;
                }
                return Math.min(appliedPromo.value, subtotal);

            case 'group': {
                let totalFreeItems = 0;
                tickets?.forEach((ticket: any) => {
                    ticket.tickets.forEach((item: any) => {
                        const quantity = ticketQuantities[item._id] || 0;
                        if (quantity > 0) {
                            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                            const freeItems = Math.floor(quantity / appliedPromo.groupBuy) * appliedPromo.groupGet;
                            totalFreeItems += freeItems * price;
                        }
                    });
                });
                return totalFreeItems;
            }

            default:
                return 0;
        }
    };

    // Calculate total after discount
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discount = calculateDiscount();
        return Math.max(0, subtotal - discount); // Ensure total doesn't go below 0
    };

    // Get selected tickets data
    const getSelectedTickets = () => {
        const selected: Array<{
            ticketName: string;
            quantity: number;
            price: number;
        }> = [];

        tickets?.forEach((ticket: any) => {
            ticket.tickets.forEach((item: any) => {
                const quantity = ticketQuantities[item._id] || 0;
                if (quantity > 0) {
                    selected.push({
                        ticketName: item.ticketType,
                        quantity,
                        price: parseFloat(item.price.replace(/[^0-9.]/g, ''))
                    });
                }
            });
        });

        return selected;
    };

    const handleBuyClick = () => {
        if (calculateSubtotal() <= 0) return;
        setModalOpen(true);
    };

    return (
        <Box mt={3}>
            {/* Ticketing Section */}
            <HeadingCommon title='Ticketing System' variant="h5" baseSize="40px" mb={0} weight={600} />

            <Grid container spacing={3} mt={{ xs: 0.1, sm: 0.5, md: 1 }}>
                <Grid item xs={12} sm={10} md={6} lg={6}>
                    <Card sx={{
                        p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: 3, position: 'relative',
                        ...(isEventPassed && {
                            opacity: 0.6,
                            pointerEvents: 'none'
                        })
                    }}>
                        {isEventPassed && (
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1,
                                backgroundColor: 'rgba(255,255,255,0.7)'
                            }}>
                                <Typography variant="h6" color="error" fontWeight="bold">
                                    This event has ended
                                </Typography>
                            </Box>
                        )}
                        {tickets?.map((ticket: any) => (
                            ticket?.tickets.map((item: any) => (
                                <Box key={item._id} mb={3}>
                                    <Typography fontWeight="bold" fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                                        {item.ticketType} Ticket
                                        {item.isLimitedSeat && item.totalTickets === "0" && (
                                            <span style={{ color: "#3CB1F1" }}> (Sold Out)</span>
                                        )}
                                    </Typography>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography fontWeight={600} fontSize={{ xs: "0.8rem", sm: "1rem", md: "1.2rem" }}>
                                            {item.price}
                                            {item.isLimitedSeat && item.totalTickets !== "0" && (
                                                <span style={{ fontSize: "0.8rem", color: "#666" }}>
                                                    ({item.totalTickets} available)
                                                </span>
                                            )}
                                        </Typography>
                                        <Box display="flex" alignItems="center">
                                            <IconButton
                                                sx={{ border: "1px solid black", borderRadius: "8px", padding: "1px" }}
                                                onClick={() => handleDecrement(item._id)}
                                                disabled={ticketQuantities[item._id] <= 0}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography mx={1}>{ticketQuantities[item._id] || 0}</Typography>
                                            <IconButton
                                                sx={{ border: "1px solid black", borderRadius: "8px", padding: "1px" }}
                                                onClick={() => handleIncrement(item._id, item.totalTickets)}
                                                disabled={item.isLimitedSeat && item.totalTickets !== "0" &&
                                                    ticketQuantities[item._id] >= parseInt(item.totalTickets, 10)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ border: "1px solid black", mt: "15px" }} />
                                </Box>
                            )
                            )))}

                        {/* Pricing Details */}
                        <Typography mt={2} fontSize={{ xs: "0.9rem", md: "1rem" }}>
                            <strong>Subtotal:</strong> {calculateSubtotal().toLocaleString()} XAF
                        </Typography>

                        {/* Promo Code Display */}
                        {appliedPromo && (
                            <Box>
                                <Typography fontSize={{ xs: "0.9rem", md: "1rem" }} sx={{ color: "green" }}>
                                    <strong>Promo Applied:</strong> {appliedPromo.code} (
                                    {appliedPromo.type === 'percentage' && `${appliedPromo.value}% off`}
                                    {appliedPromo.type === 'simple' && `${appliedPromo.value.toLocaleString()} XAF off`}
                                    {appliedPromo.type === 'group' && `Buy ${appliedPromo.groupBuy} Get ${appliedPromo.groupGet} free`}
                                    )
                                </Typography>
                                <Typography fontSize={{ xs: "0.9rem", md: "1rem" }}>
                                    <strong>Discount:</strong> -{calculateDiscount().toLocaleString()} XAF
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={removePromoCode}
                                    sx={{ color: 'red', fontSize: '0.7rem' }}
                                >
                                    Remove Promo
                                </Button>
                            </Box>
                        )}

                        {promoError && (
                            <Typography color="error" fontSize={{ xs: "0.8rem", md: "0.9rem" }}>
                                {promoError}
                            </Typography>
                        )}

                        <Typography fontSize={{ xs: "0.9rem", md: "1rem" }}>
                            <strong>Net Amount To Pay:</strong> {calculateTotal().toLocaleString()} XAF
                        </Typography>

                        {/* Promo Code */}
                        <Grid container spacing={2} sx={{ marginTop: "1px" }}>
                            <Grid item xs={12} sm={8} md={8}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    size="small"
                                    placeholder="Enter Promo Code"
                                    value={promoInput}
                                    onChange={(e) => setPromoInput(e.target.value)}
                                    disabled={!!appliedPromo}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        paddingY: "9px",
                                        fontSize: { xs: "10px", sm: "11px", md: "12px" },
                                        backgroundColor: "#0B2E4C",
                                        color: "#fff"
                                    }}
                                    onClick={appliedPromo ? removePromoCode : applyPromoCode}
                                >
                                    {appliedPromo ? 'Remove' : 'Apply'} Promo Code
                                </Button>
                            </Grid>
                        </Grid>
                        {/* Purchase Buttons */}
                        <Grid container spacing={2} mt={1}>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" }, backgroundColor: "#0B2E4C", color: "#fff" }}
                                    disabled={calculateSubtotal() <= 0}
                                    onClick={handleBuyClick}
                                >
                                    Buy Online
                                </Button>
                            </Grid>
                            <PurchaseModal
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                                eventName={eventName}
                                eventId={eventId}
                                selectedTickets={getSelectedTickets()}
                                totalAmount={calculateTotal()}
                            />
                            <Grid item xs={12} sm={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" }, backgroundColor: "#0B2E4C", color: "#fff" }}
                                    disabled={calculateSubtotal() <= 0}
                                >
                                    Buy At a Physical Store
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ fontSize: { xs: "10px", sm: "11px", md: "12px" }, backgroundColor: "#0B2E4C", color: "#fff" }}
                                    disabled={calculateSubtotal() <= 0}
                                >
                                    Buy Via WhatsApp
                                </Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <HeadingCommon title={`Event Time: ${formatEventDate(date)}, ${formatTimeTo12Hour(time)}`} weight={400} baseSize="12px" />
                        </Box>
                    </Card>
                </Grid>

                {/* Location Map Section */}
                <Grid item xs={12} sm={6} md={6} alignContent={{ md: "center" }}>
                    <Card variant="outlined" sx={{ p: 3, backgroundColor: "#fafafa" }}>
                        <Typography fontWeight="bold" fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>Location</Typography>
                        <Typography fontSize={{ xs: "12px", sm: "14px", md: "16px" }}>
                            <strong>Full Address:</strong> {location}
                        </Typography>
                        <iframe
                            title="Location map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.379073403025!2d4.804463075231841!3d43.951522671089506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5eb86894c0b4f%3A0x2937b10bc1f0a963!2sCentre%20de%20congr%C3%A8s%20du%20Palais%20des%20Papes!5e0!3m2!1sen!2sin!4v1743656943350!5m2!1sen!2sin"
                            width="100%"
                            height="250"
                            loading="lazy"
                        />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
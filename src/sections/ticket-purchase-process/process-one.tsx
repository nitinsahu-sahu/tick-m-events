import { Box, Button, Grid, Select, Paper, TextField, Typography, MenuItem, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { useEffect, useState, useCallback } from "react";
import { eventByIdFetch, eventFetch } from "src/redux/actions/event.action";
import { ParticipantTable } from "src/components/tables/party-participant-table";
import { HeadProcess } from "./head-process";
import { availablePromoCodes, PromoCode } from "../front-home/utill";

interface Event {
    _id: string;
    eventName: string;
    date: string;
    time: string;
}

export function ProcessOne() {
    const dispatch = useDispatch<AppDispatch>();
    const { basicDetails, eventWithDetails } = useSelector((state: RootState) => state?.event);
    const [events, setEvents] = useState<Event[]>(basicDetails || []);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    // console.log('eventWithDetails', eventWithDetails);
    // Initialize state for ticket quantities
    const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>(() => {
        const initialQuantities: Record<string, number> = {};
        eventWithDetails?.tickets?.forEach((ticket: any) => {
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
    // Memoized fetch functions
    const fetchEvents = useCallback(async () => {
        try {
            await dispatch(eventFetch());
        } catch (err) {
            console.log(err.message || 'Failed to fetch event data');
        }
    }, [dispatch]);

    const fetchEventById = useCallback(async (id: string) => {
        if (!id) return;
        try {
            await dispatch(eventByIdFetch(id));
        } catch (error) {
            console.error("Failed to fetch event:", error);
        }
    }, [dispatch]);

    // Initial load - fetch all events once
    useEffect(() => {
        if (isInitialLoad && basicDetails.length === 0) {
            fetchEvents();
            setIsInitialLoad(false);
        }
    }, [basicDetails.length, fetchEvents, isInitialLoad]);

    // Set initial selected event when basicDetails loads
    useEffect(() => {
        if (basicDetails.length > 0 && !selectedEvent) {
            setEvents(basicDetails);
            setSelectedEvent(basicDetails[0]);
        }
    }, [basicDetails, selectedEvent]);

    // Only fetch event by ID when selectedEvent changes
    useEffect(() => {
        if (selectedEvent?._id) {
            fetchEventById(selectedEvent._id);
        }
    }, [selectedEvent?._id, fetchEventById]);

    // Update your handleEventChange function to use the correct type
    const handleEventChange = (event: SelectChangeEvent<string>) => {
        const eventId = event.target.value;
        const foundEvent = events.find(e => e._id === eventId);
        setSelectedEvent(foundEvent ?? null);
    };

    const processOneTableHeaders = ["#id", "Ticket Type ", "Unit Price (XAF)", "Included Benefits", "Selection"];
    const processOneTableData = [
        { id: "1", ticketType: "Standard (Sold Out)", unitPrice: "10,000 XAF", benefits: "General Access", selection: "1" },
        { id: "2", ticketType: "Premium", unitPrice: "20,000 XAF", benefits: "VIP Area + Free Drinks", selection: "1" },
        { id: "3", ticketType: "VIP", unitPrice: "30,000 XAF", benefits: "Backstage + Meet & Greet", selection: "1" },
    ];

    // Calculate subtotal before any discounts
    const calculateSubtotal = () => {
        let subtotal = 0;
        eventWithDetails?.tickets?.forEach((ticket: any) => {
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
                eventWithDetails?.tickets?.forEach((ticket: any) => {
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

    return (
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 3, position: "relative", mt: 3 }}>
            <HeadProcess title="Participant Details" step="1" />
            <Grid container spacing={3} mt={2} alignItems="center">
                <Grid item xs={12} sm={7} md={7}>
                    <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, backdropFilter: "blur(14px)" }}>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "14px", sm: "16px", md: "20px" }}>
                            Select Event
                        </Typography>

                        <Select
                            value={selectedEvent?._id || ''}
                            onChange={handleEventChange}
                            sx={{
                                mt: 2,
                                width: "100%",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'black' },
                                    '&:hover fieldset': { borderColor: 'black' },
                                    '&.Mui-focused fieldset': { borderColor: 'black' }
                                }
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select Event' }}
                        >
                            {events.length === 0 ? (
                                <MenuItem disabled value="">
                                    <em>No events available</em>
                                </MenuItem>
                            ) : (
                                events.map((event) => (
                                    <MenuItem key={event._id} value={event._id}>
                                        {event.eventName}
                                    </MenuItem>
                                ))
                            )}
                        </Select>

                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" sx={{ bgcolor: "#B0B0B0", borderRadius: 1, fontWeight: 400 }}>
                                &lt; Back
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: "#1F8FCD", borderRadius: 1, fontWeight: 400 }}>
                                Next &gt;
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Summary Section */}
                <Grid item xs={12} sm={5} md={5}>
                    <Paper sx={{ height: "100%", p: 3, boxShadow: 4, borderRadius: 2, backdropFilter: "blur(14px)" }}>
                        <Typography variant="h6" fontWeight={600} fontSize={{ xs: "14px", sm: "16px", md: "20px" }}>
                            Summary
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                            <Typography fontWeight={500} fontSize={{ xs: "10px", sm: "12px", md: "16px" }}>Tickets: 1</Typography>
                            <Typography fontWeight={500} fontSize={{ xs: "10px", sm: "12px", md: "16px" }}>Discount: None</Typography>
                            <Typography fontWeight={500} fontSize={{ xs: "10px", sm: "12px", md: "16px" }}>Payment: Credit Card</Typography>
                        </Box>
                        <Button variant="outlined" sx={{ borderRadius: 1, minWidth: "230px", flexGrow: 1, fontWeight: 500, color: "#0B2E4C", borderColor: "#0B2E4C", mt: 2 }}>
                            Net Amount To Be Paid :  $190.00
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            <Typography fontWeight={500} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} my={2}>
                Select Tickets
            </Typography>

            <ParticipantTable
                headers={processOneTableHeaders}
                data={eventWithDetails?.tickets}
                ticketQuantities={ticketQuantities}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
            />

            <Typography variant="h6" align="center" mt={3} fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }}>
                Total: {calculateSubtotal().toLocaleString()} XAF
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

            <Typography variant="h6" align="center" fontSize={{ xs: "18px", sm: "22px", md: "26px" }} fontWeight={600}>
                Net Amount: {calculateTotal().toLocaleString()} XAF
            </Typography>
            <Box mt={3} display="flex" justifyContent="center">
                <Button fullWidth variant="contained" sx={{ bgcolor: "#0B3558", mt: 2 }}>
                    Proceed to Participant Details
                </Button>
            </Box>
        </Box>
    );
}
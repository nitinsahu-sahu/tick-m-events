import { Box, Button, Grid, Select, Paper, TextField, Typography, MenuItem, SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from 'react-router-dom';

import { eventByIdFetch, eventFetch } from "src/redux/actions/event.action";
import { ParticipantTable } from "src/components/tables/party-participant-table";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { AppDispatch, RootState } from "src/redux/store";

import { HeadProcess } from "./head-process";
import { availablePromoCodes, PromoCode } from "../front-home/utill";
import { processOneTableHeaders } from "./utils";

interface Event {
    _id: string;
    eventName: string;
    date: string;
    time: string;
}

export function ProcessOne({ onTicketsSelected, onNext }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const { basicDetails, eventWithDetails } = useSelector((state: RootState) => state?.event);
    const [events, setEvents] = useState<Event[]>(basicDetails || []);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
    const [promoError, setPromoError] = useState('');
    const [searchParams] = useSearchParams();
    const eventIdFromUrl = searchParams.get('eventId');
    // Memoized event data
    const eventId = useMemo(() => eventWithDetails?._id || '', [eventWithDetails]);
    const tickets = useMemo(() => eventWithDetails?.tickets || [], [eventWithDetails]);
    const totalTicketsSelected = useMemo(
        () => Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0),
        [ticketQuantities]
    );
    // Initialize ticket quantities
    useEffect(() => {
        if (tickets.length > 0) {
            const initialQuantities: Record<string, number> = {};
            tickets.forEach((ticket: any) => {
                ticket.tickets.forEach((item: any) => {
                    initialQuantities[item._id] = ticketQuantities[item._id] || 0; // Preserve existing quantities
                });
            });
            setTicketQuantities(initialQuantities);
        }
    }, [tickets, ticketQuantities]); // Only run when tickets structure changes

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



    // Initial data loading

    useEffect(() => {
        if (isInitialLoad && basicDetails.length === 0) {
            fetchEvents();
            setIsInitialLoad(false);
        }
    }, [basicDetails.length, fetchEvents, isInitialLoad]);

    // Set initial selected event
    useEffect(() => {
        if (basicDetails.length > 0 && !selectedEvent) {
            setEvents(basicDetails);
            setSelectedEvent(basicDetails[0]);
        }
    }, [basicDetails, selectedEvent]);

    // Fetch event details when selected
    useEffect(() => {
        if (selectedEvent?._id) {
            fetchEventById(selectedEvent._id);
        }
    }, [selectedEvent?._id, fetchEventById]);

    // Add this useEffect to select the event from URL
    useEffect(() => {
        if (eventIdFromUrl && events.length > 0) {
            const foundEvent = events.find(e => e._id === eventIdFromUrl);

            if (foundEvent) {
                setSelectedEvent(foundEvent);
            }
        }
    }, [eventIdFromUrl, events]);
    // Event change handler
    const handleEventChange = useCallback((event: SelectChangeEvent<string>) => {
        const event_id = event.target.value;
        const foundEvent = events.find(e => e._id === event_id);
        setSelectedEvent(foundEvent ?? null);
    }, [events]);

    // Memoized calculations
    const calculateSubtotal = useCallback(() => {
        let subtotal = 0;
        tickets.forEach((ticket: any) => {
            ticket.tickets.forEach((item: any) => {
                const quantity = ticketQuantities[item._id] || 0;

                const price = item.price === "Free" ? 0 : parseFloat(item.price.replace(/[^0-9.]/g, ''))

                subtotal += quantity * price;
            });
        });
        return subtotal;
    }, [tickets, ticketQuantities]);

    const calculateDiscount = useCallback(() => {
        if (!appliedPromo) return 0;
        const subtotal = calculateSubtotal();

        switch (appliedPromo.type) {
            case 'percentage':
                return subtotal * (appliedPromo.value / 100);
            case 'simple':
                return Math.min(appliedPromo.value, subtotal);
            case 'group': {
                let totalFreeItems = 0;
                tickets.forEach((ticket: any) => {
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
    }, [appliedPromo, tickets, ticketQuantities, calculateSubtotal]);

    const calculateTotal = useCallback(() => {
        const subtotal = calculateSubtotal();
        const discount = calculateDiscount();
        return Math.max(0, subtotal - discount);
    }, [calculateSubtotal, calculateDiscount]);

    const getSelectedTickets = useCallback(() => {
        const selected: Array<{
            ticketType: string;
            quantity: number;
            unitPrice: number;
            ticketId: string;
        }> = [];

        tickets.forEach((ticket: any) => {
            ticket.tickets.forEach((item: any) => {
                const quantity = ticketQuantities[item._id] || 0;
                if (quantity > 0) {
                    selected.push({
                        ticketId: item.id,
                        ticketType: item.ticketType,
                        quantity,
                        unitPrice: item.price === "Free" ? 0 : parseFloat(item.price.replace(/[^0-9.]/g, ''))
                    });
                }
            });
        });

        return selected;
    }, [tickets, ticketQuantities]);

    // Memoized promo code handlers
    const applyPromoCode = useCallback(() => {
        setPromoError('');
        const promo = availablePromoCodes.find(p => p.code === promoInput.toUpperCase());

        if (!promo) {
            setPromoError('Invalid promo code');
            return;
        }

        const subtotal = calculateSubtotal();

        if (promo.minPurchase && subtotal < promo.minPurchase) {
            setPromoError(`Minimum purchase of ${promo.minPurchase.toLocaleString()} XAF required`);
            return;
        }

        setAppliedPromo(promo);
    }, [promoInput, calculateSubtotal]);

    const removePromoCode = useCallback(() => {
        setAppliedPromo(null);
        setPromoInput('');
        setPromoError('');
    }, []);

    // Ticket quantity handlers
    const handleDecrement = useCallback((ticketId: string) => {
        setTicketQuantities(prev => (prev[ticketId] <= 0 ? prev : {
            ...prev,
            [ticketId]: prev[ticketId] - 1
        }));
    }, []);

    const handleIncrement = useCallback((ticketId: string, maxTickets?: string) => {
        setTicketQuantities(prev => (maxTickets !== undefined && prev[ticketId] >= parseInt(maxTickets, 10) ? prev : {
            ...prev,
            [ticketId]: prev[ticketId] + 1
        }));
    }, []);

    // Effect for sending selection updates
    useEffect(() => {
        const selection = {
            tickets: getSelectedTickets(),
            totalAmount: calculateTotal(),
            eventId,
            ticketCount: totalTicketsSelected
        };
        onTicketsSelected(selection);
    }, [ticketQuantities, eventId, getSelectedTickets, calculateTotal, onTicketsSelected, totalTicketsSelected]);


    return (
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 3, position: "relative", mt: 3 }}>
            <HeadProcess title="Participant Details" step="1" />
            <Grid container spacing={3} mt={2} alignItems="center">
                <Grid item xs={12} sm={7} md={7}>
                    <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, backdropFilter: "blur(14px)" }}>

                        <HeadingCommon weight={600} variant="h6" title="Select Event" baseSize="20px" />

                        <Select
                            value={selectedEvent?._id || ''}
                            onChange={handleEventChange}
                            sx={{
                                mt: 2,
                                textTransform: "capitalize",
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
                                    <MenuItem key={event._id} value={event._id} sx={{ textTransform: "capitalize" }}>
                                        {event.eventName}
                                    </MenuItem>
                                ))
                            )}
                        </Select>

                        {/* <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button variant="contained" sx={{ bgcolor: "#B0B0B0", borderRadius: 1, fontWeight: 400 }}>
                                &lt; Back
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: "#1F8FCD", borderRadius: 1, fontWeight: 400 }}>
                                Next &gt;
                            </Button>
                        </Box> */}
                    </Paper>
                </Grid>

                {/* Summary Section */}
                <Grid item xs={12} sm={5} md={5}>
                    <Paper sx={{ height: "100%", p: 3, boxShadow: 4, borderRadius: 2, backdropFilter: "blur(14px)" }}>
                        <HeadingCommon weight={600} variant="h6" title="Summary" baseSize="20px" />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                            <HeadingCommon title={`Tickets: ${totalTicketsSelected}`} baseSize="16px" />
                            <HeadingCommon title={`Discount: -${calculateDiscount().toLocaleString() || 0} XAF`} baseSize="16px" />
                            <HeadingCommon
                                title={`Payment Method: ${eventWithDetails?.tickets?.[0]?.paymentMethods || 'Cash on Delivery'}`}
                                baseSize="16px"
                            />
                        </Box>
                        <Button variant="outlined" sx={{ borderRadius: 1, minWidth: "230px", flexGrow: 1, fontWeight: 500, color: "#0B2E4C", borderColor: "#0B2E4C", mt: 2 }}>
                            Net Amount To Be Paid :  {calculateTotal().toLocaleString()} XAF
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <HeadingCommon variant="h6" title="Select Tickets" baseSize="26px" />

            <ParticipantTable
                headers={processOneTableHeaders}
                data={eventWithDetails?.tickets}
                ticketQuantities={ticketQuantities}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
            />
            <Box
                display="flex"          // Enable Flexbox
                justifyContent="center" // Horizontal centering
                alignItems="center"     // Vertical centering
                width="100%"           // Ensure full width
            >
                <HeadingCommon
                    variant="h6"
                    title={`Total: ${calculateSubtotal().toLocaleString()} XAF`}
                    baseSize="26px"
                />
            </Box>

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
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
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
                <HeadingCommon
                    color="error"
                    title={promoError}
                    baseSize="14px"
                />
            )}

            <Box
                display="flex"          // Enable Flexbox
                justifyContent="center" // Horizontal centering
                alignItems="center"     // Vertical centering
                width="100%"           // Ensure full width
            >
                <HeadingCommon
                    variant="h6"
                    title={`Net Amount: ${calculateTotal().toLocaleString()} XAF`}
                    baseSize="26px"
                />
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
                <Button onClick={onNext} fullWidth variant="contained" sx={{ bgcolor: "#0B3558", mt: 2 }}
                    disabled={!selectedEvent || totalTicketsSelected < 1} >
                    Proceed to Participant Details
                </Button>
            </Box>
        </Box>
    );
}
import { Card, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

interface Event {
    _id: string;
    eventName: string;
    order: Order[];
    // Add other event properties as needed
}

export interface Order {
    _id: string;
    eventId: string;
    userId: string;
    tickets: Ticket[];
    totalAmount: number;
    paymentStatus: string;
    paymentMethod: string;
    transactionId: string;
    verifyEntry: boolean;
    ticketCode: string;
    createdAt: string;
}

interface Ticket {
    ticketId: string;
    ticketType: string;
    quantity: number;
    unitPrice: number;
    _id: string;
}

interface SelectTicketsProps {
    events: Event[];
    onEventSelectOrder: (order: Order | null) => void;
    selectedEventOrder: Order | null;
}

export function SelectTickets({ events, onEventSelectOrder, selectedEventOrder }: SelectTicketsProps) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    const handleEventChange = (eventId: string) => {
        const selected = events.find(e => e._id === eventId) || null;
        setSelectedEvent(selected);
        setOrders(selected?.order || []);
        onEventSelectOrder(null); // Reset order selection when event changes
    };

    const handleOrderChange = (orderId: string) => {
        const selected = orders.find(o => o._id === orderId) || null;
        onEventSelectOrder(selected);
    };

    return (
        <Card sx={{ p: 2, borderRadius: "12px", boxShadow: 3 }}>
            <HeadingCommon variant="body1" title="Select Event:" weight={600} />
            <Select
                fullWidth
                value={selectedEvent?._id || ''}
                onChange={(e) => handleEventChange(e.target.value as string)}
                sx={{
                    textTransform: 'capitalize',
                }}
            >
                <MenuItem value="" disabled>
                    Select an event
                </MenuItem>
                {events.map((event: Event) => (
                    <MenuItem
                        key={event._id}
                        value={event._id}
                        sx={{
                            fontSize: '0.8rem',
                            minHeight: '32px',
                            textTransform: 'capitalize',
                        }}
                    >
                        {event.eventName}
                    </MenuItem>
                ))}
            </Select>

            {selectedEvent && (
                <>
                    <HeadingCommon variant="body1" mt={2} title="Select Order:" weight={600} />

                    <Select
                        fullWidth
                        value={selectedEventOrder?._id || ''}
                        onChange={(e) => handleOrderChange(e.target.value as string)}
                        sx={{
                            textTransform: 'capitalize',
                        }}
                    >
                        <MenuItem value="" disabled>
                            Select an Order
                        </MenuItem>
                        {orders.map((order: Order) => (
                            <MenuItem
                                key={order._id}
                                value={order._id}
                                sx={{
                                    fontSize: '0.8rem',
                                    minHeight: '32px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {`Order - #${order.ticketCode}`}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            )}
        </Card>
    );
}
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { eventFetch, todayEventFetch } from "src/redux/actions/event.action";
import { PageTitleSection } from "src/components/page-title-section";
import { AppDispatch, RootState } from "src/redux/store";

import { Order, SelectTickets } from "../select-event";
import { TicketsStatus } from "../ticket-status";
import { TicketQRDisplay } from "../ticket-qr-display";
import { ScannedTickets } from "../scanned-tickets";


export function TicketValidationAtEntryView() {
    const { currentEvents } = useSelector((state: RootState) => state?.event);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedEventOrder, setSelectedEventOrder] = useState<Order | null>(null);
    const handleEventSelectOrder = (order: Order | null) => {
        setSelectedEventOrder(order);
    };
  
    useEffect(() => {
         dispatch(todayEventFetch());
    }, [dispatch]);

    return (
        <Box p={3}>
            <PageTitleSection
                title="Entry Validation"

            />

            <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
                <Grid item xs={12} md={6} sx={{ display: "flex" }} >
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        {/* Select Event and Order */}
                        <SelectTickets 
                            events={currentEvents} 
                            onEventSelectOrder={handleEventSelectOrder} 
                            selectedEventOrder={selectedEventOrder} 
                        />

                        {/* Ticket Status */}
                        <TicketsStatus selectedOrder={selectedEventOrder} />
                    </Box>
                </Grid>

                {/* Ticket QR Code */}
                <TicketQRDisplay selectedOrder={selectedEventOrder}/>

                {/* Scanned Tickets */}
                <ScannedTickets />
            </Grid>
        </Box>

    )
}
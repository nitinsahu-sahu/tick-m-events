import { Grid } from "@mui/material";
import { TicketCard } from "src/components/event-card/event-card";

export function DiscoverEvent({ list }: any) {
    return (
        <Grid container spacing={3} mt={3}>
            {list.map((ticketc: any, index: any) => (
                <Grid item xs={12} sm={6} md={6} key={ticketc.id || index}>
                    <TicketCard ticket={ticketc} key={index} />
                </Grid>
            ))}
        </Grid>
    )
}
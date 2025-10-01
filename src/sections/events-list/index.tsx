import { Typography, Box, Link, Grid, CardContent, Avatar, IconButton, Card } from "@mui/material";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Hero from "./Hero";
import EventBooking from "./EventBooking";

export function EventList() {
    return (
        <Box>
            <Header />
         <Hero/>
         <EventBooking/>
            <Footer />
        </Box>
    );
}
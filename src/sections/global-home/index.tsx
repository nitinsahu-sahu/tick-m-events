import { Box, Typography } from "@mui/material";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

import UpcomingEvents from "./upcoming-events";
import HeroSection from "./hero";
import LiveEventPromo from "./live-events";
import BrowseByType from "./browse-by-type";
import HowItWorks from "./how-it-work";
import EventsBlog from "./event-blog";
import TrustedExpertise from "./trusted-experties";

export function GlobalHome() {
    return (
        <Box>
            <Header />
            <HeroSection />
            <UpcomingEvents title="Upcoming Events" des="The world's leading car brands" />
            <LiveEventPromo />
            <BrowseByType />
            <HowItWorks />
            <UpcomingEvents title="Events Listings" des="Find the perfect events for any occasion" />
            <TrustedExpertise />
            <EventsBlog />
            <Footer />
        </Box>
    )
}
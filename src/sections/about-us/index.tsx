import { Typography, Box, Link, Grid, CardContent, Avatar, IconButton, Card } from "@mui/material";
import Footer from "src/components/Footer";
import { Header } from "src/components/Header";

import { HeroSection } from "./HeroSection";
import { OurAgent } from "./OurAgent";
import { MissionSection } from "./MissionSection";
import { TestimonialsSlider } from "./TestimonialsSlider";
import FAQSection from "./FAQSection";


export function AboutUs() {
    return (
        <>
            <Header />
            <HeroSection />
            <OurAgent/>
            <MissionSection/>
            <TestimonialsSlider/>
            <FAQSection/>
            <Footer />
        </>
    );
}
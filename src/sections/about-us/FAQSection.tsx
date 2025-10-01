import React, { useState } from "react";
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    IconButton,
    Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "What is TICK-M EVENTS?",
        answer: `TICK-M EVENTS is an all-in-one platform that simplifies the organization, management, and participation in events. It offers online ticketing, a marketplace to find reliable service providers (venues, caterers, artists, etc.), and innovative tools such as customized photo/video filters and much more.`,
    },
    {
        question: "How do I buy a ticket on TICK-M EVENTS?",
        answer: `• Search for the event you’re interested in using the search bar.
• Check the details (location, date, available ticket types).
• Select the ticket type and quantity.
• Enter your personal information.
• Choose a payment method (Mobile Money, bank card, transfer, or cash depending on the organizer).
• Instantly receive your electronic ticket with a QR Code and manual code.`,
    },
    {
        question: "How do I validate my ticket on the event day?",
        answer: `On the event day, simply present your QR Code or manual code (displayed on your phone or printed). The organizing team scans the code to confirm your entry.`,
    },
    {
        question: "I want to organize an event. How do I proceed?",
        answer: `• Create an organizer account on TICK-M EVENTS.
• Set up your event (title, description, date, location, images).
• Define your ticket types (free or paid).
• Customize your settings (visibility, notifications, photo/video filters).
• Publish the event and start selling your tickets immediately.`,
    },
    {
        question: "What are the benefits for organizers?",
        answer: `• Simple management of tickets and participants.
• Integrated marketing tools (promotions, notifications, social media sharing).
• Access to detailed statistics (sales, attendance rate, engagement).
• Secure and transparent payments.
• Ability to recruit service providers via the marketplace.`,
    },
    {
        question: "How does the TICK-M EVENTS marketplace work?",
        answer: `• Organizers post their needs (e.g., venue rental, catering, DJ).
• Interested service providers submit their offers.
• Both parties can discuss through the integrated messaging system.
• Once an agreement is reached, the contract is validated on the platform.
• TICK-M EVENTS charges a 10% commission to secure the transaction.`,
    },
    {
        question: "What are the benefits for service providers?",
        answer: `• Increased visibility among organizers and participants.
• Online messaging and contract management.
• Tracking of services through an integrated calendar.
• Secure payments and automatic invoice generation.`,
    },
    {
        question: "Are payments secure?",
        answer: `Yes, All payments are processed through secure solutions (Mobile Money, bank cards, transfers). In addition, TICK-M EVENTS applies a transparent commission system to protect both organizers and service providers.`,
    },
    {
        question: "How do customized photo/video filters work?",
        answer: `Each organizer can configure an official filter (frame, logo, colors) for their event. Participants can use it to take photos/videos before or during the event and either save them or share them directly on social media (WhatsApp, TikTok, Facebook, etc.).`,
    },
    {
        question: "How much does it cost to use TICK-M EVENTS?",
        answer: `• For participants: Access to the platform is free, you only pay for your tickets.
• For organizers: A commission is applied on each ticket sold.
• For service providers: Registration is free, but TICK-M EVENTS charges a small commission on contracts made via the marketplace.

👉 With TICK-M EVENTS, you get everything in one place: ticketing, event organization, service providers, photo/video tools, secure management, and much more.`,
    },
];

const blogPosts = [
    {
        image: "/assets/images/about/our-mission/our-mission.png",
        date: "18 Sep 2023",
        time: "6 mins",
        comments: "38 comments",
        tag: "News",
        title: "2025 Cadillac Escalade costs more money for a lot more tech",
        author: "Jimmy Dave",
        avatar: "/assets/users/jimmy.png",
    },
    {
        image: "/assets/images/about/our-mission/our-mission-1.png",
        date: "18 Sep 2023",
        time: "6 mins",
        comments: "38 comments",
        tag: "Trend",
        title: "2025 BMW 5 Series Review: A balanced luxury sedan",
        author: "Jimmy Dave",
        avatar: "/assets/users/jimmy.png",
    },
    {
        image: "/assets/images/about/our-mission/our-mission-2.png",
        date: "18 Sep 2023",
        time: "6 mins",
        comments: "38 comments",
        tag: "Discovery",
        title: "2025 Ruf Rodeo is ready to wrangle some rough roads",
        author: "Jimmy Dave",
        avatar: "/assets/users/jimmy2.png",
    },
];

export default function FAQSection() {
    const [expanded, setExpanded] = useState<number | false>(0);

    const handleChange = (panelIndex: number) => {
        setExpanded((prev) => (prev === panelIndex ? false : panelIndex));
    };
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: "#fff" }}>
            {/* ========== FAQ SECTION ========== */}
            <Box
                sx={{
                    minHeight: "100vh",
                    py: 8,
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        bgcolor: "#183153",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontSize: "12px",
                        mb: 2,
                        px: 2,
                        py: 0.5,
                        "&:hover": {
                            bgcolor: "#183153",
                        },
                    }}
                >
                    Our Support
                </Button>

                <Typography
                    variant="h5"
                    sx={{
                        color: "#000",
                        fontWeight: 900,
                        mb: 4,
                        textAlign: "center",
                        fontSize: "2.4rem",
                    }}
                >
                    Frequently Asked Questions
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        bgcolor: "#fff",
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === index}
                            onChange={() => handleChange(index)}
                            disableGutters
                            elevation={0}
                            sx={{
                                borderBottom: "1px solid #eee",
                                bgcolor: expanded === index ? "#f5f7fa" : "#fff",
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    expanded === index ? (
                                        <IconButton
                                            size="small"
                                            sx={{
                                                bgcolor: "#fff",
                                                color: "#000",
                                                border: "1px solid #000",
                                                "&:hover": { bgcolor: "#f0f0f0" },
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            size="small"
                                            sx={{
                                                bgcolor: "#000",
                                                color: "#fff",
                                                "&:hover": { bgcolor: "#333" },
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    )
                                }
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    px: 2,
                                    py: 1.5,
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="flex-start"
                                    sx={{ width: "100%" }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#000",
                                            width: "30px",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {`0${index + 1}`}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            color: "#000",
                                            flexGrow: 1,
                                            fontSize: "16px",
                                        }}
                                    >
                                        {faq.question}
                                    </Typography>
                                </Stack>
                            </AccordionSummary>

                            {faq.answer && (
                                <AccordionDetails
                                    sx={{
                                        pl: 9,
                                        pr: 3,
                                        pb: 3,
                                        color: "#000",
                                        fontSize: "14px",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {faq.answer}
                                </AccordionDetails>
                            )}
                        </Accordion>
                    ))}
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        mt: 4,
                        bgcolor: "#183153",
                        px: 4,
                        py: 1.5,
                        borderRadius: "6px",
                        fontWeight: 500,
                        textTransform: "none",
                        "&:hover": {
                            bgcolor: "#204470",
                        },
                    }}
                    onClick={() => navigate("/contact-us")}
                >
                    Contact Us →
                </Button>
            </Box>

            {/* ========== HR LINE ========== */}
            {/* <Box sx={{ borderTop: "1px solid #e0e0e0", mx: "auto", width: "90%", my: 6 }} /> */}

            {/* ========== BLOG / EVENT SECTION ========== */}
            {/* <Box sx={{ px: 2, maxWidth: "1050px", mx: "auto", mb: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "2.2rem",
                        fontWeight: 900,
                        textAlign: "center",
                        mb: 1,
                        color: "#1a1a1a",
                    }}
                >
                    Upcoming Cars & Events
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        mb: 4,
                        color: "#666",
                    }}
                >
                    Stay ahead with the latest car releases and upcoming events
                </Typography>

                <Grid container spacing={3}>
                    {blogPosts.map((post, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                                    bgcolor: "#fff",
                                }}
                            >
                                <Box sx={{ position: "relative" }}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{
                                            width: "100%",
                                            height: "220px", // fixed height for all images
                                            objectFit: "cover", // crops while keeping proportions
                                            display: "block",
                                        }}
                                    />

                                    <Chip
                                        label={post.tag}
                                        sx={{
                                            position: "absolute",
                                            bottom: -12,
                                            right: 16,
                                            bgcolor: "#0d72ea",
                                            color: "#fff",
                                            fontWeight: 500,
                                            fontSize: "0.75rem",
                                            px: 1.5,
                                            py: 0.5,
                                        }}
                                    />
                                </Box>

                                <Box sx={{ p: 2 }}>
                                    <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                            {post.date}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                            {post.time}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <ChatBubbleOutlineIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                            {post.comments}
                                        </Typography>
                                    </Stack>

                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1,
                                            color: "#000",
                                        }}
                                    >
                                        {post.title}
                                    </Typography>

                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Avatar src={post.avatar} sx={{ width: 24, height: 24 }} />
                                            <Typography variant="caption" fontWeight={600}>
                                                {post.author}
                                            </Typography>
                                        </Stack>

                                        <Button
                                            size="small"
                                            sx={{
                                                textTransform: "none",
                                                fontWeight: 500,
                                                px: 2,
                                                py: 0.5,
                                                fontSize: "0.75rem",
                                                borderRadius: 2,
                                                bgcolor: "#f5f5f5",
                                                "&:hover": { bgcolor: "#eaeaea" },
                                            }}
                                        >
                                            Keep Reading
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box> */}
        </Box>
    );
}

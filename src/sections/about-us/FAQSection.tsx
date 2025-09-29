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
    Avatar,
    Grid,
    Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const faqs = [
    {
        question: "How do I book a car rental with Carento?",
        answer:
            "Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.",
    },
    {
        question:
            "How do I book a car rental with Carento, and what options are available during the booking process?",
        answer: "",
    },
    {
        question:
            "What specific documents and identification are required to rent a car from Carento?",
        answer: "",
    },
    {
        question:
            "Is insurance automatically included in the rental price, and what additional coverage options are available?",
        answer: "",
    },
    {
        question:
            "Can I modify or cancel my booking after it’s been confirmed, and what are the terms and conditions?",
        answer: "",
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
                >
                    Contact Us →
                </Button>
            </Box>

            {/* ========== HR LINE ========== */}
            <Box sx={{ borderTop: "1px solid #e0e0e0", mx: "auto", width: "90%", my: 6 }} />

            {/* ========== BLOG / EVENT SECTION ========== */}
            <Box sx={{ px: 2, maxWidth: "1050px", mx: "auto", mb: 8 }}>
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
            </Box>
        </Box>
    );
}

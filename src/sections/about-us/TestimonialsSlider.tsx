import React from "react";
import Carousel from "react-material-ui-carousel";
import {
    Box,
    Typography,
    Avatar,
    Stack,
    Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const testimonials = [
    {
        name: "Sophia Moore",
        location: "New York",
        image: "/assets/images/users/user-1.png",
        rating: 5,
        heading: "Fantastic Service!",
        text: "Embarking on our dream vacation was made a breeze...",
    },
    {
        name: "Liam Johnson",
        location: "London",
        image: "/assets/images/users/user-2.png",
        rating: 5,
        heading: "Loved It!",
        text: "The overall process was efficient and enriching...",
    },
    {
        name: "Olivia Brown",
        location: "Paris",
        image: "/assets/images/users/user-3.png",
        rating: 4,
        heading: "Smooth & Easy",
        text: "The attention to detail made our trip stress-free...",
    },
    {
        name: "Noah Smith",
        location: "Berlin",
        image: "/assets/images/users/user-4.png",
        rating: 5,
        heading: "Highly Recommend",
        text: "A seamless experience from booking to return...",
    },
    {
        name: "Emma Wilson",
        location: "Toronto",
        image: "/assets/images/users/user-5.png",
        rating: 4,
        heading: "Great Support",
        text: "Highly recommend it to anyone traveling with family.",
    },
    {
        name: "James Davis",
        location: "Dubai",
        image: "/assets/images/users/user-6.png",
        rating: 5,
        heading: "Outstanding!",
        text: "Professional and courteous service every time.",
    },
];

function chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

export function TestimonialsSlider() {
    const groupedTestimonials = chunkArray(testimonials, 3);

    return (
        <Box
            sx={{
                py: { xs: 6, md: 10 },
                px: { xs: 2, md: 4 },
                maxWidth: "1200px",
                textAlign: "center",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 6,
                    fontSize: { xs: "1.8rem", md: "2.4rem" },
                    color: "#111",
                }}
            >
                What they say about us?
            </Typography>

            <Carousel
                autoPlay
                interval={5000}
                animation="slide"
                indicators
                navButtonsAlwaysInvisible
                duration={600}
                sx={{ overflow: "hidden" }}
            >
                {groupedTestimonials.map((group, groupIndex) => (
                    <Grid
                        container
                        spacing={3}
                        key={groupIndex}
                        justifyContent="center"
                        alignItems="stretch"
                    >
                        {group.map((testimonial, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box
                                    sx={{
                                        p: 4,
                                        borderRadius: 3,
                                        border: "1px solid #e0e0e0",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        textAlign: "left",
                                        bgcolor: "#fff",
                                    }}
                                >
                                    {/* Heading */}
                                    <Typography
                                        variant="h6"
                                        sx={{ color: "#000", fontWeight: 700, mb: 1 }}
                                    >
                                        {testimonial.heading}
                                    </Typography>

                                    {/* Description */}
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#101010", mb: 3, lineHeight: 1.6 }}
                                    >
                                        {testimonial.text}
                                    </Typography>

                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar src={testimonial.image} alt={testimonial.name} />
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {testimonial.location}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ flexGrow: 1 }} />
                                        <Stack direction="row" spacing={0.5}>
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        bgcolor: "#2296D4",
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: 1,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <StarIcon sx={{ fontSize: 16, color: "#fff" }} />
                                                </Box>
                                            ))}
                                        </Stack>

                                    </Stack>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Box>
    );
}

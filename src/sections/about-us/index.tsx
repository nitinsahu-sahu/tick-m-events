import { Typography, Box, Link, Grid } from "@mui/material";
import Footer from "src/components/Footer";
import { Header } from "src/components/Header";
import AgentsSection from "./meet-agents";
import UpcomingEvents from "../global-home/upcoming-events";
import GetMission from "./get-mission";
import StatsSection from "./counter";


const features = [
    {
        img: "/assets/images/about/fi_5035167.png",
        alt: "Instant Booking",
        title: "Instant Events Booking Easily",
        desc: "Choose from a diverse range of vehicles, from economy cars to luxury SUVs, to suit any need or occasion.",
    },
    {
        img: "/assets/images/about/fi_9099392.png",
        alt: "Transparent Pricing",
        title: "Transparent Pricing",
        desc: "Enjoy clear and upfront pricing with no surprises, ensuring you know exactly what you&apos;re paying for.",
    },
    {
        img: "/assets/images/about/fi_15305191.png",
        alt: "Convenient Booking",
        title: "Convenient Booking",
        desc: "Benefit from a variety of rental options, including short-term, long-term, and weekend specials.",
    },
    {
        img: "/assets/images/about/fi_9723160.png",
        alt: "Customer Support",
        title: "24/7 Customer Support",
        desc: "Get assistance whenever you need it with our dedicated support team available around the clock.",
    },
];

export function AboutUs() {
    return (
        <>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 6,
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        height: { xs: "60vh", md: "70vh" },
                        minHeight: "400px",
                        width: "100%",
                        maxWidth: "1000px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        backgroundImage: `url("/assets/background/about-hero.jpg")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {/* Black transparent overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            zIndex: 1,
                        }}
                    />

                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 2,
                            pl: { xs: 4, md: 8 },
                            maxWidth: "600px",
                            pt: 8, // Added more space from top
                        }}
                    >
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: { xs: "2.5rem", md: "3.5rem" },
                                mb: 2,
                            }}
                        >
                            About Us
                        </Typography>

                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                color: "white",
                                fontSize: { xs: "1rem", md: "1.2rem" },
                                mb: 4,
                                maxWidth: "500px",
                            }}
                        >
                            Get the latest news, updates and tips
                        </Typography>

                        {/* Breadcrumb navigation with border as shown in the image */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 1.5,

                                borderRadius: "8px",
                                border: "1px solid rgba(255, 255, 255, 0.7)",
                                width: "fit-content",
                            }}
                        >
                            <Link
                                href="#"
                                sx={{
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "500",
                                    fontSize: "1rem",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Home
                            </Link>

                            <Typography sx={{ color: "#ffffff", mx: 1, fontSize: "1rem" }}>›</Typography>

                            <Link
                                href="#"
                                sx={{
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    fontWeight: "500",
                                    fontSize: "1rem",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                About Us
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* First new section: Left heading & Right text */}
            <Box
                sx={{
                    px: { xs: 2, md: 4 },
                    py: { xs: 4, md: 8 },
                    maxWidth: "1050px",
                    mx: "auto",
                }}
            >
                <Grid
                    container
                    spacing={4}
                    alignItems="center"   // <-- important: vertical centering
                    justifyContent="center"
                >
                    {/* Heading Column */}
                    <Grid item xs={12} md={5}>
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: { xs: "1rem", md: "2.8rem" },
                                fontWeight: 700,
                                lineHeight: 1.2,
                                color: "#000",
                            }}
                        >
                            The Future of{" "}
                            <Box component="span" sx={{ color: "#2395d4" }}>
                                Amazing Event
                            </Box>{" "}
                            is Here
                        </Typography>
                    </Grid>

                    {/* Text Column */}
                    <Grid item xs={12} md={7}>
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                lineHeight: 1.6,
                                color: "#555",
                            }}
                        >
                            Welcome to Ticket-M, your trusted partner in car rentals. Since our founding, we have been committed to providing our customers with a seamless and reliable car rental experience. Whether you&#39;re planning a business trip, a family vacation, or just need a vehicle for everyday use, we offer a wide range of vehicles to meet your needs.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    py: { xs: 6, md: 10 },
                    px: { xs: 2, md: 4 },
                    maxWidth: "1050px",
                    mx: "auto",
                }}
            >
                <Grid container spacing={4}>
                    {/* Left: Image with overlay text */}
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                position: "relative",
                                height: "100%",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                "&:hover": {
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                },
                                transition: "box-shadow 0.3s ease",
                            }}
                        >
                            <Box
                                component="img"
                                src="/assets/images/about/about-2.png"
                                alt="Team discussing"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            {/* Overlay Box on the right */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 16,
                                    right: 16,
                                    backgroundColor: "#fff",
                                    px: 2,
                                    py: 1,
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        mr: 2,
                                        fontSize: { xs: "1.8rem", md: "2.2rem" }, // Number size
                                    }}
                                >
                                    86
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        lineHeight: 1.2,
                                        fontSize: { xs: "0.9rem", md: "1rem" }, // Text size
                                        textAlign: "left",
                                    }}
                                >
                                    Industry <br /> Experts
                                </Typography>
                            </Box>
                        </Box>

                    </Grid>

                    {/* Center: Portrait image */}
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                height: "100%",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                "&:hover": {
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                },
                                transition: "box-shadow 0.3s ease",
                            }}
                        >
                            <Box
                                component="img"
                                src="/assets/images/about/about-1.png"
                                alt="Portrait"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Right: Top box + Bottom image */}
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" spacing={4}>
                            {/* Top Blue Box */}
                            <Grid item>
                                <Box
                                    sx={{
                                        backgroundColor: "#2395d4",
                                        color: "#fff",
                                        px: 4,
                                        py: 3,
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 2, // space between number and text
                                        minWidth: "180px", // optional, ensures consistent box width
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: { xs: "1.3rem", md: "3.8rem" },
                                        }}
                                    >
                                        25
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: "0.9rem", md: "1.6rem" },
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Years in <br /> Business
                                    </Typography>
                                </Box>
                            </Grid>


                            {/* Bottom image */}
                            <Grid item>
                                <Box
                                    sx={{
                                        height: "100%",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        "&:hover": {
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                        },
                                        transition: "box-shadow 0.3s ease",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src="/assets/images/about/about.png"
                                        alt="Team dinner"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Features Section */}
                <Box
                    sx={{
                        px: { xs: 2, md: 4 },
                        py: { xs: 4, md: 8 },
                        maxWidth: "1050px",
                        mx: "auto",
                    }}
                >
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box>
                                    <Box
                                        component="img"
                                        src={feature.img}
                                        alt={feature.alt}
                                        sx={{ width: 40, height: 40, mb: 2 }}
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: "0.95rem", md: "1.1rem" } }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#666" }}>
                                        {feature.desc}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>

            <AgentsSection />

            <GetMission />

            <StatsSection />
            <UpcomingEvents des="Stay ahead with the latest car releases and upcoming events" title="Upcoming Cars & Events" />
            <Footer />
        </>
    );
}
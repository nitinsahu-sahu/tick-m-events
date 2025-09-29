import { Typography, Box,Grid, CardContent, Avatar, IconButton, Card } from "@mui/material";
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import YouTube from '@mui/icons-material/YouTube';
import Twitter from '@mui/icons-material/Twitter';

interface SocialIconProps {
    type: string;
}

const agents = [
    {
        name: "Cody Fisher",
        role: "CFO (Chief Financial Officer)",
        img: "/assets/images/about/teams/team-1.png",
        socials: ["instagram", "facebook", "x", "youtube"],
    },
    {
        name: "Darrell Steward",
        role: "CEO (Chief Executive Officer)",
        img: "/assets/images/about/teams/team-1.png",
        socials: ["instagram", "facebook", "x", "youtube"],
    },
    {
        name: "Ronald Richards",
        role: "COO (Chief Operating Officer)",
        img: "/assets/images/about/teams/team-1.png",
        socials: ["instagram", "facebook", "x", "youtube"],
    },
    {
        name: "Jerome Bell",
        role: "CMO (Chief Marketing Officer)",
        img: "/assets/images/about/teams/team-1.png",
        socials: ["instagram", "facebook", "youtube"],
    },
];

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

function SocialIcon({ type }: SocialIconProps) {
    switch (type) {
        case "facebook":
            return <Facebook fontSize="small" />;
        case "instagram":
            return <Instagram fontSize="small" />;
        case "youtube":
            return <YouTube fontSize="small" />;
        case "x":
            return <Twitter fontSize="small" />;
        default:
            return null;
    }
}
export function OurAgent() {
    return (
        <>
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
           <Box sx={{
                py: { xs: 6, md: 10 },
                px: { xs: 2, md: 4 },
                maxWidth: "1050px",
                mx: "auto",
            }}>
                {/* Horizontal Line */}
                <Box
                    sx={{
                        height: "2px",
                        backgroundColor: "grey.300",
                        width: "100%",
                        mb: 2,
                    }}

                />

                {/* Title Section - Left Aligned */}
                <Typography variant="subtitle1" sx={{ color: "gray.600", mb: 1, textAlign: "left" }}>
                    Awesome Teams
                </Typography>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 6,
                        fontSize: { xs: "1.8rem", md: "2.4rem" },
                        textAlign: "left",
                    }}
                >
                    Meet Our Agents
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {agents.map((agent, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                    "&:hover": {
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                    },
                                }}
                            >
                                <Avatar
                                    src={agent.img}
                                    alt={agent.name}
                                    variant="square"
                                    sx={{ width: "100%", height: 280, objectFit: "cover" }}
                                />
                                <CardContent sx={{ textAlign: "left" }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: "black" }}>
                                        {agent.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#737373", mb: 2 }}>
                                        {agent.role}
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
                                        {agent.socials.map((social, i) => (
                                            <Box
                                                key={i}
                                                sx={{
                                                    backgroundColor: "#F2F4F6",
                                                    borderRadius: "50%",
                                                    width: 36,
                                                    height: 36,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <IconButton size="small" sx={{ color: "black", p: 0 }}>
                                                    <SocialIcon type={social} />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box
                    sx={{
                        width: "100%",
                        height: "2px",
                        backgroundColor: "grey.300",
                        mt: 8,
                        mb: 4,
                    }}
                />

            </Box>
        </>

    );
}

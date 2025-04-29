import {
    Box,
    Button,
    Grid,
    Typography,
    TextField,
    Stack,
    Paper
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export function ClientReview() {
    const reviews = [
        {
            name: "Jean M.",
            rating: 5,
            comment: "Great atmosphere, very professional DJ!",
            date: "12/02/2024",
        },
        {
            name: "Jean M.",
            rating: 5,
            comment: "Great atmosphere, very professional DJ!",
            date: "12/02/2024",
        },
    ];
    return (
        <Box p={3} borderRadius={3} boxShadow={3} bgcolor="#FFFFFF" mt={3}>
            {/* Header */}
            <Box
                sx={{
                    borderRadius: "20px",
                    border: "1px solid #00000066",
                    backgroundColor: "#FFFFFF",
                    p: 2,
                    mb: 3,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    Client Reviews & Reputation
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                    <strong>4.8/5</strong> based on 20 reviews
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontSize: "14px" }}>
                    ★★★★★ - 18 | ★★★★☆ - 2 | ★★★☆☆ - 0 | ★★☆☆☆ - 0 | ★☆☆☆☆ - 0
                </Typography>

                <Stack direction="row" spacing={1} mt={2}>
                    {["Recent", "Best", "Lowest Rated"].map((label) => (
                        <Button
                            key={label}
                            variant="outlined"
                            sx={{
                                borderRadius: "10px",
                                borderColor: "#00000066",
                                textTransform: "none",
                                px: 2,
                                py: 0.5,
                                fontSize: "14px",
                                backgroundColor: "#fff",
                                color: "#000",
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                },
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Stack>
            </Box>

            {/* Reviews */}
            <Box
                sx={{
                    background: "#FFFFFF",
                    border: "1px solid #00000066",
                    borderRadius: "20px",
                    p: 2,
                }}
            >
                {reviews.map((review, index) => (
                    <Paper
                        key={index}
                        elevation={0}
                        sx={{
                            border: "none",
                            borderBottom: "1px solid #D3D3D3",
                            background: "transparent",
                            borderRadius: 0,
                            px: 2,
                            py: 3,
                            "&:last-child": {
                                borderBottom: "none",
                            },
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={9}>
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: "14px", color: "#000" }}
                                >
                                    {review.name}
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            fontSize="small"
                                            sx={{ color: "#FFB800", mr: 0.3 }}
                                        />
                                    ))}
                                </Box>

                                <Typography
                                    sx={{ fontSize: "12px", color: "#000", mt: 1, mb: 2 }}
                                >
                                    {review.comment}
                                </Typography>

                                <Grid item xs={12}>
                                    <Box

                                        sx={{
                                            width: "calc(100%)", // match padding (px: 2 -> 16px on each side)
                                            ml: "auto",
                                            mr: "auto",
                                        }}
                                    >
                                        <TextField
                                            multiline
                                            minRows={3}
                                            placeholder="Write a reply..."
                                            fullWidth
                                        />
                                    </Box>
                                </Grid>





                                <Button
                                    startIcon={<ChatBubbleOutlineIcon />}
                                    sx={{

                                        mt: 2,
                                        backgroundColor: "#0B2E4C",
                                        color: "#fff",
                                        textTransform: "none",
                                        px: 3,
                                        py: 0.7,
                                        fontSize: "12px",
                                        borderRadius: "10px",
                                        "&:hover": {
                                            backgroundColor: "#0B2E4C",
                                        },
                                    }}
                                >
                                    Reply to a Review
                                </Button>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sm={3}
                                textAlign={{ xs: "left", sm: "right" }}
                                display="flex"
                                justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                                alignItems="flex-start"
                            >
                                <Typography sx={{ fontSize: "12px", color: "#888" }}>
                                    {review.date}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Box>
        </Box>
    )
}
import { Button, Card, Grid, Typography } from "@mui/material";

export function ContactAndSharing() {
    return (
        <Card variant="outlined" sx={{ p: 3, mt: 3, backgroundColor: "#FAFAFA" }} >
            <Typography variant="h5" fontWeight={600} fontSize={{ xs: "28px", sm: "32px", md: "36px" }}>
                Contact and Sharing
            </Typography>

            <Typography fontWeight={600} fontSize={{ xs: "13px", sm: "17px", md: "21px" }} mt={2}>Organizer Contact Information</Typography>
            <Typography fontSize={{ xs: "13px", sm: "17px", md: "21px" }}><span style={{ fontWeight: "bold" }}>Name:</span> Jhon Doe</Typography>
            <Typography fontSize={{ xs: "13px", sm: "17px", md: "21px" }}><span style={{ fontWeight: "bold" }}>Email:</span> johndoe@example.com</Typography>
            <Typography my={1} fontWeight="bold" fontSize={{ xs: "13px", sm: "17px", md: "21px" }}>Quick Contact Link</Typography>

            <Button fullWidth variant="contained" sx={{ backgroundColor: "#0a2940" }}>
                Contact the Organizer
            </Button>
            <Typography my={2} fontWeight="bold" fontSize={{ xs: "13px", sm: "17px", md: "21px" }}>Social Media Sharing</Typography>

            {/* Social Media Buttons */}
            <Grid container spacing={2} >
                <Grid item xs={6} sm={6} md={3}>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: "#1877F2" }}>
                        Facebook
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: "black" }}>
                        Twitter
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: "#0A66C2" }}>
                        LinkedIn
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: "green" }}>
                        WhatsApp
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}
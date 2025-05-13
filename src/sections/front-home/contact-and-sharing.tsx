import { Button, Card, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function ContactAndSharing({ organizer }: any) {
    return (
        <Card variant="outlined" sx={{ p: 3, mt: 3, backgroundColor: "#FAFAFA" }} >
            <HeadingCommon variant="h5" title='Contact and Sharing' weight={600} baseSize="36px" />
            <HeadingCommon variant="h5" title='Organizer Contact Information' weight={600} baseSize="21px" mt={2} />
            <HeadingCommon variant="h5" title={`Name: ${organizer?.name}`} weight={600} baseSize="21px" />
            <HeadingCommon variant="h5" title={`Email: ${organizer?.email}`} weight={600} baseSize="21px" />
            <HeadingCommon variant="h5" title={`Website: ${organizer?.website}`} weight={600} baseSize="21px" />

            <Typography my={1} fontWeight="bold" fontSize={{ xs: "13px", sm: "17px", md: "21px" }}>Quick Contact Link</Typography>

            <Button href={`tel:${organizer?.number}`} fullWidth variant="contained" sx={{ backgroundColor: "#0a2940" }}>
                Call Now
            </Button>
            <Typography my={2} fontWeight="bold" fontSize={{ xs: "13px", sm: "17px", md: "21px" }}>Social Media Sharing</Typography>

            {/* Social Media Buttons */}
            <Grid container spacing={2} >
                {
                    organizer?.socialMedia?.facebook ?
                        <Grid item xs={6} sm={6} md={3}>
                            <Link to={organizer?.socialMedia?.facebook}>
                                <Button fullWidth variant="contained" sx={{ backgroundColor: "#1877F2" }}>
                                    Facebook
                                </Button>
                            </Link>
                        </Grid>
                        : null
                }
                {
                    organizer?.socialMedia?.whatsapp ?
                        <Grid item xs={6} sm={6} md={3}>
                            <a href={organizer?.socialMedia?.whatsapp} target="_blank" rel="noopener noreferrer">
                                <Button fullWidth variant="contained" sx={{ backgroundColor: "green" }}>
                                    WhatsApp
                                </Button>
                            </a>
                        </Grid>
                        : null
                }
                {
                    organizer?.socialMedia?.linkedin ?
                        <Grid item xs={6} sm={6} md={3}>
                            <Button fullWidth href={organizer?.socialMedia?.linkedin} variant="contained" sx={{ backgroundColor: "#0A66C2" }}>
                                LinkedIn
                            </Button>
                        </Grid>
                        : null
                }
                {
                    organizer?.socialMedia?.tiktok ?
                        <Grid item xs={6} sm={6} md={3}>
                            <Button fullWidth href={organizer?.socialMedia?.tiktok} variant="contained" sx={{ backgroundColor: "black" }}>
                                Tiktok
                            </Button>
                        </Grid>
                        : null
                }
            </Grid>
        </Card>
    )
}
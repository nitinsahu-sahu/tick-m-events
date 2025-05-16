import { Button, Card, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function ContactAndSharing({ organizer }: any) {
    return (
        <Card variant="outlined" sx={{ p: 3, mt: 3, backgroundColor: "#FAFAFA" }} >
            <HeadingCommon variant="h5" title='Contact and Sharing' weight={600} baseSize="36px" />
            <HeadingCommon variant="h5" title='Organizer Contact Information' weight={600} baseSize="21px" mt={2} />
            <HeadingCommon variant="h5" title={`Website: ${organizer?.website}`} weight={600} baseSize="21px" />

            <Typography my={1} fontWeight="bold" fontSize={{ xs: "13px", sm: "17px", md: "21px" }}>Quick Contact Link</Typography>

            <Button href="#" fullWidth variant="contained" sx={{ backgroundColor: "#0a2940" }}>
               Contact the Organizer
            </Button>
           
        </Card>
    )
}
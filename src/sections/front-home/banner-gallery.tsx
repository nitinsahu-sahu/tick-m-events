import { Card, Grid } from "@mui/material";
import ReactHtmlParser from 'react-html-parser';

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { formatEventDate, formatTimeTo12Hour } from "src/hooks/formate-time";


export function BannerGallery({ coverImage, eventName, description, date, time, portraitImage }: any) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Card
                    sx={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${coverImage?.url || "../assets/images/cover/banner-1.png"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "330px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        color: "white",
                        borderRadius: "15px",
                        p: 3,
                    }}
                />
            </Grid>

            {/* Side Gallery */}
            <Grid item xs={12} md={4}>
                <Card
                    sx={{
                        height: "330px",
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${portraitImage?.url || "../assets/images/cover/banner-2.png"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "10px",
                    }}
                />
            </Grid>
        </Grid>
    )
}
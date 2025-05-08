import { Card, Grid } from "@mui/material";
import ReactHtmlParser from 'react-html-parser';

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { formatEventDate, formatTimeTo12Hour } from "src/hooks/formate-time";


export function BannerGallery({ coverImage, eventName, description, date, time }: any) {
    const images = [
        '../assets/images/cover/banner-2.png',
        '../assets/images/cover/banner-3.png',
        '../assets/images/cover/banner-4.png'
    ];
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
                >
                    <HeadingCommon title={eventName} variant="h4" color="white" baseSize="54px" mb={0}/>
                    {ReactHtmlParser(description)}
                    <HeadingCommon color="white" title={`${formatEventDate(date)} | ${formatTimeTo12Hour(time)}`} weight={400} baseSize="16px" />

                </Card>
            </Grid>

            {/* Side Gallery */}
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    {images.map((img, index) => (
                        <Grid item xs={4} md={12} key={index}>
                            <Card
                                sx={{
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "100px",
                                    borderRadius: "10px",
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
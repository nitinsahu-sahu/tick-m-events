import { Card,Grid,Typography } from "@mui/material";


export function BannerGallery() {
    const images = [
        './assets/images/cover/banner-2.png',
        './assets/images/cover/banner-3.png',
        './assets/images/cover/banner-4.png'
    ];
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Card
                    sx={{
                        backgroundImage: `url('./assets/images/cover/banner-1.png')`,
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
                    <Typography variant="h4" fontWeight="bold">
                        Avignon Convention 2025
                    </Typography>
                    <Typography fontStyle="italic">&quot;Agile Internationally&quot;</Typography>

                    <Typography>Saturday, November 22, 2025 | 5:00 PM</Typography>
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
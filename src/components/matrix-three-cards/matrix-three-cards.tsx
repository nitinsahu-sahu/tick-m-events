import { Card, CardContent, Grid, Typography } from "@mui/material"


export function MatrixThreeCard({ metrics }:any) {
    return (
        <Grid container spacing={2} mt={2}>
            {
                metrics?.map((metric:any, index:any) => (
                    <Grid item xs={12} sm={4} md={4} key={index} sx={{ textAlign: "center" }}>
                        <Card sx={{
                            height: "100%",
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: "box-shadow 0.3s ease", // Smooth transition
                        }}>
                            <CardContent>
                                <Typography
                                    variant="subtitle2"
                                    color="black"
                                    fontSize={{ xs: "18px", sm: "20px", md: "22px" }}
                                    fontWeight={700}
                                    gutterBottom
                                >
                                    {metric.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color="#2295D4"
                                    fontWeight={700}
                                    fontSize={{ xs: "18px", sm: "20px", md: "22px" }}
                                >
                                    {metric.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )

}
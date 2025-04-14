import { Card, CardContent, Grid, Typography } from "@mui/material"
import { HeadingCommon } from "../multiple-responsive-heading/heading"


export function MatrixThreeCard({ metrics }: any) {
    return (
        <Grid container spacing={2} mt={2}>
            {
                metrics?.map((metric: any, index: any) => (
                    <Grid item xs={12} sm={4} md={4} key={index} sx={{ textAlign: "center" }}>
                        <Card sx={{
                            height: "100%",
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: "box-shadow 0.3s ease", // Smooth transition
                        }}>
                            <CardContent>
                                <HeadingCommon title={metric.title} variant="h4" baseSize="26px"/>
                                <HeadingCommon title={metric.value} color="#2295D4" baseSize="26px"/>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )

}
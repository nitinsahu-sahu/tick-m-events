import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { RootState } from "src/redux/store";

export function MainProfile({ onModify }: any) {
    const { profile } = useSelector((state: RootState) => state?.profile);
    const handleModifyClick = (rowData: any) => {
        onModify(rowData);  // Call the callback with row data
    };

    return (
        <Box boxShadow={3} borderRadius={3} bgcolor="#FFFFFF" mt={3} >
            {/* Banner Image */}
            <Box
                borderRadius="24px 24px 0px 0px"
                sx={{
                    width: "100%",
                    height: { xs: "150px", sm: "220px" },
                    backgroundImage:
                        "url('https://res.cloudinary.com/dm624gcgg/image/upload/v1745399695/a33ffade6c44792172af87c950e914099ba87c45_dg1rab.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Profile Info */}
            <Box display="flex" alignItems="center" gap={3} p={3} >
                <Box sx={{ position: "relative", mt: -5 }}>
                    <Avatar
                        src={profile?.avatar?.url}
                        alt="Profile"
                        sx={{
                            width: 90,
                            height: 90,
                        }}
                    />
                    {/* Inset Active Dot */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 4,
                            right: 4,
                            width: 12,
                            height: 12,
                            backgroundColor: "#04C832",
                            border: "2px solid white",
                            borderRadius: "50%",
                            zIndex: 1,
                        }}
                    />
                </Box>

                <Box sx={{marginTop:"-43px"}}>
                    <HeadingCommon variant="body1" title={profile?.name} weight={600} mb={0}/>
                    <HeadingCommon variant="body" title={profile?.username} weight={400} baseSize="16px"/>
                </Box>
            </Box>

            {/* Stats Section */}
            <Box sx={{ width: "100%", p: 2 }}>
                {/* Stats Box */}
                <Box
                    sx={{
                        borderRadius: "20px",
                        border: "1px solid #00000066",
                        backgroundColor: "#FFFFFF",
                        px: { xs: 2, sm: 3 },
                        py: { xs: 2, sm: 3 },
                        mb: 3,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3} textAlign="center">
                            <Typography fontSize="13px" color="#1E1E1E">
                                Overall Rating
                            </Typography>
                            <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                                4.8/5{" "}
                                <Typography component="span" fontSize="13px" color="#1E1E1E">
                                    (20 reviews)
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} textAlign="center">
                            <Typography fontSize="13px" color="#1E1E1E">
                                Completed Gigs
                            </Typography>
                            <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                                120
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} textAlign="center">
                            <Typography fontSize="13px" color="#1E1E1E">
                                Profile Views
                            </Typography>
                            <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                                250{" "}
                                <Typography component="span" fontSize="13px" color="#1E1E1E">
                                    this week
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} textAlign="center">
                            <Typography fontSize="13px" color="#1E1E1E">
                                Response Time
                            </Typography>
                            <Typography fontWeight="bold" fontSize="16px" mt={0.5}>
                                within 1h
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>


                {/* Action Buttons */}
                <Grid container spacing={2}>
                    {["Modify Profile", "Add a Service", "Update Availability", "Share Profile"].map((label, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Button
                                fullWidth
                                onClick={() => {
                                    if (label === "Modify Profile") {
                                        handleModifyClick(profile)// Log when "Modify Profile" is clicked
                                    }
                                    // Add other conditions if needed
                                }}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#032D4F",
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    py: 1.5,
                                    "&:hover": {
                                        backgroundColor: "#021f37",
                                    },
                                }}
                            >
                                {label}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
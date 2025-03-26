import { Box, Typography } from "@mui/material";

export function PageTitleSection({ title, desc, rightCom }: any) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: { xs: 3, md: 5 },
            }}
        >
            {/* Left Side - Dashboard Title & Subtitle */}
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        color: "#000",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#C0C0C0",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    {desc}
                </Typography>
            </Box>

            {/* Right Side - Countdown Box */}
            {rightCom ? <Box>{rightCom}</Box> : null}
        </Box>
    )
}
import { Box, Typography } from "@mui/material";
import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";

export function Mode() {

    return (
        <Box mt={3} mb={5} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
            <HeadingCommon title="Offline Mode (PWA)" color="#0B2E4C" weight={600} baseSize="33px" />

            <Typography variant="body1">
                <strong>Status:</strong>{" "}
                <span style={{ fontWeight: "bold", color: "#0B2A4A" }}>
                    Online – Sync Enabled
                </span>
            </Typography>
            <Typography variant="body1">
                <strong>Stored Offline Entries:</strong> 0
            </Typography>
        </Box>
    )
}
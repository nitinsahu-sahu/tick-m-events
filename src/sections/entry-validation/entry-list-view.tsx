import { Box, Button, TextField } from "@mui/material";

import { HeadingCommon } from "src/components/multiple-responsive-heading/heading";
import { EventValidationTable } from "src/components/tables/event-validation-table";
import { entryValidationData, entryValidationHeaders } from "./utills";

export function EntryListView() {
    return (
        <Box mt={3} boxShadow={3} borderRadius={3} p={3} bgcolor="white">
            <HeadingCommon title="Entry List View" color="#0B2E4C" weight={600} baseSize="33px" />

            <TextField fullWidth variant="outlined" placeholder="Search by Name" sx={{ mb: 2 }} />

            <EventValidationTable headers={entryValidationHeaders} data={entryValidationData} />

            <Box display="flex" gap={2} mt={2}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#0B2A4A",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        textTransform: "none"
                    }}
                >
                    Download as CSV
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#28A745",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        textTransform: "none"
                    }}
                >
                    Download as Excel
                </Button>
            </Box>
        </Box>
    )
}
import { Box, Button, Typography, Stack } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

// Custom Status Chip component
function StatusChip({ label, color }: { label: string; color: string }) {
    return (
        <Box display="flex" alignItems="center" gap={0.5}>
            <CircleIcon sx={{ color, fontSize: 12 }} />
            <Typography fontWeight={500} fontSize={13}>{label}</Typography>
        </Box>
    );
}

export function EventBreadCrum({ view, setView,eventInformation}: any) {

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            key={eventInformation?._id}
        >
            {/* Left Section: Event & Status */}
            <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                <Typography fontWeight={600} fontSize={13}>Event</Typography>
                <Typography color="text.secondary" fontSize={13}>/</Typography>
                <Typography color="text.secondary" fontSize={13}>{eventInformation?.eventName|| "select code"}</Typography>

                {/* Status Chips */}
                <Stack direction="row" spacing={1} alignItems="center" ml={4}>
                    <StatusChip label="Open" color="green" />
                    <StatusChip label="Pending" color="orange" />
                    <StatusChip label="Closed" color="red" />
                </Stack>
            </Box>

            {/* Right Section: Connection Status + View Buttons */}
            <Box display="flex" alignItems="center" gap={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight={600} fontSize={13}>Connection Status :</Typography>
                    <StatusChip label="Online" color="green" />
                    <StatusChip label="Offline" color="grey" />
                </Stack>

                <Box display="flex" gap={1}>
                    <Button
                        variant={view === 'scan' ? 'contained' : 'text'}
                        onClick={() => setView('scan')}
                        sx={{ fontSize: 13 }}
                    >
                        Scan View
                    </Button>
                    <Button
                        variant={view === 'list' ? 'contained' : 'text'}
                        onClick={() => setView('list')}
                        sx={{ fontSize: 13 }}
                    >
                        List View
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
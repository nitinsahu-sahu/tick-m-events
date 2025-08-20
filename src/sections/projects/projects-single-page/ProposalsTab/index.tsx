import { Box, Typography, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

export function ProposalsTab() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 2,
                backgroundColor: 'transparent'
            }}
        >
            <DescriptionIcon
                sx={{
                    fontSize: 64,
                    color: 'text.secondary',
                    mb: 2
                }}
            />

            <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
            >
                No Proposals Yet
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 400, mx: 'auto' }}
            >
                This project hasn&apos;t received any proposals yet.
                Check back later or be the first to submit a proposal!
            </Typography>
        </Paper>
    )
}
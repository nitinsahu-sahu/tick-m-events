import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export function Breadcrumb() {
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{m:1}}>
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                Our Events
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Armin van Buuren’s</Typography>
        </Breadcrumbs>

    )
}
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { HeadingCommon } from '../multiple-responsive-heading/heading';

export function Breadcrumb({eventName}:any) {
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
            <HeadingCommon title={eventName} color='#0C2E4E' weight={700} baseSize="15px" mb={0}/>
        </Breadcrumbs>

    )
}
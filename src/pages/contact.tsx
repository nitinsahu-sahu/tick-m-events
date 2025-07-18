import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
 
import { CONFIG } from 'src/config-global';
import { Contact } from 'src/sections/contact/view';
 
 
// ----------------------------------------------------------------------
 
export default function Page() {
    return (
        <>
            <Helmet>
                <title> {`Contact Us - ${CONFIG.appName}`}</title>
            </Helmet>
            <Contact />
 
        </>
    );
}
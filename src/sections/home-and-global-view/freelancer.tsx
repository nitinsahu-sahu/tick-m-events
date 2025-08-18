import { Typography, Box, Chip, Stack, Card, CardContent, } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CachedIcon from '@mui/icons-material/Cached';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { placeABidsFetch } from "src/redux/actions/provider/Home-Global-View/freelancer.action";
import { AppDispatch, RootState } from "src/redux/store";
import { NoDataFound } from "src/components/NoDataFound/no_project_found";

export function FreelancerJobCard() {

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                {/* Title and Budget */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold">
                        Senior angular/node dev
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Budget $750 – 1,500 USD
                    </Typography>
                </Box>

                {/* Description */}
                <Typography variant="body2" paragraph>
                    Hey I need angular/node dev with over 15-20 years of experience 1. Anguair 2. Node 3. Github 4. Experience with deployment using caching 5. Possible to change UI /UX 6. Creation of mobile version with suggested UI/UX I have already generated website(including small shop) using Claude how it should look like, need very experience person who will make the... more
                </Typography>

                {/* Skills */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
                    <Chip label="JavaScript" size="small" />
                    <Chip label="NoSQL Couch & Mongo" size="small" />
                    <Chip label="Node.js" size="small" />
                    <Chip label="Express JS" size="small" />
                    <Chip label="AngularJS" size="small" />
                    <Chip label="1 more" size="small" variant="outlined" />
                </Stack>

                {/* Rating and Proposals */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        {[...Array(5)].map((_, i) => (
                            <CheckCircleIcon key={i} color="primary" fontSize="small" />
                        ))}
                        <Typography variant="caption" ml={0.5}>
                            5.0
                        </Typography>
                        <CachedIcon fontSize="small" color="action" sx={{ ml: 1 }} />
                        <Typography variant="caption" ml={0.5}>
                            16
                        </Typography>
                    </Box>

                    <Box textAlign="right">
                        <Typography variant="caption" display="block" color="text.secondary">
                            203 bids
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            $1,121 USD average bid
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            3 minutes ago
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export function Freelancer() {
    const { _projects } = useSelector((state: RootState) => state.provider);
    console.log(_projects);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(placeABidsFetch())
    }, [dispatch])
    return (
        <Box >
            {
                !_projects || _projects.length === 0 ? (
                    <NoDataFound
                        message="No projects available"
                        actionText="Refresh"
                        onAction={() => window.location.reload()}
                    />
                ) : (
                    _projects?.map((_item: any, index: any) => (
                        <FreelancerJobCard />
                    ))
                )
            }
        </Box>
    );
}
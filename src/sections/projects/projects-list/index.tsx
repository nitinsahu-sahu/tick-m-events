import { Typography, Box, Chip, Stack, Card, CardContent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { AppDispatch, RootState } from "src/redux/store";
import { placeABidsFetch } from "src/redux/actions/provider/Home-Global-View/freelancer.action";
import { NoDataFound } from "src/components/NoDataFound/no_project_found";
import { DashboardContent } from "src/layouts/dashboard";


export function FreelancerJobCard({ project }: any) {
    const navigate = useNavigate();

const handleCardClick = (projectId: string) => {
  navigate(`/project/${projectId}`);
};
    return (
        <Card
            sx={{
                mt: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 6
                }
            }}
            onClick={(e) => {
                // Only navigate if the click is not on the "Show More" button
                const target = e.target as HTMLElement;
                if (!target.closest('.show-more-button, .MuiIconButton-root')) {
                    handleCardClick(project._id);
                }
            }}
        >
            <CardContent>
                {/* Title and Budget */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
                        {project.eventId?.eventName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" textTransform="capitalize">
                        Budget {project?.orgBudget} XAF
                    </Typography>
                </Box>

                {/* Event Location */}
                <Box alignItems="center" mb={1}>
                    <Typography variant="subtitle1" fontWeight={600} fontSize={12} textTransform="capitalize">
                        Event Location: <span style={{ color: "#3CB1F1" }}>{project.eventLocation}</span>
                    </Typography>
                </Box>

                {/* Description - Update TextWithShowMore to include class for detection */}
                <Box onClick={(e) => e.stopPropagation()}>
                    <TextWithShowMore text={project?.orgRequirement} />
                </Box>

                {/* Skills */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
                    <Chip label={project.categoryId?.name} size="small" />
                    <Chip label={project?.subcategoryName} size="small" />
                </Stack>

                {/* Rating and Proposals */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        {[...Array(5)].map((_, _idx) => (
                            <StarIcon
                                key={_idx}
                                fontSize="small"
                                sx={{
                                    color: _idx < Math.floor(project?.eventId?.averageRating || 0) ? '#f39c12' : '#ddd',
                                }}
                            />
                        ))}
                        <Typography variant="caption" ml={0.5}>
                            5.0
                        </Typography>
                    </Box>

                    <Box textAlign="right">
                        <Typography variant="caption" display="block" color="text.secondary">
                            {project?.bidsCount} bids
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            {project?.avgBids} XAF average bid
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export function ProjectsList() {
    const { _projects } = useSelector((state: RootState) => state.provider);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(placeABidsFetch())
    }, [dispatch])
    return (
        <DashboardContent>
            {
                !_projects || _projects.length === 0 ? (
                    <NoDataFound
                        message="No projects available"
                        actionText="Refresh"
                        onAction={() => window.location.reload()}
                    />
                ) : (
                    _projects?.map((_item: any) => (
                        <FreelancerJobCard project={_item} length={_projects.length} />
                    ))
                )
            }
        </DashboardContent>
    );
}

const TextWithShowMore = ({ text, wordLimit = 70 }: any) => {
    const [expanded, setExpanded] = useState(false);

    // Split text into words
    const words = text?.split(/\s+/) || [];
    const shouldTruncate = words.length > wordLimit;
    const displayText = expanded ? text : words.slice(0, wordLimit).join(' ');

    return (
        <Box>
            <Typography variant="body2" paragraph>
                {displayText}
                {shouldTruncate && !expanded && '...'}
            </Typography>

            {shouldTruncate && (
                <IconButton
                    size="small"
                    onClick={() => setExpanded(!expanded)}
                    sx={{
                        ml: -1,
                        color: 'text.secondary'
                    }}
                >
                    {expanded ? (
                        <ExpandLessIcon fontSize="small" />
                    ) : (
                        <ExpandMoreIcon fontSize="small" />
                    )}
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                        {expanded ? 'Show Less' : 'Show More'}
                    </Typography>
                </IconButton>
            )}
        </Box>
    );
};
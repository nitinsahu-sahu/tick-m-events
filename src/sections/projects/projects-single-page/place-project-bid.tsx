import {
    Box, Typography, Chip, Grid, Paper, Divider, Stack,
    TextField, MenuItem, Button,IconButton
} from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface FormData {
    requirement: string;
}

interface Milestone {
    id: number;
    description: string;
    amount: string;
    currency: string;
}

export function PlaceBidOnProject({ _project }: any) {
    const [bidData, setBidData] = useState<FormData>({
        requirement: ""
    });
    const [milestones, setMilestones] = useState<Milestone[]>([
        { id: 1, description: "", amount: "", currency: "XAF" }
    ]);
    const [charCounts, setCharCounts] = useState({
        requirement: 0,
        // ... other fields if needed
    });
    const [errors, setErrors] = useState({
        requirement: false,
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const charCount = value.length; // Count characters instead of words

        setCharCounts(prev => ({
            ...prev,
            [name]: charCount
        }));

        setErrors(prev => ({
            ...prev,
            [name]: charCount < 100 // Check against 100 characters instead of 80 words
        }));

        setBidData(prev => ({
            ...prev,
            [name]: value
        }));
    };

     const addMilestone = () => {
        if (milestones.length < 5) {
            setMilestones(prev => [
                ...prev,
                { id: Date.now(), description: "", amount: "", currency: "XAF" }
            ]);
        }
    };

    const removeMilestone = (id: number) => {
        if (milestones.length > 1) {
            setMilestones(prev => prev.filter(milestone => milestone.id !== id));
        }
    };

    const handleMilestoneChange = (id: number, field: keyof Milestone, value: string) => {
        setMilestones(prev => prev.map(milestone =>
            milestone.id === id ? { ...milestone, [field]: value } : milestone
        ));
    };

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 2,
                border: "3px solid #2395D4",
                mt: 3,

            }}
        >
            {/* Title */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Place a bid on this project
            </Typography>
            <Typography variant="body2" color="gray" mb={3}>
                You will be able to edit your bid until the project is awarded to someone.
            </Typography>

            {/* Bid Amount & Delivery Time */}
            <Grid container spacing={2} mb={3}>
                <Grid item xs={12} md={5}>
                    <Typography variant="subtitle2" mb={1}>
                        Bid Amount
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        defaultValue="20"
                        InputProps={{
                            endAdornment: <Typography sx={{ ml: 1 }}>XAF</Typography>,
                        }}
                        sx={{ border: "1px solid black", borderRadius: 1 }}
                    />

                </Grid>

                <Grid item xs={12} md={7}>
                    <Typography variant="subtitle2" mb={1}>
                        This project will be delivered in
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            variant="outlined"
                            size="small"
                            defaultValue="7"
                            sx={{ border: "1px solid black", borderRadius: 1 }}
                        />
                        <TextField
                            select
                            variant="outlined"
                            size="small"
                            defaultValue="Days"
                            sx={{ border: "1px solid black", borderRadius: 1 }}
                        >
                            <MenuItem value="Days">Days</MenuItem>
                            <MenuItem value="Weeks">Weeks</MenuItem>
                        </TextField>
                    </Stack>
                </Grid>
            </Grid>

            {/* Proposal */}
            <Typography variant="subtitle2" mb={1}>
                Describe your proposal (minimum 100 characters)
            </Typography>
            <TextField
                fullWidth
                multiline
                minRows={4}
                name="requirement"
                placeholder="What makes you the best candidate for this project?"
                variant="outlined"
                // sx={{ border: "1px solid black", borderRadius: 1, mb: 2 }}
                value={bidData.requirement}
                onChange={handleTextChange}
                error={errors.requirement}
                helperText={
                    <Typography variant="caption" color={errors.requirement ? "error" : "textSecondary"}>
                        {charCounts.requirement} characters (Minimum 100 characters required)
                    </Typography>
                }
            />

            {/* Milestone Payment */}
            <Divider sx={{ my: 2, borderColor: "#334155" }} />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight="bold">
                    Request milestone payments
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="caption" color="text.secondary">
                        {milestones.length}/5 milestones
                    </Typography>
                    <IconButton
                        onClick={addMilestone}
                        disabled={milestones.length >= 5}
                        size="small"
                        sx={{
                            backgroundColor: milestones.length >= 5 ? 'grey.300' : 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: milestones.length >= 5 ? 'grey.300' : 'primary.dark'
                            }
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>

            {milestones.map((milestone, index) => (
                <Grid container spacing={2} key={milestone.id} alignItems="center" mb={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder={`Milestone ${index + 1} description`}
                            variant="outlined"
                            size="small"
                            value={milestone.description}
                            onChange={(e) => handleMilestoneChange(milestone.id, 'description', e.target.value)}
                            sx={{ border: "1px solid black", borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            placeholder="Amount"
                            variant="outlined"
                            size="small"
                            value={milestone.amount}
                            onChange={(e) => handleMilestoneChange(milestone.id, 'amount', e.target.value)}
                            sx={{ border: "1px solid black", borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            select
                            fullWidth
                            value={milestone.currency}
                            onChange={(e) => handleMilestoneChange(milestone.id, 'currency', e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{ border: "1px solid black", borderRadius: 1 }}
                        >
                            <MenuItem value="XAF">XAF</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <IconButton
                            onClick={() => removeMilestone(milestone.id)}
                            disabled={milestones.length <= 1}
                            size="small"
                            sx={{
                                color: milestones.length <= 1 ? 'grey.400' : 'error.main'
                            }}
                        >
                            <RemoveIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}

            {/* Place Bid Button */}
            <Button variant="contained" color="success" fullWidth sx={{ py: 1.5, fontWeight: "bold" }}>
                Place Bid
            </Button>
        </Paper>
    )
}
import { useEffect, useState } from "react";
import {
    Grid, Card, CardContent, Typography, Button, Divider, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    InputAdornment, IconButton, Snackbar, Alert, ButtonProps
} from "@mui/material";
import { Visibility, VisibilityOff, ContentCopy } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/redux/store";
import { fetchAvailableRewards,fetchRewardHistory,redeemReward } from "src/redux/actions/rewardActions";
import { styled } from '@mui/material/styles';

type Reward = {
    _id: string;
    name: string;
    description: string;
    points: number;
    reason?: string;
    redeemCode?: string | null;
};

type RewardHistory = {
    id: string;
    name: string;
    points: string;
    date: string;
};

interface CustomButtonProps extends ButtonProps {
    customcolor?: {
        bg?: string;
        hover?: string;
        text?: string;
    };
}

const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'customcolor',
})<CustomButtonProps>(({ theme, customcolor }: any) => ({
    fontWeight: 600,
    borderRadius: '8px',
    textTransform: 'none',
    padding: '8px 5px',
    fontSize: '12px',
    background: customcolor?.bg || '#6c5ce7',
    color: customcolor?.text || 'white',
    '&:hover': {
        background: customcolor?.hover || '#5649c9',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    transition: 'all 0.3s ease',
}));

export const HeroSection = () => {
    const dispatch = useDispatch();
    const rewards = useSelector((state: RootState) => state.reward.rewards as Reward[]);
    const totalPoints = useSelector((state: RootState) => state.reward.totalPoints);
    const rewardHistory = useSelector((state: RootState) => state.reward.history as RewardHistory[]);
    const loading = useSelector((state: RootState) => state.reward.loading);

    useEffect(() => {
        dispatch(fetchAvailableRewards() as any);
          dispatch(fetchRewardHistory() as any)
    }, [dispatch]);

    const [open, setOpen] = useState(false);
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [generatedCode, setGeneratedCode] = useState<string>("");
    const [showCode, setShowCode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);


  const handleRedeemClick = async (reward: Reward) => {
    setSelectedReward(reward);
    setShowCode(false);

    const code = reward.redeemCode || `REWARD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGeneratedCode(code);

    // Only call API if no code exists
    if (!reward.redeemCode) {
        const result = await dispatch(redeemReward(reward._id, code) as any);

        if (result.status !== 200) {
            alert(`Failed to redeem reward: ${result.message}`);
            return;
        }
    }

    setOpen(true);
};


    const handleClose = () => {
        setOpen(false);
        setSelectedReward(null);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        setSnackbarOpen(true);
    };

    return (
        <>
            <Grid container spacing={3} mt={3}>
                {/* Available Rewards */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, width: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} fontSize={{ xs: "18px", sm: "22px", md: "26px" }} gutterBottom>
                                Available Rewards
                            </Typography>

                            {rewards.length === 0 ? (
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                                    <Typography color="text.secondary">No rewards available yet.</Typography>
                                </Box>
                            ) : (
                                rewards.map((reward, index) => (
                                    <Box key={index} mb={2}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                            <Typography fontWeight="bold">{reward.name}</Typography>
                                            <Typography fontWeight="bold">{reward.points.toLocaleString()} pts</Typography>
                                            <Button
                                                variant="contained"
                                                sx={{ bgcolor: "#0B3558", borderRadius: 1 }}
                                                onClick={() => handleRedeemClick(reward)}
                                            >
                                                Redeem
                                            </Button>
                                        </Box>
                                    </Box>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Reward History */}
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1, width: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" fontSize={{ xs: "18px", sm: "22px", md: "26px" }} fontWeight={600} gutterBottom>
                                Reward History
                            </Typography>

                            {loading ? (
                                <Typography color="text.secondary">Loading history...</Typography>
                            ) : rewardHistory.length === 0 ? (
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                                    <Typography color="text.secondary">No reward history found.</Typography>
                                </Box>
                            ) : (
                                rewardHistory.map((history, index) => (
                                    <Box key={history.id}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                                            <Typography fontWeight="bold">{history.name}</Typography>
                                            <Typography fontWeight="bold">{history.points}</Typography>
                                            <Typography fontWeight="bold">
                                                (Used on {new Date(history.date).toLocaleDateString()})
                                            </Typography>
                                        </Box>
                                        {index < rewardHistory.length - 1 && <Divider />}
                                    </Box>
                                ))
                            )}

                            <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                                {rewardHistory.length > 0 && (
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#0B3558",
                                            borderRadius: 1,
                                            minWidth: "180px",
                                            flexGrow: 1,
                                            fontWeight: 500,
                                        }}
                                    >
                                        View My History
                                    </Button>
                                )}

                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius: 1, minWidth: "230px", flexGrow: 1, fontWeight: 500, color: "#0B2E4C", borderColor: "#0B2E4C" }}
                                >
                                    Discover How to Earn More Points
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Redeem Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: '16px',
                        p: 3,
                    }}
                >
                    <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', color: 'white' }}>
                        🎁 Redeem Your Reward
                    </DialogTitle>

                    <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                        {selectedReward && (
                            <>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {selectedReward.name}
                                </Typography>
                                <Typography sx={{ opacity: 0.85 }}>
                                    Requires: <strong>{selectedReward.points.toLocaleString()} points</strong>
                                </Typography>
                                <Typography sx={{ mt: 2 }}>{selectedReward.description}</Typography>

                                <Box mt={3}>
                                    <TextField
                                        label="Your Code"
                                        type={showCode ? "text" : "password"}
                                        value={generatedCode}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowCode(!showCode)} sx={{ color: "white" }}>
                                                        {showCode ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                    <IconButton onClick={handleCopyCode} sx={{ color: "white" }}>
                                                        <ContentCopy />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ style: { color: "white" } }}
                                        sx={{
                                            input: { color: "white" },
                                            label: { color: "white" },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "rgba(255,255,255,0.3)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "white",
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </>
                        )}
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
                        <CustomButton
                            onClick={handleClose}
                            customcolor={{
                                bg: "#fff",
                                hover: "#f5f5f5",
                                text: "#333",
                            }}
                        >
                            Cancel
                        </CustomButton>
                        <CustomButton
                            onClick={() => {
                                handleClose();
                            }}
                            customcolor={{
                                bg: "#00cec9",
                                hover: "#00b7b1",
                                text: "white",
                            }}
                        >
                            Confirm Redeem
                        </CustomButton>
                    </DialogActions>
                </Box>
            </Dialog>


            {/* Snackbar for copy confirmation */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Code copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};

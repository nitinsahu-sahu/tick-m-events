import {
    Typography,
    Box,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton,
    Container,
    Divider
} from "@mui/material";
import {
    ContentCopy,
    Share,
    Email,
    Facebook,
    Twitter,
    WhatsApp,
    AccountBalanceWallet,
    People,
    Redeem
} from "@mui/icons-material";
import { useState } from "react";

export function Referral() {
    const [copied, setCopied] = useState(false);
    const referralLink = `https://tick-m-events.vercel.app?referrelCode=abc`
    const userPoints = 450; // Example current points
    const earnedFromReferrals = 300; // Example points earned from referrals

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = async (platform: any) => {
        const shareText = `Join me on this amazing platform! Use my referral link to get started and we'll both earn 100 points! ${referralLink}`;

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
                break;
            case 'email':
                window.open(`mailto:?subject=Join me!&body=${encodeURIComponent(shareText)}`, '_blank');
                break;
            default:
                if (navigator.share) {
                    navigator.share({
                        title: 'Join me!',
                        text: shareText,
                        url: referralLink,
                    });
                }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'primary.main',
                mb: 4
            }}>
                Referral Program
            </Typography>

            <Grid container spacing={4}>
                {/* Main Referral Card */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Redeem sx={{ fontSize: 60, mb: 2 }} />
                            <Typography variant="h4" gutterBottom>
                                Invite Friends & Earn Rewards
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                Share your referral link and get 100 points for each friend who joins
                            </Typography>
                        </Box>

                        <Box sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 3, borderRadius: 2, mb: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountBalanceWallet sx={{ mr: 1 }} />
                                Your Referral Link
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Paper
                                    sx={{
                                        flexGrow: 1,
                                        p: 1.5,
                                        bgcolor: 'rgba(255,255,255,0.9)',
                                        color: 'text.primary',
                                        borderRadius: 1,
                                        fontFamily: 'monospace',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {referralLink}
                                </Paper>
                                <Button
                                    variant="contained"
                                    startIcon={<ContentCopy />}
                                    onClick={handleCopyLink}
                                    sx={{ ml: 1, minWidth: 'auto' }}
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </Button>
                            </Box>

                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                Share this link with your friends. When they sign up using your link, you&apos;ll both receive 100 points!
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <Share sx={{ mr: 1 }} />
                                Share via
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                <IconButton
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                                    onClick={() => handleShare('whatsapp')}
                                >
                                    <WhatsApp />
                                </IconButton>
                                <IconButton
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                                    onClick={() => handleShare('facebook')}
                                >
                                    <Facebook />
                                </IconButton>
                                <IconButton
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                                    onClick={() => handleShare('twitter')}
                                >
                                    <Twitter />
                                </IconButton>
                                <IconButton
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                                    onClick={() => handleShare('email')}
                                >
                                    <Email />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Stats Sidebar */}
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                Your Referral Stats
                            </Typography>

                            <Box sx={{ flexGrow: 1, mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        p: 2,
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        minWidth: 80
                                    }}>
                                        <People sx={{ fontSize: 30 }} />
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            3
                                        </Typography>
                                        <Typography variant="body2">
                                            Friends Joined
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ml: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Successful Referrals
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            Keep inviting!
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Points from Referrals
                                    </Typography>
                                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                                        {earnedFromReferrals} pts
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Total Points
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {userPoints} pts
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Next Reward at
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        5 referrals • 500 pts
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Unlock exclusive benefits
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* How It Works Section */}
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    How It Works
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2
                            }}>
                                <Typography variant="h5">1</Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Share Your Link
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Copy your unique referral link or share it directly through social media
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2
                            }}>
                                <Typography variant="h5">2</Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Friends Join
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Your friends sign up using your referral link and start using the platform
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2
                            }}>
                                <Typography variant="h5">3</Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Earn Rewards
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You both receive 100 points when they complete their first action
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Box,
  Typography
} from '@mui/material';
import {
  Visibility as EyeIcon,
  Check as CheckIcon,
  Remove as MinusIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

export function ProviderBidsList() {
  const bids = [
    {
      project: "MERN Stack E-commerce...",
      timeToBid: "1 day, 20 hours",
      bidRank: "#12 of 41 bids",
      winningBid: "-",
      yourBid: "₹675.00 INR",
      actions: ["view", "check", "minus"],
      client: { country: "🇮🇳", rating: "-", reviews: 0 },
      chat: false,
    },
    {
      project: "Static WordPress Site",
      timeToBid: "3 hours, 24 minutes",
      bidRank: "#86 of 126 bids",
      winningBid: "SEALED",
      yourBid: "$24.00 USD",
      actions: ["view", "check", "minus"],
      client: { country: "🇵🇸", rating: "⭐ 5.0", reviews: 19 },
      chat: false,
    },
    {
      project: "Blog Website Home Page...",
      timeToBid: "53 minutes, 50 seconds",
      bidRank: "#100+ of 189 bids",
      winningBid: "-",
      yourBid: "$19.00 USD",
      actions: ["view", "check", "minus"],
      client: { country: "", rating: "Client has not been rated" },
      chat: false,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          
          boxShadow: 3
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="bids table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.800' }} >
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Project</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Time to bid</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Bid Rank</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Winning Bid</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Your Bid</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Actions Taken</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Client Information</TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', py: 2 }}>Chat Initiated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids.map((bid, index) => (
              <TableRow
                key={index}
                sx={{
                  borderTop: '1px solid',
                  borderColor: 'grey.700',
                  '&:hover': { backgroundColor: 'grey.800' }
                }}
              >
                <TableCell sx={{ color: 'black', py: 2 }}>
                  {bid.project}
                </TableCell>
                <TableCell sx={{ py: 2 }}>{bid.timeToBid}</TableCell>
                <TableCell sx={{ py: 2 }}>{bid.bidRank}</TableCell>
                <TableCell sx={{ py: 2 }}>
                  {bid.winningBid === "SEALED" ? (
                    <Chip
                      label="SEALED"
                      size="small"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  ) : (
                    bid.winningBid
                  )}
                </TableCell>
                <TableCell sx={{ py: 2 }}>{bid.yourBid}</TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" sx={{ color: 'grey.400' }}>
                      <EyeIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'grey.400' }}>
                      <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'grey.400' }}>
                      <MinusIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {bid.client.country && (
                      <Typography component="span" variant="body2">
                        {bid.client.country}
                      </Typography>
                    )}
                    <Typography component="span" variant="body2">
                      {bid.client.rating}
                    </Typography>
                    {bid.client.reviews !== undefined && (
                      <Typography component="span" variant="body2" color="grey.400">
                        💬 {bid.client.reviews}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ChatIcon />}
                    sx={{
                      backgroundColor: bid.chat ? 'success.main' : 'grey.700',
                      color: bid.chat ? 'white' : 'grey.400',
                      '&:hover': {
                        backgroundColor: bid.chat ? 'success.dark' : 'grey.600'
                      }
                    }}
                  >
                    Chat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
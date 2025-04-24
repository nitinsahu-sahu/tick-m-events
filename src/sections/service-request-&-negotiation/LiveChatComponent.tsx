import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import VideoCallIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';

type Message = {
  text: string;
  type: 'incoming' | 'outgoing';
  status: string;
};

const initialMessages: Message[] = [
  { text: 'Hello, can you confirm availability?', type: 'incoming', status: 'Seen' },
  { text: 'Sure—I’m free this weekend.', type: 'outgoing', status: 'Pending' },
  { text: 'Great! What is your final price?', type: 'incoming', status: 'Typing' },
  { text: 'Hello, can you confirm availability?', type: 'incoming', status: 'Seen' },
  { text: 'Sure—I’m free this weekend.', type: 'outgoing', status: 'Pending' },
  { text: 'Great! What is your final price?', type: 'incoming', status: 'Typing' },
  { text: 'Hello, can you confirm availability?', type: 'incoming', status: 'Seen' },
  { text: 'Sure—I’m free this weekend.', type: 'outgoing', status: 'Pending' },
  { text: 'Great! What is your final price?', type: 'incoming', status: 'Typing' },
];

const LiveChatComponent = () => {
  const [messages] = useState<Message[]>(initialMessages);
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2.5,
        p: 2,
        mt: 3,
        border: '1px solid #E0E0E0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Header */}
      <Typography variant="h6" fontWeight={600} mb={1}>
        Messaging & Negotiation
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        <strong>Status:</strong> <Box component="span">Under Negotiation</Box>
      </Typography>

      {/* Chat Container */}
      <Box mt={2} borderRadius={2.5} overflow="hidden">
        {/* Top Bar */}
        <Box
          sx={{
            backgroundColor: '#29B6F6',
            color: '#fff',
            px: 2,
            py: 1.2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight={600}>Live Chat</Typography>
          <Box>
            <IconButton>
              <VideoCallIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton>
              <PhoneIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Action Bar */}
        <Box
          sx={{
            backgroundColor: '#0D1B2A',
            px: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: 'white', color: '#0D1B2A', fontWeight: 600, borderRadius: 1.5 }}
          >
            Assign Project
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#0D1B2A',
              fontWeight: 600,
              borderRadius: 1.5,
            }}
          >
            Send Preliminary Contract
          </Button>
        </Box>

        {/* Chat Area */}

        <Box
          sx={{
            backgroundColor: '#F2F2F2',
            px: 3,
            py: 2,
            height: 300,
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '0px' },
            '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#bdbdbd', borderRadius: '8px' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#9e9e9e' },
          }}
        >
          {messages.map((msg, i) => (
            <Box key={i} mb={2}>
              {/* Bubble */}
              <Box
                sx={{
                  display: 'flex',
                  ...(msg.type === 'outgoing'
                    ? { justifyContent: 'flex-end' }
                    : { justifyContent: 'flex-start' }),
                }}
              >
                <Box
                  sx={{
                    backgroundColor: msg.type === 'outgoing' ? '#0D1B2A' : '#e0e0e0',
                    color: msg.type === 'outgoing' ? '#fff' : '#000',
                    borderRadius: 3,
                    px: 2,
                    py: 1,
                    maxWidth: '60%',
                    // For outgoing, push it fully to the right:
                    ...(msg.type === 'outgoing' && { marginLeft: 'auto' }),
                  }}
                >
                  <Typography>{msg.text}</Typography>
                </Box>
              </Box>
              {/* Status */}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 0.5,

                  textAlign: msg.type === 'outgoing' ? 'right' : 'left',
                  ...(msg.type === 'incoming' ? { ml: 1 } : { mr: 1 }),
                }}
              >
                {msg.status}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F2F2F2',
            pb: 2,
            px: 2,
          }}
        >
          <TextField
            placeholder="Type a message..."
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <AttachFileIcon sx={{ color: '#000' }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '20px',
                backgroundColor: 'white',
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 2,
              px: 3,
              backgroundColor: '#0D1B2A',
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LiveChatComponent;

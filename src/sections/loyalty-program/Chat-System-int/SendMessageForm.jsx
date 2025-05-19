import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useChat } from 'src/redux/context/ChatContext';

const SendMessageForm = () => {
  const [message, setMessage] = useState('');
  const { currentChat, sendMessage } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && currentChat) {
      sendMessage(message, currentChat.receiverId);
      setMessage('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, display: 'flex' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton type="submit" color="primary" disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default SendMessageForm;
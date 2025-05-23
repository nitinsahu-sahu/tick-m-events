import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography,Paper } from '@mui/material';
import { useChat } from 'src/redux/contaxt/ChatContext';

import ChatList from './ChatList';
import ChatWindow from './ChatWindow';


export type User = {
    _id: string;
    name: string;
    role: 'admin' | 'provider' | 'participant' | 'organizer';
};

interface ChatPageProps {
  currentUser: User;
}

const ChatPage: React.FC<ChatPageProps> = ({ currentUser }) => {
  const { initSocket } = useChat();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) {
      initSocket(currentUser?._id);
    }

    return () => {
      // Cleanup if needed
    };
  }, [currentUser,initSocket]);

  return (
    <Box sx={{ height: '100vh', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Logged in as: {currentUser.name} ({currentUser.role})
      </Typography>
      
      <Grid container spacing={2} sx={{ height: 'calc(100% - 120px)' }}>
        <Grid item xs={12} md={4} sx={{ height: '100%', overflow: 'hidden' }}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <ChatList 
              currentUser={currentUser} 
              onSelectUser={setSelectedUser} 
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          <Paper sx={{ height: '100%' }}>
            <ChatWindow 
              currentUser={currentUser} 
              selectedUser={selectedUser} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatPage;
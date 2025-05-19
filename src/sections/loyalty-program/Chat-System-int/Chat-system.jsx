import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import ChatMessages from './ChatMessages';
import SendMessageForm from './SendMessageForm';

export function ChatSystem() {
  const { currentChat, organizers, startChat } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrganizers = organizers.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Grid container sx={{ height: '80vh' }}>
      <Grid item xs={4} sx={{ borderRight: '1px solid #e0e0e0' }}>
        <Box p={2}>
          <Typography variant="h6">Organizers</Typography>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Search organizers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <List>
          {filteredOrganizers.map(organizer => (
            <ListItem key={organizer._id} disablePadding>
              <ListItemButton
                selected={currentChat?.receiverId === organizer._id}
                onClick={() => startChat(organizer._id, organizer.name)}
              >
                <ListItemText primary={organizer.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={8}>
        {currentChat ? (
          <>
            <Box p={2} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="h6">{currentChat.receiverName}</Typography>
            </Box>
            <ChatMessages />
            <Divider />
            <SendMessageForm />
          </>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h6" color="textSecondary">
              Select an organizer to start chatting
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
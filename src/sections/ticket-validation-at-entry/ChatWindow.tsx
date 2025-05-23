import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Avatar, Typography, Paper } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useChat } from 'src/redux/contaxt/ChatContext';

export type User = {
    _id: string;
    name: string;
    role: 'admin' | 'provider' | 'participant' | 'organizer';
};

interface ChatWindowProps {
    currentUser: User;
    selectedUser: User | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentUser, selectedUser }) => {
    const { currentChat, sendMessage } = useChat();
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [currentChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = () => {
        if (message.trim() === '' || !selectedUser) return;

        sendMessage(currentUser._id, selectedUser._id, message);
        setMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!selectedUser) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                bgcolor: 'background.default'
            }}>
                <Typography variant="h6" color="text.secondary">
                    Select a user to start chatting
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            bgcolor: 'background.default'
        }}>
            <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                <Typography variant="h6">
                    {selectedUser.name} ({selectedUser.role})
                </Typography>
            </Paper>

            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                bgcolor: 'background.paper'
            }}>
                <List>
                    {currentChat.map((msg, index) => (
                        <ListItem key={index} sx={{
                            justifyContent: msg.senderId === currentUser._id ? 'flex-end' : 'flex-start'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: msg.senderId === currentUser._id ? 'row-reverse' : 'row',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <Avatar>
                                    {msg.senderId === currentUser._id ?
                                        currentUser.name.charAt(0) :
                                        selectedUser.name.charAt(0)}
                                </Avatar>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: msg.senderId === currentUser._id ? 'primary.main' : 'secondary.main',
                                    color: msg.senderId === currentUser._id ? 'primary.contrastText' : 'secondary.contrastText'
                                }}>
                                    <ListItemText
                                        primary={msg.message}
                                        secondary={new Date(msg.timestamp).toLocaleTimeString()}
                                    />
                                </Paper>
                            </Box>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        sx={{ height: '56px' }}
                    >
                        <SendIcon />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatWindow;
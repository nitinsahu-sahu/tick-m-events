import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';


const ChatMessages = () => {
    const { messages } = useChat();
    const { _id } = useSelector((state) => state?.auth?.user || 'participant');

    return (
        <Box sx={{ height: '60vh', overflowY: 'auto', p: 2 }}>
            <List>
                {messages.map((message, index) => (
                    <ListItem key={index} sx={{
                        justifyContent: message.sender === _id ? 'flex-end' : 'flex-start'
                    }}>
                        <Box sx={{
                            maxWidth: '70%',
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: message.sender === _id ? 'primary.main' : 'grey.200',
                            color: message.sender === _id ? 'primary.contrastText' : 'text.primary'
                        }}>
                            <ListItemText
                                primary={message.content}
                                secondary={
                                    <Typography variant="caption" color={message.sender === _id ? 'primary.contrastText' : 'text.secondary'}>
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </Typography>
                                }
                            />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ChatMessages;
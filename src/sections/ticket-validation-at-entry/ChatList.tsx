import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography, Divider } from '@mui/material';
import { useChat } from 'src/redux/contaxt/ChatContext';



export type User = {
    _id: string;
    name: string;
    role: 'admin' | 'provider' | 'participant' | 'organizer';
};

interface ChatListProps {
    currentUser: User;
    onSelectUser: (user: User) => void;
}

const ChatList: React.FC<ChatListProps> = ({ currentUser, onSelectUser }) => {
    const { conversations, getConversations } = useChat();
    const [organizers, setOrganizers] = useState<User[]>([]);

    useEffect(() => {
        if (currentUser) {
            getConversations(currentUser._id);

            // Fetch organizers if current user is participant
            if (currentUser.role === 'participant') {
                fetchOrganizers();
            }
        }
    }, [currentUser, getConversations]);
    const fetchOrganizers = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/auth/users/organizer`);
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            const data = await response.json();
            setOrganizers(data);
        } catch (err) {
            console.error('Error fetching organizers:', err);
        }
    };
    const handleSelectUser = (user: User) => {
        onSelectUser(user);
    };

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {currentUser.role === 'participant' && organizers.map(organizer => (
                <ListItem
                    key={organizer._id}
                    button
                    onClick={() => handleSelectUser(organizer)}
                >
                    <ListItemAvatar>
                        <Avatar>{organizer.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={organizer.name}
                        secondary="Organizer"
                    />
                </ListItem>
            ))}

            {conversations.map(conv => (
                <React.Fragment key={conv._id}>
                    <ListItem
                        button
                        onClick={() => handleSelectUser({
                            _id: conv._id,
                            name: conv.name,
                            role: conv.role
                        })}
                    >
                        <ListItemAvatar>
                            <Badge badgeContent={conv.unreadCount} color="error">
                                <Avatar>{conv.name.charAt(0)}</Avatar>
                            </Badge>
                        </ListItemAvatar>
                        <ListItemText
                            primary={conv.name}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        sx={{ display: 'inline' }}
                                    >
                                        {conv.lastMessage.message.substring(0, 30)}...
                                    </Typography>
                                    {` — ${new Date(conv.lastMessage.timestamp).toLocaleTimeString()}`}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};

export default ChatList;
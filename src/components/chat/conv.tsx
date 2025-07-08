import { Box, Avatar, Typography, TextField, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client'
import { fetchConversation, fetchConversationUserList, fetchMessagesbyConvId } from 'src/redux/actions/message.action';

import { AppDispatch, RootState } from 'src/redux/store';
import { formatTimeToAMPM } from 'src/hooks/formate-time';
import axios from '../../redux/helper/axios'

interface UnreadCounts {
  [conversationId: string]: number;
}

interface avatar {
  public_id: string;
  url: string;
}

interface Organizer {
  _id: string;
  name: string;
  email: string;
  avatar: avatar;
}

interface Event {
  _id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  averageRating: number;
}

interface ServiceRequest {
  _id: string;
  serviceType: string;
  budget: string;
  description: string;
  additionalOptions: string;
}

interface ProviderProposal {
  amount: number | null;
  days: number;
  message: string;
}

interface ConversationUser {
  _id: string;
  eventId: Event;
  organizerId: Organizer;
  serviceRequestId: ServiceRequest;
  providerId: string;
  status: string;
  contractStatus: string;
  orgBudget: number;
  orgRequirement: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  providerHasProposed: boolean;
  providerProposal: ProviderProposal;
}

interface User {
  userId: string;
  socketId: string;
}

interface Message {
  msgId?: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  message: string;
  updatedAt?: string;
  type: string;
  senderDeleteStatus?: string;
  receiverDeleteStatus?: string;
  tempId?: string; // Make this optional
}

interface ConversationData {
  convId: any;
  userData: any;
  _id: string;
}

interface MessagesState {
  conversationId?: string;
  receiver?: {
    receiverId: string;
  };
  messages: Message[];
}

interface User {
  _id: string;
  receiverId: string;
  email: string;
  name: string;
  avatar: string;
}

interface SelectedUser {
  user: User;
  conversationId: string;
}

export function ChatPanel() {
  const [selectedOption, setSelectedOption] = useState<SelectedUser>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state?.auth);
  const [convUser, setConvUser] = useState<ConversationUser | null>(null);
  const { conv, userList } = useSelector((state: RootState) => state.allMessages);
  const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({});
  console.log('====================================');
  console.log('selectedOption', selectedOption);
  console.log('conv', conv);
  console.log('====================================');
  const [messages, setMessages] = useState<MessagesState>({
    messages: []
  });
  const individualMsgList = useSelector((state: RootState) => state.allMessages.messages);

  const [conversations, setConversations] = useState<any>({});
  const [isConvId, setIsConvId] = useState<ConversationData | undefined>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState<User[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    dispatch(fetchConversation());
    dispatch(fetchConversationUserList());

  }, [dispatch]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('addUser', user?._id);

      const handleGetMessage = (data: {
        senderId: string;
        message: string;
        conversationId: string;
        receiverId: string;
        user: {
          _id: string;
          name: string;
          email: string;
          profile: string;
        };
        type: string;
        updatedAt?: string;
      }) => {
        if (data.conversationId === messages.conversationId) {
          // If message is for current conversation, add to messages
          setMessages(prev => ({
            ...prev,
            messages: [
              ...prev.messages,
              {
                user: data.user,
                message: data.message,
                updatedAt: data.updatedAt,
                type: data.type,
              }
            ]
          }));
        } else {
          // If message is for another conversation, increment unread count
          setUnreadCounts(prev => ({
            ...prev,
            [data.conversationId]: (prev[data.conversationId] || 0) + 1
          }));
        }
      };

      socket.on('getMessage', handleGetMessage);
      socket.on('getUsers', (users: User[]) => setOnline(users));

      return () => {
        socket.off('getMessage', handleGetMessage);
        socket.off('getUsers');
      };
    }
    return undefined; // Explicit return to satisfy ESLint
  }, [socket, messages?.conversationId, user?._id]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const receiverId = typeof messages?.receiver === 'string'
      ? messages?.receiver
      : messages?.receiver?.receiverId;

    if (!receiverId && messages?.conversationId === 'new') {
      console.error('Receiver ID is required for new conversation');
      return;
    }

    const tempMessageId = Date.now().toString(); // Temporary ID for optimistic update
    const messageData = {
      conversationId: messages?.conversationId,
      senderId: user?._id,
      message,
      receiverId,
      type: "text"
    };

    // Optimistic update
    setMessages(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          user: {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            profile: user?.profile
          },
          message,
          updatedAt: new Date().toISOString(),
          type: "text",
          tempId: tempMessageId
        }
      ]
    }));

    setMessage('');

    try {
      // Emit socket event first
      socket?.emit('sendMessage', {
        ...messageData,
        user: {
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          profile: user?.profile
        },
        updatedAt: new Date().toISOString()
      });

      // Then send to server
      await axios.post(`/conv/message`, messageData);

    } catch (error) {
      console.error('Error sending message:', error);
      // Rollback optimistic update on error
      setMessages(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.tempId !== tempMessageId)
      }));
    }
  };

  useEffect(() => {
    setMessages(individualMsgList)
  }, [individualMsgList])

  const fetchMessages = async (conversationId: any, receiver: any) => {
    dispatch(fetchMessagesbyConvId(conversationId, receiver, user?._id));
  };

  const fetchMsgData = (convId: string | undefined, userData: any) => {

    // If convId is undefined or null, it will default to "new"
    fetchMessages(convId, userData);
    if (convId) {
      setUnreadCounts(prev => ({
        ...prev,
        [convId]: 0
      }));
    }

    const covData = {
      convId: convId || "new",
      userData,
      _id: user?._id
    };
    setIsConvId(covData);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`/conv/conversations?userId=${convUser?.organizerId?._id || selectedOption}`);
        setConversations(response?.data);
      } catch (error) {
        console.log("Conversation not found");
      }
    };

    fetchConversations();
  }, [messages, convUser?.organizerId?._id, selectedOption]);

  return (
    <Box sx={{
      display: 'flex',
      height: 'calc(100vh - 105px)', // Adjust based on your layout
      border: '1px solid #e0e0e0',
      borderRadius: 3,
      my: 1
    }}>
      {/* Users List */}
      <Box sx={{
        width: 300,
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto'
      }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          Chats
        </Typography>
        {conv?.length > 0 ? (
          <List sx={{ flex: 1 }}>
            {conv?.map((item: any, index: any) => (
              <ListItem
                key={item._id || index}
                button
                onClick={() => {
                  setSelectedOption(item)
                  fetchMsgData(item.conversationId, item.user)
                }}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#f5f5f5'
                  },
                  backgroundColor: selectedOption?.conversationId === item.conversationId
                    ? item.user.isOrganizer
                      ? '#e3f2fd'
                      : '#f5f5f5'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: item.user.isOrganizer
                      ? '#e3f2fd'
                      : '#fafafa'
                  }
                }}
                selected={selectedOption?.conversationId === item.conversationId}
              >
                <ListItemAvatar>
                  <Avatar src={item.user.avatar} alt={item.user.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box >
                      <Typography>{item.user.name}</Typography>

                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '180px'
                        }}
                      >
                        {item.user.email}
                      </Typography>
                    </Box>
                  }
                  secondaryTypographyProps={{ noWrap: true }}
                />
                <Box>
                  {unreadCounts[item.conversationId] > 0 && (
                    <Box sx={{
                      backgroundColor: '#032D4F',
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12
                    }}>
                      {unreadCounts[item.conversationId]}
                    </Box>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4
          }}>
            <ChatIcon sx={{
              fontSize: 60,
              color: '#bdbdbd',
              mb: 2
            }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No conversations found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You don&apos;t have any active conversations
            </Typography>
          </Box>
        )}
      </Box>

      {/* Conversation */}
      {
        selectedOption ? (
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Chat header */}
            <Box sx={{
              p: 1.2,
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              backgroundColor: '#f5f5f5'
            }}>
              <Avatar src={selectedOption.user.avatar} alt={selectedOption.user.name} />
              <Typography variant="h6">{selectedOption.user.name}</Typography>
            </Box>

            {/* Messages */}
            <Box
              flex={1}
              p={2}
              sx={{
                overflowY: 'auto',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column'
              }}
              ref={(el: any) => {
                if (el) {
                  el.scrollTop = el.scrollHeight;
                }
              }}
            >
              {messages?.messages?.length > 0 ? (
                messages.messages.map((msg: any, index: any) => (
                  <>
                    <MessageBubble
                      key={msg.msgId || index}
                      message={msg}
                      isCurrentUser={msg.user._id === user?._id}
                    />
                  </>

                ))
              ) : (
                <Typography sx={{ textAlign: 'center', mt: 2 }}>No Messages</Typography>
              )}
            </Box>
            {/* <Box sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              backgroundColor: '#fafafa'
            }}>
              {messages.map((msg) => (
                <Box key={msg.id} sx={{
                  mb: 2,
                  display: 'flex',
                  justifyContent: msg.isCurrentUser ? 'flex-end' : 'flex-start'
                }}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '70%',
                    backgroundColor: msg.isCurrentUser ? '#032D4F' : '#e0e0e0',
                    color: msg.isCurrentUser ? 'white' : 'black'
                  }}>
                    <Typography variant="body1">{msg.text}</Typography>
                    <Typography variant="caption" sx={{
                      display: 'block',
                      textAlign: 'right',
                      color: msg.isCurrentUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'
                    }}>
                      {msg.sender}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box> */}

            {/* Message input */}
            <Box sx={{
              p: 2,
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              gap: 1
            }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                size="small"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                  }
                }}
              />
              <Button
                onClick={sendMessage}
                variant="contained"
                disabled={!message}
                sx={{
                  backgroundColor: "#032D4F",
                  borderRadius: '20px',
                  minWidth: 'auto',
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#021f37",
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
            backgroundColor: '#fafafa'
          }}>
            <ChatIcon sx={{
              fontSize: 60,
              color: '#bdbdbd',
              mb: 2
            }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No conversation selected
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please select a user from the left panel to start chatting
            </Typography>
          </Box>
        )
      }

    </Box>
  );
};

const MessageBubble = ({ message, isCurrentUser }: any) => {
  const { type, message: text, updatedAt } = message;

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
      mb: 1
    }}>
      <Box sx={{
        backgroundColor: isCurrentUser ? '#032D4F' : '#e0e0e0',
        color: isCurrentUser ? 'white' : 'black',
        borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
        px: 2, py: 1,
        maxWidth: '70%'
      }}>
        <Typography fontSize={14}>{text}</Typography>
        <Typography variant="caption" fontSize={10} sx={{
          display: 'block',

          textAlign: 'right',
          color: isCurrentUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'
        }}>
          {formatTimeToAMPM(updatedAt)}
        </Typography>
      </Box>
    </Box>
  );
};
import {
  Box, Avatar, Typography, TextField, Button, List, ListItem, ListItemAvatar, ListItemText,
  InputAdornment, IconButton, MenuItem, Menu
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useCallback, useEffect, useRef, useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client'
import SearchIcon from '@mui/icons-material/Search';
import { AttachFile, CameraAlt, InsertPhoto, InsertDriveFile, EmojiEmotionsRounded } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';

import { fetchConversation, fetchConversationUserList, fetchMessagesbyConvId } from 'src/redux/actions/message.action';
import { AppDispatch, RootState } from 'src/redux/store';
import { formatTimeToAMPM } from 'src/hooks/formate-time';

import axios from '../../redux/helper/axios'
import { HeadingCommon } from '../multiple-responsive-heading/heading';
import { SelectedUser, ConversationUser, UnreadCounts, MessagesState, ConversationData } from './utills';
import { Iconify } from '../iconify';

export function ChatPanel() {
  const [selectedOption, setSelectedOption] = useState<SelectedUser>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state?.auth);
  const [convUser, setConvUser] = useState<ConversationUser | null>(null);
  const { conv, userList } = useSelector((state: RootState) => state.allMessages);
  const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({});
  const [messages, setMessages] = useState<MessagesState>({
    messages: []
  });
  const individualMsgList = useSelector((state: RootState) => state.allMessages.messages);
  const [showPicker, setShowPicker] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState([]);
  const [message, setMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchConversation());
    dispatch(fetchConversationUserList());

  }, [dispatch, messages]);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(conv || []);
      setSearchResults([]);
      return;
    }

    // Filter existing conversations
    const filteredConv = conv?.filter((item: any) =>
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter potential new users from userList
    const filteredNewUsers = userList?.filter((item: any) => {
      const isNotInConv = !conv?.some((convItem: any) =>
        convItem.user._id === item._id ||
        convItem.user.userId === item._id
      );
      return (
        isNotInConv &&
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    });

    setFilteredUsers(filteredConv || []);
    setSearchResults(filteredNewUsers || []);
  }, [searchQuery, conv, userList]);

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
      socket.on('getUsers', (users) => setOnline(users));

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

  const fetchMessages = useCallback(async (conversationId: any, receiver: any) => {
    dispatch(fetchMessagesbyConvId(conversationId, receiver, user?._id));
  }, [dispatch, user?._id]);

  const fetchMsgData = useCallback((convId: string | undefined, userData: any) => {
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
  }, [fetchMessages, user?._id]);

  // Add this useEffect hook near the top of the ChatPanel component
  useEffect(() => {
    // Check if we have a provider from the Chat Now button click
    const storedProvider = sessionStorage.getItem('currentChatProvider');
    if (storedProvider) {
      try {
        const provider = JSON.parse(storedProvider);
        // Find if this provider already has a conversation
        const existingConv = conv?.find((c: any) =>
          c.user.receiverId === provider._id
        );
        if (existingConv) {
          setSelectedOption(existingConv);
          fetchMessages(existingConv.conversationId, existingConv.user);
        } else {
          // Create a new conversation item for this provider
          const newConvItem = {
            user: {
              _id: provider._id,
              name: provider.name,
              email: provider.email || '',
              avatar: provider.avatar?.url || '',
              receiverId: provider._id
            },
            conversationId: 'new'
          };
          setSelectedOption(newConvItem);
          fetchMessages('new', provider._id);
        }

        // Clear the stored provider after using it
        sessionStorage.removeItem('currentChatProvider');
      } catch (error) {
        sessionStorage.removeItem('currentChatProvider');
      }
    }
  }, [conv, fetchMessages, fetchMsgData, filteredUsers]); // Added fetchMessages to dependencies

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        await axios.get(`/conv/conversations?userId=${convUser?.organizerId?._id || selectedOption}`);
      } catch (error) {
        console.log("Conversation not found");
      }
    };

    fetchConversations();
  }, [messages, convUser?.organizerId?._id, selectedOption]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Trigger file input click
  const triggerFileInput = (type: 'image' | 'document') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image'
        ? 'image/jpeg,image/png,image/gif'
        : 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      fileInputRef.current.click();
    }
  };

  // File input handler
  const handleFileInputChange = (type: 'image' | 'document') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validDocumentTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (type === 'image' && !validImageTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF)');
      return;
    }

    if (type === 'document' && !validDocumentTypes.includes(file.type)) {
      alert('Please select a valid document file (PDF, DOC, DOCX)');
      return;
    }

    handleUpload(file, type);
    e.target.value = ''; // Reset input
  };

  // Upload file to Cloudinary
  const handleUpload = async (file: File, type: 'image' | 'document' | 'video') => {
    if (!selectedOption) {
      alert('Please select a conversation first');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const result = await axios.post(`/conv/upload-file`, formData, config);

      if (result.data.status === 200) {
        // Send the URL via chat
        const receiverId = typeof messages?.receiver === 'string'
          ? messages?.receiver
          : messages?.receiver?.receiverId;
        const tempMessageId = Date.now().toString(); // Temporary ID for optimistic update

        const messageData = {
          conversationId: messages?.conversationId,
          senderId: user?._id,
          message,
          file: {
            public_id: result.data.public_id,
            url: result.data.secure_url
          },
          receiverId,
          type: "file"
        };
        // // Optimistic update
        // setMessages(prev => ({
        //   ...prev,
        //   messages: [
        //     ...prev.messages,
        //     {
        //       user: {
        //         _id: user?._id,
        //         name: user?.name,
        //         email: user?.email,
        //         profile: user?.profile
        //       },
        //       file: {
        //         public_id: data.public_id,
        //         url: data.secure_url
        //       },
        //       message,
        //       updatedAt: new Date().toISOString(),
        //       type,
        //       tempId: tempMessageId
        //     }
        //   ]
        // }));

        // // Emit socket event
        // socket?.emit('sendMessage', {
        //   ...messageData,
        //   user: {
        //     _id: user?._id,
        //     name: user?.name,
        //     email: user?.email,
        //     profile: user?.profile
        //   },
        //   updatedAt: new Date().toISOString()
        // });

        // Send to server
        const res = await axios.post(`/conv/message`, messageData);
        console.log('====================================');
        console.log('res', res);
        console.log('====================================');
      }
    } catch (error) {
      console.error('Upload failed:', error.message);
      alert('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

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
        width: { xs: '100%', sm: 2700, md: 300 }, // Responsive width
        borderRight: { xs: 'none', sm: '1px solid #e0e0e0' }, // Hide border on mobile
        borderLeft: '1px solid #e0e0e0', // Hide border on mobile
        overflowY: 'auto',
        height: { xs: 'auto', sm: 'calc(100vh - 105px)' }, // Full height on desktop
        borderRadius: 2,
        position: { xs: 'absolute', sm: 'relative' }, // Absolute positioning on mobile
        zIndex: { xs: 1000, sm: 'auto' }, // Ensure it's above other content on mobile
        backgroundColor: 'background.paper',
        display: { xs: selectedOption ? 'none' : 'block', sm: 'block' }, // Hide on mobile when chat is open
      }}>
        <HeadingCommon
          variant="h6"
          color="#000080"
          baseSize="18px"
          title="Tick-m Events"
          css={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            position: { xs: 'sticky', sm: 'static' }, // Sticky on mobile
            top: 0,
            backgroundColor: 'background.paper',
            zIndex: 1
          }}
        />

        {/* Search Box */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              }
            }}
          />
        </Box>

        {/* Search Results for New Users */}
        {searchQuery && searchResults.length > 0 && (
          <Box sx={{ p: 1, borderBottom: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ px: 1, py: 0.5, color: 'text.secondary' }}>
              New Conversations
            </Typography>
            {searchResults.map((row, index) => (
              <ListItem
                key={row._id || index}
                button
                onClick={() => {
                  const item = {
                    user: {
                      receiverId: row._id,
                      name: row.name,
                      email: row.email,
                      avatar: row.avatar.url
                    },
                    conversationId: 'new'
                  };
                  setSelectedOption(item);
                  fetchMessages('new', row._id);
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar src={row.avatar.url} alt={row.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={row.name}
                  secondary={row.email}
                  secondaryTypographyProps={{ noWrap: true }}
                />
                <ChatIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </ListItem>
            ))}
          </Box>
        )}

        {filteredUsers?.length > 0 ? (
          <List sx={{
            flex: 1,
            pt: { xs: 0, sm: 0 } // Adjust padding
          }}>
            {filteredUsers?.map((item: any, index: any) => (
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
                  },
                  px: { xs: 1, sm: 2 }, // Responsive padding
                  py: { xs: 1, sm: 1.5 } // Responsive padding
                }}
                selected={selectedOption?.conversationId === item.conversationId}
              >
                <ListItemAvatar sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <Avatar
                    src={item.user.avatar}
                    alt={item.user.name}
                    sx={{ width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 } }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {item.user.name}
                    </Typography>
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
                          maxWidth: { xs: 120, sm: 180 },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        {item.user.email}
                      </Typography>
                    </Box>
                  }
                  secondaryTypographyProps={{ noWrap: true }}
                  sx={{ my: 0 }} // Remove default margin
                />
                <Box sx={{ ml: { xs: 0.5, sm: 1 } }}>
                  {unreadCounts[item.conversationId] > 0 && (
                    <Box sx={{
                      backgroundColor: '#032D4F',
                      color: 'white',
                      borderRadius: '50%',
                      width: { xs: 18, sm: 20 },
                      height: { xs: 18, sm: 20 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: 10, sm: 12 }
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
            p: { xs: 2, sm: 4 },
            height: 'calc(100% - 64px)' // Account for header height
          }}>
            <ChatIcon sx={{
              fontSize: { xs: 48, sm: 60 },
              color: '#bdbdbd',
              mb: 2
            }} />
            <HeadingCommon
              variant="h6"
              mb={1}
              baseSize={{ xs: '16px', sm: '18px' }}
              title="No conversations found"
            />
            <HeadingCommon
              variant="body2"
              color="text.secondary"
              baseSize={{ xs: '14px', sm: '16px' }}
              title="You don't have any active conversations"
            />
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
              justifyContent: 'space-between', // Added to push icons to the end
              gap: 2,
              backgroundColor: '#f5f5f5'
            }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={selectedOption?.user?.avatar}
                  alt={selectedOption?.user?.name}
                />
                <Typography variant="h6">{selectedOption?.user?.name}</Typography>
              </Box>

              {/* Call and Video Call Icons */}
              <Box display="flex" gap={1}>
                <IconButton color="primary" aria-label="call">
                  <CallIcon />
                </IconButton>
                <IconButton color="primary" aria-label="video call">
                  <VideoCallIcon />
                </IconButton>
              </Box>
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
                    paddingRight: '40px', // Make space for icons
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <IconButton onClick={() => setShowPicker(!showPicker)}>
                        <EmojiEmotionsRounded fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => console.log('Camera clicked')}>
                        <CameraAlt fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={handleClick}
                        aria-controls={open ? 'attachment-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <AttachFile fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {showPicker && (
                <Box sx={{ position: "absolute", top: '117px' }}>
                  <EmojiPicker

                    onEmojiClick={emojiObject => {
                      setMessage(prev => prev + emojiObject.emoji);
                      setShowPicker(!showPicker)
                    }}
                    width={300}
                    height={400}
                  />
                </Box>
              )}
              {/* Hidden file inputs */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange('image')}
                style={{ display: 'none' }}
              />
              {/* Attachment menu */}
              <Menu
                id="attachment-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'attachment-button',
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => {
                  triggerFileInput('image');
                  handleClose();
                }}>
                  <InsertPhoto fontSize="small" sx={{ mr: 1 }} />
                  Gallery
                </MenuItem>
                <MenuItem onClick={() => {
                  console.log('Document selected');
                  handleClose();
                }}>
                  <InsertDriveFile fontSize="small" sx={{ mr: 1 }} />
                  Document
                </MenuItem>
              </Menu>

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
  const { type, message: content, updatedAt } = message;
  const bubbleStyle = {
    display: 'flex',
    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
    mb: 1
  };

  const contentBoxStyle = {
    backgroundColor: isCurrentUser ? '#032D4F' : '#e0e0e0',
    borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
    overflow: 'hidden',
    maxWidth: '70%'
  };

  const captionStyle = {
    display: 'block',
    textAlign: 'right',
    color: isCurrentUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
    p: 1
  };

  const textContentStyle = {
    ...contentBoxStyle,
    color: isCurrentUser ? 'white' : 'black',
    px: 2,
    py: 1,
  };

  if (type === 'image') {
    return (
      <Box sx={bubbleStyle}>
        <Box sx={contentBoxStyle}>
          <img
            src={content}
            alt="Uploaded content"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              display: 'block'
            }}
          />
          <Typography variant="caption" fontSize={10} sx={captionStyle}>
            {formatTimeToAMPM(updatedAt)}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (type === 'document') {
    return (
      <Box sx={bubbleStyle}>
        <Box sx={textContentStyle}>
          <a
            href={content}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: isCurrentUser ? 'white' : '#032D4F',
              textDecoration: 'underline'
            }}
          >
            View Document
          </a>
          <Typography variant="caption" fontSize={10} sx={captionStyle}>
            {formatTimeToAMPM(updatedAt)}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (type === 'video') {
    return (
      <Box sx={bubbleStyle}>
        <Box sx={contentBoxStyle}>
          <video
            controls
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              display: 'block'
            }}
            aria-label="Video message"
          >
            <source src={content} type="video/mp4" />
            <track kind="captions" src="" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>
          <Typography variant="caption" fontSize={10} sx={captionStyle}>
            {formatTimeToAMPM(updatedAt)}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Default text message
  return (
    <Box sx={bubbleStyle}>
      <Box sx={textContentStyle}>
        <Typography fontSize={14}>{content}</Typography>
        <Typography variant="caption" fontSize={10} sx={captionStyle}>
          {formatTimeToAMPM(updatedAt)}
        </Typography>
      </Box>
    </Box>
  );
};
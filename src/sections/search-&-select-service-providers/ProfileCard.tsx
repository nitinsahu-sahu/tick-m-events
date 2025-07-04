import {
  Collapse, Box, Select, MenuItem, InputLabel, FormControl, Typography,
  Button, Avatar, Grid, Paper, Divider, SelectChangeEvent, IconButton,
  Menu, ListItemIcon, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { io, Socket } from 'socket.io-client'
import { toast } from "react-toastify";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WhatsApp, Facebook, Twitter, LinkedIn, Instagram, Link as LinkIcon, ExpandMore, ExpandLess } from '@mui/icons-material';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import flags from 'react-phone-number-input/flags';

import { HeadingCommon } from 'src/components/multiple-responsive-heading/heading';
import { AppDispatch, RootState } from 'src/redux/store';
import { fetchMessagesbyConvId } from 'src/redux/actions/message.action';
import { formatTimeToAMPM } from 'src/hooks/formate-time';

import { ServiceCard } from './ServiceCard';
import { TikTokIcon } from '../profile-&-services-management/utills';
import axios from '../../redux/helper/axios'

interface PhoneNumberDisplayProps {
  phoneNumber: string;
  defaultCountry?: CountryCode;
}

interface User {
  userId: string;
  socketId: string;
}

interface Message {
  user: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  message: string;
  updatedAt?: string;
  type: string;
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

export function ProfileCard({ selectedProvider, onRequestService }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDetails, setShowDetails] = useState(false);
  const { services } = selectedProvider
  const { fullData } = useSelector((state: RootState) => state?.event);
  const { user } = useSelector((state: RootState) => state?.auth);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);
  const openShareMenu = Boolean(shareAnchorEl);
  const [copySuccess, setCopySuccess] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState<MessagesState>({
    messages: []
  });
  const individualMsgList = useSelector((state: RootState) => state.allMessages.messages);

  const [conversations, setConversations] = useState<any>({});
  const [isConvId, setIsConvId] = useState<ConversationData | undefined>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [online, setOnline] = useState<User[]>([]);
  const [message, setMessage] = useState<string>('');
console.log('====================================');
console.log(conversations);
console.log(selectedProvider);
console.log('====================================');
  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SOCKET_URL))
  }, [])

  useEffect(() => {
    socket?.emit('addUser', user?._id);
    socket?.on('getUsers', (users: User[]) => {
      setOnline(users);
    })
    socket?.on('getMessage', (data: {
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

      setMessages(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            user: data.user,
            message: data.message,
            updatedAt: data.updatedAt,
            type: data.type,
          },

        ]
      }))
    })
  }, [socket, user?._id, openChat])

  const sendMessage = async (e: React.FormEvent) => {
    setMessage('')
    socket?.emit('sendMessage', {
      conversationId: messages?.conversationId,
      senderId: user?._id,
      message,
      receiverId: messages?.receiver?.receiverId,
      type: "text"
    });
    const msginfo = {
      conversationId: messages?.conversationId,
      senderId: user?._id,
      message,
      receiverId: messages?.receiver?.receiverId,
      type: "text"
    }
    await axios.post(`/conv/message`, msginfo).then(

    ).catch((error) => {
      console.log("Server error");
    })
  }

  useEffect(() => {
    setMessages(individualMsgList)
  }, [individualMsgList])

  const handleEventChange = (event: SelectChangeEvent<string>) => {
    setSelectedEventId(event.target.value);
  };
  // Check if selectedProvider is empty or invalid
  const isEmptyProvider = !selectedProvider ||
    (typeof selectedProvider === 'object' &&
      Object.keys(selectedProvider).length === 0);

  if (isEmptyProvider) {
    return (
      <Paper elevation={3} sx={{
        borderRadius: 2.5,
        p: 4,
        textAlign: 'center',
        mt: 3,
        mb: 4,
        backgroundColor: '#f9f9f9'
      }}>
        <Box sx={{ mb: 2 }}>
          <PersonOutlineIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
        </Box>
        <Typography variant="h6" color="textSecondary">
          No profile available
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {!selectedProvider ? 'Select a provider to view details' : 'No providers details your current filters'}
        </Typography>
      </Paper>
    );
  }

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const copyProfileLink = () => {
    const profileUrl = `${import.meta.env.VITE_Live_URL}pro/${selectedProvider?._id}`;
    navigator.clipboard.writeText(profileUrl);
    setCopySuccess(true);
    handleShareClose();
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const shareOnSocialMedia = (platform: string) => {
    const profileUrl = `${import.meta.env.VITE_Live_URL}/pro/${selectedProvider?._id}`;
    const profileTextMsg = `Check out my profile on EventHub: ${profileUrl}`;

    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(profileTextMsg)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(profileTextMsg)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
        break;
      case 'instagram':
        // Note: Instagram doesn't support direct sharing via URL
        toast.info("Copy the link to share on Instagram");
        copyProfileLink();
        return;
      default:
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    handleShareClose();
  };

  // Chat system

  const fetchMessages = async (conversationId: any, receiver: any) => {
    dispatch(fetchMessagesbyConvId(conversationId, receiver, user?._id));
  };

  const fetchMsgData = (convId: string | undefined, userData: any) => {

    // If convId is undefined or null, it will default to "new"
    fetchMessages(convId, userData);

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
        const response = await axios.get(`/conv/conversations?userId=${selectedProvider?._id}`);
        setConversations(response?.data);
      } catch (error) {
        console.log("Conversation not found");
      }
    };

    fetchConversations();
  }, [messages, selectedProvider?._id]); // Make sure messages is properly defined in the component scope

  // let filterConv = conversations.filter(item => item?.user?.fullname.toLowerCase().includes(searchConv.toLocaleLowerCase()))		//


  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2.5,
        overflow: 'hidden',
        mt: 3,
        mb: 4,
      }}
    >
      {/* Cover Image */}
      <Box
        sx={{
          height: { xs: 150, sm: 170, md: 200 },
          backgroundImage: `url(${selectedProvider?.cover?.url || '/assets/images/home-and-recommendations/tech.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Profile Section */}
      <Box sx={{ p: { xs: 2, sm: 2, md: 3 }, position: 'relative' }}>
        <Avatar
          src={selectedProvider?.avatar?.url || '/assets/images/Profile.jpg'}
          sx={{
            width: 100,
            height: 100,
            position: 'absolute',
            top: -30,
            left: { xs: 'calc(50% - 40px)', sm: 'calc(50% - 40px)', md: 24 },
          }}
        />

        <Box sx={{
          ml: { xs: 0, sm: 15, md: 15 },
          mt: { xs: 8, sm: 8, md: -2 },
          textAlign: { xs: 'center', sm: 'center', md: 'left' }
        }}
        >
          <Typography variant="h6" fontWeight={600}>
            {selectedProvider.name}
          </Typography>
          <Typography variant="body2" >
            {selectedProvider.username}
          </Typography>
        </Box>

        {/* Basic Information  */}
        <Box p={3}>
          {/* Basic Info */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>Basic Information</Typography>
            <Button
              variant="text"
              onClick={() => setShowDetails(!showDetails)}
              endIcon={showDetails ? <ExpandLess /> : <ExpandMore />}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </Box>

          {/* Expandable Details with Smooth Transition */}
          <Collapse in={showDetails} timeout="auto" unmountOnExit>
            <Box mt={2} sx={{
              borderTop: '1px solid #e0e0e0',
              pt: 2,
            }}>
              <Grid container spacing={2}>
                {/* Contact Info */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Contact</Typography>
                  <Typography>{selectedProvider?.email}</Typography>
                  {selectedProvider?.number && (
                    <PhoneNumberDisplay
                      phoneNumber={selectedProvider.number}
                      defaultCountry="US" // You can detect this dynamically
                    />
                  )}
                  <Typography textTransform="capitalize">{selectedProvider?.address}</Typography>
                </Grid>

                {/* Social Links */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">Social Media</Typography>
                  <Box display="flex" gap={1} mt={1}>
                    {selectedProvider?.socialLinks?.linkedin && (
                      <IconButton
                        size="small"
                        href={selectedProvider.socialLinks.linkedin}
                        target="_blank"
                      >
                        <LinkedIn fontSize="small" />
                      </IconButton>
                    )}
                    {selectedProvider?.socialLinks?.tiktok && (
                      <IconButton
                        size="small"
                        href={selectedProvider.socialLinks.tiktok}
                        target="_blank"
                      >
                        <TikTokIcon />
                      </IconButton>
                    )}
                    {selectedProvider?.socialLinks?.facebook && (
                      <IconButton
                        size="small"
                        href={selectedProvider.socialLinks.facebook}
                        target="_blank"
                      >
                        <Facebook />
                      </IconButton>
                    )}
                    {selectedProvider?.socialLinks?.instagram && (
                      <IconButton
                        size="small"
                        href={selectedProvider.socialLinks.instagram}
                        target="_blank"
                      >
                        <Instagram />
                      </IconButton>
                    )}
                  </Box>
                </Grid>

                {/* Experience */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">Experience</Typography>
                  <Typography>{selectedProvider?.experience || 'Not specified'}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Box>

        {/* Stats Section */}
        <Grid
          container
          spacing={0}
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-around',
            border: '1px solid #ccc',
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Box>
            <Typography variant="subtitle2">Overall Rating</Typography>
            <Typography fontWeight={600}>{selectedProvider.averageRating}/5 ({selectedProvider.reviewCount} reviews)</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Completed Gigs</Typography>
            <Typography fontWeight={600}>120</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Response Time</Typography>
            <Typography fontWeight={600}>within 1h</Typography>
          </Box>
        </Grid>

        {/* Share Button - Replace your existing one with this */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
          <Grid item xs={12} sm={6} md={6} mt={3} width="100%">
            <Button
              fullWidth
              variant="contained"
              onClick={handleShareClick}
              sx={{
                backgroundColor: "#032D4F",
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "14px",
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#021f37",
                },
              }}
            >
              Share Profile
            </Button>

            {/* Share Menu */}
            <Menu
              anchorEl={shareAnchorEl}
              open={openShareMenu}
              onClose={handleShareClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => shareOnSocialMedia('whatsapp')}>
                <ListItemIcon>
                  <WhatsApp fontSize="small" />
                </ListItemIcon>
                WhatsApp
              </MenuItem>
              <MenuItem onClick={() => shareOnSocialMedia('facebook')}>
                <ListItemIcon>
                  <Facebook fontSize="small" />
                </ListItemIcon>
                Facebook
              </MenuItem>
              <MenuItem onClick={() => shareOnSocialMedia('twitter')}>
                <ListItemIcon>
                  <Twitter fontSize="small" />
                </ListItemIcon>
                Twitter
              </MenuItem>
              <MenuItem onClick={() => shareOnSocialMedia('linkedin')}>
                <ListItemIcon>
                  <LinkedIn fontSize="small" />
                </ListItemIcon>
                LinkedIn
              </MenuItem>
              <MenuItem onClick={() => shareOnSocialMedia('instagram')}>
                <ListItemIcon>
                  <Instagram fontSize="small" />
                </ListItemIcon>
                Instagram
              </MenuItem>
              <MenuItem onClick={copyProfileLink}>
                <ListItemIcon>
                  <LinkIcon fontSize="small" />
                </ListItemIcon>
                Copy Link
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12} sm={6} md={6} mt={3} width="100%">
            {
              conversations?.conversationId ? <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  fetchMsgData(conversations.conversationId, conversations.user)
                  setOpenChat(true);
                }}
                sx={{
                  backgroundColor: "#032D4F",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 500,
                  fontSize: "14px",
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#021f37",
                  },
                }}
              >
                Continue Conversation
              </Button> :
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    fetchMessages('new', selectedProvider?._id);
                    setOpenChat(true);
                  }}
                  sx={{
                    backgroundColor: "#032D4F",
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: 500,
                    fontSize: "14px",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#021f37",
                    },
                  }}
                >
                  Conversation
                </Button>
            }
          </Grid>
        </Box>

        {/* Chat Dialog */}
        <Dialog
          open={openChat}
          onClose={() => setOpenChat(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{
            backgroundColor: '#032D4F',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Avatar
              src={selectedProvider?.avatar?.url}
              alt={selectedProvider?.name}
              sx={{ width: 40, height: 40 }}
            />
            <Typography variant="h6">{selectedProvider?.name}</Typography>
          </DialogTitle>

          <DialogContent sx={{
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            p: 0
          }}>
            {/* Messages Container with auto-scroll */}
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
                  // Auto-scroll to bottom when messages change
                  el.scrollTop = el.scrollHeight;
                }
              }}
            >
              {messages?.messages?.length > 0 ? (
                messages.messages.map((msg: any, index) => (
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

            {/* Message Input */}
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
                onKeyPress={(e:any) => e.key === 'Enter' && sendMessage()}
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
          </DialogContent>
        </Dialog>

        {/* Copy Success Dialog */}
        <Dialog open={copySuccess} onClose={() => setCopySuccess(false)}>
          <DialogTitle>Link Copied!</DialogTitle>
          <DialogContent>
            Your profile link has been copied to clipboard.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCopySuccess(false)}>OK</Button>
          </DialogActions>
        </Dialog>
        {/* Services Section */}
        {services.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <HeadingCommon variant="h6" mb={1} baseSize="24px" weight={600} title='Offered Services' />

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Event</InputLabel>
                  <Select
                    value={selectedEventId}
                    onChange={handleEventChange}
                    label="Select Event"
                    sx={{ minWidth: 200, textTransform: "capitalize" }}
                  >
                    {fullData.map((event: any) => (
                      <MenuItem key={event._id} value={event._id} sx={{ textTransform: "capitalize" }}>
                        {event.eventName} ({event.date})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Box>
            <Grid container spacing={2}>
              {services.map((service: any) => (
                <Grid item xs={12} sm={6} key={service._id}>
                  <ServiceCard
                    eventId={selectedEventId}
                    service={service}
                    onRequest={() => onRequestService(service._id)}
                    disabled={!selectedEventId} // Disable if no event selected
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

      </Box>
    </Paper>
  );
}

export function PhoneNumberDisplay({ phoneNumber, defaultCountry = 'US' }: PhoneNumberDisplayProps) {
  // Parse the phone number to get country information
  const parsedNumber = parsePhoneNumber(phoneNumber, defaultCountry);
  const country = parsedNumber?.country || defaultCountry;
  const formattedNumber = parsedNumber?.formatInternational() || phoneNumber;

  // Get the flag component for the country
  const FlagComponent = flags[country as CountryCode];

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {FlagComponent && (
        <Box width={24} height={24} display="flex" alignItems="center" justifyContent="center">
          <FlagComponent title={country} />
        </Box>
      )}
      <Typography variant="body1">{formattedNumber}</Typography>
    </Box>
  );
}

const MessageBubble = ({ message, isCurrentUser }: any) => {
  const { type, message: text, updatedAt } = message;

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
      mb: 2
    }}>
      <Box sx={{
        backgroundColor: isCurrentUser ? '#032D4F' : '#e0e0e0',
        color: isCurrentUser ? 'white' : 'black',
        borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
        p: 2,
        maxWidth: '70%'
      }}>
        <Typography>{text}</Typography>
        <Typography variant="caption" sx={{
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
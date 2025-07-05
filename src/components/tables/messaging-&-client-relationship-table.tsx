import {
    Box, Typography, Button, Avatar, Paper, Dialog, DialogTitle,
    DialogContent, TextField, TableContainer, Table, TableRow, TableBody, TableHead, TableCell
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'src/redux/store';
import { formatTimeToAMPM } from 'src/hooks/formate-time';
import { fetchMessagesbyConvId } from 'src/redux/actions/message.action';

import axios from '../../redux/helper/axios'

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

export function MessagingAndClientRelationshipTable({
    headers,
    tableData,
    type,
    handleOpenModal,
    selectedOption
}: {
    headers: string[];
    type: string;
    tableData: any[];
    selectedOption: string,
    handleOpenModal: (row: any) => void; // Add proper typing
}) {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state?.auth);
    const theme = useTheme();
    const [openChat, setOpenChat] = useState(false);
    const [convUser, setConvUser] = useState<ConversationUser | null>(null);
    
    const [messages, setMessages] = useState<MessagesState>({
        messages: []
    });
    const individualMsgList = useSelector((state: RootState) => state.allMessages.messages);

    const [conversations, setConversations] = useState<any>({});
    const [isConvId, setIsConvId] = useState<ConversationData | undefined>();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [online, setOnline] = useState<User[]>([]);
    const [message, setMessage] = useState<string>('');
    console.log('==messages==================================');
    console.log(messages);
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
        console.log('====================================');
        console.log('msgIngo',msginfo);
        console.log('====================================');
        await axios.post(`/conv/message`, msginfo).then((info)=>{
console.log('=========ss===========================');
console.log(info);
console.log('====================================');
        }

        ).catch((error) => {
            console.log("Server error",error.message);
        })
    }

    useEffect(() => {
        setMessages(individualMsgList)
    }, [individualMsgList])

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
                const response = await axios.get(`/conv/conversations?userId=${convUser?.organizerId?._id}`);
                setConversations(response?.data);
            } catch (error) {
                console.log("Conversation not found");
            }
        };

        fetchConversations();
    }, [messages, convUser?.organizerId?._id]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell
                                key={header}
                                align="center"
                                sx={{
                                    bgcolor: "#1F8FCD",
                                    fontWeight: "bold",
                                    fontSize: { xs: "0.8rem", sm: "1rem" },
                                    color: theme.palette.common.white,
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {!tableData || tableData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={headers.length} align="center" sx={{ py: 4 }}>
                                <Typography variant="body1" color="textSecondary">
                                    No Reqest available
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        tableData.map((row, index) => {
                            const backgroundColor = index % 2 === 0 ? "#f5f5f5" : "#e0e0e0";

                            return (
                                <TableRow key={row._id} sx={{ backgroundColor }}>
                                    {/* Conditional cells based on type */}
                                    {(type === "2" || type === "5") && (
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center", textTransform: "capitalize" }}>
                                            {row.service || row?.organizerId?.name || row.file}
                                        </TableCell>
                                    )}

                                    <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center", textTransform: "capitalize" }}>
                                        {row.location || row?.serviceRequestId?.serviceType || row.sdate}
                                    </TableCell>

                                    <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }}>
                                        {row.datetime || `-` || row.type}
                                    </TableCell>

                                    {type !== "5" && (
                                        <TableCell sx={{
                                            textTransform: 'capitalize',
                                            verticalAlign: 'middle',
                                            textAlign: 'center',
                                            align: "center",
                                            fontWeight: 600,
                                            color:
                                                row.contractStatus === "pending" ? "#F69809" :
                                                    row.contractStatus === "signed" ? "#3A86FF" :
                                                        row.contractStatus === "ongoing" ? "#8338EC" :
                                                            "#46B800" // default for completed
                                        }}>
                                            {row.contractStatus || row.budget}
                                        </TableCell>
                                    )}

                                    {type === "3" && (
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }}>
                                            {row.describe}
                                        </TableCell>
                                    )}

                                    {
                                        type === '2' ?
                                            <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }} width="25%">
                                                {
                                                    conversations?.conversationId ?
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{
                                                                marginX: 0.5,
                                                                color: "white",
                                                                borderColor: "gray",
                                                                backgroundColor: "#0B2E4C",
                                                                "&:hover": {
                                                                    color: "black",            // Change text color to black on hover
                                                                    borderColor: "gray"        // Keep the same border color
                                                                }
                                                            }}
                                                            onClick={() => {
                                                                setConvUser(row)
                                                                setOpenChat(true);
                                                                fetchMsgData(conversations?.conversationId, conversations?.user)
                                                            }}
                                                        >
                                                            Continue Conversation
                                                        </Button> : <Button
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{
                                                                marginX: 0.5,
                                                                color: "white",
                                                                borderColor: "gray",
                                                                backgroundColor: "#0B2E4C",
                                                                "&:hover": {
                                                                    color: "black",            // Change text color to black on hover
                                                                    borderColor: "gray"        // Keep the same border color
                                                                }
                                                            }}
                                                            onClick={() => {
                                                                fetchMessages('new', convUser?.organizerId?._id);
                                                                setOpenChat(true);
                                                                setConvUser(row)

                                                            }}
                                                        >
                                                            Conversation
                                                        </Button>
                                                }

                                            </TableCell> : null
                                    }
                                    {(type === "5") && (
                                        <TableCell sx={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 600, align: "center" }} width="36%">
                                            {row.actions?.map((action: any, actionIndex: any) => (
                                                <Button
                                                    key={actionIndex}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        marginX: 0.5,
                                                        color: "white",
                                                        borderColor: "gray",
                                                        backgroundColor: "#0B2E4C"
                                                    }}
                                                >
                                                    {action}
                                                </Button>
                                            ))}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })
                    )}

                </TableBody>
            </Table>
            {/* <Conv openChat={openChat} setOpenChat={setOpenChat} convUser={convUser}/> */}
            {/* Chat Dialog */}
            {convUser && (
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
                            src={convUser.organizerId?.avatar?.url}
                            alt={convUser.organizerId?.name}
                            sx={{ width: 40, height: 40 }}
                        />
                        <Typography variant="h6">{convUser.organizerId?.name}</Typography>
                    </DialogTitle>

                    <DialogContent sx={{
                        height: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 0
                    }}>
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
                                onKeyPress={(e: any) => e.key === 'Enter' && sendMessage}
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
            )}

        </TableContainer>
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
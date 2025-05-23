import React, { createContext, useContext, useState, useMemo, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export type User = {
    _id: string;
    name: string;
    role: 'admin' | 'provider' | 'participant' | 'organizer';
};

type Message = {
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: Date;
    read: boolean;
};

type Conversation = {
    _id: string;
    name: string;
    role: 'admin' | 'provider' | 'participant' | 'organizer';
    lastMessage: Message;
    unreadCount: number;
};

type ChatContextType = {
    socket: Socket | null;
    conversations: Conversation[];
    currentChat: Message[];
    currentReceiver: User | null;
    loading: boolean;
    error: string | null;
    initSocket: (_id: string) => void;
    getConversations: (_id: string) => void;
    selectConversation: (_id: string, otherUserId: string) => void;
    sendMessage: (senderId: string, receiverId: string, message: string) => void;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentChat, setCurrentChat] = useState<Message[]>([]);
    const [currentReceiver, setCurrentReceiver] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const isConnectingRef = useRef(false);

    const initSocket = (_id: string) => {
        // Prevent multiple connections
        if (socketRef.current || isConnectingRef.current) return;

        isConnectingRef.current = true;

        const newSocket = io('http://localhost:8080', {
            withCredentials: true,
            // Optional: Add reconnection settings if needed
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            transports: ['websocket'], // force WebSocket (optional but recommended)
        });
        newSocket.on('connect', () => console.log('Connected to socket server'));
        newSocket.on('disconnect', () => console.log('Disconnected from socket server'));
        newSocket.on('connect_error', (err) => console.log('Connection error:', err));
        // Setup event listeners
        const setupSocketListeners = () => {
            if (!newSocket) return;

            newSocket.on('connect', () => {
                console.log('Connected to socket server');
                newSocket.emit('socket-update', _id);
                isConnectingRef.current = false;
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });

            newSocket.on('receiveMessage', (message: Message) => {
                if (currentReceiver && (message.senderId === currentReceiver._id)) {
                    setCurrentChat(prev => [...prev, message]);
                }
                setConversations(prev => {
                    const updated = [...prev];
                    const convIndex = updated.findIndex(c => c._id === message.senderId);
                    if (convIndex >= 0) {
                        updated[convIndex] = {
                            ...updated[convIndex],
                            lastMessage: message,
                            unreadCount: message.receiverId === _id ?
                                updated[convIndex].unreadCount + 1 :
                                updated[convIndex].unreadCount
                        };
                    }
                    return updated;
                });
            });

            newSocket.on('chatHistory', (messages: Message[]) => {
                setCurrentChat(messages);
            });

            newSocket.on('conversations', (conversationsData: Conversation[]) => {
                setConversations(conversationsData);
            });
        };

        setupSocketListeners();
        newSocket.connect();
        socketRef.current = newSocket;
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.off('connect');
                newSocket.off('disconnect');
                newSocket.off('receiveMessage');
                newSocket.off('chatHistory');
                newSocket.off('conversations');
            }
        };
    };

    // Clean up socket on unmount
    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);


    const getConversations = (_id: string) => {
        if (!socket) return;
        setLoading(true);
        socket.emit('getConversations', _id);
        setLoading(false);
    };

    const selectConversation = (_id: string, otherUserId: string) => {
        if (!socket) return;
        setLoading(true);
        socket.emit('getChatHistory', { _id, otherUserId });
        socket.emit('markAsRead', { _id, otherUserId });
        setLoading(false);
    };

    const sendMessage = (senderId: string, receiverId: string, message: string) => {
        if (!socket) return;
        socket.emit('sendMessage', { senderId, receiverId, message });
    };

    const contextValue = useMemo(() => ({
        socket,
        conversations,
        currentChat,
        currentReceiver,
        loading,
        error,
        initSocket,
        getConversations,
        selectConversation,
        sendMessage
    }), [socket, conversations, currentChat, currentReceiver, loading, error]);
    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
};
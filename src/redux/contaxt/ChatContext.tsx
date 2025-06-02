import React, { createContext, useContext, useState, useMemo, useRef, useCallback,  } from 'react';
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

    // Wrap all functions in useCallback to maintain stable references
    const initSocket = useCallback((_id: string) => {
        if (socketRef.current || isConnectingRef.current) return;

        isConnectingRef.current = true;

        const newSocket = io('http://localhost:8080', {
            withCredentials: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            transports: ['websocket'],
        });

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
    }, []);

    const getConversations = useCallback((_id: string) => {
        if (!socketRef.current) return;
        setLoading(true);
        socketRef.current.emit('getConversations', _id);
        setLoading(false);
    }, []);

    const selectConversation = useCallback((_id: string, otherUserId: string) => {
        if (!socketRef.current) return;
        setLoading(true);
        socketRef.current.emit('getChatHistory', { _id, otherUserId });
        socketRef.current.emit('markAsRead', { _id, otherUserId });
        setLoading(false);
    }, []);

    const sendMessage = useCallback((senderId: string, receiverId: string, message: string) => {
        if (!socketRef.current) return;
        socketRef.current.emit('sendMessage', { senderId, receiverId, message });
    }, []);

    // Now the useMemo dependencies are stable
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
    }), [
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
    ]);

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
};
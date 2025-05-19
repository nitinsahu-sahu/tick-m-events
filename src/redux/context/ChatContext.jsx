import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ChatContext = createContext();

export const ChatProvider = ({ children, currentUser }) => {
  const [socket, setSocket] = useState(null);
  const [activeConversations, setActiveConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const newSocket = io('http://localhost:8000', {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    setSocket(newSocket);

    // Join chat with user info
    newSocket.emit('join', {
      userId: currentUser._id,
      role: currentUser.role
    });

    // Listen for new messages
    newSocket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser]);

  const startChat = (receiverId, receiverName) => {
    setCurrentChat({ receiverId, receiverName });
    setMessages([]);
    // Here you would typically fetch previous messages from your API
  };

  const sendMessage = (content, receiverId) => {
    if (!socket || !content.trim()) return;

    socket.emit('sendMessage', {
      sender: currentUser._id,
      senderRole: currentUser.role,
      receiver: receiverId,
      content
    });
  };

  return (
    <ChatContext.Provider value={{
      socket,
      activeConversations,
      currentChat,
      messages,
      organizers,
      startChat,
      sendMessage,
      setOrganizers
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
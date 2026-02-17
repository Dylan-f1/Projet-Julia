import React, { createContext, useState, useContext, useEffect } from 'react';
import chatService from '../services/chatService';
import { useAuth } from './AuthContext';

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadConversations();
    }
  }, [isAuthenticated]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const activeResult = await chatService.getActiveConversation();
      let allConvs = [];

      if (activeResult.success && activeResult.data?.conversation) {
        const activeConv = activeResult.data.conversation;
        allConvs.push(activeConv);

        if (!currentConversation) {
          setCurrentConversation(activeConv);
          setMessages(activeConv.messages || []);
        }
      }

      const historyResult = await chatService.getConversationHistory();
      if (historyResult.success) {
        const closedConvs = historyResult.data?.conversations || historyResult.data || [];
        if (Array.isArray(closedConvs)) {
          allConvs = [...allConvs, ...closedConvs];
        }
      }

      setConversations(allConvs);
    } catch (error) {
      console.error('Erreur lors du chargement des conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (conversationId) => {
    setLoading(true);
    try {
      const result = await chatService.getMessages(conversationId);
      if (result.success) {
        const conv = result.data?.conversation || result.data;
        setCurrentConversation(conv);
        setMessages(conv?.messages || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    setSending(true);

    try {
      if (!currentConversation || currentConversation.status === 'closed') {
        console.log('Création nouvelle conversation avec:', messageText);
        const createResult = await chatService.createConversation(messageText);

        if (createResult.success) {
          const newConv = createResult.data.conversation || createResult.data;
          setCurrentConversation(newConv);
          setMessages(newConv.messages || []);
          loadConversations();
          return createResult;
        } else {
          console.error('Erreur création conversation:', createResult.error);
          return createResult;
        }
      }

      const userMessage = {
        _id: Date.now().toString(),
        sender: 'patient',
        content: messageText,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);

      console.log('Envoi message vers conversation:', currentConversation._id);
      const result = await chatService.sendMessage(currentConversation._id, messageText);

      if (result.success) {
        const updatedConv = result.data.conversation || result.data;
        setCurrentConversation(updatedConv);
        setMessages(updatedConv.messages || []);
        loadConversations();
      } else {
        setMessages(prev => prev.filter(m => m._id !== userMessage._id));
        console.error('Erreur envoi message:', result.error);
      }
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      return { success: false, error: 'Erreur lors de l\'envoi du message' };
    } finally {
      setSending(false);
    }
  };

  const startNewConversation = () => {
    setCurrentConversation(null);
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        messages,
        loading,
        sending,
        loadConversations,
        loadConversation,
        sendMessage,
        startNewConversation,
        activeConversation: currentConversation?._id || null,
        setActiveConversation: (id) => {
          if (id) {
            loadConversation(id);
          } else {
            setCurrentConversation(null);
            setMessages([]);
          }
        },
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat doit être utilisé dans un ChatProvider');
  }
  return context;
};

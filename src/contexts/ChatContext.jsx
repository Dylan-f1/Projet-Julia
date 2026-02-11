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
      const result = await chatService.getPatientConversations();
      if (result.success) {
        setConversations(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversation = async (conversationId) => {
    setLoading(true);
    try {
      const result = await chatService.getConversation(conversationId);
      if (result.success) {
        setCurrentConversation(result.data);
        setMessages(result.data.messages || []);
        // Marquer comme lu
        await chatService.markAsRead(conversationId);
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
    
    // Ajouter le message de l'utilisateur immédiatement (optimistic update)
    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
      _id: Date.now().toString(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const result = await chatService.sendMessage(messageText);
      if (result.success) {
        // Remplacer le message optimiste et ajouter la réponse de l'IA
        setMessages(result.data.messages);
        setCurrentConversation(result.data.conversation);
        
        // Recharger la liste des conversations pour mettre à jour le dernier message
        loadConversations();
      } else {
        // Supprimer le message optimiste en cas d'erreur
        setMessages(prev => prev.filter(m => m._id !== userMessage._id));
      }
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setMessages(prev => prev.filter(m => m._id !== userMessage._id));
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

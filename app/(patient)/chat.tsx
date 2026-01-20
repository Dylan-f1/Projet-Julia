import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MessageBubble, ChatInput, ActionsPanel, SeveritySelector } from '@/components/chat';
import type { Message, SeverityLevel } from '@/types/conversation';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      _id: '1',
      conversationId: 'conv1',
      sender: 'ia',
      content: 'Bonjour ! Je suis votre assistant disponible 24/7. Comment vous sentez-vous aujourd\'hui ?',
      timestamp: new Date(Date.now() - 60000),
      isRead: true,
    },
  ]);
  
  const [showSeveritySelector, setShowSeveritySelector] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Actions suggérées
  const actions = [
    {
      id: '1',
      type: 'exercise' as const,
      title: 'Exercice de respiration',
      description: 'Cohérence cardiaque 5 min',
      icon: '🫁',
    },
    {
      id: '2',
      type: 'appointment' as const,
      title: 'Prendre RDV',
      description: 'Réserver une séance',
      icon: '📅',
    },
    {
      id: '3',
      type: 'emergency' as const,
      title: 'Appel d\'urgence',
      description: 'Contacts disponibles 24/7',
      icon: '🆘',
    },
    {
      id: '4',
      type: 'continue' as const,
      title: 'Continuer la discussion',
      description: 'Parler librement',
      icon: '💬',
    },
  ];

  // Scroll automatique vers le bas
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = (content: string) => {
    // Ajouter le message du patient
    const newMessage: Message = {
      _id: Date.now().toString(),
      conversationId: 'conv1',
      sender: 'patient',
      content,
      timestamp: new Date(),
      isRead: false,
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulation de réponse de l'IA après 1 seconde
    setTimeout(() => {
      const iaResponse: Message = {
        _id: (Date.now() + 1).toString(),
        conversationId: 'conv1',
        sender: 'ia',
        content: 'Je comprends ce que vous ressentez. Souhaitez-vous en parler davantage ou préférez-vous essayer une des actions que je vous propose ?',
        timestamp: new Date(),
        isRead: false,
      };
      setMessages(prev => [...prev, iaResponse]);
    }, 1000);

    // Proposer l'auto-évaluation après 3 messages
    if (messages.filter(m => m.sender === 'patient').length >= 2) {
      setTimeout(() => {
        setShowSeveritySelector(true);
      }, 2000);
    }
  };

  const handleActionPress = (action: any) => {
    console.log('Action pressed:', action);
    // TODO: Implémenter la logique des actions
  };

  const handleSeveritySelect = (level: SeverityLevel) => {
    console.log('Severity selected:', level);
    
    // Ajouter un message de confirmation
    const confirmMessage: Message = {
      _id: Date.now().toString(),
      conversationId: 'conv1',
      sender: 'ia',
      content: 'Merci pour votre retour. Votre thérapeute en sera informé. N\'hésitez pas à continuer la conversation si vous en ressentez le besoin.',
      timestamp: new Date(),
      isRead: false,
    };
    
    setMessages(prev => [...prev, confirmMessage]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCF9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        <View className="flex-1">
          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4"
            contentContainerStyle={{ paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <MessageBubble
                key={message._id}
                sender={message.sender}
                content={message.content}
                timestamp={message.timestamp}
                senderName="Dr. Martin"
              />
            ))}
          </ScrollView>

          {/* Actions suggérées */}
          <ActionsPanel
            actions={actions}
            onActionPress={handleActionPress}
          />

          {/* Input de message */}
          <ChatInput onSend={handleSendMessage} />
        </View>

        {/* Modal d'auto-évaluation */}
        <SeveritySelector
          visible={showSeveritySelector}
          onClose={() => setShowSeveritySelector(false)}
          onSelect={handleSeveritySelect}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
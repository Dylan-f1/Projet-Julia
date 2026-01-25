import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format, isToday, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';

const ConversationItem = ({ conversation, onPress }) => {
  const formatDate = (date) => {
    const conversationDate = new Date(date);
    
    if (isToday(conversationDate)) {
      return format(conversationDate, 'HH:mm', { locale: fr });
    } else if (isYesterday(conversationDate)) {
      return 'Hier';
    } else {
      return format(conversationDate, 'dd/MM/yyyy', { locale: fr });
    }
  };

  const lastMessage = conversation.messages?.[conversation.messages.length - 1];
  const hasUnread = conversation.unreadCount > 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(conversation)}
      className={`bg-white border-b border-gray-100 px-4 py-4 ${hasUnread ? 'bg-blue-50' : ''}`}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-1">
        <Text className={`text-base flex-1 ${hasUnread ? 'font-bold' : 'font-semibold'} text-gray-900`}>
          {conversation.summary || 'Nouvelle conversation'}
        </Text>
        
        <Text className={`text-xs ${hasUnread ? 'text-primary-600 font-semibold' : 'text-gray-500'} ml-2`}>
          {formatDate(conversation.updatedAt)}
        </Text>
      </View>
      
      {lastMessage && (
        <View className="flex-row justify-between items-center">
          <Text 
            className={`text-sm ${hasUnread ? 'text-gray-700' : 'text-gray-500'} flex-1`}
            numberOfLines={1}
          >
            {lastMessage.role === 'user' ? 'Vous: ' : 'Julia: '}
            {lastMessage.content}
          </Text>
          
          {hasUnread && (
            <View className="bg-primary-600 rounded-full w-6 h-6 items-center justify-center ml-2">
              <Text className="text-white text-xs font-bold">
                {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ConversationItem;

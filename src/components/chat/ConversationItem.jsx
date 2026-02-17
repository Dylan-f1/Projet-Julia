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
      className={`rounded-xl px-4 py-4 mb-2 border border-surface-200 ${
        hasUnread ? 'bg-patient-50' : 'bg-white'
      }`}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-1.5">
        <Text
          className={`text-base flex-1 text-text-700 ${
            hasUnread ? 'font-bold' : 'font-semibold'
          }`}
          numberOfLines={1}
        >
          {typeof conversation.summary === 'string'
            ? conversation.summary
            : conversation.summary?.mainConcern || 'Nouvelle conversation'}
        </Text>

        <Text className="text-xs ml-2 text-text-300">
          {formatDate(conversation.updatedAt)}
        </Text>
      </View>

      {lastMessage && (
        <View className="flex-row justify-between items-center">
          <Text
            className="text-sm flex-1 text-text-500"
            numberOfLines={1}
          >
            {lastMessage.role === 'user' ? 'Vous : ' : 'Julia : '}
            {lastMessage.content}
          </Text>

          {hasUnread && (
            <View
              className="bg-patient-400 rounded-full items-center justify-center ml-2"
              style={{ width: 22, height: 22 }}
            >
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

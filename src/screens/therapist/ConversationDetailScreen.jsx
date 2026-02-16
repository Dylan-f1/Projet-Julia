import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble from '../../components/chat/MessageBubble';
import Loading from '../../components/common/Loading';
import chatService from '../../services/chatService';

const ConversationDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const conversationId = id;

  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conversationId) {
      loadConversation();
    }
  }, [conversationId]);

  const loadConversation = async () => {
    setLoading(true);
    const result = await chatService.getConversation(conversationId);
    setLoading(false);

    if (result.success) {
      setConversation(result.data);
    }
  };

  if (loading) {
    return <Loading message="Chargement de la conversation..." />;
  }

  if (!conversation) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: '#FAFAFA' }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: 32,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#F5F5F4',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="chatbubbles-outline" size={40} color="#C8C4C0" />
          </View>
          <Text style={{ color: '#6B6B6B', marginTop: 8 }}>Conversation introuvable</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Responsive container */}
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#EEECEB',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Back button (mobile only) */}
            {!isWeb && (
              <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#FDF6EA',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="arrow-back" size={20} color="#E8A838" />
                </View>
              </TouchableOpacity>
            )}

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: '600', color: '#1A1A1A' }}>
                {conversation.summary || 'Conversation'}
              </Text>
              <Text style={{ fontSize: 13, color: '#A0A0A0', marginTop: 4 }}>
                {new Date(conversation.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            {/* LECTURE SEULE badge — therapist-100 bg, therapist-600 text */}
            <View
              style={{
                backgroundColor: '#FAE8C4',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: '#B07820', fontSize: 11, fontWeight: '700' }}>
                LECTURE SEULE
              </Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <View className={`flex-1 ${isWeb ? 'overflow-y-auto' : ''}`} style={{ backgroundColor: '#FAFAFA' }}>
          <FlatList
            data={conversation.messages || []}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 8,
                  paddingHorizontal: 4,
                }}
              >
                {/* Wrap with role-specific background */}
                {item.role === 'user' ? (
                  <View
                    style={{
                      backgroundColor: '#D4E4F5',
                      borderRadius: 16,
                      padding: 2,
                    }}
                  >
                    <MessageBubble message={item} isUser={true} />
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#FEF4F3',
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#F9CCC7',
                      padding: 2,
                    }}
                  >
                    <MessageBubble message={item} isUser={false} />
                  </View>
                )}
              </View>
            )}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={!isWeb}
          />
        </View>

        {/* Info footer */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderTopWidth: 1,
            borderTopColor: '#EEECEB',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: '#FDF6EA',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Ionicons name="information-circle-outline" size={16} color="#E8A838" />
            </View>
            <Text style={{ fontSize: 12, color: '#6B6B6B', flex: 1, lineHeight: 16 }}>
              Cette conversation est en lecture seule. Le patient peut continuer a echanger avec Jul-IA.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConversationDetailScreen;

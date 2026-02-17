import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../common/Button';

const NotesTab = ({ sessionNotes = [], onAddNote }) => {
  const isWeb = Platform.OS === 'web';
  const safeNotes = Array.isArray(sessionNotes) ? sessionNotes : [];

  return (
    <View className="p-4">
      <Button
        title="Ajouter une note"
        onPress={onAddNote}
        icon={<Ionicons name="add-circle-outline" size={20} color="white" />}
        className="mb-4"
      />

      {safeNotes.length === 0 ? (
        <View className="bg-white rounded-xl p-8 items-center border border-surface-200">
          <View className="w-14 h-14 bg-therapist-50 rounded-full items-center justify-center mb-3">
            <Ionicons name="document-text-outline" size={28} color="#E8A838" />
          </View>
          <Text className="text-text-300 text-center">
            Aucune note de seance
          </Text>
        </View>
      ) : (
        <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
          {safeNotes.map((note) => (
            <View
              key={note._id}
              className={isWeb ? 'flex-1 min-w-[300px] mb-3' : 'mb-3'}
            >
              <View
                className="bg-white rounded-xl p-5"
                style={{ borderLeftWidth: 4, borderLeftColor: '#E8A838' }}
              >
                <View className="flex-row items-center mb-2">
                  <View className="w-8 h-8 bg-therapist-50 rounded-full items-center justify-center mr-3">
                    <Ionicons name="document-text-outline" size={16} color="#E8A838" />
                  </View>
                  <Text className="text-base font-semibold text-text-900">
                    Seance du {new Date(note.sessionDate).toLocaleDateString('fr-FR')}
                  </Text>
                </View>

                {note.summary && (
                  <Text className="text-sm text-text-500 mb-3 ml-11 leading-5" numberOfLines={3}>
                    {note.summary}
                  </Text>
                )}

                {note.tags && note.tags.length > 0 && (
                  <View className="flex-row flex-wrap mt-2 ml-11">
                    {note.tags.map((tag, idx) => (
                      <View
                        key={idx}
                        className="bg-therapist-100 px-3 py-1 rounded-full mr-2 mb-2"
                      >
                        <Text className="text-xs text-therapist-600 font-medium">{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default NotesTab;

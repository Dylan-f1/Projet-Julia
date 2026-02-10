// src/components/patient/tabs/NotesTab.jsx
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../common/Card';
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
        <Card>
          <Text className="text-gray-600 text-center">
            Aucune note de séance
          </Text>
        </Card>
      ) : (
        <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
          {safeNotes.map((note) => (
            <View 
              key={note._id}
              className={isWeb ? 'flex-1 min-w-[300px] mb-3' : 'mb-3'}
            >
              <Card>
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-base font-semibold text-gray-900">
                    Séance du {new Date(note.sessionDate).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                
                {note.summary && (
                  <Text className="text-sm text-gray-700 mb-2" numberOfLines={3}>
                    {note.summary}
                  </Text>
                )}

                {note.tags && note.tags.length > 0 && (
                  <View className="flex-row flex-wrap mt-2">
                    {note.tags.map((tag, idx) => (
                      <View key={idx} className="bg-primary-100 px-2 py-1 rounded mr-2 mb-2">
                        <Text className="text-xs text-primary-700">{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </Card>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default NotesTab;
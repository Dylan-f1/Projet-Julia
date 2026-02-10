import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router'; 
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import patientService from '../../services/patientService';
import evaluationService from '../../services/evaluationService';
import sessionNoteService from '../../services/sessionNoteService';
import chatService from '../../services/chatService';

const PatientDetailScreen = () => { 
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const patientId = id; 
  
  const [patient, setPatient] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentEvaluations, setRecentEvaluations] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [sessionNotes, setSessionNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    if (patientId) { 
      loadPatientData();
    }
  }, [patientId]);

  const loadPatientData = async () => {
    setLoading(true);
    
    const [patientResult, statsResult, conversationsResult, notesResult] = await Promise.all([
      patientService.getPatient(patientId),
      patientService.getPatientStats(patientId),
      chatService.getConversationsByPatient(patientId),
      sessionNoteService.getSessionNotes(patientId),
    ]);

    if (patientResult.success) setPatient(patientResult.data);
    if (statsResult.success) setStats(statsResult.data);
    if (conversationsResult.success) setConversations(conversationsResult.data);
    if (notesResult.success) setSessionNotes(notesResult.data);

    const endDate = new Date().toISOString();
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const evalResult = await evaluationService.getPatientEvaluationsByTherapist(
      patientId, 
      startDate, 
      endDate
    );
    if (evalResult.success) setRecentEvaluations(evalResult.data);

    setLoading(false);
  };

  const handleArchive = async () => {
    Alert.alert(
      'Archiver le patient',
      'Êtes-vous sûr de vouloir archiver ce patient ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Archiver',
          style: 'destructive',
          onPress: async () => {
            const result = await patientService.archivePatient(patientId);
            if (result.success) {
              Alert.alert('Succès', 'Patient archivé');
              router.back();
            } else {
              Alert.alert('Erreur', result.error);
            }
          },
        },
      ]
    );
  };

  const handleEditPatient = () => {
    router.push(`/therapist/patients/${patientId}/edit`); 
  };

  const handleViewConversation = (conversation) => {
    router.push(`/therapist/conversations/${conversation._id}`);
  };

  const handleAddNote = () => {
    router.push(`/therapist/patients/${patientId}/add-note`); 
  };

  const handleGoBack = () => {
    // Sur web, retour vers le dashboard
    if (isWeb) {
      router.push('/therapist/dashboard');
    } else {
      router.back();
    }
  };

  if (loading) {
    return <Loading message="Chargement du dossier patient..." />;
  }

  if (!patient) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-600">Patient introuvable</Text>
      </SafeAreaView>
    );
  }

  const StatBox = ({ icon, label, value, color = 'primary', trend }) => (
    <View className={`flex-1 items-center p-4 ${isWeb ? 'min-w-[120px]' : ''}`}>
      <View className={`w-12 h-12 bg-${color}-100 rounded-full items-center justify-center mb-2`}>
        <Ionicons name={icon} size={24} color={color === 'primary' ? '#0284c7' : color === 'accent' ? '#22c55e' : '#ef4444'} />
      </View>
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
      <Text className="text-sm text-gray-600 text-center">{label}</Text>
      {trend && (
        <View className={`mt-1 px-2 py-1 rounded ${
          trend === 'improving' ? 'bg-green-100' : 
          trend === 'declining' ? 'bg-red-100' : 'bg-gray-100'
        }`}>
          <Text className={`text-xs ${
            trend === 'improving' ? 'text-green-600' : 
            trend === 'declining' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend === 'improving' ? '↗ Amélioration' : 
             trend === 'declining' ? '↘ Détérioration' : '→ Stable'}
          </Text>
        </View>
      )}
    </View>
  );

  const TabButton = ({ id, label, icon }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(id)}
      className={`flex-1 py-3 border-b-2 ${
        activeTab === id ? 'border-secondary-600' : 'border-gray-200'
      } ${isWeb ? 'min-w-[140px] hover:bg-gray-50' : ''}`}
    >
      <View className="items-center">
        <Ionicons 
          name={icon} 
          size={20} 
          color={activeTab === id ? '#c026d3' : '#9CA3AF'} 
        />
        <Text className={`text-sm mt-1 ${
          activeTab === id ? 'text-secondary-600 font-semibold' : 'text-gray-600'
        }`}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Conteneur responsive */}
      <View className={`flex-1 ${isWeb ? 'max-w-5xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className="bg-white px-4 py-4 border-b border-gray-200">
          <View className="flex-row items-center justify-between mb-4">
            {/* Bouton retour - toujours visible maintenant */}
            <TouchableOpacity 
              onPress={handleGoBack}
              className={isWeb ? 'hover:bg-gray-100 p-2 rounded-lg -ml-2' : ''}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            
            <View className="flex-1 mx-4">
              <Text className="text-xl font-bold text-gray-900">
                {patient.firstName} {patient.lastName}
              </Text>
              <Text className="text-sm text-gray-600">{patient.email}</Text>
            </View>

            <TouchableOpacity 
              onPress={handleEditPatient}
              className={isWeb ? 'hover:bg-gray-100 p-2 rounded-lg' : ''}
            >
              <Ionicons name="create-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {patient.criticalStatus && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <View className="flex-row items-center">
                <Ionicons name="warning" size={20} color="#ef4444" />
                <Text className="text-red-600 font-semibold ml-2 flex-1">
                  Patient en situation critique - Surveillance renforcée
                </Text>
              </View>
            </View>
          )}

          {/* Tabs - Scroll horizontal sur mobile, flexbox sur desktop */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className={isWeb ? 'flex-row' : ''}
          >
            <View className="flex-row">
              <TabButton id="overview" label="Vue d'ensemble" icon="grid-outline" />
              <TabButton id="conversations" label="Conversations" icon="chatbubbles-outline" />
              <TabButton id="evaluations" label="Évaluations" icon="analytics-outline" />
              <TabButton id="notes" label="Notes" icon="document-text-outline" />
            </View>
          </ScrollView>
        </View>

        {/* Contenu scrollable */}
        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={!isWeb}
        >
          {activeTab === 'overview' && (
            <View className={`p-4 ${isWeb ? 'pb-8' : ''}`}>
              {/* Statistiques */}
              {stats && (
                <Card className="mb-4">
                  <Text className="text-lg font-semibold text-gray-900 mb-4">
                    Statistiques
                  </Text>
                  
                  {/* Grille responsive */}
                  <View className={`border-b border-gray-200 pb-4 mb-4 ${
                    isWeb ? 'flex-row flex-wrap justify-around' : 'flex-row'
                  }`}>
                    <StatBox
                      icon="chatbubbles"
                      label="Conversations"
                      value={stats.totalConversations || 0}
                    />
                    <StatBox
                      icon="calendar"
                      label="Évaluations"
                      value={recentEvaluations.length}
                    />
                    <StatBox
                      icon="document-text"
                      label="Notes"
                      value={sessionNotes.length}
                    />
                  </View>

                  <View className={isWeb ? 'flex-row flex-wrap justify-around' : 'flex-row'}>
                    <StatBox
                      icon="happy"
                      label="Humeur moy."
                      value={stats.averageMood?.toFixed(1) || 'N/A'}
                      color="accent"
                      trend={stats.moodTrend}
                    />
                    <StatBox
                      icon="pulse"
                      label="Anxiété moy."
                      value={stats.averageAnxiety?.toFixed(1) || 'N/A'}
                      color={stats.averageAnxiety > 3 ? 'red' : 'accent'}
                      trend={stats.anxietyTrend}
                    />
                    <StatBox
                      icon="moon"
                      label="Sommeil moy."
                      value={stats.averageSleep?.toFixed(1) || 'N/A'}
                      color="primary"
                    />
                  </View>
                </Card>
              )}

              {/* Informations patient */}
              <Card className="mb-4">
                <Text className="text-lg font-semibold text-gray-900 mb-4">
                  Informations
                </Text>
                
                {patient.birthDate && (
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="calendar-outline" size={20} color="#6B7280" />
                    <Text className="text-gray-700 ml-3">
                      Né(e) le {new Date(patient.birthDate).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                )}

                {patient.phone && (
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="call-outline" size={20} color="#6B7280" />
                    <Text className="text-gray-700 ml-3">{patient.phone}</Text>
                  </View>
                )}

                <View className="flex-row items-center mb-3">
                  <Ionicons name="mail-outline" size={20} color="#6B7280" />
                  <Text className="text-gray-700 ml-3">{patient.email}</Text>
                </View>

                {patient.lastContact && (
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={20} color="#6B7280" />
                    <Text className="text-gray-700 ml-3">
                      Dernier contact: {new Date(patient.lastContact).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                )}
              </Card>

              {patient.notes && (
                <Card className="mb-4">
                  <Text className="text-lg font-semibold text-gray-900 mb-2">
                    Notes privées
                  </Text>
                  <Text className="text-gray-700 leading-6">{patient.notes}</Text>
                </Card>
              )}

              {/* Actions - Grid sur desktop */}
              <View className={isWeb ? 'flex-row flex-wrap gap-3' : 'mb-4'}>
                <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
                  <Button
                    title="Ajouter une note de séance"
                    onPress={handleAddNote}
                    icon={<Ionicons name="add-circle-outline" size={20} color="white" />}
                  />
                </View>
                <View className={isWeb ? 'flex-1 min-w-[250px]' : 'mb-3'}>
                  <Button
                    title="Modifier les informations"
                    onPress={handleEditPatient}
                    variant="outline"
                    icon={<Ionicons name="create-outline" size={20} color="#0284c7" />}
                  />
                </View>
                <View className={isWeb ? 'flex-1 min-w-[250px]' : ''}>
                  <Button
                    title="Archiver le patient"
                    onPress={handleArchive}
                    variant="danger"
                    icon={<Ionicons name="archive-outline" size={20} color="white" />}
                  />
                </View>
              </View>
            </View>
          )}

          {activeTab === 'conversations' && (
            <View className="p-4">
              {conversations.length === 0 ? (
                <Card>
                  <Text className="text-gray-600 text-center">
                    Aucune conversation pour le moment
                  </Text>
                </Card>
              ) : (
                <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
                  {conversations.map((conv) => (
                    <View 
                      key={conv._id}
                      className={isWeb ? 'flex-1 min-w-[300px] mb-3' : 'mb-3'}
                    >
                      <Card onPress={() => handleViewConversation(conv)}>
                        <View className="flex-row justify-between items-start mb-2">
                          <Text className="text-base font-semibold text-gray-900 flex-1">
                            {conv.summary || 'Conversation'}
                          </Text>
                          <Text className="text-xs text-gray-500 ml-2">
                            {new Date(conv.updatedAt).toLocaleDateString('fr-FR')}
                          </Text>
                        </View>
                        <Text className="text-sm text-gray-600">
                          {conv.messages?.length || 0} messages
                        </Text>
                      </Card>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {activeTab === 'evaluations' && (
            <View className="p-4">
              {recentEvaluations.length === 0 ? (
                <Card>
                  <Text className="text-gray-600 text-center">
                    Aucune évaluation pour le moment
                  </Text>
                </Card>
              ) : (
                <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
                  {recentEvaluations.map((evaluation) => (
                    <View 
                      key={evaluation._id}
                      className={isWeb ? 'flex-1 min-w-[300px] mb-3' : 'mb-3'}
                    >
                      <Card>
                        <View className="flex-row justify-between items-center mb-3">
                          <Text className="text-base font-semibold text-gray-900">
                            {new Date(evaluation.date).toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long' 
                            })}
                          </Text>
                        </View>
                        
                        <View className="flex-row justify-between">
                          <View className="items-center flex-1">
                            <Text className="text-xs text-gray-600 mb-1">Humeur</Text>
                            <View className="flex-row items-center">
                              <Text className="text-2xl font-bold text-gray-900">{evaluation.mood}</Text>
                              <Text className="text-gray-500">/5</Text>
                            </View>
                          </View>
                          
                          <View className="items-center flex-1">
                            <Text className="text-xs text-gray-600 mb-1">Anxiété</Text>
                            <View className="flex-row items-center">
                              <Text className="text-2xl font-bold text-gray-900">{evaluation.anxiety}</Text>
                              <Text className="text-gray-500">/5</Text>
                            </View>
                          </View>
                          
                          <View className="items-center flex-1">
                            <Text className="text-xs text-gray-600 mb-1">Sommeil</Text>
                            <View className="flex-row items-center">
                              <Text className="text-2xl font-bold text-gray-900">{evaluation.sleep}</Text>
                              <Text className="text-gray-500">/5</Text>
                            </View>
                          </View>
                        </View>

                        {evaluation.notes && (
                          <View className="mt-3 pt-3 border-t border-gray-200">
                            <Text className="text-sm text-gray-700">{evaluation.notes}</Text>
                          </View>
                        )}
                      </Card>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {activeTab === 'notes' && (
            <View className="p-4">
              <Button
                title="Ajouter une note"
                onPress={handleAddNote}
                icon={<Ionicons name="add-circle-outline" size={20} color="white" />}
                className="mb-4"
              />

              {sessionNotes.length === 0 ? (
                <Card>
                  <Text className="text-gray-600 text-center">
                    Aucune note de séance
                  </Text>
                </Card>
              ) : (
                <View className={isWeb ? 'flex-row flex-wrap gap-3' : ''}>
                  {sessionNotes.map((note) => (
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
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PatientDetailScreen;
// src/screens/therapist/PatientDetailScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Platform, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import Loading from '../../components/common/Loading';
import PatientHeader from '../../components/patient/PatientHeader';
import PatientTabs from '../../components/patient/PatientTabs';
import OverviewTab from '../../components/patient/tabs/OverviewTab';
import ConversationsTab from '../../components/patient/tabs/ConversationsTab';
import EvaluationsTab from '../../components/patient/tabs/EvaluationsTab';
import NotesTab from '../../components/patient/tabs/NotesTab';
import QRCodeTab from '../../components/patient/tabs/QRCodeTab';
import MagicLinkModal from '../../components/therapist/MagicLinkModal';

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

  const [showMagicLinkModal, setShowMagicLinkModal] = useState(false);
  const [magicLinkData, setMagicLinkData] = useState({
    magicLink: '',
    qrCode: '',
  });

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    if (patientId) {
      loadPatientData();
    }
  }, [patientId]);

  const loadPatientData = async () => {
    setLoading(true);

    try {
      const [patientResult, statsResult, conversationsResult, notesResult] =
        await Promise.all([
          patientService.getPatient(patientId),
          patientService.getPatientStats(patientId),
          chatService.getConversationsByPatient(patientId),
          sessionNoteService.getSessionNotes(patientId),
        ]);

      if (patientResult.success) setPatient(patientResult.data.patient);
      if (statsResult.success) setStats(statsResult.data);

      if (conversationsResult.success) {
        const convArray = Array.isArray(conversationsResult.data)
          ? conversationsResult.data
          : (conversationsResult.data?.conversations || []);
        setConversations(convArray);
      }

      if (notesResult.success) {
        const notesArray = Array.isArray(notesResult.data)
          ? notesResult.data
          : (notesResult.data?.notes || []);
        setSessionNotes(notesArray);
      }

      const endDate = new Date().toISOString();
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const evalResult = await evaluationService.getPatientEvaluationsByTherapist(
        patientId,
        startDate,
        endDate
      );

      if (evalResult.success) {
        const evalArray = Array.isArray(evalResult.data)
          ? evalResult.data
          : (evalResult.data?.evaluations || []);
        setRecentEvaluations(evalArray);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des donnees:', error);
      Alert.alert('Erreur', 'Impossible de charger les donnees du patient');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    isWeb ? router.push('/therapist/dashboard') : router.back();
  };

  const handleEditPatient = () => {
    router.push(`/therapist/patients/${patientId}/edit`);
  };

  const handleAddNote = () => {
    router.push(`/therapist/patients/${patientId}/add-note`);
  };

  const handleViewConversation = (conversation) => {
    router.push(`/therapist/conversations/${conversation._id}`);
  };

  const handleArchive = async () => {
    Alert.alert(
      'Archiver le patient',
      'Etes-vous sur de vouloir archiver ce patient ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Archiver',
          style: 'destructive',
          onPress: async () => {
            const result = await patientService.archivePatient(patientId);
            if (result.success) {
              Alert.alert('Succes', 'Patient archive');
              router.back();
            } else {
              Alert.alert('Erreur', result.error);
            }
          },
        },
      ]
    );
  };

  const handleResendMagicLink = async () => {
    const result = await patientService.resendMagicLink(patientId);

    if (result.success) {
      setMagicLinkData({
        magicLink: result.data.magicLink || '',
        qrCode: result.data.qrCode || '',
      });
      setShowMagicLinkModal(true);
      Alert.alert('Succes', 'Email envoye au patient');
    } else {
      Alert.alert('Erreur', result.error || 'Impossible de renvoyer l\'email');
    }
  };

  const handleCloseMagicLinkModal = () => {
    setShowMagicLinkModal(false);
  };

  const handleResendFromModal = async () => {
    const result = await patientService.resendMagicLink(patientId);

    if (result.success) {
      setMagicLinkData({
        magicLink: result.data.magicLink || '',
        qrCode: result.data.qrCode || '',
      });
      return true;
    }
    return false;
  };

  if (loading) {
    return <Loading message="Chargement du dossier patient..." />;
  }

  if (!patient) {
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
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#FEF0F0',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="person-outline" size={28} color="#E05B5B" />
          </View>
          <Text style={{ color: '#1A1A1A', fontWeight: '600', fontSize: 16 }}>
            Patient introuvable
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      <View style={{ flex: 1 }}>

        {/* Bande header — pleine largeur avec contenu centré */}
        <View
          style={{
            backgroundColor: '#FDF6EA',
            borderBottomWidth: 1,
            borderBottomColor: '#FAE8C4',
          }}
        >
          <View
            style={
              isWeb
                ? { maxWidth: 960, alignSelf: 'center', width: '100%' }
                : undefined
            }
          >
            <PatientHeader
              patient={patient}
              onBack={handleGoBack}
              onEdit={handleEditPatient}
            />
          </View>
        </View>

        {/* Tabs — contenu centré desktop */}
        <View
          style={
            isWeb
              ? { maxWidth: 960, alignSelf: 'center', width: '100%' }
              : undefined
          }
        >
          <PatientTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </View>

        {/* Content area */}
        <ScrollView
          style={{ flex: 1, backgroundColor: '#FAFAFA' }}
          showsVerticalScrollIndicator={!isWeb}
          contentContainerStyle={
            isWeb
              ? { maxWidth: 960, alignSelf: 'center', width: '100%' }
              : undefined
          }
        >
          {activeTab === 'overview' && (
            <OverviewTab
              patient={patient}
              stats={stats}
              recentEvaluations={recentEvaluations}
              sessionNotes={sessionNotes}
              onAddNote={handleAddNote}
              onEdit={handleEditPatient}
              onArchive={handleArchive}
              onResendMagicLink={handleResendMagicLink}
            />
          )}

          {activeTab === 'qrcode' && (
            <QRCodeTab
              patientId={patientId}
              patientEmail={patient.email}
            />
          )}

          {activeTab === 'conversations' && (
            <ConversationsTab
              conversations={conversations}
              onViewConversation={handleViewConversation}
            />
          )}

          {activeTab === 'evaluations' && (
            <EvaluationsTab evaluations={recentEvaluations} />
          )}

          {activeTab === 'notes' && (
            <NotesTab
              sessionNotes={sessionNotes}
              onAddNote={handleAddNote}
            />
          )}
        </ScrollView>

        {/* Modal Magic Link */}
        {patient && (
          <MagicLinkModal
            visible={showMagicLinkModal}
            onClose={handleCloseMagicLinkModal}
            magicLink={magicLinkData.magicLink}
            qrCodeDataUrl={magicLinkData.qrCode}
            patientName={`${patient.firstName} ${patient.lastName}`}
            patientEmail={patient.email}
            patientId={patientId}
            onResend={handleResendFromModal}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PatientDetailScreen;

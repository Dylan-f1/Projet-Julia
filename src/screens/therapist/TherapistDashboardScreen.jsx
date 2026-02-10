import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import patientService from '../../services/patientService';
import { useAuth } from '../../contexts/AuthContext';

const TherapistDashboardScreen = () => {
  const router = useRouter();  
  const { logout } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    critical: 0,
  });

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    const result = await patientService.getMyPatients();
    setLoading(false);

    if (result.success) {
      const patientsArray = result.data.patients || result.data || [];
      
      setPatients(patientsArray);
      calculateStats(patientsArray);
    }
  };

  const calculateStats = (patientsData) => {
    const active = patientsData.filter(p => p.status === 'active').length;
    const critical = patientsData.filter(p => p.criticalStatus).length;
    
    setStats({
      total: patientsData.length,
      active,
      critical,
    });
  };

  const handlePatientPress = (patient) => {
    router.push(`/therapist/patients/${patient._id}`);
  };

  const handleAddPatient = () => {
    router.push('/therapist/patients/add');
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <Loading message="Chargement de vos patients..." />;
  }

  const StatCard = ({ icon, title, value, color = 'primary' }) => (
    <Card variant="elevated" className={`flex-1 ${isWeb ? 'min-w-[200px]' : 'mx-1'}`}>
      <View className="items-center">
        <View className={`w-12 h-12 bg-${color}-100 rounded-full items-center justify-center mb-2`}>
          <Ionicons name={icon} size={24} color={color === 'primary' ? '#0284c7' : color === 'accent' ? '#22c55e' : '#ef4444'} />
        </View>
        <Text className="text-2xl font-bold text-gray-900">{value}</Text>
        <Text className="text-sm text-gray-600 text-center">{title}</Text>
      </View>
    </Card>
  );

  const PatientCard = ({ patient }) => (
    <Card onPress={() => handlePatientPress(patient)} className={isWeb ? 'hover:shadow-lg transition-shadow' : ''}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="text-lg font-semibold text-gray-900 flex-1">
              {patient.firstName} {patient.lastName}
            </Text>
            {patient.criticalStatus && (
              <View className="bg-red-100 px-2 py-1 rounded-full">
                <Text className="text-red-600 text-xs font-semibold">
                  CRITIQUE
                </Text>
              </View>
            )}
          </View>
          
          <Text className="text-sm text-gray-600 mb-1">
            {patient.email}
          </Text>
          
          {patient.lastContact && (
            <Text className="text-xs text-gray-500">
              Dernier contact: {new Date(patient.lastContact).toLocaleDateString('fr-FR')}
            </Text>
          )}
        </View>
        
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Conteneur responsive */}
      <View className={`flex-1 ${isWeb ? 'max-w-7xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className={`bg-white px-4 py-4 border-b border-gray-200 ${isWeb ? 'px-8' : ''}`}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-gray-900">
              Dashboard
            </Text>
            <TouchableOpacity onPress={handleLogout}>
              <View className="flex-row items-center">
                <Ionicons name="log-out-outline" size={24} color="#6B7280" />
                {isWeb && <Text className="ml-2 text-gray-700">Déconnexion</Text>}
              </View>
            </TouchableOpacity>
          </View>

          {/* Stats - Grille responsive */}
          <View className={`flex-row mb-4 ${isWeb ? 'gap-4' : ''}`}>
            <StatCard icon="people" title="Total" value={stats.total} />
            <StatCard icon="checkmark-circle" title="Actifs" value={stats.active} color="accent" />
            <StatCard icon="alert-circle" title="Critiques" value={stats.critical} color="red" />
          </View>

          <Button
            title="Ajouter un patient"
            onPress={handleAddPatient}
            icon={<Ionicons name="person-add" size={20} color="white" />}
            className={isWeb ? 'max-w-xs' : ''}
          />
        </View>

        {/* Liste des patients */}
        {patients.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="people-outline" size={80} color="#9CA3AF" />}
            title="Aucun patient"
            message="Commencez par ajouter votre premier patient pour suivre son parcours thérapeutique."
            actionLabel="Ajouter un patient"
            onAction={handleAddPatient}
          />
        ) : (
          <FlatList
            data={patients}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <PatientCard patient={item} />}
            contentContainerStyle={{ 
              padding: isWeb ? 32 : 16,
              ...(isWeb && { maxWidth: 1200, alignSelf: 'center', width: '100%' })
            }}
            numColumns={isWeb ? 2 : 1}
            key={isWeb ? 'grid' : 'list'}
            columnWrapperStyle={isWeb ? { gap: 16 } : undefined}
            refreshing={loading}
            onRefresh={loadPatients}
            showsVerticalScrollIndicator={!isWeb}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default TherapistDashboardScreen;
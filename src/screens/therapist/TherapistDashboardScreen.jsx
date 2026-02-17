import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, TextInput } from 'react-native';
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
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredPatients = patients.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (p.firstName || '').toLowerCase().includes(q) ||
      (p.lastName || '').toLowerCase().includes(q) ||
      (p.email || '').toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <Loading message="Chargement de vos patients..." />;
  }

  const PatientCard = ({ patient }) => {
    let borderLeftColor = '#EEECEB';
    if (patient.criticalStatus) {
      borderLeftColor = '#E05B5B'; 
    } else if (patient.status === 'active') {
      borderLeftColor = '#4CAF82'; 
    }

    return (
      <TouchableOpacity
        onPress={() => handlePatientPress(patient)}
        activeOpacity={0.7}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          borderLeftWidth: 4,
          borderLeftColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
          ...(isWeb ? { flex: 1, marginHorizontal: 0 } : {}),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              {/* Avatar icon */}
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: '#FDF6EA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Ionicons name="person" size={18} color="#E8A838" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#1A1A1A' }}>
                  {patient.firstName} {patient.lastName}
                </Text>
                <Text style={{ fontSize: 13, color: '#6B6B6B', marginTop: 2 }}>
                  {patient.email}
                </Text>
              </View>

              {/* Status badge */}
              {patient.criticalStatus ? (
                <View
                  style={{
                    backgroundColor: '#FEF0F0',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ color: '#E05B5B', fontSize: 11, fontWeight: '700' }}>
                    CRITIQUE
                  </Text>
                </View>
              ) : patient.status === 'active' ? (
                <View
                  style={{
                    backgroundColor: '#EDFAF2',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ color: '#4CAF82', fontSize: 11, fontWeight: '600' }}>
                    ACTIF
                  </Text>
                </View>
              ) : null}
            </View>

            {patient.lastContact && (
              <Text style={{ fontSize: 12, color: '#A0A0A0', marginLeft: 54 }}>
                Dernier contact : {new Date(patient.lastContact).toLocaleDateString('fr-FR')}
              </Text>
            )}
          </View>

          <Ionicons name="chevron-forward" size={20} color="#C8C4C0" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Responsive container */}
      <View className={`flex-1 ${isWeb ? 'max-w-5xl mx-auto w-full' : ''}`}>
        <View
          style={{
            backgroundColor: '#FDF6EA',
            paddingHorizontal: isWeb ? 32 : 16,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#FAE8C4',
          }}
        >
          {/* Title row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A' }}>
                Tableau de bord
              </Text>
              <Text style={{ fontSize: 14, color: '#6B6B6B', marginTop: 4 }}>
                Suivi de vos patients
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FEF0F0',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 12,
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#E05B5B" />
              {isWeb && (
                <Text style={{ marginLeft: 8, color: '#E05B5B', fontWeight: '600', fontSize: 14 }}>
                  Deconnexion
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ============================================ */}
          {/* STATS WITH VISUAL HIERARCHY                  */}
          {/* ============================================ */}

          {/* Stats row — compact horizontal layout on web */}
          <View style={{ flexDirection: isWeb ? 'row' : 'column', gap: 12, marginBottom: 12 }}>
            {/* Total patients stat */}
            <View
              style={{
                flex: isWeb ? 1 : undefined,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: '#FDF6EA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}
              >
                <Ionicons name="people" size={20} color="#E8A838" />
              </View>
              <View>
                <Text style={{ fontSize: 12, color: '#6B6B6B', fontWeight: '500' }}>
                  Total patients
                </Text>
                <Text style={{ fontSize: 28, fontWeight: '700', color: '#1A1A1A' }}>
                  {stats.total}
                </Text>
              </View>
            </View>

            {/* Active stat */}
            <View
              style={{
                flex: isWeb ? 1 : undefined,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 16,
                borderLeftWidth: 4,
                borderLeftColor: '#4CAF82',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 12, color: '#6B6B6B', fontWeight: '500', marginBottom: 4 }}>
                Actifs
              </Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A' }}>
                {stats.active}
              </Text>
            </View>

            {/* Critical stat */}
            <View
              style={{
                flex: isWeb ? 1 : undefined,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                padding: 16,
                borderLeftWidth: 4,
                borderLeftColor: '#E05B5B',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 12, color: '#6B6B6B', fontWeight: '500', marginBottom: 4 }}>
                Critiques
              </Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#1A1A1A' }}>
                {stats.critical}
              </Text>
            </View>
          </View>

          {/* Search bar + Add button row */}
          <View style={{ flexDirection: isWeb ? 'row' : 'column', gap: 350, alignItems: isWeb ? 'center' : 'stretch' }}>
          {/* Search bar — constrained width */}
          <View
            style={{
              flex: isWeb ? 1 : undefined,
              maxWidth: isWeb ? 400 : undefined,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              borderWidth: 1,
              borderColor: '#EEECEB',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: Platform.OS === 'ios' ? 12 : 6,
            }}
          >
            <Ionicons name="search-outline" size={20} color="#A0A0A0" />
            <TextInput
              placeholder="Rechercher un patient..."
              placeholderTextColor="#A0A0A0"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                marginLeft: 10,
                fontSize: 15,
                color: '#1A1A1A',
                ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
              }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#C8C4C0" />
              </TouchableOpacity>
            )}
          </View>

          {/* Add patient button (web) */}
          {isWeb && (
            <TouchableOpacity
              onPress={handleAddPatient}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#E8A838',
                borderRadius: 14,
                paddingVertical: 10,
                paddingHorizontal: 18,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#E8A838',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Ionicons name="person-add" size={18} color="white" />
              <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14, marginLeft: 8 }}>
                Ajouter un patient
              </Text>
            </TouchableOpacity>
          )}
          </View>
        </View>

        {/* ============================================ */}
        {/* Patient list                                 */}
        {/* ============================================ */}
        {filteredPatients.length === 0 && patients.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="people-outline" size={80} color="#C8C4C0" />}
            title="Aucun patient"
            message="Commencez par ajouter votre premier patient pour suivre son parcours therapeutique."
            actionLabel="Ajouter un patient"
            onAction={handleAddPatient}
          />
        ) : filteredPatients.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
            <Ionicons name="search-outline" size={60} color="#C8C4C0" />
            <Text style={{ color: '#6B6B6B', marginTop: 16, textAlign: 'center' }}>
              Aucun patient ne correspond a votre recherche.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredPatients}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <PatientCard patient={item} />}
            contentContainerStyle={{
              padding: isWeb ? 32 : 16,
              ...(isWeb && { maxWidth: 960, alignSelf: 'center', width: '100%' })
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

      {/* ============================================ */}
      {/* FAB — mobile only, therapist-400 color        */}
      {/* ============================================ */}
      {!isWeb && (
        <TouchableOpacity
          onPress={handleAddPatient}
          activeOpacity={0.85}
          style={{
            position: 'absolute',
            bottom: 32,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#E8A838',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#E8A838',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="person-add" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default TherapistDashboardScreen;

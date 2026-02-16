import React from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DataPolicy() {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';

  const SectionCard = ({ title, number, children }) => (
    <View
      className="mb-4 rounded-xl p-5"
      style={{
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text className="text-lg font-bold mb-3" style={{ color: '#1A1A1A' }}>
        {number}. {title}
      </Text>
      <Text className="leading-6" style={{ color: '#404040' }}>
        {children}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface-50">
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View
          className="px-6 py-4"
          style={{
            backgroundColor: '#FAFAFA',
            borderBottomWidth: 1,
            borderBottomColor: '#EEECEB',
          }}
        >
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4 w-10 h-10 rounded-xl items-center justify-center"
              style={{ backgroundColor: '#EEF4FB' }}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color="#5B9BD5" />
            </TouchableOpacity>
            <Text className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
              Politique de confidentialite
            </Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: isWeb ? 32 : 16 }}
        >
          {/* Date card */}
          <View
            className="mb-4 rounded-xl p-4"
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="text-sm" style={{ color: '#6B6B6B' }}>
              Derniere mise a jour : {new Date().toLocaleDateString('fr-FR')}
            </Text>
          </View>

          <SectionCard title="Donnees collectees" number="1">
            {`Julia App collecte les donnees suivantes :\n\n\u2022 Vos conversations avec Julia (assistant IA)\n\u2022 Vos donnees de suivi d'humeur et bien-etre\n\u2022 Les notes de session partagees par votre therapeute\n\u2022 Votre adresse email (uniquement pour l'authentification)\n\u2022 Metadonnees techniques (logs de connexion, adresse IP)`}
          </SectionCard>

          <SectionCard title="Utilisation des donnees" number="2">
            {`Vos donnees sont utilisees exclusivement pour :\n\n\u2022 Fournir un support therapeutique via l'assistant IA\n\u2022 Permettre le suivi et l'analyse par votre therapeute\n\u2022 Ameliorer la qualite de nos services\n\u2022 Respecter nos obligations legales\n\nNous ne vendons JAMAIS vos donnees a des tiers.`}
          </SectionCard>

          <SectionCard title="Partage des donnees" number="3">
            {`Vos donnees therapeutiques sont partagees uniquement avec :\n\n\u2022 Votre therapeute assigne\n\u2022 Les services d'IA (Google Gemini) pour generer les reponses\n\u2022 Les services d'infrastructure (AWS, MongoDB) avec chiffrement\n\nAucun partage a des fins commerciales ou publicitaires.`}
          </SectionCard>

          <SectionCard title="Vos droits (RGPD)" number="4">
            {`Conformement au RGPD, vous disposez des droits suivants :\n\n\u2022 Droit d'acces a vos donnees personnelles\n\u2022 Droit de rectification de vos donnees\n\u2022 Droit a l'effacement ("droit a l'oubli")\n\u2022 Droit a la portabilite de vos donnees\n\u2022 Droit de retirer votre consentement\n\u2022 Droit d'opposition au traitement\n\nPour exercer ces droits, contactez-nous a privacy@juliaapp.com`}
          </SectionCard>

          <SectionCard title="Securite" number="5">
            {`Nous mettons en oeuvre des mesures de securite avancees :\n\n\u2022 Chiffrement end-to-end des conversations\n\u2022 Stockage securise avec AWS S3 et MongoDB\n\u2022 Authentification securisee par magic link\n\u2022 Acces restreint au personnel autorise uniquement\n\u2022 Audits de securite reguliers\n\u2022 Conformite aux normes medicales (HIPAA)`}
          </SectionCard>

          <SectionCard title="Conservation des donnees" number="6">
            {`\u2022 Les conversations sont conservees pendant la duree de votre accompagnement\n\u2022 Les donnees sont supprimees 30 jours apres la demande de suppression\n\u2022 Certaines donnees peuvent etre conservees pour obligations legales`}
          </SectionCard>

          <SectionCard title="Cookies et tracking" number="7">
            {`Julia App n'utilise pas de cookies de tracking publicitaire. Nous utilisons uniquement des cookies techniques necessaires au fonctionnement de l'application.`}
          </SectionCard>

          <SectionCard title="Contact" number="8">
            {`Pour toute question concernant vos donnees :\n\nEmail : privacy@juliaapp.com\nDPO : dpo@juliaapp.com`}
          </SectionCard>

          {/* Info card */}
          <View
            className="mb-4 rounded-xl p-4"
            style={{
              backgroundColor: '#EEF4FB',
              borderWidth: 1,
              borderColor: '#A9C9EB',
            }}
          >
            <View className="flex-row items-start">
              <Ionicons name="bulb-outline" size={20} color="#5B9BD5" />
              <Text className="text-sm flex-1 ml-3" style={{ color: '#404040' }}>
                Vous pouvez exporter ou supprimer vos donnees a tout moment depuis votre profil.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

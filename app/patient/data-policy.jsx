import React from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Card from '../../src/components/common/Card';

export default function DataPolicy() {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className={`flex-1 ${isWeb ? 'max-w-4xl mx-auto w-full' : ''}`}>
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-6 py-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#0284c7" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">
              Politique de confidentialité
            </Text>
          </View>
        </View>

        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ padding: isWeb ? 32 : 16 }}
        >
          <Card className="mb-4">
            <Text className="text-sm text-gray-500 mb-6">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">1. Données collectées</Text>
            <Text className="text-gray-700 leading-6 mb-4">
              Julia App collecte les données suivantes :{'\n\n'}
              • Vos conversations avec Julia (assistant IA){'\n'}
              • Vos données de suivi d'humeur et bien-être{'\n'}
              • Les notes de session partagées par votre thérapeute{'\n'}
              • Votre adresse email (uniquement pour l'authentification){'\n'}
              • Métadonnées techniques (logs de connexion, adresse IP)
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">2. Utilisation des données</Text>
            <Text className="text-gray-700 leading-6 mb-4">
              Vos données sont utilisées exclusivement pour :{'\n\n'}
              • Fournir un support thérapeutique via l'assistant IA{'\n'}
              • Permettre le suivi et l'analyse par votre thérapeute{'\n'}
              • Améliorer la qualité de nos services{'\n'}
              • Respecter nos obligations légales{'\n\n'}
              Nous ne vendons JAMAIS vos données à des tiers.
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">3. Partage des données</Text>
            <Text className="text-gray-700 leading-6 mb-4">
              Vos données thérapeutiques sont partagées uniquement avec :{'\n\n'}
              • Votre thérapeute assigné{'\n'}
              • Les services d'IA (Google Gemini) pour générer les réponses{'\n'}
              • Les services d'infrastructure (AWS, MongoDB) avec chiffrement{'\n\n'}
              Aucun partage à des fins commerciales ou publicitaires.
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">4. Vos droits (RGPD)</Text>
            <Text className="text-gray-700 leading-6 mb-4">
              Conformément au RGPD, vous disposez des droits suivants :{'\n\n'}
              • Droit d'accès à vos données personnelles{'\n'}
              • Droit de rectification de vos données{'\n'}
              • Droit à l'effacement ("droit à l'oubli"){'\n'}
              • Droit à la portabilité de vos données{'\n'}
              • Droit de retirer votre consentement{'\n'}
              • Droit d'opposition au traitement{'\n\n'}
              Pour exercer ces droits, contactez-nous à privacy@juliaapp.com
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">5. Sécurité</Text>
            <Text className="text-gray-700 leading-6 mb-4">
              Nous mettons en œuvre des mesures de sécurité avancées :{'\n\n'}
              • Chiffrement end-to-end des conversations{'\n'}
              • Stockage sécurisé avec AWS S3 et MongoDB{'\n'}
              • Authentification sécurisée par magic link{'\n'}
              • Accès restreint au personnel autorisé uniquement{'\n'}
              • Audits de sécurité réguliers{'\n'}
              • Conformité aux normes médicales (HIPAA)
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">6. Conservation des données</Text>
            <Text className="text-gray-700 leading-6 mb-4">
              • Les conversations sont conservées pendant la durée de votre accompagnement{'\n'}
              • Les données sont supprimées 30 jours après la demande de suppression{'\n'}
              • Certaines données peuvent être conservées pour obligations légales
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">7. Cookies et tracking</Text>
            <Text className="text-gray-700 leading-6 mb-4">
              Julia App n'utilise pas de cookies de tracking publicitaire. Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement de l'application.
            </Text>

            <Text className="text-lg font-bold text-gray-900 mb-3">8. Contact</Text>
            <Text className="text-gray-700 leading-6 mb-6">
              Pour toute question concernant vos données :{'\n\n'}
              Email : privacy@juliaapp.com{'\n'}
              DPO : dpo@juliaapp.com
            </Text>

            <View className="bg-blue-50 p-4 rounded-lg">
              <Text className="text-sm text-blue-800">
                💡 Vous pouvez exporter ou supprimer vos données à tout moment depuis votre profil.
              </Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
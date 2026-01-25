import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';

const ErrorMessage = ({
  title = 'Une erreur est survenue',
  message,
  type = 'general', // general, network, auth, notfound, server, validation
  onRetry,
  onGoBack,
  icon,
  actions = [],
  className = '',
}) => {
  const errorConfig = {
    general: {
      icon: 'alert-circle-outline',
      iconColor: '#ef4444',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
    },
    network: {
      icon: 'cloud-offline-outline',
      iconColor: '#f59e0b',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
    },
    auth: {
      icon: 'lock-closed-outline',
      iconColor: '#ef4444',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
    },
    notfound: {
      icon: 'search-outline',
      iconColor: '#6B7280',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700',
    },
    server: {
      icon: 'server-outline',
      iconColor: '#ef4444',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
    },
    validation: {
      icon: 'warning-outline',
      iconColor: '#f59e0b',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
    },
  };

  const config = errorConfig[type];

  return (
    <View className={`flex-1 justify-center items-center p-6 ${className}`}>
      <View className={`${config.bgColor} border ${config.borderColor} rounded-xl p-6 w-full max-w-md`}>
        {/* Icon */}
        <View className="items-center mb-4">
          <View 
            className={`w-16 h-16 rounded-full items-center justify-center`}
            style={{ backgroundColor: config.bgColor }}
          >
            <Ionicons 
              name={icon || config.icon} 
              size={40} 
              color={config.iconColor} 
            />
          </View>
        </View>

        {/* Title */}
        <Text className={`text-xl font-bold ${config.textColor} text-center mb-2`}>
          {title}
        </Text>

        {/* Message */}
        {message && (
          <Text className="text-gray-600 text-center mb-6 leading-6">
            {message}
          </Text>
        )}

        {/* Actions */}
        <View className="space-y-3">
          {onRetry && (
            <Button
              title="Réessayer"
              onPress={onRetry}
              icon={<Ionicons name="refresh" size={20} color="white" />}
              className="mb-3"
            />
          )}

          {onGoBack && (
            <Button
              title="Retour"
              onPress={onGoBack}
              variant="outline"
              icon={<Ionicons name="arrow-back" size={20} color="#0284c7" />}
              className="mb-3"
            />
          )}

          {actions.map((action, index) => (
            <Button
              key={index}
              title={action.label}
              onPress={action.onPress}
              variant={action.variant || 'outline'}
              icon={action.icon}
              className={index < actions.length - 1 ? 'mb-3' : ''}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

// Erreurs pré-configurées
export const NetworkError = ({ onRetry, className = '' }) => (
  <ErrorMessage
    type="network"
    title="Pas de connexion"
    message="Impossible de se connecter au serveur. Vérifiez votre connexion internet et réessayez."
    onRetry={onRetry}
    className={className}
  />
);

export const AuthError = ({ message, onRetry, onGoBack, className = '' }) => (
  <ErrorMessage
    type="auth"
    title="Erreur d'authentification"
    message={message || "Votre session a expiré. Veuillez vous reconnecter."}
    onRetry={onRetry}
    onGoBack={onGoBack}
    className={className}
  />
);

export const NotFoundError = ({ title, message, onGoBack, className = '' }) => (
  <ErrorMessage
    type="notfound"
    title={title || "Introuvable"}
    message={message || "L'élément que vous recherchez n'existe pas ou a été supprimé."}
    onGoBack={onGoBack}
    className={className}
  />
);

export const ServerError = ({ onRetry, className = '' }) => (
  <ErrorMessage
    type="server"
    title="Erreur serveur"
    message="Le serveur rencontre des difficultés. Veuillez réessayer dans quelques instants."
    onRetry={onRetry}
    className={className}
  />
);

export const ValidationError = ({ errors = [], onGoBack, className = '' }) => (
  <ErrorMessage
    type="validation"
    title="Erreur de validation"
    message={
      errors.length > 0 
        ? errors.join('\n') 
        : "Certaines informations sont incorrectes. Veuillez vérifier les champs."
    }
    onGoBack={onGoBack}
    className={className}
  />
);

// Composant pour afficher les erreurs dans un formulaire
export const FormError = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <View className={`bg-red-50 border border-red-200 rounded-lg p-3 mb-4 ${className}`}>
      <View className="flex-row items-start">
        <Ionicons name="alert-circle" size={20} color="#ef4444" />
        <Text className="text-red-700 text-sm ml-2 flex-1">
          {error}
        </Text>
      </View>
    </View>
  );
};

// Composant pour afficher les messages de succès
export const SuccessMessage = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <View className={`bg-green-50 border border-green-200 rounded-lg p-3 mb-4 ${className}`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start flex-1">
          <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
          <Text className="text-green-700 text-sm ml-2 flex-1">
            {message}
          </Text>
        </View>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss}>
            <Ionicons name="close" size={20} color="#22c55e" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Composant pour afficher les warnings
export const WarningMessage = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <View className={`bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 ${className}`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start flex-1">
          <Ionicons name="warning" size={20} color="#f59e0b" />
          <Text className="text-yellow-700 text-sm ml-2 flex-1">
            {message}
          </Text>
        </View>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss}>
            <Ionicons name="close" size={20} color="#f59e0b" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ErrorMessage;

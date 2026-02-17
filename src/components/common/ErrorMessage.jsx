import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';

const ErrorMessage = ({
  title = 'Une erreur est survenue',
  message,
  type = 'general', 
  onRetry,
  onGoBack,
  icon,
  actions = [],
  className = '',
}) => {
  const errorConfig = {
    general: {
      icon: 'alert-circle-outline',
      iconColor: '#E05B5B',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-100',
      textColor: 'text-danger-600',
    },
    network: {
      icon: 'cloud-offline-outline',
      iconColor: '#E8A838',
      bgColor: 'bg-therapist-50',
      borderColor: 'border-therapist-200',
      textColor: 'text-therapist-600',
    },
    auth: {
      icon: 'lock-closed-outline',
      iconColor: '#E05B5B',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-100',
      textColor: 'text-danger-600',
    },
    notfound: {
      icon: 'search-outline',
      iconColor: '#6B6B6B',
      bgColor: 'bg-surface-100',
      borderColor: 'border-surface-200',
      textColor: 'text-text-500',
    },
    server: {
      icon: 'server-outline',
      iconColor: '#E05B5B',
      bgColor: 'bg-danger-50',
      borderColor: 'border-danger-100',
      textColor: 'text-danger-600',
    },
    validation: {
      icon: 'warning-outline',
      iconColor: '#E8A838',
      bgColor: 'bg-therapist-50',
      borderColor: 'border-therapist-200',
      textColor: 'text-therapist-600',
    },
  };

  const config = errorConfig[type];

  return (
    <View className={`flex-1 justify-center items-center p-6 ${className}`}>
      <View className={`${config.bgColor} border ${config.borderColor} rounded-2xl p-6 w-full max-w-md`}>
        {/* Icon */}
        <View className="items-center mb-4">
          <View
            className="w-16 h-16 rounded-full items-center justify-center bg-white/50"
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
          <Text className="text-text-500 text-center mb-6 leading-6">
            {message}
          </Text>
        )}

        {/* Actions */}
        <View className="space-y-3">
          {onRetry && (
            <Button
              title="Reessayer"
              onPress={onRetry}
              variant="patient"
              icon={<Ionicons name="refresh" size={20} color="white" />}
              className="mb-3"
            />
          )}

          {onGoBack && (
            <Button
              title="Retour"
              onPress={onGoBack}
              variant="outline"
              color="patient"
              icon={<Ionicons name="arrow-back" size={20} color="#5B9BD5" />}
              className="mb-3"
            />
          )}

          {actions.map((action, index) => (
            <Button
              key={index}
              title={action.label}
              onPress={action.onPress}
              variant={action.variant || 'outline'}
              color={action.color || 'patient'}
              icon={action.icon}
              className={index < actions.length - 1 ? 'mb-3' : ''}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export const NetworkError = ({ onRetry, className = '' }) => (
  <ErrorMessage
    type="network"
    title="Pas de connexion"
    message="Impossible de se connecter au serveur. Verifiez votre connexion internet et reessayez."
    onRetry={onRetry}
    className={className}
  />
);

export const AuthError = ({ message, onRetry, onGoBack, className = '' }) => (
  <ErrorMessage
    type="auth"
    title="Erreur d'authentification"
    message={message || "Votre session a expire. Veuillez vous reconnecter."}
    onRetry={onRetry}
    onGoBack={onGoBack}
    className={className}
  />
);

export const NotFoundError = ({ title, message, onGoBack, className = '' }) => (
  <ErrorMessage
    type="notfound"
    title={title || "Introuvable"}
    message={message || "L'element que vous recherchez n'existe pas ou a ete supprime."}
    onGoBack={onGoBack}
    className={className}
  />
);

export const ServerError = ({ onRetry, className = '' }) => (
  <ErrorMessage
    type="server"
    title="Erreur serveur"
    message="Le serveur rencontre des difficultes. Veuillez reessayer dans quelques instants."
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
        : "Certaines informations sont incorrectes. Veuillez verifier les champs."
    }
    onGoBack={onGoBack}
    className={className}
  />
);

export const FormError = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <View className={`bg-danger-50 border border-danger-100 rounded-2xl p-3 mb-4 ${className}`}>
      <View className="flex-row items-start">
        <Ionicons name="alert-circle" size={20} color="#E05B5B" />
        <Text className="text-danger-400 text-sm ml-2 flex-1">
          {error}
        </Text>
      </View>
    </View>
  );
};

export const SuccessMessage = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <View className={`bg-success-50 border border-success-100 rounded-2xl p-3 mb-4 ${className}`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start flex-1">
          <Ionicons name="checkmark-circle" size={20} color="#4CAF82" />
          <Text className="text-success-600 text-sm ml-2 flex-1">
            {message}
          </Text>
        </View>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss}>
            <Ionicons name="close" size={20} color="#4CAF82" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const WarningMessage = ({ message, onDismiss, className = '' }) => {
  if (!message) return null;

  return (
    <View className={`bg-therapist-50 border border-therapist-200 rounded-2xl p-3 mb-4 ${className}`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start flex-1">
          <Ionicons name="warning" size={20} color="#E8A838" />
          <Text className="text-therapist-500 text-sm ml-2 flex-1">
            {message}
          </Text>
        </View>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss}>
            <Ionicons name="close" size={20} color="#E8A838" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ErrorMessage;

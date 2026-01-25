import React from 'react';
import { View, Text, Modal as RNModal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button';

const Modal = ({ 
  visible, 
  onClose, 
  title, 
  children,
  footer,
  size = 'medium',
  showCloseButton = true,
}) => {
  const sizeClasses = {
    small: 'w-11/12 max-w-sm',
    medium: 'w-11/12 max-w-md',
    large: 'w-11/12 max-w-2xl',
    full: 'w-full h-full',
  };

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className={`bg-white rounded-xl ${sizeClasses[size]} max-h-[90%]`}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
            {title && (
              <Text className="text-xl font-bold text-gray-900 flex-1">
                {title}
              </Text>
            )}
            {showCloseButton && (
              <TouchableOpacity 
                onPress={onClose}
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          <ScrollView className="px-6 py-4">
            {children}
          </ScrollView>

          {/* Footer */}
          {footer && (
            <View className="px-6 py-4 border-t border-gray-200">
              {footer}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

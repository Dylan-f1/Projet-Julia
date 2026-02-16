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
      <View className="flex-1 bg-black/30 justify-center items-center p-4">
        <View
          className={`bg-white rounded-3xl ${sizeClasses[size]} max-h-[90%]`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 10,
          }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-surface-200">
            {title && (
              <Text className="text-xl font-bold text-text-900 flex-1">
                {title}
              </Text>
            )}
            {showCloseButton && (
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 items-center justify-center rounded-full bg-surface-100"
              >
                <Ionicons name="close" size={20} color="#6B6B6B" />
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          <ScrollView className="px-6 py-4">
            {children}
          </ScrollView>

          {/* Footer */}
          {footer && (
            <View className="px-6 py-4 border-t border-surface-200">
              {footer}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Select = ({
  label,
  placeholder = 'Sélectionner...',
  value,
  options = [], // [{ label: 'Option 1', value: 'opt1' }]
  onSelect,
  error,
  disabled = false,
  className = '',
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const borderColor = error
    ? 'border-red-500'
    : isOpen
    ? 'border-primary-600'
    : 'border-gray-300';

  return (
    <View className={`mb-4 ${className}`} style={{ position: 'relative', zIndex: isOpen ? 50 : 1 }}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}

      <TouchableOpacity
        ref={triggerRef}
        onPress={() => !disabled && setIsOpen(!isOpen)}
        className={`flex-row items-center justify-between border rounded-lg px-3 py-3 ${borderColor} ${
          disabled ? 'bg-gray-100' : 'bg-white'
        }`}
        disabled={disabled}
        activeOpacity={isDesktop ? 0.8 : 0.6}
        style={isDesktop ? { cursor: 'pointer' } : undefined}
      >
        <Text className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#6B7280"
        />
      </TouchableOpacity>

      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}

      {/* Desktop : dropdown inline / Mobile : Modal fullscreen */}
      {isDesktop ? (
        isOpen && (
          <>
            {/* Backdrop invisible pour fermer */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 40,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: 4,
                backgroundColor: '#fff',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                maxHeight: 280,
                zIndex: 50,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#f3f4f6',
                      backgroundColor:
                        item.value === value ? '#f0f9ff' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={`text-base ${
                          item.value === value
                            ? 'text-primary-600 font-semibold'
                            : 'text-gray-900'
                        }`}
                      >
                        {item.label}
                      </Text>
                      {item.value === value && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color="#0284c7"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </>
        )
      ) : (
        <Modal
          visible={isOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/50 justify-center items-center"
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          >
            <View className="bg-white rounded-xl w-11/12 max-h-96">
              <View className="px-4 py-3 border-b border-gray-200">
                <Text className="text-lg font-semibold text-gray-900">
                  {label || 'Sélectionner'}
                </Text>
              </View>

              <FlatList
                data={options}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    className={`px-4 py-3 border-b border-gray-100 ${
                      item.value === value ? 'bg-primary-50' : ''
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={`text-base ${
                          item.value === value
                            ? 'text-primary-600 font-semibold'
                            : 'text-gray-900'
                        }`}
                      >
                        {item.label}
                      </Text>
                      {item.value === value && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color="#0284c7"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default Select;
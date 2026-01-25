import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Select = ({ 
  label, 
  placeholder = 'Sélectionner...', 
  value, 
  options = [], // [{ label: 'Option 1', value: 'opt1' }]
  onSelect,
  error,
  disabled = false,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const borderColor = error ? 'border-red-500' : 'border-gray-300';

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}

      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        className={`flex-row items-center justify-between border rounded-lg px-3 py-3 ${borderColor} ${
          disabled ? 'bg-gray-100' : 'bg-white'
        }`}
        disabled={disabled}
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
                        item.value === value ? 'text-primary-600 font-semibold' : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                    </Text>
                    {item.value === value && (
                      <Ionicons name="checkmark" size={20} color="#0284c7" />
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Select;

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ 
  placeholder = 'Rechercher...', 
  onSearch,
  onChangeText,
  value,
  autoFocus = false,
  className = '' 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(value || '');

  const handleChange = (text) => {
    setSearchValue(text);
    if (onChangeText) onChangeText(text);
  };

  const handleClear = () => {
    setSearchValue('');
    if (onChangeText) onChangeText('');
    if (onSearch) onSearch('');
  };

  const handleSearch = () => {
    if (onSearch) onSearch(searchValue);
  };

  const borderColor = isFocused ? 'border-primary-600' : 'border-gray-300';

  return (
    <View className={`flex-row items-center bg-white border rounded-lg px-3 py-2 ${borderColor} ${className}`}>
      <Ionicons name="search-outline" size={20} color="#6B7280" />
      
      <TextInput
        value={searchValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch}
        autoFocus={autoFocus}
        returnKeyType="search"
        className="flex-1 mx-3 text-gray-900 text-base"
      />

      {searchValue.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

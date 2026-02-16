import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({
  placeholder = 'Rechercher...',
  onSearch,
  onChangeText,
  value,
  autoFocus = false,
  className = '',
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

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

  const borderColor = isFocused ? 'border-patient-300' : 'border-surface-200';

  return (
    <View
      className={`flex-row items-center bg-surface-50 border rounded-2xl ${borderColor} ${isFocused ? 'shadow-sm' : ''} ${className}`}
      style={{
        paddingHorizontal: isDesktop ? 16 : 12,
        paddingVertical: isDesktop ? 10 : 8,
      }}
    >
      <Ionicons name="search-outline" size={20} color="#5B9BD5" />

      <TextInput
        value={searchValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch}
        autoFocus={autoFocus}
        returnKeyType="search"
        className="flex-1 mx-3 text-text-900 text-base"
        style={isDesktop ? { outlineStyle: 'none' } : undefined}
      />

      {searchValue.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={isDesktop ? { cursor: 'pointer' } : undefined}
        >
          <Ionicons name="close-circle" size={20} color="#A0A0A0" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

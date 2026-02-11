import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
  async setItem(key, value) {
    try {
      console.log(`💾 StorageService.setItem - Key: ${key}`);
      console.log(`💾 Value (first 50 chars):`, value?.substring(0, 50));
      console.log(`💾 Platform:`, Platform.OS);
      
      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(key, value);
        console.log(`✅ AsyncStorage.setItem OK pour ${key}`);
      } else {
        await SecureStore.setItemAsync(key, value);
        console.log(`✅ SecureStore.setItemAsync OK pour ${key}`);
      }
    } catch (error) {
      console.error(`❌ Storage setItem error for ${key}:`, error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      console.log(`📦 StorageService.getItem - Key: ${key}`);
      console.log(`📦 Platform:`, Platform.OS);
      
      let value;
      if (Platform.OS === 'web') {
        value = await AsyncStorage.getItem(key);
        console.log(`📦 AsyncStorage.getItem pour ${key}:`, value?.substring(0, 50));
      } else {
        value = await SecureStore.getItemAsync(key);
        console.log(`📦 SecureStore.getItemAsync pour ${key}:`, value?.substring(0, 50));
      }
      
      if (value === null || value === 'undefined' || value === 'null') {
        console.warn(`⚠️ ${key} est null/undefined dans le storage`);
        return null;
      }
      
      return value;
    } catch (error) {
      console.error(`❌ Storage getItem error for ${key}:`, error);
      return null;
    }
  },

  async deleteItem(key) {
    try {
      console.log(`🗑️ StorageService.deleteItem - Key: ${key}`);
      
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
      
      console.log(`✅ ${key} supprimé`);
    } catch (error) {
      console.error(`❌ Storage deleteItem error for ${key}:`, error);
    }
  },
};

export default StorageService;
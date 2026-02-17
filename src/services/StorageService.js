import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEBUG_STORAGE = __DEV__ && false; // Passer à true pour débuguer le storage

const StorageService = {
  async setItem(key, value) {
    try {
      if (DEBUG_STORAGE) {
        console.log(`💾 StorageService.setItem - Key: ${key}, Value: ${value?.substring(0, 50)}`);
      }

      if (Platform.OS === 'web') {
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.error(`Storage setItem error for ${key}:`, error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      let value;
      if (Platform.OS === 'web') {
        value = await AsyncStorage.getItem(key);
      } else {
        value = await SecureStore.getItemAsync(key);
      }

      if (DEBUG_STORAGE) {
        console.log(`📦 StorageService.getItem - Key: ${key}, Value: ${value?.substring(0, 50)}`);
      }

      if (value === null || value === 'undefined' || value === 'null') {
        return null;
      }

      return value;
    } catch (error) {
      console.error(`Storage getItem error for ${key}:`, error);
      return null;
    }
  },

  async deleteItem(key) {
    try {
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }

      if (DEBUG_STORAGE) {
        console.log(`🗑️ ${key} supprimé`);
      }
    } catch (error) {
      console.error(`Storage deleteItem error for ${key}:`, error);
    }
  },
};

export default StorageService;
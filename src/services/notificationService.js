import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import api from './api';

class NotificationService {
  constructor() {
    // Configuration par défaut des notifications
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  // Demander la permission et enregistrer le token
  async registerForPushNotifications() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        return { success: false, error: 'Permission de notification refusée' };
      }
      
      token = (await Notifications.getExpoPushTokenAsync()).data;
      
      // Envoyer le token au backend
      try {
        await api.post('/notifications/register', { pushToken: token });
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du token:', error);
      }
    } else {
      console.log('Les notifications push nécessitent un appareil physique');
    }

    return { success: true, token };
  }

  // Écouter les notifications reçues
  addNotificationReceivedListener(callback) {
    return Notifications.addNotificationReceivedListener(callback);
  }

  // Écouter les interactions avec les notifications
  addNotificationResponseReceivedListener(callback) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  // Planifier une notification locale
  async scheduleLocalNotification(title, body, data = {}, trigger = null) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: trigger || null, // null = immédiat
    });
  }

  // Annuler toutes les notifications programmées
  async cancelAllScheduledNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Obtenir le badge count
  async getBadgeCount() {
    return await Notifications.getBadgeCountAsync();
  }

  // Définir le badge count
  async setBadgeCount(count) {
    await Notifications.setBadgeCountAsync(count);
  }
}

export default new NotificationService();

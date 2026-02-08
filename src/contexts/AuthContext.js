import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import notificationService from '../services/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      const role = await authService.getUserRole();
      
      setIsAuthenticated(authenticated);
      setUserRole(role);
      
      if (authenticated) {
        // Enregistrer pour les notifications push
        await notificationService.registerForPushNotifications();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMagicLink = async (email) => {
    const result = await authService.sendMagicLink(email);
    return result;
  };

  const verifyMagicLink = async (token) => {
    const result = await authService.verifyMagicLink(token);
    if (result.success) {
      setUser(result.data.user);
      setUserRole('patient');
      setIsAuthenticated(true);
      await notificationService.registerForPushNotifications();
    }
    return result;
  };

  const loginTherapist = async (email, password) => {
  try {
    const url = `${API_URL}/api/auth/login`;

    console.log('=== AuthContext - loginTherapist ===');
    console.log('URL:', url);
    console.log('Email:', email);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Status HTTP:', response.status);

    const result = await response.json();
    
    console.log('Réponse complète du serveur:', JSON.stringify(result, null, 2));

    if (!response.ok) {
      return { 
        success: false, 
        error: result.message || 'Identifiants incorrects' 
      };
    }

    // Stocker le token et l'utilisateur
    await AsyncStorage.setItem('token', result.token);
    await AsyncStorage.setItem('user', JSON.stringify(result.user));
    
    setUser(result.user);
    setToken(result.token);
    setUserRole('therapist');
    setIsAuthenticated(true);

    // Enregistrer pour les notifications push
    await notificationService.registerForPushNotifications();

    return { success: true };
  } catch (error) {
    console.error('=== ERREUR CATCH LOGIN ===');
    console.error('Message:', error.message);
    
    return { 
      success: false, 
      error: error.message || 'Erreur réseau' 
    };
  }
  };

  const registerTherapist = async (data) => {
  try {
    const backendData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      profession: data.specialty,
      phone: data.phone || '',
      workLocation: data.workLocation || '', 
      consultationType: data.consultationType || 'online', 
    };

    const url = `${API_URL}/api/auth/register`;

    console.log('=== AuthContext - registerTherapist ===');
    console.log('URL:', url);
    console.log('Données envoyées:', JSON.stringify(backendData, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData),
    });

    console.log('Status HTTP:', response.status);

    const result = await response.json();
    
    console.log('Réponse complète du serveur:', JSON.stringify(result, null, 2));

    if (!response.ok) {
      return { 
        success: false, 
        error: result.message || 'Erreur serveur' 
      };
    }

    // Stocker le token
    await AsyncStorage.setItem('token', result.token);
    await AsyncStorage.setItem('user', JSON.stringify(result.user));
    
    setUser(result.user);
    setToken(result.token);

    return { success: true };
  } catch (error) {
    console.error('=== ERREUR CATCH ===');
    console.error('Message:', error.message);
    
    return { 
      success: false, 
      error: error.message || 'Erreur réseau' 
    };
  }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };
  const value = {
    user,
    userRole,
    loading,
    isAuthenticated,
    sendMagicLink,
    verifyMagicLink,
    loginTherapist,
    logout,
    setUser,
    setToken,
    registerTherapist,
  }

  return (
    <AuthContext.Provider
      value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

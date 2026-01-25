import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import notificationService from '../services/notificationService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    const result = await authService.loginTherapist(email, password);
    if (result.success) {
      setUser(result.data.user);
      setUserRole('therapist');
      setIsAuthenticated(true);
      await notificationService.registerForPushNotifications();
    }
    return result;
  };

  const registerTherapist = async (data) => {
    const result = await authService.registerTherapist(data);
    if (result.success) {
      setUser(result.data.user);
      setUserRole('therapist');
      setIsAuthenticated(true);
      await notificationService.registerForPushNotifications();
    }
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        isAuthenticated,
        sendMagicLink,
        verifyMagicLink,
        loginTherapist,
        registerTherapist,
        logout,
      }}
    >
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

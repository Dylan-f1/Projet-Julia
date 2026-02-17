import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import notificationService from '../services/notificationService';
import StorageService from '../services/StorageService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const storedToken = await StorageService.getItem('userToken');
      const storedRole = await StorageService.getItem('userRole');
      const storedUser = await StorageService.getItem('user');

      if (storedToken && storedRole) {
        setToken(storedToken);
        setUserRole(storedRole);
        setIsAuthenticated(true);
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        await notificationService.registerForPushNotifications();
      }
    } catch (error) {
      console.error('Erreur chargement utilisateur:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMagicLink = async (email) => {
    const result = await authService.sendMagicLink(email);
    return result;
  };

  const verifyMagicLink = async (token) => {
    console.log('=== VERIFY MAGIC LINK ===');
    console.log('Token reçu:', token);
    
    const result = await authService.verifyMagicLink(token);
    
    console.log('Résultat backend:', result);
    console.log('result.success:', result.success);
    console.log('result.data:', result.data);
    console.log('result.data.token:', result.data?.token);
    console.log('result.data.user:', result.data?.user);
    
    if (result.success) {
      console.log('Vérification réussie, stockage du token...');
      
      await StorageService.setItem('userToken', result.data.token);
      await StorageService.setItem('userRole', 'patient');
      await StorageService.setItem('user', JSON.stringify(result.data.user));
      
      // Vérifier que c'est bien stocké
      const storedToken = await StorageService.getItem('userToken');
      const storedRole = await StorageService.getItem('userRole');
      
      console.log('Token après stockage:', storedToken);
      console.log('Role après stockage:', storedRole);
      
      setUser(result.data.user);
      setToken(result.data.token);
      setUserRole('patient');
      setIsAuthenticated(true);
      
      console.log('États mis à jour');
      
      await notificationService.registerForPushNotifications();
    } else {
      console.error('Échec vérification:', result.error);
    }
    
    return result;
  };

  const loginPatient = async (magicToken) => {
    try {
      console.log('=== AuthContext - loginPatient ===');
      console.log('Token:', magicToken);

      const result = await authService.verifyMagicLink(magicToken);
      
      console.log('Résultat vérification:', result);

      if (result.success) {
        await StorageService.setItem('userToken', result.data.token);
        await StorageService.setItem('userRole', 'patient');
        await StorageService.setItem('user', JSON.stringify(result.data.patient || result.data.user));
        
        setUser(result.data.patient || result.data.user);
        setToken(result.data.token);
        setUserRole('patient');
        setIsAuthenticated(true);

        await notificationService.registerForPushNotifications();

        console.log('🎉 Patient authentifié avec succès');
        return { success: true, patient: result.data.patient || result.data.user };
      }

      return result;
    } catch (error) {
      console.error('Erreur login patient:', error);
      return { 
        success: false, 
        error: error.message || 'Erreur réseau' 
      };
    }
  };

  const loginTherapist = async (email, password) => {
    try {
      console.log('=== AuthContext - loginTherapist ===');
      console.log('Email:', email);

      const result = await authService.loginTherapist(email, password);

      console.log('Résultat login:', result);

      if (result.success) {
        await StorageService.setItem('userToken', result.data.token);
        await StorageService.setItem('userRole', 'therapist');
        await StorageService.setItem('user', JSON.stringify(result.data.user));
        
        setUser(result.data.user);
        setToken(result.data.token);
        setUserRole('therapist');
        setIsAuthenticated(true);

        await notificationService.registerForPushNotifications();

        return { success: true };
      }

      return result;
    } catch (error) {
      console.error('=== ERREUR LOGIN ===');
      console.error('Message:', error.message);
      
      return { 
        success: false, 
        error: error.message || 'Erreur réseau' 
      };
    }
  };

  const registerTherapist = async (data) => {
    try {
      console.log('=== AuthContext - registerTherapist ===');
      console.log('Données:', data);

      const result = await authService.registerTherapist(data);

      console.log('Résultat inscription:', result);

      if (result.success) {
        await StorageService.setItem('userToken', result.data.token);
        await StorageService.setItem('userRole', 'therapist');
        await StorageService.setItem('user', JSON.stringify(result.data.user));
        
        setUser(result.data.user);
        setToken(result.data.token);
        setUserRole('therapist');
        setIsAuthenticated(true);

        await notificationService.registerForPushNotifications();

        return { success: true };
      }

      return result;
    } catch (error) {
      console.error('=== ERREUR INSCRIPTION ===');
      console.error('Message:', error.message);
      
      return { 
        success: false, 
        error: error.message || 'Erreur réseau' 
      };
    }
  };

  const logout = async () => {
    await StorageService.deleteItem('userToken');
    await StorageService.deleteItem('userRole');
    await StorageService.deleteItem('user');
    
    setUser(null);
    setToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    userRole,
    loading,
    isAuthenticated,
    sendMagicLink,
    verifyMagicLink,
    loginPatient,      
    loginTherapist,
    registerTherapist,
    logout,
    setUser,
    setToken,
  };

  return (
    <AuthContext.Provider value={value}>
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
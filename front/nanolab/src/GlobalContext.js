import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isDepartmentRegistered, setIsDepartmentRegistered] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isPersistentLogin, setIsPersistentLogin] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const persistentLogin = await AsyncStorage.getItem('isPersistentLogin');
        if (persistentLogin !== null) {
          setIsPersistentLogin(JSON.parse(persistentLogin));
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, []);

  return (
    <GlobalContext.Provider value={{ 
      isDepartmentRegistered, 
      setIsDepartmentRegistered, 
      selectedCollege, 
      setSelectedCollege, 
      selectedDepartment, 
      setSelectedDepartment,
      darkMode, 
      setDarkMode,
      isPersistentLogin,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

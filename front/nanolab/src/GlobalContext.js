import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isDepartmentRegistered, setIsDepartmentRegistered] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isPersistentLogin, setIsPersistentLogin] = useState(false);
  const [user, setUser] = useState(null); // user 상태 추가

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const persistentLogin = await AsyncStorage.getItem('isPersistentLogin');
        if (persistentLogin !== null) {
          setIsPersistentLogin(JSON.parse(persistentLogin));
        }

        const storedUser = await AsyncStorage.getItem('user'); // 저장된 유저 정보 불러오기
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // user 상태 업데이트
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
      user, // user 상태 제공
      setUser, // setUser 함수 제공
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

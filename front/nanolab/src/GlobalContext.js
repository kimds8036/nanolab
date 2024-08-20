import React, { createContext, useState } from 'react';

// GlobalContext 생성
const GlobalContext = createContext();

// Provider 컴포넌트 정의
const GlobalProvider = ({ children }) => {
  const [isDepartmentRegistered, setIsDepartmentRegistered] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // 유저 정보를 저장하는 상태 추가
  const [user, setUser] = useState(null);

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
      user, // 유저 정보 상태
      setUser, // 유저 정보 상태를 업데이트하는 함수
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

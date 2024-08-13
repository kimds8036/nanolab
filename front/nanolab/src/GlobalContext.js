import React, { createContext, useState } from 'react';

// 초기 상태 설정
const GlobalContext = createContext();

// Provider 컴포넌트
const GlobalProvider = ({ children }) => {
  const [isDepartmentRegistered, setIsDepartmentRegistered] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  
  // 다크모드 상태 추가
  const [darkMode, setDarkMode] = useState(false);

  return (
    <GlobalContext.Provider value={{ 
      isDepartmentRegistered, 
      setIsDepartmentRegistered, 
      selectedCollege, 
      setSelectedCollege, 
      selectedDepartment, 
      setSelectedDepartment,
      darkMode, // 다크모드 상태
      setDarkMode // 다크모드 상태 변경 함수
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

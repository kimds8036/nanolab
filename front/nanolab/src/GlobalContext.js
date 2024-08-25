import React, { createContext, useState } from 'react';

// GlobalContext 생성
const GlobalContext = createContext();

// Provider 컴포넌트 정의
const GlobalProvider = ({ children }) => {
  // 상태 정의
  const [isDepartmentRegistered, setIsDepartmentRegistered] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // 어두운 모드 여부
  const [user, setUser] = useState(null); // 로그인한 사용자 정보

  // 사용자 로그인 상태를 업데이트하는 함수
  const loginUser = (userInfo) => {
    setUser(userInfo);
  };

  // 사용자 로그아웃 함수
  const logoutUser = () => {
    setUser(null);
  };

  // Dark Mode 설정을 토글하는 함수
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Context를 통해 제공할 값
  const contextValue = {
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
    loginUser, // 사용자 로그인 함수
    logoutUser, // 사용자 로그아웃 함수
    toggleDarkMode, // Dark Mode 토글 함수
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

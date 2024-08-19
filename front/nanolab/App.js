import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalProvider, GlobalContext } from './src/GlobalContext';
import Login from './src/Login';
import Enter from './src/Enter';
import Main from './src/Main';
import Noticelist from './src/Noticelist';
import Mypage from './src/Mypage';
import Myinform from './src/Myinform';
import Keyword from './src/Keyword';
import Keywordhelp from './src/Keywordhelp';
import Department from './src/Department';
import Departmenthelp from './src/Departmenthelp';
import Help from './src/Help';
import Feedback from './src/Feedback';
import Test from './src/Test';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');
  const { updatePersistentLogin } = useContext(GlobalContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const persistentLogin = await AsyncStorage.getItem('isPersistentLogin');

        if (persistentLogin !== null) {
          const persistentLoginValue = JSON.parse(persistentLogin);
          updatePersistentLogin(persistentLoginValue);
        }

        if (token) {
          if (persistentLogin === 'true') {
            setInitialRoute('Main');
          } else {
            setInitialRoute('Login');
          }
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Failed to load login status:', error);
        setInitialRoute('Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [updatePersistentLogin]);

  if (isLoading) {
    return null; // 또는 로딩 스피너 등을 추가할 수 있습니다.
  }

  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Enter" component={Enter} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Noticelist" component={Noticelist} options={{ headerShown: false }} />
          <Stack.Screen name="Mypage" component={Mypage} options={{ headerShown: false }} />
          <Stack.Screen name="Myinform" component={Myinform} options={{ headerShown: false }} />
          <Stack.Screen name="Keyword" component={Keyword} options={{ headerShown: false }} />
          <Stack.Screen name="Keywordhelp" component={Keywordhelp} options={{ headerShown: false }} />
          <Stack.Screen name="Department" component={Department} options={{ headerShown: false }} />
          <Stack.Screen name="Departmenthelp" component={Departmenthelp} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
          <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
          <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

export default App;

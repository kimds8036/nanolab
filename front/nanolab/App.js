import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalProvider } from './src/GlobalContext';
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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
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
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

export default App;
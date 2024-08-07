import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/Login';
import EnterPage from './src/Enter';
import MainPage from './src/Main';
import Noticelist from './src/Noticelist';
import Mypage from './src/Mypage';
import Myinform from './src/Myinform';
import Keyword from './src/Keyword';
import Department from './src/Department';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Department">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Enter" component={EnterPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="Noticelist" component={Noticelist} options={{ headerShown: false }} />
        <Stack.Screen name="Mypage" component={Mypage} options={{ headerShown: false }} />
        <Stack.Screen name="Myinform" component={Myinform} options={{ headerShown: false }} />
        <Stack.Screen name="Keyword" component={Keyword} options={{ headerShown: false }} />
        <Stack.Screen name="Department" component={Department} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
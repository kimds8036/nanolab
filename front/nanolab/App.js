import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/Login';
import EnterPage from './src/Enter';
import MainPage from './src/Main';
import Noticelist from './src/Noticelist';
import Mypage from './src/Mypage';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ex">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Enter" component={EnterPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
<<<<<<< HEAD
        <Stack.Screen name="Menu" component={Menubar} options={{ headerShown: false }} />
=======
        <Stack.Screen name="Noticelist" component={Noticelist} options={{ headerShown: false }} />
        <Stack.Screen name="Mypage" component={Mypage} options={{ headerShown: false }} />
>>>>>>> 160aa4da70eb43bd763049ddb21d87b3514e4909
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
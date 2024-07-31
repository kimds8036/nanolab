import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/Login';
import EnterPage from './src/Enter';
import MainPage from './src/Main';
import Menubar from './src/Menubar';
import ex from './src/ex';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ex">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Enter" component={EnterPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menubar} options={{ headerShown: false }} />
        <Stack.Screen name="ex" component={ex} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
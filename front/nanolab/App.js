import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/Login';
import EnterPage from './src/Enter';
import MainPage from './src/Main';
import ex from './src/ex';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Enter" component={EnterPage} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Details" component={ex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

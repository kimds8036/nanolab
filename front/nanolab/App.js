import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalProvider } from './src/GlobalContext';
import SplashScreenComponent from './src/Splash'; // 추가된 부분
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
import Feedback from './src/Feedback';
import Search from './src/Search';
import NoticeContent from './src/NoticeContent';
import Alert from './src/Alert';
import Save from './src/Save';

const Stack = createNativeStackNavigator();

function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  const handleSplashFinish = () => {
    setIsSplashFinished(true);
  };

  return (
    <GlobalProvider>
      <NavigationContainer>
        {isSplashFinished ? (
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
            <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="NoticeContent" component={NoticeContent} options={{ headerShown: false }} />
            <Stack.Screen name="Alert" component={Alert} options={{ headerShown: false }} />
            <Stack.Screen name="Save" component={Save} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <SplashScreenComponent onFinish={handleSplashFinish} />
        )}
      </NavigationContainer>
    </GlobalProvider>
  );
}

export default App;

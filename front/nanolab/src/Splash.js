import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    // 애니메이션이 끝난 후 메인 화면으로 이동
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000); // 3초 동안 애니메이션 재생

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('./assets/image/light/splash.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DC284', // 필요에 따라 배경색을 맞춰줍니다.
  },
});

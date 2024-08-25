import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function SplashScreenComponent({ onFinish }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // 스플래시 화면 유지

    // 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        // 페이드 인이 끝난 후 약간의 지연 후 페이드 아웃 애니메이션 시작
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start(async () => {
            // 페이드 아웃 애니메이션이 끝난 후 스플래시 화면 숨기기
            await SplashScreen.hideAsync();
            onFinish(); // 메인 앱 화면으로 전환
          });
        }, 500); // 0.5초 대기 후 페이드 아웃 시작
      });
    }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('../assets/image/light/splash.png')}
          style={styles.splashImage}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
});

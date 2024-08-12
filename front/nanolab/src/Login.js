import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GlobalContext } from './GlobalContext';

function Login({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { darkMode } = useContext(GlobalContext);

  const handleLogin = async () => {
    console.log('Login button pressed');  // 로그인 버튼 클릭 로깅
    try {
      const response = await fetch('http://172.20.10.11:5000/auth/login', {  // 서버 IP 주소 사용
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data.token);
        // Save the token and navigate to the main page
        // 예: AsyncStorage를 사용하여 토큰 저장
        // await AsyncStorage.setItem('token', data.token);
        navigation.navigate('MainPage');  // MainPage로 이동
      } else {
        console.error('Login failed:', data.message);
        Alert.alert('로그인 실패', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('로그인 오류', '서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View style={styles.containerlogin}>
            <View style={styles.header}>
              <Image
                source={require('../assets/image/qqqq.png')}
                style={styles.headerImg}
                accessibilityLabel="Logo"
              />
              <Text style={styles.titlelogin}>로그인</Text>
              <Text style={styles.subtitle}>Enter your email and password</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputlogin}>
                <Text style={styles.inputLabel}>이메일</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  style={styles.inputControl}
                  placeholder="학교 이메일을 입력하세요"
                  placeholderTextColor="#6b7280"
                  value={form.email}
                  onChangeText={email => setForm({ ...form, email })}
                />
              </View>
              <View style={styles.inputlogin}>
                <Text style={styles.inputLabel}>비밀번호</Text>
                <TextInput
                  secureTextEntry
                  style={styles.inputControl}
                  placeholder="비밀번호를 입력하세요"
                  placeholderTextColor="#6b7280"
                  value={form.password}
                  onChangeText={password => setForm({ ...form, password })}
                />
              </View>

              <View style={styles.formAction}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>로그인</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Enter');
                }}
              >
                <Text style={styles.formFooter}>
                  계정이 없으신가요?{' '}
                  <Text style={styles.signupText}>회원가입</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </TouchableWithoutFeedback>
 );
}

const styles = StyleSheet.create({
  containerlogin: {
    marginTop: 50,
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  titlelogin: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  inputlogin: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    marginLeft: 5,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#000',
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  signupText: {
    fontWeight: '700',
    color: '#0E664F',
    textDecorationLine: 'underline',
  },
  btn: {
    backgroundColor: '#9DC284',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 1.25,
  shadowRadius: 3.84,
  elevation: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Login;
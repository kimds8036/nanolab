import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';

function EnterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    validateForm(text, password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    validateForm(email, text);
  };

  const validateForm = (email, password) => {
    const emailValid = email.endsWith('@kku.ac.kr');
    const passwordValid = password.length >= 6;
    setIsFormValid(emailValid && passwordValid);
  };

  const handleRegister = async () => {
    console.log('Register button pressed');
    try {
      const response = await fetch('http://172.20.10.11:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data.message);
        Alert.alert('회원가입 완료', '회원가입이 정상적으로 완료되었습니다.', [
          { text: '확인', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        if (data.message === 'Email already exists') {
          Alert.alert('회원가입 실패', '이미 존재하는 이메일입니다.');
        } else {
          Alert.alert('회원가입 실패', data.message);
        }
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('회원가입 실패', '서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.navigate('Login'); }}>
              <Text style={styles.closeButtonText}>&lt;</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>회원가입</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="학교 이메일을 입력하세요"
              value={email}
              onChangeText={handleEmailChange}
            />
            <Text>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="6자 이상 입력하세요"
              secureTextEntry={true}
              value={password}
              onChangeText={handlePasswordChange}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isFormValid ? styles.buttonActive : styles.buttonInactive]}
              onPress={handleRegister}
              disabled={!isFormValid}>
              <Text style={[styles.buttonText, isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>가입하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 5,
    padding: 10,
  },
  closeButton: {
    paddingHorizontal: 10,
  },
  closeButtonText: {
    fontSize: 30,
    fontWeight: '200',
    transform: [{ scaleY: 2 }],
  },
  titleContainer: {
    marginTop: 230,
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 10,
    width: 350,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#9DC284',
    padding: 15,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonInactive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonActive: {
    backgroundColor: '#9DC284',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextInactive: {
    color: '#A9A9A9',
  },
  buttonTextActive: {
    color: '#FFF',
  },
});

export default EnterPage;

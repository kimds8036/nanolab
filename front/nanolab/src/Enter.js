import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GlobalContext } from './GlobalContext';

function Enter({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  
  const handleEmailChange = (text) => {
    setEmail(text);
    validateForm(text, password, passwordConfirmation);
  };

  const handleEmailVerification = () => {
    // 이메일 인증 로직을 여기에 추가
    Alert.alert('이메일 인증', '이메일 인증 버튼이 클릭되었습니다.');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    validateForm(email, text, passwordConfirmation);
  };

  const handlePasswordConfirmationChange = (text) => {
    setPasswordConfirmation(text);
    validateForm(email, password, text);
  };

  const validateForm = (email, password, passwordConfirmation) => {
    const emailValid = email.endsWith('@kku.ac.kr');
    const passwordValid = password.length >= 6;
    const passwordsMatch = password === passwordConfirmation;
    setIsFormValid(emailValid && passwordValid && passwordsMatch);
  };
  
  const handleRegister = async () => {
    console.log('Register button pressed');
    try {
      const response = await fetch('https://nanolab-production-6aa7.up.railway.app/auth/register', {
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

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#2f2f2f' : '#ffffff',
    },
    header: {
      backgroundColor: darkMode ? '#597248' : '#9DC284',
      width:'100%',
      height:50,
    },
    text: {
      color: darkMode ? '#ffffff' : 'black',
    },
    emailbutton: {
      width: 70,
      height: 30,
      backgroundColor: darkMode ? '#597248' : '#9DC284',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
      top: 5,
    },
    emailbutton:{
      width:70,
      height:30,
      backgroundColor: darkMode ? '#597248':'#9DC284',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 5,
      alignItems: 'center',
      justifyContent:'center',
      top:5,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color:darkMode?'#ffffff':'#000000',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1,
      marginBottom: 15,
      color:darkMode?'#ffffff':'#000000',
    },
    button: {
      backgroundColor: darkMode ? '#597248':'#9DC284',
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    buttonInactive: {
      backgroundColor: '#505050',
      borderWidth: 1,
      borderColor: '#A9A9A9',
    },
  };

  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');
  
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={[styles.container,dynamicStyles.container]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={[styles.header,dynamicStyles.header]}></View>
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity onPress={() => { navigation.navigate('Login'); }}>
              <Image source={back} style={styles.backButton}/>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title,dynamicStyles.title]}>회원가입</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={dynamicStyles.text}>이메일</Text>
            <View style={styles.emailContainer}>
              <TextInput
                style={[styles.emailinput,dynamicStyles.input]}
                placeholder="학교 이메일을 입력하세요"
                placeholderTextColor={darkMode ? '#8B8B8B' : '#c2c2c2'}
                value={email}
                onChangeText={handleEmailChange}
              />
              <TouchableOpacity style={[styles.emailbutton,dynamicStyles.emailbutton]} onPress={handleEmailVerification}>
                <Text style={styles.emailbuttonText}>인증하기</Text>
              </TouchableOpacity>
            </View>
            <Text style={dynamicStyles.text}>비밀번호</Text>
            <TextInput
              style={[styles.input,dynamicStyles.input]}
              placeholder="6자 이상 입력하세요"
              placeholderTextColor={darkMode ? '#8B8B8B' : '#c2c2c2'}
              secureTextEntry={true}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <Text style={dynamicStyles.text}>비밀번호 확인</Text>
            <TextInput
              style={[styles.input,dynamicStyles.input]}
              placeholder="비밀번호 확인을 위해 한 번 더 입력하세요"
              placeholderTextColor={darkMode ? '#8B8B8B' : '#c2c2c2'}
              secureTextEntry={true}
              value={passwordConfirmation}
              onChangeText={handlePasswordConfirmationChange}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isFormValid ? [styles.buttonActive, dynamicStyles.button] : [styles.buttonInactive,dynamicStyles.buttonInactive]]}
              onPress={handleRegister}
              disabled={!isFormValid}>
              <Text style={[styles.buttonText, isFormValid ? styles.buttonTextActive : styles.buttonTextInactive]}>가입하기</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/image/light/konkuk.png')} style={styles.logo}/>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor:'#9DC284',
    width:'100%',
    height:50,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    width:25,
    height:25,
    left:5,
    top:10,
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 10,
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  emailContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  emailbutton:{
    width:70,
    height:30,
    backgroundColor: '#9DC284',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    justifyContent:'center',
    top:5,
  },
  emailbuttonText:{
    fontSize:15,
    color:'white',
    fontWeight:'bold',
  },
  emailinput: {
    width: "75%",
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  buttonContainer: {
    padding: 10,
    width: "100%",
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#9DC284',
    padding: 15,
    borderRadius: 30,
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
    borderColor: '#A9A9A9',
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
  logo:{
    left:100,
    bottom:20,
    width:400,
    height:400,
  },
});

export default Enter;
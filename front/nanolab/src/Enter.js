import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button } from 'react-native'

export default function EnterPage({ navigation }) {
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
                onPress={() => { if (isFormValid) navigation.navigate('Login'); }}
                disabled={!isFormValid}
              >
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
      width: 420,
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
  
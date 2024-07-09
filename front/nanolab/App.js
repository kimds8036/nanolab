import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LoginPage({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.containerlogin}>
          <View style={styles.header}>
            <Image
              source={require('./assets/qqqq.png')} // 상대 경로 사용
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
              <TouchableOpacity onPress={() => { navigation.navigate('Main'); }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>로그인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* 푸터 */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Enter');
          }}
        >
          <Text style={styles.formFooter}>
            계정이 없으신가요?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>회원가입</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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

function MainPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Enter" component={EnterPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // login
  containerlogin: {
    marginTop: 100,
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
    fontSize: 27,
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
  btn: {
    backgroundColor: '#9DC284',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // enter
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

export default App;

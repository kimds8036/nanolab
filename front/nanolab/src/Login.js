import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button } from 'react-native'

export default function LoginPage({ navigation }) {
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

const styles = StyleSheet.create({
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
})
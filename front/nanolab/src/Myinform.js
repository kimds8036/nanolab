import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profileContainer}>
        <View style={styles.profilePic} />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>user</Text>
          <Text style={styles.department}>컴퓨터공학과</Text>
          <Text style={styles.email}>konkukuniv@kku.ac.kr</Text>
        </View>
      </View>

      {/* 이름 입력 필드 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름</Text>
        <TextInput style={styles.input} placeholder="user" />
      </View>

      {/* 이메일 입력 필드 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput style={styles.input} placeholder="konkukuniv@kku.ac.kr" />
      </View>

      {/* 비밀번호 변경 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>

      {/* 이메일 인증 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>이메일 인증</Text>
      </TouchableOpacity>

      {/* 학과 등록 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>학과 등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  profileInfo: {
    marginLeft: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  department: {
    fontSize: 14,
    color: '#888',
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#83de87',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
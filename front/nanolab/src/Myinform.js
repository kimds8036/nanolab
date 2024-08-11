import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, navigation, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function ProfilePage() {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isPasswordChanged, setPasswordChanged] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();


  const handlePasswordChange = () => {
    setPasswordModalVisible(false);
    setPasswordChanged(true);
    setTimeout(() => {
      setPasswordChanged(false);
    }, 2000);
  };

  useEffect(() => {
    console.log('Updated isDepartmentRegistered:', isDepartmentRegistered);
  }, [isDepartmentRegistered]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보 수정</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>user</Text>
          <Text style={styles.profileDepartment}>미디어 콘텐츠학과</Text>
          <Text style={styles.profileEmail}>konkukuniv@kku.ac.kr</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>이름</Text>
        <Text style={styles.infoText}>user</Text>

        <Text style={styles.infoLabel}>이메일</Text>
        <Text style={styles.infoText}>konkukuniv@kku.ac.kr</Text>

        <TouchableOpacity onPress={() => setPasswordModalVisible(true)} style={styles.infoButton}>
          <Text style={styles.infoButtonText}>비밀번호 변경</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>이메일 인증</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton} onPress={() => { navigation.navigate('Department'); }}>
          <Text style={styles.infoButtonText}>학과 등록</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isPasswordModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>비밀번호를 변경하시겠습니까?</Text>
            <TextInput
              placeholder="기존 비밀번호"
              secureTextEntry
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              placeholder="새로운 비밀번호"
              secureTextEntry
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Button title="확인" onPress={handlePasswordChange} />
            <Button title="취소" onPress={() => setPasswordModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {isPasswordChanged && (
        <View style={styles.passwordChangedContainer}>
          <Text style={styles.passwordChangedText}>비밀번호 변경이 완료되었습니다</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#9DC284',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileDepartment: {
    fontSize: 16,
    color: '#888',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6CC24A',
  },
  infoContainer: {
    padding: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  infoButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  passwordChangedContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  passwordChangedText: {
    backgroundColor: '#6CC24A',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
});

export default ProfilePage;
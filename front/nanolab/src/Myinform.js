import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, Button, Image } from 'react-native';

function ProfilePage() {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [isPasswordPromptVisible, setPasswordPromptVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordChanged, setPasswordChanged] = useState(false);
  const navigation = useNavigation();


  const handlePasswordChange = () => {
    Alert.alert(
      "비밀번호 변경",
      "비밀번호가 변경되었습니다",
      [{ text: "확인"}]
    );
    setPasswordChanged(true);
    setPasswordModalVisible(false);
  };

  const handlePasswordPrompt = (response) => {
    if (response === '예') {
      setPasswordPromptVisible(false);
      setPasswordModalVisible(true);
    } else {
      setPasswordPromptVisible(false);
    }
  };

  return (
  <SafeAreaView style={styles.container}>
  <View style={styles.bar}></View>
  
  <View style={styles.header}>
    <View style={styles.backContainer}>
    <TouchableOpacity onPress={() => { navigation.navigate('Mypage'); }}>
        <Image source={require('../assets/image/light/back.png')} style={{width:20, height:20}} />
      </TouchableOpacity>
    </View>
    
    <Text style={styles.headerTitle}>내 정보 수정</Text>
  </View>

  <View style={styles.profileContainer}>
    <View style={styles.profileCard}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/image/light/profile.png')} style={{ width: 60, height: 60, borderRadius: 30 }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.profileName}>user</Text>
        <Text style={styles.profileDepartment}>컴퓨터공학과</Text>
        <Text style={styles.profileEmail}>konkukuniv@kku.ac.kr</Text>
      </View>
    </View>
  </View>

  <View style={styles.infoContainer}>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoText1}>user</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이메일</Text>
          <Text style={styles.infoText2}>konkukuniv@kku.ac.kr</Text>
        </View>

        <View style={styles.separator} />

        <TouchableOpacity onPress={() => setPasswordPromptVisible(true)} style={styles.infoRow}>
          <Text style={styles.infoLabel}>비밀번호 변경</Text>
          <Image source={require('../assets/image/light/password.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoLabel}>이메일 인증</Text>
          <Image source={require('../assets/image/light/email.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.infoRow} onPress={() => { navigation.navigate('Department'); }}>
          <Text style={styles.infoLabel}>학과 등록</Text>
          <Image source={require('../assets/image/light/subject.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <View style={styles.separator} />
      </View>

      <Modal visible={isPasswordModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {isPasswordPromptVisible ? (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>비밀번호를 변경하시겠습니까?</Text>
              <View style={styles.modalButtonRow}>
                <Button title="예" onPress={() => handlePasswordPrompt('예')} />
                <Button title="아니오" onPress={() => handlePasswordPrompt('아니오')} />
              </View>
            </View>
          ) : (
            <View style={styles.modalContent}>
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
          )}
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
    backgroundColor: '#fff',
  },
  bar: {
    backgroundColor:'#9DC284',
    width:'100%',
    height: 70,
    position:'absolute',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backContainer: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 110,
  },
  imageContainer: {
    marginRight: 20,
  },
  textContainer: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
  },
  profileDepartment: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },
  profileEmail: {
    fontSize: 16,
    color: '#0E664F',
  },
  infoContainer: { // 프로필 카드와 이름 사이 공백
    marginTop: 0,
    padding: 40,
  },
  separator: {
    height: 1,
    backgroundColor: '#ababab',
    marginVertical: 5,
    marginHorizontal: 40, // 양쪽 마진
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    width: '75%',
    marginHorizontal: 'auto',
    height: 20,
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: '900',
    width: '40%',
    textAlign: 'left',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  infoText1: {
    fontSize: 20,
    color: '#8a8a8a',
    width: '65%',
    textAlign: 'left',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  infoText2: {
    fontSize: 20,
    color: '#8a8a8a',
    width: '65%',
    textAlign: 'left',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  infoButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 24,  // 여백 추가
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0,
  },
  infoButtonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'center',
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
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Modal, Button, Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from './GlobalContext'; // Assuming you have a GlobalContext for darkMode and selectedDepartment

function ProfilePage() {
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordChanged, setPasswordChanged] = useState(false);
  const { darkMode, user, setUser, selectedDepartment } = useContext(GlobalContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setUser(prevState => ({ ...prevState, email: storedEmail })); // setUser로 user 상태 업데이트
      }
    };

    loadUserEmail();
  }, [setUser]);

    const handlePasswordChange = async (email, oldPassword, newPassword) => {
      try {
        const token = await AsyncStorage.getItem('token') || await AsyncStorage.getItem('temporary_token');
    
        if (!token) {
          Alert.alert('오류', '로그인 상태를 확인할 수 없습니다.');
          return;
        }
    
        const response = await fetch('https://nanolab-production-6aa7.up.railway.app/auth/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 토큰을 사용해 사용자 인증
          },
          body: JSON.stringify({ email: form.email, oldPassword, newPassword }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          Alert.alert('성공', '비밀번호가 변경되었습니다.');
        } else {
          Alert.alert('오류', data.message || '비밀번호 변경에 실패했습니다.');
        }
      } catch (error) {
        console.error('Password change error:', error);
        Alert.alert('오류', '비밀번호 변경 중 오류가 발생했습니다.');
      }
    };
  
  const dynamicStyles = {
    profileDepartment: {
      fontSize: 20,
      fontWeight: 'bold',
      color: darkMode ? '#ffffff' : '#000000',
    },
    bar: {
      backgroundColor: darkMode ? '#597248' : '#9DC284',
      width: '100%',
      height: 50,
      position: 'absolute',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: darkMode ? '#ffffff' : '#000000',
    },
    profileCard: {
      flexDirection: 'row',
      borderRadius: 40,
      borderWidth: 2,
      borderColor: darkMode ? '#ffffff' : '#000000',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '90%',
      height: 110,
    },
    profileEmail: {
      fontSize: 16,
      color: darkMode ? '#9DC284' : '#0E664F',
    },
    infoLabel: {
      fontSize: 20,
      fontWeight: '900',
      width: '40%',
      textAlign: 'left',
      textAlignVertical: 'center',
      alignSelf: 'center',
      color: darkMode ? '#ffffff' : '#000000',
    },
    modalContent: {
      width: '80%',
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      padding: 20,
      borderRadius: 8,
    },
  };

  const background = darkMode 
    ? require('../assets/image/dark/background.png')
    : require('../assets/image/light/background.png');
  
  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');
    
  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={dynamicStyles.bar}></View>
      
        <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ position: 'absolute', left: 10 }}>
            <TouchableOpacity onPress={() => { navigation.navigate('Mypage'); }}>
              <Image source={back} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <Text style={dynamicStyles.headerTitle}>내 정보 수정</Text>
        </View>
        
        <View style={{ alignItems: 'center', marginTop: 80 }}>
          <View style={dynamicStyles.profileCard}>
            <View style={{ marginRight: 20, marginLeft: 30 }}>
              <Image source={require('../assets/image/light/profile.png')} style={{ width: 60, height: 60, borderRadius: 30 }} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[dynamicStyles.profileDepartment,
                { color: selectedDepartment && typeof selectedDepartment === 'string' ? 'black' : 'gray' },
                selectedDepartment && dynamicStyles.profileDepartment]}>
                {selectedDepartment && typeof selectedDepartment === 'string' ? selectedDepartment : 'user'}
              </Text>
              <Text style={dynamicStyles.profileEmail}>
                {user?.email || '이메일이 없습니다.'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 50 }}>
          <TouchableOpacity onPress={() => setPasswordModalVisible(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '80%', borderTopWidth: 2, borderColor: '#E5E3E3', height: 70, paddingHorizontal: 10 }}>
            <Text style={dynamicStyles.infoLabel}>비밀번호 변경</Text>
            <Image source={require('../assets/image/light/password.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '80%', borderTopWidth: 2, borderColor: '#E5E3E3', height: 70, paddingHorizontal: 10 }} onPress={() => { navigation.navigate('Department'); }}>
            <Text style={dynamicStyles.infoLabel}>학과 등록</Text>
            <Image source={require('../assets/image/light/subject.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '80%', borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#E5E3E3', height: 70, paddingHorizontal: 10 }} onPress={() => { navigation.navigate('Department'); }}>
            <Text style={dynamicStyles.infoLabel}>탈퇴</Text>
            <Image source={require('../assets/image/light/exit.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        <Modal visible={isPasswordModalVisible} transparent={true} animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={dynamicStyles.modalContent}>
              <TextInput
                placeholder="기존 비밀번호"
                secureTextEntry
                style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 }}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholderTextColor="grey"
              />
              <TextInput
                placeholder="새로운 비밀번호"
                secureTextEntry
                style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 }}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholderTextColor="grey"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10 }}>
                <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 8, width: '45%' }}>
                  <Button title="확인" color={darkMode ? '#9DC284' : '#0E664F'} onPress={handlePasswordChange} />
                </View>
                <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 8, width: '45%' }}>
                  <Button title="취소" color={darkMode ? 'white' : 'black'} onPress={() => setPasswordModalVisible(false)} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}




const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  bar: {
    backgroundColor:'#9DC284',
    width:'100%',
    height: 50,
    position:'absolute',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'left',
    width: '90%',
    height: 110,
  },
  imageContainer: {
    marginRight: 20,
    marginLeft: 30,
  },
  textContainer: {
    flexDirection: 'column',
  },
  profileDepartment: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom:5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#0E664F',
  },
  infoContainer: { // 프로필 카드와 이름 사이 공백
    marginTop: 50,
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
    alignSelf:'center',
    width: '80%',
    borderTopWidth:2,
    borderColor:'#E5E3E3',
    height: 70,
    paddingHorizontal:10,
  },
  infoRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf:'center',
    width: '80%',
    borderTopWidth:2,
    borderBottomWidth:2,
    borderColor:'#E5E3E3',
    height: 70,
    paddingHorizontal:10,
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: '900',
    width: '40%',
    textAlign: 'left',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  infoText2: {
    fontSize: 18,
    color: '#8a8a8a',
    textAlign: 'right',
    textAlignVertical: 'center',
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
  buttonContainer: {
    flexDirection: 'row',    
    justifyContent: 'space-between', 
    paddingHorizontal:10,
    marginTop:10,
  },
  button: {
    borderWidth:1,
    borderColor:'#C4C4C4',
    borderRadius:8,
    width:'45%',
  },
});

export default ProfilePage;
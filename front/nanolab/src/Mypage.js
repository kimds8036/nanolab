import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, ScrollView, StyleSheet, ImageBackground, Alert, Modal, TextInput, Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // axios를 import 합니다

const MyPage = () => {
  const navigation = useNavigation();
  const { darkMode, setDarkMode, user, setUser, selectedDepartment } = useContext(GlobalContext);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // 예시: AsyncStorage 또는 API 호출을 통해 유저 정보를 불러옵니다.
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, [setUser]);

  const toggleSwitch = () => setDarkMode(previousState => !previousState);

  const handleDeleteAccount = async () => {
    try {
      // 사용자 확인 알림
      Alert.alert(
        '계정 삭제',
        '정말로 계정을 삭제하시겠습니까?',
        [
          {
            text: '취소',
            style: 'cancel'
          },
          {
            text: '삭제',
            onPress: async () => {
              try {
                // 사용자 이메일을 백엔드 API에 전달하여 삭제 요청
                const response = await axios.delete('https://nanolab-production-6aa7.up.railway.app/auth/delete-user', {
                  data: { email: user?.email }
                });

                if (response.status === 200) {
                  // 성공적으로 삭제된 경우
                  await AsyncStorage.removeItem('user');
                  setUser(null);
                  navigation.navigate('Login'); // 로그인 페이지로 이동
                } else {
                  Alert.alert('오류', '계정 삭제에 실패했습니다.');
                }
              } catch (error) {
                console.error('Failed to delete account:', error);
                Alert.alert('오류', '계정 삭제 중 오류가 발생했습니다.');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Failed to show alert:', error);
    }
  };

  useEffect(() => {
    const loadUserEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail) {
        setUser(prevState => ({ ...prevState, email: storedEmail })); // setUser로 user 상태 업데이트
      }
    };

    loadUserEmail();
  }, [setUser]);

  const handlePasswordChange = async () => {
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
        body: JSON.stringify({
          email: user?.email, // 이메일 사용
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('성공', '비밀번호가 변경되었습니다.');
        setPasswordModalVisible(false); // 비밀번호 변경 후 모달 닫기
      } else {
        Alert.alert('오류', data.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Password change error:', error);
      Alert.alert('오류', '비밀번호 변경 중 오류가 발생했습니다.');
    }
  };


  const dynamicStyles = {
    container:{
      flex:1,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
    },
    bar:{
      backgroundColor: darkMode ? '#597248':'#9DC284',
      width:'100%',
      height:50,
    },
    header: {
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      width: '100%',
    },
    profileSection: {
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      right:12.5,
      color:darkMode?'#ffffff':'#000000',
    },
    nickname: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color:darkMode?'#ffffff':'#000000',
    },
    editButton: {
      backgroundColor:darkMode?'#597248' : '#9DC284',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    editButtonText: {
      fontSize: 12,
      color: '#000',
      fontWeight:'bold',
      color:darkMode?'#ffffff':'#000000',
    },
    emailPart: {
      backgroundColor: darkMode ? '#2f2f2f' : '#F2F2F2',
      width:'100%',
      height:75,
      alignSelf:'center',
      alignContent:'center',
      justifyContent:'center',
      borderRadius:20,
      marginTop:5,
    },
    email: {
      fontSize: 20,
      color:darkMode?'#ffffff':'#000000',
      fontWeight:'bold',
      alignSelf:'center',
    },
    menuSection: {
      backgroundColor: darkMode ? '#1B4102' : '#0E664F',
      paddingHorizontal: 16,
      paddingVertical: 20,
      height:'100%',
    },
    menuText: {
      fontSize: 18,
      color:darkMode?'#ffffff':'#000000',
    },
  };

  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');

  const background2 = darkMode 
    ? require('../assets/image/dark/background2.png')
    : require('../assets/image/light/background2.png');

  const keyword = darkMode 
    ? require('../assets/image/dark/keyword.png')
    : require('../assets/image/light/keyword.png');

  const save = darkMode 
    ? require('../assets/image/dark/save.png')
    : require('../assets/image/light/save.png');

  const logout = darkMode 
    ? require('../assets/image/dark/logout.png')
    : require('../assets/image/light/logout.png');

  const password = darkMode 
    ? require('../assets/image/dark/password.png')
    : require('../assets/image/light/password.png');

  const subject = darkMode 
    ? require('../assets/image/dark/subject.png')
    : require('../assets/image/light/subject.png');

  const exit = darkMode 
    ? require('../assets/image/dark/exit.png')
    : require('../assets/image/light/exit.png');

  

    return (
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.bar}></View>
        <ScrollView>
          <View style={dynamicStyles.header}>
            <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
              <Image source={back} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={dynamicStyles.headerTitle}>마이페이지</Text>
            </View>
          </View>
  
          <View style={dynamicStyles.profileSection}>
            <Image
              source={require('../assets/image/light/profile.png')} // 기본 프로필 이미지 경로 설정
              style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
            />
            <Text 
              style={[dynamicStyles.nickname,
                { color: selectedDepartment && typeof selectedDepartment === 'string' ? 'black' : 'gray' },
                selectedDepartment && dynamicStyles.menuText // selectedDepartment가 true일 때 dynamicStyles.menuText를 추가
              ]}  >
              {selectedDepartment && typeof selectedDepartment === 'string' ? selectedDepartment : 'user'}
            </Text> 
            
          </View>
  
          <View style={dynamicStyles.menuSection}>
            <View style={dynamicStyles.emailPart}>
              <Text style={dynamicStyles.email}>{user?.email || 'konkukuniv@kku.ac.kr'}</Text>
            </View>
            <ImageBackground source={background2} style={styles.menupart}>
            <View style={styles.menuItem1}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>다크모드</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={darkMode}
                style={styles.switch}
              />
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('Keyword');}}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>보관함</Text>
              <Image source={save} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('Keyword');}}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>키워드 알림 설정</Text>
              <Image source={keyword} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('Department');}}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>학과 등록</Text>
              <Image source={subject} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => setPasswordModalVisible(true)}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>비밀번호 변경</Text>
              <Image source={password} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('Login');}}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>로그아웃</Text>
              <Image source={exit} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>탈퇴</Text>
              <Image source={logout} style={styles.menuIcon} />
            </TouchableOpacity>
          </ImageBackground>
            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <Text style={{ color: 'grey' }}>Developed by 윤창배, 이태성, 임연서, 강민채, 김수현, 김은채</Text>
              <Text style={{ color: 'grey' }}>Managed by 김동석</Text>
              <Text style={{ color: 'grey' }}>Designed by 김영은</Text>
            </View>
          </View>
          <Modal visible={isPasswordModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent,dynamicStyles.modalContent]}>
              <TextInput
                placeholder="기존 비밀번호"
                secureTextEntry
                style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 }}
                value={form.currentPassword}
                onChangeText={(text) => setForm({ ...form, currentPassword: text })}
                placeholderTextColor="grey"
              />
              <TextInput
                placeholder="새로운 비밀번호"
                secureTextEntry
                style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 }}
                value={form.newPassword}
                onChangeText={(text) => setForm({ ...form, newPassword: text })}
                placeholderTextColor="grey"
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="확인" color={darkMode ? '#9DC284':'#0E664F'} onPress={handlePasswordChange} />
                </View>
                <View style={{ borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 8, width: '45%' }}>
                  <Button title="취소" color={darkMode ? 'white' : 'black'} onPress={() => setPasswordModalVisible(false)} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        </ScrollView>
      </View>
    );
  };



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innercontainer:{
    flex:1,
  },
  bar:{
    backgroundColor:'#9DC284',
    width:'100%',
    height:50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitleContainer: {
    flex: 1, // 이 뷰가 남은 공간을 차지하게 합니다.
    justifyContent: 'center', // 이 뷰 안에서 텍스트가 가운데에 위치하도록 합니다.
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    right:12.5,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#A4B494',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editButtonText: {
    fontSize: 12,
    color: '#000',
    fontWeight:'bold',
  },
  emailpart:{
    width:'100%',
    height:75,
    backgroundColor:'#ffffff',
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',
    borderRadius:20,
    marginTop:5,
  },
  email: {
    fontSize: 20,
    color: '#000',
    fontWeight:'bold',
    alignSelf:'center',
  },
  menuSection: {
    backgroundColor: '#0E664F', // 메뉴 섹션 배경 색상
    paddingHorizontal: 16,
    paddingVertical: 20,
    height:'100%',
  },
  menupart:{
    width:'100%',
    height:500,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    borderRadius:20,
    marginTop:20,
    overflow:'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    width:'90%',
  },
  menuItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderTopWidth:1,
    borderTopColor:'#C4C4C4',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    width:'90%',
  },
  menuText: {
    fontSize: 18,
    color: '#000',
  },
  menuIcon: {
    width: 35,
    height: 35,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    left:5,
  },
  inform:{
    marginBottom:20,
    marginTop:20,
  },
  informtext:{
    color:'grey',
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
    paddingHorizontal:10,
    marginTop:10,
  },
  button: {
    borderWidth:1,
    borderColor:'#C4C4C4',
    borderRadius:8,
    width:'45%',
    borderWidth:1,
    borderColor:'#C4C4C4',
    borderRadius:8,
    width:'45%',
  },
});

export default MyPage;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, navigation } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPage = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({ nickname: '', email: '' });

  useEffect(() => {
    // Replace with your actual API call
    fetch('http://192.168.0.58:5000')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const toggleSwitch = () => setDarkMode(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bar}></View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
          <Image source={require('../assets/image/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>마이페이지</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('../assets/image/profile.png')} // 기본 프로필 이미지 경로 설정
          style={styles.profileImage}
        />
        <Text style={styles.nickname}>{userData.nickname || 'user'}</Text>
        <TouchableOpacity style={styles.editButton} onPress={()=>{navigation.navigate('Myinform');}}>
          <Text style={styles.editButtonText}>내 정보 수정</Text>
        </TouchableOpacity>
        <Text style={styles.email}>{userData.email || 'konkukuniv@kku.ac.kr'}</Text>
      </View>

      <View style={styles.menuSection}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>다크모드</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={darkMode}
            style={styles.switch}
          />
        </View>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>키워드 알림 설정</Text>
          <Image source={require('../assets/image/keyword.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>보관함</Text>
          <Image source={require('../assets/image/save.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>피드백</Text>
          <Image source={require('../assets/image/feedback.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>로그아웃</Text>
          <Image source={require('../assets/image/logout.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C4C4C4', // 기본 프로필 이미지 배경 색상
    marginBottom: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#A4B494',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  editButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#fff',
  },
  menuSection: {
    backgroundColor: '#DAEAD0', // 메뉴 섹션 배경 색상
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default MyPage;
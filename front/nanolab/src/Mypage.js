import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, navigation } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext'; // GlobalContext를 가져옴

const MyPage = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({ email: '' });

  const { selectedDepartment } = useContext(GlobalContext); // GlobalContext에서 selectedDepartment 값을 가져옴

  const toggleSwitch = () => setDarkMode(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.bar}></View>
      <ScrollView style={styles.innercontainer}>
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
        <Text 
          style={[styles.nickname, 
            { color: selectedDepartment && typeof selectedDepartment === 'string' ? 'black' : 'gray' }]}
        >
          {selectedDepartment && typeof selectedDepartment === 'string' ? selectedDepartment : 'user'}
        </Text> 
        <TouchableOpacity style={styles.editButton} onPress={() => { navigation.navigate('Myinform'); }}>
          <Text style={styles.editButtonText}>내 정보 수정</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <View style={styles.emailpart}>
          <Text style={styles.email}>{userData.email || 'konkukuniv@kku.ac.kr'}</Text>
        </View>
        <View style={styles.menupart}>
          <View style={styles.menuItem1}>
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
      </View>
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
    marginBottom: 10,
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
    backgroundColor:'#fff',
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
    height:400,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    borderRadius:20,
    marginTop:20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    width:'90%',
  },
  menuItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopWidth:1,
    borderTopColor:'#C4C4C4',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    width:'90%',
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
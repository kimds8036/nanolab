import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext'; // GlobalContext를 가져옴

const MyPage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ email: '' });
  
  const { darkMode, setDarkMode } = useContext(GlobalContext);

  const { selectedDepartment } = useContext(GlobalContext); // GlobalContext에서 selectedDepartment 값을 가져옴

  const toggleSwitch = () => setDarkMode(previousState => !previousState);
  console.log(darkMode);

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

  const feedback = darkMode 
    ? require('../assets/image/dark/feedback.png')
    : require('../assets/image/light/feedback.png');

  const logout = darkMode 
    ? require('../assets/image/dark/logout.png')
    : require('../assets/image/light/logout.png');

  return (
    <View style={[styles.container,dynamicStyles.container]}>
      <View style={[styles.bar,dynamicStyles.bar]}></View>
      <ScrollView style={styles.innercontainer}>
        <View style={[styles.header, dynamicStyles.header]}>
          <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>마이페이지</Text>
          </View>
        </View>

        <View style={[styles.profileSection, dynamicStyles.profileSection]}>
          <Image
            source={require('../assets/image/light/profile.png')} // 기본 프로필 이미지 경로 설정
            style={styles.profileImage}
          />
          <Text 
            style={[styles.nickname, dynamicStyles.nickname,
              { color: selectedDepartment && typeof selectedDepartment === 'string' ? 'black' : 'gray' },
              selectedDepartment && dynamicStyles.menuText // selectedDepartment가 true일 때 dynamicStyles.menuText를 추가
            ]}  >
            {selectedDepartment && typeof selectedDepartment === 'string' ? selectedDepartment : 'user'}
          </Text> 
          <TouchableOpacity style={[styles.editButton,dynamicStyles.editButton]} onPress={() => { navigation.navigate('Myinform'); }}>
            <Text style={[styles.editButtonText,dynamicStyles.editButtonText]}>내 정보 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.menuSection, dynamicStyles.menuSection]}>
          <View style={[styles.emailpart, dynamicStyles.emailPart]}>
            <Text style={[styles.email, dynamicStyles.email]}>{userData.email || 'konkukuniv@kku.ac.kr'}</Text>
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
              <Text style={[styles.menuText, dynamicStyles.menuText]}>키워드 알림 설정</Text>
              <Image source={keyword} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('Keyword');}}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>보관함</Text>
              <Image source={save} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('Feedback');}}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>피드백</Text>
              <Image source={feedback} style={styles.menuIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={()=>{navigation.navigate('Login');}}>
              <Text style={[styles.menuText, dynamicStyles.menuText]}>로그아웃</Text>
              <Image source={logout} style={styles.menuIcon} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.inform}>
            <Text style={styles.informtext}>Developed by 윤창배, 이태성, 임연서, 강민채, 김수현, 김은채</Text>
            <Text style={styles.informtext}>Managed by 김동석</Text>
            <Text style={styles.informtext}>Designed by 김영은</Text>
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
    height:400,
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
  }
});

export default MyPage;
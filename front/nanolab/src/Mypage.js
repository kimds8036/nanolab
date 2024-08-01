import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, navigation } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyPage = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({ nickname: '', email: '' });

  useEffect(() => {
    // Replace with your actual API call
    fetch('https://api.yoursite.com/user')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const toggleSwitch = () => setDarkMode(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.rectangle1}></View>
      </View>
      <View style={styles.container1}>
        <View style={styles.rectangle2}></View>
      </View>
      <View style={styles.container1}>
        <View style={styles.rectangle3}></View>
      </View>
      <View style={styles.container1}>
        <View style={styles.rectangle4}></View>
      </View>
      <View style={styles.container1}>
        <Image source={require('../assets/image/profile.png')} style={styles.image1} />
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
          <Image source={require('../assets/image/back.png')} style={styles.backicon} />
        </TouchableOpacity>
        <View style={styles.container1}>
          <Text style={styles.myPage}>마이페이지</Text>
        </View>
      </View>
      <Text style={styles.user}>{userData.nickname}</Text>
      <Text style={styles.userId}>{userData.email}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>내 정보 수정</Text>
      </TouchableOpacity>
      <View style={styles.container1}>
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>다크모드</Text>
            <Switch onValueChange={toggleSwitch} style={styles.toggle} value={darkMode}/>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>키워드 알림 설정</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Keyword'); }}>
              <Image style={styles.menuIcon} source={require('../assets/image/keyword.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>보관함</Text>
            <TouchableOpacity>
              <Image style={styles.menuIcon} source={require('../assets/image/save.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>피드백</Text>
            <TouchableOpacity>
              <Image style={styles.menuIcon} source={require('../assets/image/feedback.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>도움말</Text>
            <TouchableOpacity>
              <Image style={styles.menuIcon} source={require('../assets/image/question.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>로그아웃</Text>
            <TouchableOpacity>
              <Image style={styles.menuIcon} source={require('../assets/image/logout.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.container1}>
        <View style={styles.line1}></View>
        <View style={styles.line2}></View>
        <View style={styles.line3}></View>
        <View style={styles.line4}></View>
        <View style={styles.line5}></View>
        <View style={styles.line6}></View>
        <View style={styles.line7}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backicon:{
    width:25,
    height:25,
    top: 38,
    left:10,
  },
  rectangle1: {
    position: 'absolute',
    width: "100%",
    height: 800,
    left: 0,
    top: -740,
    backgroundColor: '#9DC284',
  },
  rectangle2: {
    position: 'absolute',
    width: "100%",
    height:1000,
    left: 0,
    top: 324,
    backgroundColor: '#0E664F',
  },
  rectangle3: {
    position: 'absolute',
    width: "90%",
    height: 75,
    top: 357,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  container1: {
    flex: 1,
    justifyContent: 'center', // 세로축 가운데 정렬
    alignItems: 'center', // 가로축 가운데 정렬
  },
  rectangle4: {
    width: 125,
    height: 33,
    top: 308,
    backgroundColor: '#9DC284',
    borderRadius: 15,
  },
  image1: {
    position: 'absolute',
    width: 116,
    height: 117,
    top: 100,
    borderRadius: 200,
    
  },
  myPage: {
    width: 74,
    height: 18,
    top: 40,
    right:15,
    fontFamily: 'Handjet',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    color: '#000000',
  },
  user: {
    position: 'absolute',
    width: 39,
    height: 20,
    left: 195,
    top: 264,
    fontFamily: 'NanumGothic',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    color: '#000000',
  },
  userId: {
    position: 'absolute',
    width: 208,
    height: 20,
    left: 111,
    top: 385,
    fontFamily: 'NanumGothic',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    color: '#000000',
  },
  editButton: {
    position: 'absolute',
    width: 60,
    height: 33, // 텍스트가 더 잘 맞도록 높이를 조정
    left: 165,
    top: 308,
    backgroundColor: '#9DC284',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center', // 수평 가운데 정렬
  },
  editButtonText: {
    fontFamily: 'Handjet',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 13,
    textAlign: 'center',
    color: '#000000',
  },
  menuContainer: {
    position: 'absolute',
    width: "90%",
    height: 470,
    top: 407,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop:20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:16.5,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Handjet',
    fontStyle: 'normal',
    fontWeight: '200',
    color: 'rgba(0, 0, 0, 0.7)',
    left: 25,
  },
  menuIcon: {
    width: 40,
    height: 40,
    right: 25,
  },
  toggle:{
    right: 20,
    
  },
  line1: {
    position: 'absolute',
    width: 317,
    top: 427,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line2: {
    position: 'absolute',
    width: 317,
    top: 497,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line3: {
    position: 'absolute',
    width: 317,
    top: 567,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line4: {
    position: 'absolute',
    width: 317,
    top: 637,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line5: {
    position: 'absolute',
    width: 317,
    top: 707,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line6: {
    position: 'absolute',
    width: 317,
    top: 777,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line7: {
    position: 'absolute',
    width: 317,
    top: 847,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
});

export default MyPage;
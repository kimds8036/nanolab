import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';

const MyPage = () => {
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
      <View style={styles.rectangle1}></View>
      <View style={styles.rectangle2}></View>
      <View style={styles.rectangle3}></View>
      <View style={styles.rectangle5}></View>
      <View style={styles.container1}>
        <View style={styles.rectangle6}></View>
      </View>
      <Image source={require('../assets/image/profile.png')} style={styles.image1} />
      <Text style={styles.myPage}>마이페이지</Text>
      <Text style={styles.user}>{userData.nickname}</Text>
      <Text style={styles.userId}>{userData.email}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>내 정보 수정</Text>
      </TouchableOpacity>
      <View style={styles.menuContainer}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>다크모드</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={darkMode}
          />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>키워드 알림 설정</Text>
          <TouchableOpacity>
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
      <View style={styles.line2}></View>
      <View style={styles.line3}></View>
      <View style={styles.line4}></View>
      <View style={styles.line10}></View>
      <View style={styles.line5}></View>
      <View style={styles.line9}></View>
      <View style={styles.line8}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1EFD8',
  },
  rectangle1: {
    position: 'absolute',
    width: "100%",
    height: 53,
    left: 0,
    top: 0,
    backgroundColor: '#9DC284',
    alignItems:'center',
    justifyContent:'center',
  },
  rectangle2: {
    position: 'absolute',
    width: "100%",
    height: 608,
    left: 0,
    top: 324,
    backgroundColor: '#0E664F',
    alignItems:'center',
    justifyContent:'center',
  },
  rectangle3: {
    position: 'absolute',
    width: 345,
    height: 75,
    left: 29,
    top: 357,
    backgroundColor: '#FCFCFC',
    borderRadius: 15,
    alignItems:'center',
    justifyContent:'center',
  },
  rectangle5: {
    position: 'absolute',
    width:100,
    height: 440,
    left: 3,
    top: 457,
    backgroundColor: '#FCFCFC',
    borderRadius: 15,
  },
  container1: {
    flex: 1,
    justifyContent: 'center', // 세로축 가운데 정렬
    alignItems: 'center', // 가로축 가운데 정렬
  },
  rectangle6: {
    width: 125,
    height: 33,
    top: 308,
    backgroundColor: '#9DC284',
    borderRadius: 15,
    // 이미 가로축 가운데 정렬되어 있으므로 필요 없음
  },
  image1: {
    position: 'absolute',
    width: 116,
    height: 117,
    left: 152,
    top: 133,
    borderRadius: 200,
    
  },
  myPage: {
    position: 'absolute',
    width: 74,
    height: 18,
    left: 157,
    top: 67,
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
    height: 13,
    left: 183,
    top: 318,
    backgroundColor: '#9DC284',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 371,
    height: 440,
    left: 31,
    top: 457,
    backgroundColor: '#FCFCFC',
    borderRadius: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Handjet',
    fontStyle: 'normal',
    fontWeight: '200',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  line2: {
    position: 'absolute',
    width: 317,
    height: 0,
    left: 56,
    top: 486,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line3: {
    position: 'absolute',
    width: 317,
    height: 0,
    left: 56,
    top: 552,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line4: {
    position: 'absolute',
    width: 317,
    height: 0,
    left: 56,
    top: 620,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line10: {
    position: 'absolute',
    width: 317,
    height: 0,
    left: 54,
    top: 685,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line5: {
    position: 'absolute',
    width: 317,
    height: 0,
    left: 56,
    top: 746,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line9: {
    position: 'absolute',
    width: 317,
    height: 0,
    left: 56,
    top: 810,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
  line8: {
    position: 'absolute',
    width: 317,
    height: 0,
    left: 56,
    top: 876,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
  },
});

export default MyPage;
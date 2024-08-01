import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Navigation, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Header = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      <View>  
        <Text style={styles.headerTitle}>공지사항</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => alert('Details')}>
          <Image source={require('../assets/image/search.png')} style={styles.icon} />  
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Details')}>
          <Image source={require('../assets/image/alert.png')} style={styles.icon} />  
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress}>
          <Image source={require('../assets/image/menu.png')} style={styles.icon} />  
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RecentNotices = () => {
  const category = '학사공지';
  return (
    <View style={styles.Container1}>
      <View style={styles.sectionContainer1}>
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>최근 공지</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.noticeContainer}>
            <View style={styles.noticeWrapper}>
              <View style={styles.notice}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </View>
            </View>
            <View style={styles.noticeWrapper}>
              <View style={styles.notice}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </View>
            </View>
            <View style={styles.noticeWrapper}>
              <View style={styles.notice}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </View>
            </View>
            <View style={styles.noticeWrapper}>
              <View style={styles.notice}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </View>
            </View>
            <View style={styles.noticeWrapper}>
              <View style={styles.notice}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </View>
            </View>
        </ScrollView>
      </View>
    </View>
  );
};



const PopularNotices = () => {
  const daysLeft = 1; // 디데이까지 남은 일수 (예시로 10일 설정)

  // 날짜에 따른 색상 결정 함수
  const getDateStyle = () => {
    if (daysLeft <= 0) {
      return styles.dateBlack;
    } else if (daysLeft <= 3) {
      return styles.dateRed;
    } else if (daysLeft <= 5) {
      return styles.dateGreen;
    } else {
      return styles.dateLightGreen;
    }
  };

  const getDateText = () => {
    if (daysLeft <= 0) {
      return '마감';
    } else {
      return `D-${daysLeft}`;
    }
  };

  return (
    <View style={styles.Container2}>
      <View style={styles.sectionContainer2}>
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>인기 공지</Text>
        </View>
        <View style={styles.popularNotices}>
          <View style={styles.announcement}>
            <Text style={styles.title}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
            <View style={styles.dotted}></View>
            <View style={styles.dcontainer}>
              <Text style={styles.details}>조회수: 125</Text>
              <View style={[styles.date, getDateStyle()]}><Text style={styles.datetext}>{getDateText()}</Text></View>
              <TouchableOpacity onPress={() => alert('Details')}>
                <Image source={require('../assets/image/next.png')} style={styles.nextbutton} />  
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.announcement}>
            <Text style={styles.title}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
            <View style={styles.dotted}></View>
            <View style={styles.dcontainer}>
              <Text style={styles.details}>조회수: 125</Text>
              <View style={[styles.date, getDateStyle()]}><Text style={styles.datetext}>{getDateText()}</Text></View>
              <TouchableOpacity onPress={() => alert('Details')}>
                <Image source={require('../assets/image/next.png')} style={styles.nextbutton} />  
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.announcement}>
            <Text style={styles.title}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
            <View style={styles.dotted}></View>
            <View style={styles.dcontainer}>
              <Text style={styles.details}>조회수: 125</Text>
              <View style={[styles.date, getDateStyle()]}><Text style={styles.datetext}>{getDateText()}</Text></View>
              <TouchableOpacity onPress={() => alert('Details')}>
                <Image source={require('../assets/image/next.png')} style={styles.nextbutton} />  
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.announcement}>
            <Text style={styles.title}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
            <View style={styles.dotted}></View>
            <View style={styles.dcontainer}>
              <Text style={styles.details}>조회수: 125</Text>
              <View style={[styles.date, getDateStyle()]}><Text style={styles.datetext}>{getDateText()}</Text></View>
              <TouchableOpacity onPress={() => alert('Details')}>
                <Image source={require('../assets/image/next.png')} style={styles.nextbutton} />  
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.announcement}>
            <Text style={styles.title}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
            <View style={styles.dotted}></View>
            <View style={styles.dcontainer}>
              <Text style={styles.details}>조회수: 125</Text>
              <View style={[styles.date, getDateStyle()]}><Text style={styles.datetext}>{getDateText()}</Text></View>
              <TouchableOpacity onPress={() => alert('Details')}>
                <Image source={require('../assets/image/next.png')} style={styles.nextbutton} />  
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.announcement}>
            <Text style={styles.title}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
            <View style={styles.dotted}></View>
            <View style={styles.dcontainer}>
              <Text style={styles.details}>조회수: 125</Text>
              <View style={[styles.date, getDateStyle()]}><Text style={styles.datetext}>{getDateText()}</Text></View>
              <TouchableOpacity onPress={() => alert('Details')}>
                <Image source={require('../assets/image/next.png')} style={styles.nextbutton} />  
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.announcement}>
            <Text style={styles.title}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
            <View style={styles.dotted}></View>
            <View style={styles.dcontainer}>
              <Text style={styles.details}>조회수: 125</Text>
              <View style={[styles.date, getDateStyle()]}><Text style={styles.datetext}>{getDateText()}</Text></View>
              <TouchableOpacity onPress={() => alert('Details')}>
                <Image source={require('../assets/image/next.png')} style={styles.nextbutton} />  
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const MenuBar = ({ onClose }) => {
  const navigation = useNavigation(); // 네비게이션 훅 호출
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: width * 1 / 4,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleHomePress = () => {
    navigation.navigate('Mypage'); // 네비게이션 객체를 이용하여 화면 전환
  };

  return (
    <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
      <View style={styles.menuheader}>
        <Text style={styles.headerText}>Menu</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleHomePress}>
            <Image source={require('../assets/image/mypage.png')} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHomePress}>
            <Image source={require('../assets/image/mypage.png')} style={styles.iconButton} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Noticelist'); }}>
          <Text style={styles.menuItemText}>학과 공지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>학사 공지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>장학 공지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>일반 공지</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>취업 / 창업</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>공모전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>국제 교류</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>모시래 식단</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>해오름 식단</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

const MainPage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Header onMenuPress={handleMenuPress} />
        <RecentNotices />
        <PopularNotices />
      </ScrollView>
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <MenuBar onClose={handleCloseMenu} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  //menu
  menuOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  slideContainer: {
    width: width * 5 / 6,
    backgroundColor: '#edf0f2', // 반투명 백그라운드
    flex: 1,
    position: 'absolute',
    right: 0,
    height: "100%",
  },
  menuheader: {
    height: 100, // 상단 여유 공간 줄이기
    backgroundColor: '#6AA84F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 30, // 상단 여유 공간 줄이기
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // 아이콘 상단 여유 공간 추가
  },
  iconButton: {
    marginLeft: 100,
    marginTop:25,
    width: 25,
    height: 25,
  },
  menu: {
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    width: width * 5 / 6 - 32,
  },
  menuItemText: {
    fontSize: 18,
    color: '#000000',
  },

  //main
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  Container1:{
    width:"100%",
    height: 350,
    
  },
  Container2:{
    width:"100%",
    height: "100%",
    
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    height:70,
    marginLeft:5,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 5,
  },
  sectionContainer1: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  sectionContainer2: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    width: 100,
    height: 35,
    textAlign: 'center',
    lineHeight: 35,  // 텍스트가 가운데 오도록 조정
    backgroundColor: '#DDDDDD',
    borderRadius: 20,
    overflow: 'hidden',
  },
  sectionTitleWrapper: {
    shadowColor: '#CACACA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 20, 
  },
  noticeContainer: {
    flexDirection: 'row',
    
  },
  noticeWrapper: {
    paddingBottom: 10,
    overflow: 'visible',
  },
  notice: {
    backgroundColor: '#9DC284',
    padding: 20,
    borderRadius: 20,
    width: 250,
    marginRight: 10,
    height: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 10,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noticeText: {
    fontSize: 14,
    marginTop:10,
  },
  category:{
    top:155,
    color: '#45553A',
  },
  popularNotices:{
    width:"100%",
  },
  announcement: {
    backgroundColor: '#fff',
    padding: 15,
    borderColor: '#ddd',
    borderTopWidth: 1,
    borderBottomWidth:1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dotted:{
    height:10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  dcontainer:{
    flexDirection: 'row',
    alignItems: 'center', // 수직 정렬
    justifyContent: 'space-between', // 수평 간격 조절
    paddingHorizontal: 10, // 양옆에 여백 추가
    paddingVertical: 5,
  },
  date: {
    marginTop: 5,
    left:70,
    backgroundColor:'red',
    borderRadius:10,
    width:60,
    height:20,
  },
  datetext:{
    textAlign: 'center',
    color:'white',
    lineHeight:20,
    fontSize:12,
  },
  dateLightGreen: {
    backgroundColor: '#9DC284',
    
  },
  dateGreen: {
    backgroundColor: '#0E664F',
    
  },
  dateRed: {
    backgroundColor: '#C28484',
    
  },
  dateBlack: {
    backgroundColor: 'black',
    
  },
  details: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
    borderWidth:1,
    borderRadius:10,
    width: 90,
    right: 10,
    textAlign:'center',
    height:20,
    lineHeight:15,
  },
  nextbutton:{
    width: 25,
    height: 25,
    marginTop: 5,
    left:20,
  },
});

export default MainPage;

import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';

const { width } = Dimensions.get('window');

const Header = ({ onMenuPress }) => {
  const { darkMode } = useContext(GlobalContext);
  const navigation = useNavigation();
  const { user } = useContext(GlobalContext);
  
  const dynamicStyles = {
    header: {
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      padding: 20,
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
      color:darkMode?'#ffffff':'#000000',
    },
  };

  const search = darkMode 
    ? require('../assets/image/dark/search.png')
    : require('../assets/image/light/search.png');

  const alert = darkMode 
    ? require('../assets/image/dark/alert.png')
    : require('../assets/image/light/alert.png');

  const menu = darkMode 
    ? require('../assets/image/dark/menu.png')
    : require('../assets/image/light/menu.png');

  return (
    <View style={[styles.header, dynamicStyles.header]}>
      <View>  
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>공지사항</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => {navigation.navigate('Search');}}>
          <Image source={search} style={styles.icon} />  
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Alert');}}>
          <Image source={alert} style={styles.icon} />  
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress}>
          <Image source={menu} style={styles.icon} />  
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RecentNotices = () => {
  const category = '학사공지';
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  
  const dynamicStyles = {
    Container1: {
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      width:"100%",
      height: 350,
    },
    sectionContainer1: {
      margin: 10,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      padding: 10,
      borderRadius: 10,
    },
    sectionTitleWrapper: {
      shadowColor: darkMode? '#000000':'#CACACA',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 5,
      borderRadius: 20, 
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
      width: 100,
      height: 35,
      textAlign: 'center',
      lineHeight: 35,  // 텍스트가 가운데 오도록 조정
      backgroundColor: darkMode ? '#505050' : '#dddddd',
      color:darkMode?'#ffffff':'#000000',
      borderRadius: 20,
      overflow: 'hidden',
    },
    notice: {
      backgroundColor: darkMode ? '#597248':'#9DC284',
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
  };
  
  return (
    <View style={[styles.Container1, dynamicStyles.Container1]}>
      <View style={[styles.sectionContainer1, dynamicStyles.sectionContainer1]}>
        <View style={[styles.sectionTitleWrapper, dynamicStyles.sectionTitleWrapper]}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>최근 공지</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.noticeContainer}>
            <View style={styles.noticeWrapper}>
              <TouchableOpacity style={[styles.notice, dynamicStyles.notice]}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noticeWrapper}>
            <TouchableOpacity style={[styles.notice, dynamicStyles.notice]}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noticeWrapper}>
            <TouchableOpacity style={[styles.notice, dynamicStyles.notice]}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noticeWrapper}>
            <TouchableOpacity style={[styles.notice, dynamicStyles.notice]}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noticeWrapper}>
            <TouchableOpacity style={[styles.notice, dynamicStyles.notice]}>
                <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
                <Text style={styles.noticeText}>더보기</Text>
                <Text style={styles.category}>{category}</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
    </View>
  );
};



const PopularNotices = () => {
  const daysLeft = 1; // 디데이까지 남은 일수 (예시로 10일 설정)
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);
  const [viewCounts, setViewCounts] = useState([0,0,0,0,0,0,0,0]);

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

  const handlePress = (index) => {
    const newViewCounts = [...viewCounts];
    newViewCounts[index] += 1;
    setViewCounts(newViewCounts);
  };
  
  const dynamicStyles = {
    sectionContainer2: {
      margin: 10,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      padding: 10,
      borderRadius: 10,
    },
    sectionTitleWrapper: {
      shadowColor: darkMode? '#000000':'#CACACA',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 5,
      borderRadius: 20, 
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
      width: 100,
      height: 35,
      textAlign: 'center',
      lineHeight: 35,  // 텍스트가 가운데 오도록 조정
      backgroundColor: darkMode ? '#505050' : '#dddddd',
      color:darkMode?'#ffffff':'#000000',
      borderRadius: 20,
      overflow: 'hidden',
    },
    announcement: {
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      padding: 15,
      borderColor: '#ddd',
      borderTopWidth: 1,
      borderBottomWidth:1,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color:darkMode?'#ffffff':'#000000',
    },
    details: {
      fontSize: 12,
      color:darkMode?'#ffffff':'#777',
      marginTop: 5,
      borderWidth:1,
      borderRadius:10,
      width: 90,
      right: 10,
      textAlign:'center',
      height:20,
      lineHeight:17,
      borderColor:'#777',
    },
  };

  return (
    <View style={styles.Container2}>
      <View style={[styles.sectionContainer2, dynamicStyles.sectionContainer2]}>
        <View style={[styles.sectionTitleWrapper, dynamicStyles.sectionTitleWrapper]}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>인기 공지</Text>
        </View>
        <View style={styles.popularNotices}>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            {viewCounts.map((count, index) => (
              <View key={index} style={[styles.announcement,dynamicStyles.announcement]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                  <Text style={[styles.title,dynamicStyles.title]}>[장학 공지] 장학금 수혜/수혜증명서 발급 안내</Text>
                </TouchableOpacity>
                <View style={styles.dotted}></View>
                <View style={styles.dcontainer}>
                  <Text style={[styles.details,dynamicStyles.details]}>조회수: {count}</Text>
                  <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const MenuBar = ({ onClose, navigation }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: width * 1 / 4,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleHomePress = () => {
    navigation.navigate('Mypage');
  };

  const handleBackPress = () => {
    
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  const handleMenuItemPress = (tabIndex) => {
    navigation.navigate('Noticelist', { activeTab: tabIndex });
    if (onClose) onClose(); // 메뉴가 닫히면서 이동
  };

  const dynamicStyles = {
    menuheader: {
      height: 100, // 상단 여유 공간 줄이기
      backgroundColor: darkMode ? '#597248':'#9DC284',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    menu: {
      paddingHorizontal: 16,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
    },
    menuItem: {
      backgroundColor: darkMode?'#505050':'#FFFFFF',
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
      color:darkMode?'#ffffff':'#000000',
    },
  };

  return (
    <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
      <View style={[styles.menuheader,dynamicStyles.menuheader]}>
        <Text style={styles.headerText}>Menu</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleHomePress}>
            <Image source={require('../assets/image/light/mypage.png')} style={styles.iconButton1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={require('../assets/image/light/back2.png')} style={styles.iconButton2} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={[styles.menu,dynamicStyles.menu]}>
        {['학과 공지', '학사 공지', '장학 공지', '일반 공지', '취업 / 창업', '공모전', '국제 교류'].map((text, index) => (
          <TouchableOpacity
            key={text}
            style={[styles.menuItem,dynamicStyles.menuItem]}
            onPress={() => handleMenuItemPress(index)}
          >
            <Text style={[styles.menuItemText,dynamicStyles.menuItemText]}>{text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );
};


const Main = ({ route }) => {
  const navigation = useNavigation(); // 네비게이션 훅 호출
  const [isMenuVisible, setIsMenuVisible] = useState(route.params?.isMenuVisible || false);
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);

  const dynamicStyles = {
    container: {
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
    },
  };

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <ScrollView style={styles.content}>
        <Header onMenuPress={handleMenuPress} />
        <RecentNotices />
        <PopularNotices />
      </ScrollView>
      {isMenuVisible && (
        <View style={styles.menuOverlay}>
          <MenuBar onClose={handleCloseMenu} navigation={navigation} />
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
    backgroundColor: '#9BC178',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 30, // 상단 여유 공간 줄이기
    fontWeight:'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5, // 아이콘 상단 여유 공간 추가
  },
  iconButton1: {
    right:120,
    marginTop: 30,
    width: 25,
    height: 25,
  },
  iconButton2: {
    right:100,
    marginTop: 30,
    width: 20,
    height: 20,
  },
  iconText: {
    fontSize: 24,
    color: '#FFFFFF',
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
    lineHeight:17,
    borderColor:'#777',
  },
  nextbutton:{
    width: 25,
    height: 25,
    marginTop: 5,
    left:20,
  },
});

export default Main;
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
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

const Announcement = ({ title, date, details }) => {
  return (
    <View style={styles.announcement}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
};

const RecentNotices = () => {
  return (
    <View style={styles.Container1}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>최근 공지</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.noticeContainer}>
          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
          </View>
          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
          </View>
          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const PopularNotices = () => {
  return (
    <View style={styles.Container2}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>인기 공지</Text>
        <View>
          <Announcement title="[장학 공지] 장학금 수혜/수혜증명서 발급 안내" date="D-12" details="조회수: 125" />
          <Announcement title="[학사공지] 금융감독원 총체제의 대학생 금융교육 봉사단 추가 모집 안내" date="D-5" details="조회수: 125" />
          <Announcement title="[학사공지] 금융감독원 총체제의 대학생 금융교육 봉사단 추가 모집 안내" date="D-3" details="조회수: 125" />
          <Announcement title="[장학 공지] 장학금 수혜/수혜증명서 발급 안내" date="마감" details="조회수: 125" />
          <Announcement title="[장학 공지] 장학금 수혜/수혜증명서 발급 안내" date="마감" details="조회수: 125" />
          <Announcement title="[장학 공지] 장학금 수혜/수혜증명서 발급 안내" date="마감" details="조회수: 125" />
          <Announcement title="[장학 공지] 장학금 수혜/수혜증명서 발급 안내" date="마감" details="조회수: 125" />
        </View>
      </View>
    </View>
  );
};

const MenuBar = ({ onClose }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: width * 1/60,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onClose}>
            <View style={styles.homeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>학과 공지</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>학사 공지</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>장학 공지</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>일반 공지</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>취업 / 창업</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>공모전</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>국제 교류</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },

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
    width: width * 2 / 3,
    height: '100%',
    backgroundColor: '#fff', // 반투명 백그라운드
    flex: 1,
    position: 'absolute',
    right: 0,
  },
  header: {
    height: 80,
    backgroundColor: '#6AA84F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#000',
    borderRadius: 12,
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
  },
  menuItemText: {
    fontSize: 18,
    color: '#000000',
  },
  plusButton: {
    backgroundColor: '#38761D',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
  },

  //main
  Container1:{
    width:"100%",
    height: 300,
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
    borderBottomColor: '#ddd',
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
  sectionContainer: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    width: 100,
    height: 30,
    textAlign: 'center',
    backgroundColor: '#ddd',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noticeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  notice: {
    backgroundColor: '#9DC284',
    padding: 20,
    borderRadius: 20,
    width: 300,
    marginRight: 10,
    height: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  noticeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noticeText: {
    fontSize: 16,
    marginTop: 5,
  },
  popularNotices: {
    marginTop: 10,
  },
  announcement: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  details: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});

export default MainPage;

import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>공지사항</Text>
        <Text style={styles.headerSubtitle}>최근 공지사항</Text>
      </View>
      <View style={styles.headerIcons}>
        <Image source={require('C:/Users/sage6/nanolab/nanolab/front/nanolab/assets/search.png')} style={styles.icon} />
        <Image source={require('C:/Users/sage6/nanolab/nanolab/front/nanolab/assets/alert.png')} style={styles.icon} />
        <Image source={require('C:/Users/sage6/nanolab/nanolab/front/nanolab/assets/menu.png')} style={styles.icon} />
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
  );
};

const PopularNotices = () => {
  return (
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
  );
};

const MainPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <RecentNotices />
      <PopularNotices />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    width:100,
    height:30,
    textAlign:'center',
    backgroundColor:'#ddd',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noticeContainer: {
    flexDirection: 'row',
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

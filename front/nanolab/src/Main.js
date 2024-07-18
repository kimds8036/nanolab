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
      <ScrollView horizontal={true} style={styles.noticeContainer}>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
          <Text style={styles.noticeText}>2024년도 8월 졸업예정자 대상 졸업유예 신청기간을 안내하오니 해당 학생들은 기한 내에 신청하시기 바랍니다.</Text>
          <Text style={styles.noticeText}>1. 신청기간: 2024. 7. 22.(월) 9:00 - 7. 24.(수) 17:00</Text>
          <Text style={styles.noticeText}>2. 신청방법: 학사행정시스템 내 온라인 신청</Text>
          <Text style={styles.noticeText}>더보기...</Text>
        </View>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
          <Text style={styles.noticeText}>2024년도 8월 졸업예정자 대상 졸업유예 신청기간을 안내하오니 해당 학생들은 기한 내에 신청하시기 바랍니다.</Text>
          <Text style={styles.noticeText}>1. 신청기간: 2024. 7. 22.(월) 9:00 - 7. 24.(수) 17:00</Text>
          <Text style={styles.noticeText}>2. 신청방법: 학사행정시스템 내 온라인 신청</Text>
          <Text style={styles.noticeText}>더보기...</Text>
        </View>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>졸업유예 신청 안내</Text>
          <Text style={styles.noticeText}>2024년도 8월 졸업예정자 대상 졸업유예 신청기간을 안내하오니 해당 학생들은 기한 내에 신청하시기 바랍니다.</Text>
          <Text style={styles.noticeText}>1. 신청기간: 2024. 7. 22.(월) 9:00 - 7. 24.(수) 17:00</Text>
          <Text style={styles.noticeText}>2. 신청방법: 학사행정시스템 내 온라인 신청</Text>
          <Text style={styles.noticeText}>더보기...</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const PopularNotices = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>인기 공지</Text>
      <View style={styles.popularNotices}>
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

const HomeScreen = () => {
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
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
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  sectionContainer: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noticeContainer: {
    flexDirection: 'row',
  },
  notice: {
    backgroundColor: '#d9ead3',
    padding: 20,
    borderRadius: 10,
    width: 300,
    marginRight: 10,
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

export default HomeScreen;

  
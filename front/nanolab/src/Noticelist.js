import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';

const Noticelist = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const tabs = ['학과 공지', '학사 공지', '장학 공지', '취업/창업', '공모전', '국제 교류'];

  const noticesData = [
    [
      { title: '[전시] 미디어콘텐츠학과 10주년 기념 국제교류전 \n〈The Curiosity Screen〉 성료', date: 'D-12' },
      { title: '[학과] 2023학년도 2학기 종강총회 안내\n', date: 'D-7' },
      { title: '[학과] 졸업작품 발표회 참가 신청 안내', date: 'D-30' },
      { title: '[학과] 겨울방학 특강 프로그램 신청 안내', date: '2023.11.20' },
      { title: '[학과] 학과 MT 참가 신청 안내', date: '2023.12.05' },
      { title: '[학과] 2024학년도 1학기 시간표 안내', date: '2023.12.15' },
      { title: '[학과] 학과 홈페이지 개편 안내', date: '2023.12.20' },
      { title: '[학과] 캡스톤 디자인 경진대회 참가 안내', date: '2024.01.10' },
      { title: '[학과] 2024년 봄 학위수여식 안내', date: '2024.02.20' },
      { title: '[학과] 2024년 하반기 ICT학점연계 프로젝트 인턴십 안내', date: 'D-12' },
      { title: '[학과] 2024-1 졸업작품(논문) 심사 결과', date: 'D-7' },
      { title: '[학과] 2024년도 2학기 현장실습학기제 시행 안내', date: 'D-30' },
      { title: '[학과] 일반대학원 석사예약입학 예비선발자 신청 안내(2025. 1학기 대학원 입학)', date: '2023.11.20' },
      { title: '[학과] 2024-1 건국사랑 장학 신청 안내', date: '2023.12.05' },
      { title: '[학과] 2024학년도 1학기 복지장학생 신청 안내', date: '2023.12.15' },
      { title: '[학과] 학과 홈페이지 개편 안내', date: '2023.12.20' },
      { title: '[학과] 캡스톤 디자인 경진대회 참가 안내', date: '2024.01.10' },
      { title: '[학과] 2024년 봄 학위수여식 안내', date: '2024.02.20' },
    ],
    [
      { title: '[학사] 2024학년도 1학기 수강신청 안내', date: '2023.12.01' },
      { title: '[학사] 학사제도 개편 관련 설명회 개최', date: '2023.11.25' },
      { title: '[학사] 기말고사 기간 및 유의사항 안내', date: '2023.12.10' },
    ],
    [
      { title: '[장학] 2023학년도 2학기 성적우수 장학생 선발 안내', date: '2023.11.15' },
      { title: '[장학] 국가장학금 신청 기간 연장 안내', date: '2023.11.30' },
      { title: '[장학] 외부 장학금 신청 안내 (OO재단)', date: '2023.12.05' },
    ],
    [
      { title: '[취업] 2023 하반기 채용박람회 참가 안내', date: '2023.11.20' },
      { title: '[취업] OO기업 채용설명회 개최', date: '2023.12.03' },
      { title: '[창업] 창업 아이디어 경진대회 참가자 모집', date: '2023.12.15' },
    ],
    [
      { title: '[국제교류] 2024학년도 1학기 교환학생 프로그램 안내', date: '2023.11.05' },
      { title: '[국제교류] 해외 인턴십 프로그램 참가자 모집', date: '2023.12.08' },
      { title: '[국제교류] 해외 대학 방문단 초청 특강', date: '2023.12.18' },
    ],
    [
      { title: '[일반] 도서관 이용 시간 변경 안내', date: '2023.12.01' },
      { title: '[일반] 학생회관 시설 개선 공사 안내', date: '2023.11.28' },
      { title: '[일반] 겨울방학 특별 프로그램 안내', date: '2023.12.12' },
    ],
  ];

  const [fontsloaded] = useFonts({
    NanumGothic: require('../assets/font/NanumGothic.ttf'),
  });

  if (!fontsloaded) {
    return null;
  }

  const itemsPerPage = 15;
  const totalPages = Math.ceil(noticesData[activeTab].length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const activeNotices = noticesData[activeTab].slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const TabItem = ({ tab, active, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.tab, active && styles.activeTab]}>
        <Text>{tab}</Text>
      </TouchableOpacity>
    );
  };

  const NoticeItem = ({ notice }) => {
    const [starFilled, setStarFilled] = useState(false);

    const handleStarPress = () => {
      setStarFilled(!starFilled);
    };

    const starImageSource = starFilled
      ? require('../assets/image/filled_star.png')
      : require('../assets/image/free-icon-star-shaped-16078.png');

    return (
      <View style={styles.noticeItem}>
        <View style={styles.noticeHeader}>
          <Text style={styles.noticeTitle}>{notice.title}</Text>
        </View>
        <View style={styles.divider} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.noticeDate}>{notice.date}</Text>
          <TouchableOpacity onPress={handleStarPress} style={styles.starContainer}>
            <Image source={starImageSource} style={styles.starIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Tabs */}
      <View style={[styles.header, { flexDirection: 'column' }]}>
        <View style={styles.headerContent}>
          {/* 헤더 내용 추가 (타이틀, 버튼 등) */}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.tabsContainer, { justifyContent: 'flex-end' }]}
          style={{ height: 40, zIndex: 1 }}
        >
          {tabs.map((tab, index) => (
            <TabItem key={index} tab={tab} active={index === activeTab} onPress={() => setActiveTab(index)} />
          ))}
        </ScrollView>
      </View>

      {/* Notices (스크롤 가능) */}
      <ScrollView contentContainerStyle={styles.noticesContentContainer} showsVerticalScrollIndicator={false}>
        {activeNotices.map((notice, index) => (
          <View key={index}>
            <NoticeItem notice={notice} />
          </View>
        ))}
        {/* Pagination (공지사항 아래에 배치) */}
        {totalPages > 1 && (
          <View style={styles.paginationContainer}>
            {[...Array(totalPages)].map((_, page) => (
              <TouchableOpacity
                key={page}
                onPress={() => handlePageChange(page)}
                style={[styles.pageButton, page === currentPage && styles.activePageButton]}
              >
                <Text style={styles.pageButtonText}>{page + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#A6C18B',
    height: 100,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A6C18B',
  },
  tab: {
    fontFamily: 'NanumGothic',
    fontWeight: '800',
    fontSize: 13,
    color: '#9DC284',
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0E664F',
  },
  noticesContainer: {
    flex: 1,
  },
  noticesContentContainer: {
    padding: 6,
    marginTop: 10,
  },
  noticeItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    padding: 15,
    marginBottom: 5,
    height: 90,
    position: 'relative',
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noticeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticeTitle: {
    fontFamily: 'NanumGothic',
    fontWeight: 'bold', // 볼드체로 변경
    fontSize: 12,
    color: '#000000', // 검은색으로 변경
    marginBottom: 3,
  },
  noticeDate: {
    fontFamily: 'NanumGothic',
    fontWeight: 'bold', // 볼드체로 변경
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.8)', // 검은색에 가까운 색으로 변경
    marginRight: 0,
  },
  noticeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 아이콘들을 왼쪽으로 정렬
    marginTop: 10, // 제목과 아이콘 사이 간격
  },
  viewMore: {
    // viewMore 텍스트 스타일은 제거 (이미지로 대체)
  },
  viewMoreIcon: {
    // View More 아이콘 스타일 추가
    width: 17,
    height: 15,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5, // 아이콘 간격 조절
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    
    borderColor: '#E0E0E0',
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF', // 테두리 색상을 배경색과 동일하게 변경
    borderRadius: 5,
    
  },
  activePageButton: {
    backgroundColor: '#9DC284',
    borderColor: '#9DC284',
  },
  pageButtonText: {
    fontFamily: 'NanumGothic',
    fontSize: 12,
  },
  divider: {
    width: '108.5%', // 부모 컨테이너(noticeItem) 너비 기준으로 설정
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: -15, // noticeItem의 padding 값만큼 음수 margin 설정
    marginVertical: 10,
  },
  starContainer: {
    // 별 이미지 컨테이너 스타일 추가
    position: 'absolute',
    bottom: 0.1, // divider 아래쪽 여백 조절
    right: 15, // 오른쪽 여백 조절
  },
  starIcon: {
    width: 15,
    height: 15,
    backgroundColor: 'white',
  },
  starFilled: {
    backgroundColor: 'yellow',
  },
});

export default Noticelist;

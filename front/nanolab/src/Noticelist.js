import React, { useState,useEffect,useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext'; // GlobalContext 불러오기


const Noticelist = ({ route }) => {
  const { isDepartmentRegistered } = useContext(GlobalContext); 
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || 0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();
  const { darkMode } = useContext(GlobalContext);

  useEffect(() => {
    console.log('isDepartmentRegistered:', isDepartmentRegistered);
  }, [isDepartmentRegistered]);

  const tabs = ['학과 공지', '학사 공지', '장학 공지', '일반 공지', '취업/창업', '공모전', '국제 교류', '모시래 식단', '해오름 식단'];

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
    [
      { title: '[일반] 도서관 이용 시간 변경 안내', date: '2023.12.01' },
      { title: '[일반] 학생회관 시설 개선 공사 안내', date: '2023.11.28' },
    ],
    [
      { title: '[일반] 도서관 이용 시간 변경 안내', date: '2023.12.01' },
    ],
  ];

  const [fontsLoaded] = useFonts({
    NanumGothic: require('../assets/font/NanumGothic.ttf'),
  });

  if (!fontsLoaded) {
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

  return (
    <View style={styles.container}>
      <View style={styles.bar}></View>
      <View style={[styles.header, { flexDirection: 'column' }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.tabsContainer, { justifyContent: 'flex-end' }]}
          style={{ height: 40, zIndex: 1 }}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(index)}
              style={[styles.tab, index === activeTab && styles.activeTab]}
            >
              <Text style={[styles.tabText, index === activeTab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.noticesContentContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && !isDepartmentRegistered ? (
          <View style={styles.noticeContainer}>
            <Image source={require('../assets/image/light/enroll.png')} style={styles.enroll} />
            <Text style={styles.noticeMessage}>학과를 등록해 주세요.</Text>
            <TouchableOpacity style={styles.enrollbutton} onPress={() => { navigation.navigate('Department')}}>
              <Text style={styles.enrolltext}>등록하러 가기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          activeNotices.map((notice, index) => (
            <View key={index} style={styles.noticeItem}>
              <Text style={styles.noticeTitle}>{notice.title}</Text>
              <Text style={styles.noticeDate}>{notice.date}</Text>
            </View>
          ))
        )}

        {totalPages > 1 && isDepartmentRegistered && (
          <View style={styles.paginationContainer}>
            {[...Array(totalPages)].map((_, page) => (
              <TouchableOpacity
                key={page}
                onPress={() => handlePageChange(page)}
                style={[styles.pageButton, page === currentPage && styles.activePageButton]}>
                <Text style={[styles.pageButtonText, page === currentPage && styles.activePageButtonText]}>
                  {page + 1}
                </Text>
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
  bar:{
    backgroundColor:'#9DC284',
    width:'100%',
    height:50,
  },
  header: {
    paddingHorizontal: 10,
    height:50,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5,
  },
  tab: {
    marginRight: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText:{
    color:'#9DC284',
    fontWeight: 'bold',
    fontSize: 15,
  },
  activeTab: {
    borderBottomColor: '#0E664F',
  },
  activeTabText:{
    color:'#0E664F',
  },
  noticeContainer:{
    padding: 6,
    marginTop: 10,
  },
  enroll:{
    alignSelf:'center',
    marginTop:50,
    width:200,
    height:200,
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
  noticeTitle: {
    fontFamily: 'NanumGothic',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000000',
    marginBottom: 3,
  },
  noticeDate: {
    fontFamily: 'NanumGothic',
    fontWeight: 'bold',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.8)',
    marginRight: 0,
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
    borderColor: '#FFFFFF',
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
  noticeMessage: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'bold',
    color:'#0E664F',
    marginBottom:20,
  },
  enrollbutton:{
    backgroundColor:'#6D9E4C',
    width:'60%',
    height:40,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  enrolltext:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:16,
  },
});


export default Noticelist;

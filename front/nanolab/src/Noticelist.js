import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { GlobalContext } from './GlobalContext'; // GlobalContext 불러오기

const Noticelist = ({ route }) => {
  const { isDepartmentRegistered, darkMode, user, views, setViews } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || 0);
  const [currentPage, setCurrentPage] = useState(0);
  const [noticesData, setNoticesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const daysLeft = 1;
  
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

  const tabs = [
    '학과공지',
    '학사공지',
    '장학공지',
    '일반공지',
    '취업/창업',
    '채용공지',
    '외부행사/공모전',
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const tabName = tabs[activeTab];
        const encodedTabName = encodeURIComponent(tabName);
        const url = `https://nanolab-production-6aa7.up.railway.app/api/notices_${encodedTabName}`;
        console.log('Request URL:', url);
        const response = await axios.get(url);
        console.log('Fetched notices:', response.data);

        const noticesWithViews = response.data.map(notice => ({
          ...notice,
          views: views[notice._id] || 0, // 전역 상태에서 조회수 가져오기, 없으면 0으로 초기화
        }));

        setNoticesData(noticesWithViews); // 서버 응답 데이터를 설정
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [activeTab, views]);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(noticesData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const activeNotices = noticesData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNoticePress = (title, id) => {
    const category = tabs[activeTab];
    console.log('Navigating to NoticeContent with category:', category, 'and title:', title);

    // 조회수 증가
    setViews(prevViews => ({
      ...prevViews,
      [id]: (prevViews[id] || 0) + 1,
    }));

    navigation.navigate('NoticeContent', { category, title });
  };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
    },
    tabText: {
      color: darkMode ? '#597248' : '#9DC284',
      fontWeight: 'bold',
      fontSize: 15,
    },
    activeTabText: {
      color: darkMode ? '#1B4102' : '#0E664F',
    },
  };

  const enroll = darkMode
    ? require('../assets/image/dark/enroll.png')
    : require('../assets/image/light/enroll.png');
  
  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={darkMode ? '#9DC284' : '#0E664F'} />
      </View>
    );
  }

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.bar}></View>
      <View style={[styles.header, { flexDirection: 'row' }]}>
        <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
            <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
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
              <Text style={[styles.tabText, index === activeTab ? styles.activeTabText : null]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.noticesContentContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && !isDepartmentRegistered ? (
          <View style={styles.noticeContainer}>
            <Image source={enroll} style={styles.enroll} />
            <Text style={styles.noticeMessage}>학과를 등록해 주세요.</Text>
            <TouchableOpacity style={styles.enrollbutton} onPress={() => { navigation.navigate('Department'); }}>
              <Text style={styles.enrolltext}>등록하러 가기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          activeNotices.map((notice) => (
            <TouchableOpacity
              key={notice._id}
              onPress={() => handleNoticePress(notice.title, notice._id)}
              style={styles.noticeItem}
            >
              <Text style={styles.noticeTitle}>{notice.title}</Text>
              <Text style={styles.noticeDate}>{notice.date}</Text>
              <View style={styles.detailsContainer}>
                <Text style={[styles.details, dynamicStyles.details]}>조회수: {notice.views}</Text>
                <View style={[styles.date, getDateStyle()]}>
                    <Text style={styles.datetext}>{getDateText()}</Text>
                  </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        {totalPages > 1 && isDepartmentRegistered && (
          <View style={styles.paginationContainer}>
            {[...Array(totalPages)].map((_, page) => (
              <TouchableOpacity
                key={page}
                onPress={() => handlePageChange(page)}
                style={[styles.pageButton, page === currentPage && styles.activePageButton]}
              >
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
  },
  bar: {
    backgroundColor: '#9DC284',
    width: '100%',
    height: 50,
  },
  header: {
    paddingHorizontal: 10,
    height: 50,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginTop:7,
    marginRight:5,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  tab: {
    marginRight: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: '#9DC284',
    fontWeight: 'bold',
    fontSize: 15,
  },
  activeTab: {
    borderBottomColor: '#0E664F',
  },
  activeTabText: {
    color: '#0E664F',
  },
  noticeContainer: {
    padding: 6,
    marginTop: 10,
  },
  enroll: {
    alignSelf: 'center',
    marginTop: 50,
    width: 200,
    height: 200,
  },
  noticesContentContainer: {
    padding: 6,
  },
  noticeItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    padding: 15,
    marginBottom: 5,
    height: 90,
    position: 'relative',
  },
  noticeTitle: {
    fontFamily: 'NanumGothic',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 3,
  },
  noticeDate: {
    fontFamily: 'NanumGothic',
    fontSize: 12,
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
    fontWeight: 'bold',
    color: '#0E664F',
    marginBottom: 20,
  },
  enrollbutton: {
    backgroundColor: '#6D9E4C',
    width: '60%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  enrolltext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    marginTop: 5,
    backgroundColor:'red',
    borderRadius:10,
    width:60,
    height:20,
    alignSelf:'flex-end',
  },
  datetext:{
    textAlign: 'center',
    color:'white',
    lineHeight:20,
    fontSize:12,
  },
  detailsContainer:{
    flexDirection:"row",
    justifyContent:'space-between',
  },
  details:{
    fontFamily: 'NanumGothic',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.8)',
    marginRight: 0,
    marginTop:3,
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
});

export default Noticelist;

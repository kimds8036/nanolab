import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { GlobalContext } from './GlobalContext'; // GlobalContext 불러오기
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import

const Noticelist = ({ route }) => {
  const { isDepartmentRegistered, darkMode, selectedDepartment } = useContext(GlobalContext); // department 대신 selectedDepartment 사용
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || 0);
  const [currentPage, setCurrentPage] = useState(0);
  const [noticesData, setNoticesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteNotices, setFavoriteNotices] = useState([]);
  const navigation = useNavigation();

  const tabs = [
    '학과공지',
    '학사공지',
    '장학공지',
    '일반공지',
    '취업/창업공지',
    '외부행사/공모전',
    '국제/교류공지',
    '채용공지',

    
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        let url;
        const tabName = tabs[activeTab];

        if (tabName === '학과공지' && isDepartmentRegistered && selectedDepartment) {
          // 학과 공지 탭이 선택되었고, 학과가 등록된 경우
          console.log('Selected Department:', selectedDepartment); // 학과명 로그 출력
          const encodedDepartment = encodeURIComponent(selectedDepartment);
          url = `http://118.91.15.85:5000/api/notices_${encodedDepartment}`; // 학과에 맞는 공지사항을 가져옴
        } else {
          // 다른 탭의 경우 기존 방식대로
          const encodedTabName = encodeURIComponent(tabName);
          url = `http://118.91.15.85:5000/api/notices_${encodedTabName}`;
        }

        console.log('Request URL:', url);
        const response = await axios.get(url);
        console.log('Fetched notices:', response.data);

        setNoticesData(response.data); // 서버 응답 데이터를 설정

        // 저장된 즐겨찾기 공지 로드
        const storedFavorites = await AsyncStorage.getItem('savedNotices');
        setFavoriteNotices(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [activeTab, isDepartmentRegistered, selectedDepartment]);

  const itemsPerPage = 15;
  const totalPages = Math.ceil(noticesData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const activeNotices = noticesData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNoticePress = (title) => {
    const category = tabs[activeTab]; // 탭에서 선택된 카테고리를 기반으로 category 설정
    console.log('Navigating to NoticeDetail with category:', category, 'and title:', title);
    navigation.navigate('NoticeDetail', { category, title }); // category와 title 전달
  };

  const handleStarPress = async (notice) => {
    try {
      let storedNotices = await AsyncStorage.getItem('savedNotices');
      storedNotices = storedNotices ? JSON.parse(storedNotices) : [];
  
      const isAlreadySaved = storedNotices.some((n) => n._id === notice._id);
  
      if (isAlreadySaved) {
        // 이미 저장된 공지인 경우, 삭제
        const updatedNotices = storedNotices.filter((n) => n._id !== notice._id);
        setFavoriteNotices(updatedNotices);
        await AsyncStorage.setItem('savedNotices', JSON.stringify(updatedNotices));
        Alert.alert('공지사항이 보관함에서 삭제되었습니다.');
      } else {
        // 저장되지 않은 경우, category 정보를 포함하여 추가
        const noticeToSave = { ...notice, category: tabs[activeTab] }; // category 추가
        storedNotices.push(noticeToSave);
        setFavoriteNotices(storedNotices);
        await AsyncStorage.setItem('savedNotices', JSON.stringify(storedNotices));
        Alert.alert('공지사항이 보관함에 저장되었습니다.');
      }
    } catch (error) {
      console.error('Error saving notice:', error);
      Alert.alert('공지사항 저장에 실패했습니다.');
    }
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
              <Text style={[styles.tabText, dynamicStyles.tabText, index === activeTab && styles.activeTabText, dynamicStyles.activeTabText]}>
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
            <View key={notice._id} style={styles.noticeItem}>
              <TouchableOpacity onPress={() => handleNoticePress(notice.title)} style={{ flex: 1 }}>
                <Text style={styles.noticeTitle}>{notice.title}</Text>
                <Text style={styles.noticeDate}>{notice.date}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleStarPress(notice)} style={styles.starButton}>
                <Image
                  source={
                    favoriteNotices.some((n) => n._id === notice._id)
                      ? require('../assets/image/light/filled-star.png') // 속이 노란 별 이미지
                      : require('../assets/image/light/empty-star.png') // 속이 빈 별 이미지
                  }
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            </View>
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
    flexDirection: 'row',
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
  starButton: {
    position: 'absolute',
    right: 15,
    bottom: 10, // 하단에 배치
    padding: 5,
  },
  starIcon: {
    width: 20, // 별 크기 줄임
    height: 20, // 별 크기 줄임
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
});

export default Noticelist;

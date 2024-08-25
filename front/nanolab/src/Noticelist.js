import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { GlobalContext } from './GlobalContext'; // GlobalContext 불러오기

const Noticelist = ({ route }) => {
  const { isDepartmentRegistered, darkMode, user } = useContext(GlobalContext); 
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || 0);
  const [currentPage, setCurrentPage] = useState(0);
  const [noticesData, setNoticesData] = useState([]);
  const [fontsLoaded] = useFonts({
    NanumGothic: require('../assets/font/NanumGothic.ttf'),
  });

  const navigation = useNavigation();

  useEffect(() => {
    console.log('isDepartmentRegistered:', isDepartmentRegistered);
    fetchNotices();
  }, [activeTab]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('https://nanolab-production-6aa7.up.railway.app/api/notices'); // API 엔드포인트를 여기에 넣으세요
      console.log('서버 응답 데이터:', response.data);
      setNoticesData(response.data);
    } catch (error) {
      console.error('데이터를 가져오는데 실패했습니다:', error);
    }
  };

  const itemsPerPage = 15;
  const totalPages = Math.ceil(noticesData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const activeNotices = noticesData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  if (!fontsLoaded) {
    return null;
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
          {['학과 공지', '학사 공지', '장학 공지', '일반 공지', '취업/창업', '공모전', '국제 교류', '모시래 식단', '해오름 식단'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveTab(index)}
              style={[styles.tab, index === activeTab && styles.activeTab]}
            >
              <Text style={[styles.tabText, dynamicStyles.tabText, index === activeTab && styles.activeTabText, dynamicStyles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.noticesContentContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && !isDepartmentRegistered ? (
          <View style={styles.noticeContainer}>
            <Image source={enroll} style={styles.enroll} />
            <Text style={styles.noticeMessage}>학과를 등록해 주세요.</Text>
            <TouchableOpacity style={styles.enrollbutton} onPress={() => navigation.navigate('Department')}>
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

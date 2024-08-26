import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // useNavigation import
import { GlobalContext } from './GlobalContext';

const Save = () => {
  const [savedNotices, setSavedNotices] = useState([]);
  const navigation = useNavigation(); // 네비게이션 객체 생성
const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);


  useEffect(() => {
    const loadSavedNotices = async () => {
      try {
        const storedNotices = await AsyncStorage.getItem('savedNotices');
        if (storedNotices) {
          setSavedNotices(JSON.parse(storedNotices));
        }
      } catch (error) {
        console.error('Error loading saved notices:', error);
      }
    };

    loadSavedNotices();
  }, []);

  const handleRemoveNotice = async (noticeId) => {
    try {
      const updatedNotices = savedNotices.filter((notice) => notice._id !== noticeId);
      setSavedNotices(updatedNotices);
      await AsyncStorage.setItem('savedNotices', JSON.stringify(updatedNotices));
      Alert.alert('공지사항이 보관함에서 삭제되었습니다.');
    } catch (error) {
      console.error('Error removing notice:', error);
      Alert.alert('공지사항 삭제에 실패했습니다.');
    }
  };

  const handleNoticePress = (notice) => {
    if (notice.category && notice.title) {
      navigation.navigate('NoticeDetail', {
        category: notice.category,
        title: notice.title,
      });
    } else {
      Alert.alert('잘못된 데이터', '해당 공지사항의 정보가 불완전하여 상세 내용을 불러올 수 없습니다.');
    }
  };

const dynamicStyles ={
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
    },
    bar: {
      backgroundColor: darkMode ? '#597248':'#9DC284',
      width: '100%',
      height: 50,
      position: 'absolute',
      top: 0,
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color:darkMode?'#ffffff':'#000000',
    },
  };

  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');

  

  return (
<SafeAreaView style={[styles.container,dynamicStyles.container]}>
        <View style={[styles.bar,dynamicStyles.bar]}></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('Mypage'); }}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={[styles.title,dynamicStyles.title]}>보관함</Text>
          </View>
        </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {savedNotices.length === 0 ? (
          <Text style={styles.emptyText}>보관된 공지사항이 없습니다.</Text>
        ) : (
          savedNotices.map((notice) => (
            <TouchableOpacity key={notice._id} style={styles.content} onPress={() => handleNoticePress(notice)}>
                <Text style={styles.category}>{notice.category || '공지'}</Text>
                <Text style={styles.title}>{notice.title}</Text>

                <View style={[styles.date]}>
                    <Text style={styles.datetext}>D-1</Text>
                </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bar: {
    width: '100%',
    height: 50,
    backgroundColor: '#9DC284',
    position: 'absolute',
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    right:15,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
  },
  contentContainer: {
    
    paddingHorizontal: 10,
    paddingVertical:10,
    marginTop: 0, // topBar와의 겹침을 방지하기 위해 추가
    
  },
  content:{
    borderBottomWidth:1,
    paddingVertical:10,
    borderColor:'#c2c2c2',
    paddingHorizontal: 10,
  },
  category:{
    color:'#0E664F',
  },
  contentTitle:{
    paddingBottom:10,
    paddingTop:5,
    fontWeight:'bold',
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
});


export default Save;

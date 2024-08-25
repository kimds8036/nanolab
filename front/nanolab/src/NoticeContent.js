import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { GlobalContext } from './GlobalContext'; // GlobalContext를 가져옴

const NoticeContent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noticeId } = route.params;
  
  const { darkMode } = useContext(GlobalContext);
  const [notice, setNotice] = useState(null);
  const [isStarFilled, setIsStarFilled] = useState(false);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        // 공지 ID를 사용해 서버에서 상세 정보를 가져옴
        const response = await axios.get(`http://mydatabase.com/notice/${noticeId}`);
        setNotice(response.data);
      } catch (error) {
        console.error('공지사항을 가져오는데 실패했습니다:', error);
      }
    };

    fetchNoticeDetail();
  }, [noticeId]);

  const handleStarPress = () => {
    setIsStarFilled(!isStarFilled); // 클릭 시 이미지 상태를 변경
  };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
    },
    bar: {
      backgroundColor: darkMode ? '#597248' : '#9DC284',
      width: '100%',
      height: 50,
    },
    header: {
      backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      width: '100%',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      right: 12.5,
      color: darkMode ? '#ffffff' : '#000000',
    },
  };

  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');

  if (!notice) {
    return (
      <View style={[styles.container, dynamicStyles.container]}>
        <View style={[styles.bar, dynamicStyles.bar]}></View>
        <View style={[styles.header, dynamicStyles.header]}>
          <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>공지사항</Text>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.bar, dynamicStyles.bar]}></View>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{notice.title}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{notice.title}</Text>
          <View style={styles.subtitleContainer}>
            <View style={styles.row}>
                <View style={styles.date}>
                    <Text style={styles.subtitle}>일자ㅣ</Text>
                    <Text style={styles.subtext}>{notice.date}</Text>
                </View>
                <View style={styles.click}>
                    <Text style={styles.subtitle}>조회수ㅣ</Text>
                    <Text style={styles.subtext}>{notice.views}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleStarPress}>
              <Image 
                source={isStarFilled ? require('../assets/image/light/filled-star.png') : require('../assets/image/light/empty-star.png')} 
                style={styles.like}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.fileContainer}>
            <Text style={styles.file}>첨부 :  </Text>
            <View style={styles.fileOX}>
                <Text style={styles.filetext}>{notice.attachment || '첨부된 파일이 없습니다.'}</Text>
            </View>
        </View>
        <View style={styles.contentContainer}> 
          <Text style={styles.content}>{notice.content}</Text>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      marginBottom: 25,
    },
    bar: {
      backgroundColor: '#9DC284',
      width: '100%',
      height: 50,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      width: '100%',
      borderBottomWidth: 1,
      borderColor:'#c2c2c2',
    },
    backIcon: {
      width: 20,
      height: 20,
    },
    headerTitleContainer: {
      flex: 1, // 이 뷰가 남은 공간을 차지하게 합니다.
      justifyContent: 'center', // 이 뷰 안에서 텍스트가 가운데에 위치하도록 합니다.
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      right: 12.5,
    },
    titleContainer: {
      paddingHorizontal: 16,
      borderBottomWidth: 1,
        paddingVertical: 10,
        borderColor:'#c2c2c2',
    },
    title: {
      marginBottom:15,
      marginTop:10,
      fontWeight:'bold',
      fontSize: 18,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 왼쪽과 오른쪽에 요소를 배치
        alignItems: 'center', // 수직 중앙 정렬
    },
    subtitle: {
      
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between', // 텍스트 사이에 여백을 추가합니다.
    width: '50%',
    },
    subtext:{
        color:'gray',
        lineHeight:15,
    },
    date:{
        flexDirection: 'row',
    alignItems: 'center', 
    },
    click:{
        flexDirection: 'row',
    alignItems: 'center', 
    },
    contentContainer: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    content: {
      fontSize:16,
    },
    bottomContainer: {
      
    },
    fileContainer: {
      flexDirection:'row',
      borderBottomWidth:1,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderColor:'#c2c2c2',
    },
    file:{
        fontSize:16,
    },
    fileOX:{
        borderWidth:1,
        borderRadius:'20',
        paddingVertical: 3,
      paddingHorizontal: 10,
    },
    filetext:{
        color:'grey',
        fontSize:12,
        
    },
    like: {
      width:30,
      height:30,
    },
  });
  

export default NoticeContent;
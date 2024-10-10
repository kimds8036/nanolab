import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { GlobalContext } from './GlobalContext'; // GlobalContext를 가져옴
import { WebView } from 'react-native-webview'; // WebView 추가

const NoticeContent = () => {
  const navigation = useNavigation();
  const { darkMode, views, setViews } = useContext(GlobalContext);
  const [isStarFilled, setIsStarFilled] = useState(false);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { category, title } = route.params; // category와 title을 받아옴
  const noticeId = route.params.id; // 공지 ID를 받아옴
  const noticeIndex = route.params.index; // 공지 배열에서의 인덱스
  

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get('https://nanolab-production-6aa7.up.railway.app/api/noticeDetail', {
          params: { category, title }  // 쿼리 파라미터로 전달
        });

        setNotice(response.data);
        
      } catch (error) {
        console.error('Error fetching notice detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [category, title, noticeIndex, noticeId]);

  const handleStarPress = () => {
    setIsStarFilled(!isStarFilled); // 클릭 시 이미지 상태를 변경
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0E664F" />
      </View>
    );
  }

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

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.bar, dynamicStyles.bar]}></View>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={() => { navigation.pop(); }}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{notice.category}</Text>
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
                    <Text style={styles.subtext}>{views[noticeIndex] || 0}</Text>
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
          <WebView
            originWhitelist={['*']}
            source={{ html: notice.content }}
            style={{ height: 400 }} 
          />
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
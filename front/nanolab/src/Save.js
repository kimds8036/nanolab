import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { GlobalContext } from './GlobalContext';
import { useNavigation } from '@react-navigation/native';

export default function Save() {
  const { darkMode } = useContext(GlobalContext);
  const navigation = useNavigation();
  const { user } = useContext(GlobalContext);

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
            <TouchableOpacity style={styles.content}>
                <Text style={styles.category}>학사공지</Text>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
                <View style={[styles.date]}>
                    <Text style={styles.datetext}>D-1</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.content}>
                <Text style={styles.category}>학사공지</Text>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
                <View style={[styles.date]}>
                    <Text style={styles.datetext}>D-1</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.content}>
                <Text style={styles.category}>학사공지</Text>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
                <View style={[styles.date]}>
                    <Text style={styles.datetext}>D-1</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
}

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
    backgroundColor:'#C28484',
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

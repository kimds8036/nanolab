import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { GlobalContext } from './GlobalContext'; // GlobalContext를 가져옴

const Alert = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { darkMode } = useContext(GlobalContext);
  const [notice, setNotice] = useState(null);
  const [isStarFilled, setIsStarFilled] = useState(false);

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
        <TouchableOpacity onPress={() => { navigation.navigate('Main'); }}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>알림</Text>
        </View>
      </View>
      
      <ScrollView style={styles.innerContainer}>
      <TouchableOpacity style={styles.content}>
          <View style={styles.iconbox}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/image/light/department.png')} style={styles.icon}></Image>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>학사공지</Text>
            <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
            </View>
            <Text style={styles.datetext}>2024.08.24</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.content1}>
          <View style={styles.iconbox}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/image/light/department.png')} style={styles.icon}></Image>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>학사공지</Text>
            <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
            </View>
            <Text style={styles.datetext}>2024.08.24</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.content}>
          <View style={styles.iconbox}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/image/light/department.png')} style={styles.icon}></Image>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>학사공지</Text>
            <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
            </View>
            <Text style={styles.datetext}>2024.08.24</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.content1}>
          <View style={styles.iconbox}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/image/light/department.png')} style={styles.icon}></Image>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>학사공지</Text>
            <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
            </View>
            <Text style={styles.datetext}>2024.08.24</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.content}>
          <View style={styles.iconbox}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/image/light/department.png')} style={styles.icon}></Image>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>학사공지</Text>
            <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
            </View>
            <Text style={styles.datetext}>2024.08.24</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.content1}>
          <View style={styles.iconbox}>
            <View style={styles.iconContainer}>
              <Image source={require('../assets/image/light/department.png')} style={styles.icon}></Image>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.category}>학사공지</Text>
            <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitle}>2024학년도 2학기 강의시간표 조회, 수강바구니 일정 안내</Text>
            </View>
            <Text style={styles.datetext}>2024.08.24</Text>
          </View>
        </TouchableOpacity>
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
    content:{
        flexDirection:'row',
        padding:10,
        paddingVertical:15,
        backgroundColor:'#EBF9E1',
        borderBottomWidth:1,
        borderColor:'#c2c2c2',
        width:'100%',
    },
    content1:{
        flexDirection:'row',
        padding:10,
        paddingVertical:15,
        borderBottomWidth:1,
        borderColor:'#c2c2c2',
        width:'100%',
    },
    iconbox:{
      justifyContent:'center',
      alignContent:'center',
    },
    iconContainer:{
        borderRadius:50,
        borderWidth:1,
        
        height:50,
        backgroundColor:'white',
        justifyContent:'center',
        alignContent:'center',
    },
    icon:{
        width:50,
        height:50,
        
    },
    contentContainer:{
        paddingLeft:10,
    },
    category:{
        fontSize:16,
        fontWeight:'bold',
    },
    contentTitle:{
        paddingBottom:5,
        paddingTop:5,
        marginRight:30,
    },
    contentTitleContainer:{
        marginRight:20,
    },
    datetext:{
        color:'grey',
        fontSize:12,
    },
  });
  

export default Alert;
import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Alert, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Feedback = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.bar}></View>
            <View style={styles.innercontainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Mypage'); }}>
                        <Image source={require('../assets/image/back.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>피드백 보내기</Text>
                    </View>
                </View>

                <View style={styles.feedbackSection}>
                    <Image source={require('../assets/image/feedbackpaper.png')} style={styles.feedbackpaper}/>
                    <Text style={styles.feedbacktext}>피드백을 보내 주시면</Text>
                    <Text style={styles.feedbacktext}>앱 성장에 많은 도움이 돼요</Text>

                    
                    <TextInput style={styles.textinput} placeholder='5글자 이상 입력해 주세요'></TextInput>

                    <TouchableOpacity style={styles.submitbutton}>
                        <Text style={styles.submittext}>피드백 보내기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      innercontainer:{
        flex:1,
      },
      feedbackSection:{
        flex:1,
      },
      bar:{
        backgroundColor:'#9DC284',
        width:'100%',
        height:50,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        width: '100%',
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
        right:12.5,
      },
      feedbackpaper:{
        width:150,
        height:150,
        alignSelf:'center',
        marginTop:20,
        left:10,
      },
      feedbacktext:{
        textAlign:'center',
        fontSize:16,
        marginTop:5,
      },
      textinput:{
        borderWidth:1,
        width:'90%',
        height:200,
        alignSelf:'center',
        borderRadius:10,
        paddingLeft:10,
        marginTop:30,
    },
    submitbutton:{
        backgroundColor:'#9DC284',
        width:'90%',
        height:40,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        borderWidth:1,
        marginTop:30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    submittext:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
});

export default Feedback;
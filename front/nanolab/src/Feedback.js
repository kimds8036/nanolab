import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Keyboard, StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from './GlobalContext';

const Feedback = () => {
  const navigation = useNavigation();
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);

  // 피드백 입력 값을 저장할 상태
  const [feedback, setFeedback] = useState('');

  // 피드백 전송 함수
  const handleSubmit = async () => {
      try {
          const response = await axios.post('https://nanolab-production-6aa7.up.railway.app/auth/register', {
              feedback,
          }, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          alert(response.data.message);
          setFeedback(''); // 성공적으로 전송 후 입력창 비우기
      } catch (error) {
          console.error('피드백 전송 오류:', error);
          alert('피드백 전송 중 오류가 발생했습니다.');
      }
  };

    const dynamicStyles={
      container:{
        flex:1,
        backgroundColor: darkMode ? '#2f2f2f' : '#FFFFFF',
      },
      bar:{
        backgroundColor: darkMode ? '#597248':'#9DC284',
        width:'100%',
        height:50,
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
        right:12.5,
        color:darkMode?'#ffffff':'#000000',
      },
      feedbacktext:{
        textAlign:'center',
        fontSize:16,
        marginTop:5,
        color:darkMode?'#ffffff':'#000000',
      },
      textinput:{
        borderWidth:1,
        borderColor:darkMode?'#ffffff':'#000000',
        width:'90%',
        height:200,
        alignSelf:'center',
        borderRadius:10,
        paddingLeft:15,
        paddingTop:15,
        marginTop:30,
      },
      submitbutton:{
        backgroundColor: darkMode ? '#597248':'#9DC284',
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
    };

  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');

  const feedbackpaper=darkMode
    ? require('../assets/image/dark/feedbackpaper.png')
    : require('../assets/image/light/feedbackpaper.png');

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <View style={[styles.container, dynamicStyles.container]}>
              <View style={styles.bar}></View>
              <View style={styles.innercontainer}>
                  <View style={[styles.header, dynamicStyles.header]}>
                      <TouchableOpacity onPress={() => { navigation.navigate('Mypage'); }}>
                          <Image source={back} style={styles.backIcon} />
                      </TouchableOpacity>
                      <View style={styles.headerTitleContainer}>
                          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>피드백 보내기</Text>
                      </View>
                  </View>

                  <View style={styles.feedbackSection}>
                      <Image source={feedbackpaper} style={styles.feedbackpaper}/>
                      <Text style={[styles.feedbacktext, dynamicStyles.feedbacktext]}>피드백을 보내 주시면</Text>
                      <Text style={[styles.feedbacktext, dynamicStyles.feedbacktext]}>앱 성장에 많은 도움이 돼요</Text>

                      <TextInput 
                          style={[styles.textinput, dynamicStyles.textinput]} 
                          placeholder='5글자 이상 입력해 주세요'
                          placeholderTextColor={darkMode ? '#8B8B8B' : '#c2c2c2'}
                          multiline={true}
                          value={feedback}
                          onChangeText={setFeedback} // 입력값 업데이트
                      />
                      <TouchableOpacity 
                          style={[styles.submitbutton, dynamicStyles.submitbutton]} 
                          onPress={handleSubmit} // 버튼 클릭 시 피드백 전송
                      >
                          <Text style={styles.submittext}>피드백 보내기</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </TouchableWithoutFeedback>
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
        marginBottom:10,
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
        paddingLeft:15,
        paddingTop:15,
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
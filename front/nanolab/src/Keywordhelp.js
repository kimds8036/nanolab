import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { GlobalContext } from './GlobalContext';
import { useNavigation } from '@react-navigation/native';

export default function HelpScreen() {
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
    photo:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignSelf:'center',
      marginBottom:30,
      borderRadius:20,
      padding:10,
      backgroundColor:darkMode?'#505050':'#c2c2c2',
    },
    sectionTitleContainer: {
      alignSelf: 'flex-start',
      borderBottomWidth: 1,     // 밑줄 두께
      borderBottomColor:darkMode?'#ffffff':'#000000',
      paddingBottom: 3,         // 텍스트와 밑줄 간격
      marginBottom: 10,         // 섹션과의 간격
    },
    text:{
      color:darkMode?'white':'black',
    },
    text2:{
      color:darkMode?'#DE3D3D':'#ff0000',
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color:darkMode?'#ffffff':'#000000',
    },
    startsection: {
      fontSize: 17,
      marginBottom: 30,
      lineHeight: 20,
      color:darkMode?'#ffffff':'#000000',
    },
    sectionText: {
      fontSize: 15,
      marginBottom: 10,
      lineHeight: 20,
      color:darkMode?'#ffffff':'#000000',
    },
    sectionText1: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      lineHeight: 20,
      color:darkMode?'#ffffff':'#000000',
    },
    importText1: {
      color:darkMode?'#DE3D3D':'#ff0000',
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 2,
      lineHeight: 20,
    },
    importText2: {
      color:darkMode?'#DE3D3D':'#ff0000',
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 30,
      lineHeight: 20,
    },
  };

  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');
  
  const help1 = darkMode 
    ? require('../assets/image/dark/help1.png')
    : require('../assets/image/light/help1.png');

  const help2 = darkMode 
    ? require('../assets/image/dark/help2.png')
    : require('../assets/image/light/help2.png');

  const help3 = darkMode 
    ? require('../assets/image/dark/help3.png')
    : require('../assets/image/light/help3.png');

  const help4 = darkMode 
    ? require('../assets/image/dark/help4.png')
    : require('../assets/image/light/help4.png');

  const help5 = darkMode 
    ? require('../assets/image/dark/help5.png')
    : require('../assets/image/light/help5.png');

  const help6 = darkMode 
    ? require('../assets/image/dark/help6.png')
    : require('../assets/image/light/help6.png');
  
    return (
      <SafeAreaView style={[styles.container,dynamicStyles.container]}>
        <View style={[styles.bar,dynamicStyles.bar]}></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('Keyword'); }}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={[styles.title,dynamicStyles.title]}>도움말</Text>
          </View>
        </View>
      
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.section}>
            <View style={[styles.sectionTitleContainer,dynamicStyles.sectionTitleContainer]}>
              <Text style={[styles.sectionTitle,dynamicStyles.sectionTitle]}>키워드 등록을 하고 싶어요. 어떻게 하나요?</Text>
            </View>
            <Text style={[styles.startsection,dynamicStyles.startsection]}>키워드 등록 시, 등록한 해당 단어가 포함되어 있는 공지가 올라올 때 사용자에게 푸시 알림이 갑니다. 누구보다 빠르게 자신의 관심 공지를 확인할 수 있습니다.</Text>
            <Text style={[styles.sectionText1,dynamicStyles.sectionText1]}>키워드 등록을 하려면?</Text>
            <Text style={[styles.sectionText,dynamicStyles.sectionText]}>1. 마이 페이지에서 &gt;키워드 알림 설정&lt; 버튼으로 이동할 수 있어요.</Text>
            <View style={[styles.photo,dynamicStyles.photo]}>
              <Image source={help1} style={[styles.help, styles.helpMargin]}></Image>
              <Image source={help2} style={styles.help}></Image>
            </View>
            <Text style={[styles.sectionText,dynamicStyles.sectionText]}>2. 키워드 입력 창에 관심 있는 키워드 또는 알림 받고 싶은 키워드를 입력하여 추가해 주세요.</Text>
            <Text style={[styles.importText1,dynamicStyles.importText1]}>ㄴ 키워드에 오타 발생 시 알림이 가지 않으니 주의하여 작성해 주세요.</Text>
            <Text style={[styles.importText2,dynamicStyles.importText2]}>Ex. 건극사랑, 국가 군로, 장헉금 → 건국사랑, 국가 근로, 장학금으로 수정</Text>
            <View style={[styles.photo,dynamicStyles.photo]}>
              <Image source={help3} style={[styles.help, styles.helpMargin]}></Image>
              <Image source={help5} style={styles.help}></Image>
            </View>
            <Text style={[styles.sectionText1,dynamicStyles.sectionText1]}>키워드 등록 팁!</Text>
            <Text style={[styles.sectionText,dynamicStyles.sectionText]}> - 등록된 키워드를 삭제하고 싶다면 키워드 우측의 삭제 버튼을 통해 삭제가 가능해요.</Text>
            <Text style={[styles.sectionText,dynamicStyles.sectionText]}>- 삭제된 키워드를 되돌리고 싶다면 하단의 삭제된 키워드 버튼을 통해 재등록이 가능해요.</Text>
            <View style={[styles.photo,dynamicStyles.photo]}>
              <Image source={help4} style={[styles.help, styles.helpMargin]}></Image>
              <Image source={help6} style={styles.help}></Image>
            </View>
        </View>
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
    padding: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 0, // topBar와의 겹침을 방지하기 위해 추가
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    alignSelf: 'flex-start',
    borderBottomWidth: 1,     // 밑줄 두께
    borderBottomColor: '#000000',
    paddingBottom: 3,         // 텍스트와 밑줄 간격
    marginBottom: 10,         // 섹션과의 간격
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionText1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    lineHeight: 20,
  },
  startsection: {
    fontSize: 17,
    marginBottom: 30,
    lineHeight: 20,
  },
  sectionText: {
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 20,
  },
  importText1: {
    color: '#ff0000',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
    lineHeight: 20,
  },
  importText2: {
    color: '#ff0000',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 30,
    lineHeight: 20,
  },
  photo:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    marginBottom:30,
    borderRadius:20,
    padding:10,
    backgroundColor:'#c2c2c2'
  },
  help:{
    width:170,
    height:350,
  },
  helpMargin: {
    marginRight: 10, 
  },
});

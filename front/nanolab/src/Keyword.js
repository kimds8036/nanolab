import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GlobalContext } from './GlobalContext'; // GlobalContext 가져오기
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Keyword({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [registeredKeywords, setRegisteredKeywords] = useState([]);
  const [recentKeywords, setRecentKeywords] = useState(["+", "+", "+", "+", "+", "+"]);
  const { darkMode } = useContext(GlobalContext);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        if (!user || !user.email) {
          throw new Error('User email not found');
        }

        const response = await fetch(`https://nanolab-production-6aa7.up.railway.app/keywords?email=${user.email}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Error fetching keywords:', response.status, errorMessage);
          Alert.alert('Error', `Failed to fetch keywords: ${response.status}`);
          return;
        }

        const data = await response.json();
        if (response.ok) {
          setRegisteredKeywords(data.keywords);
        } else {
          console.error('Error fetching keywords:', data.message);
        }
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };

    fetchKeywords();
  }, [user]);

  const handleAddKeyword = async () => {
    if (!user || !user.email) {
      Alert.alert('Error', 'User email not found');
      return;
    }

    if (registeredKeywords.includes(keyword)) {
      Alert.alert('Duplicate', 'This keyword is already registered.');
      return;
    }

    Alert.alert(
      "키워드 설정",
      `${keyword}를 설정하시겠습니까?`,
      [
        {
          text: "예",
          onPress: async () => {
            try {
              const response = await fetch('https://nanolab-production-6aa7.up.railway.app/keywords', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, keyword })
              });

              const data = await response.json();
              if (response.ok) {
                setRegisteredKeywords([...registeredKeywords, keyword]);
                setKeyword('');
                setRecentKeywords(prevRecentKeywords => {
                  const newRecentKeywords = [...prevRecentKeywords];
                  const index = newRecentKeywords.indexOf("+");
                  if (index !== -1) {
                    newRecentKeywords[index] = keyword;
                  } else {
                    newRecentKeywords.unshift(keyword);
                    newRecentKeywords.pop();
                  }
                  return newRecentKeywords;
                });
              } else {
                console.error('Error adding keyword:', data.message);
              }
            } catch (error) {
              console.error('Error adding keyword:', error);
            }
          }
        },
        {
          text: "아니요",
          style: "cancel"
        }
      ]
    );
  };

  const handleDeleteKeyword = async (keywordToDelete) => {
    if (!user || !user.email) {
      Alert.alert('Error', 'User email not found');
      return;
    }

    Alert.alert(
      "키워드 삭제",
      `${keywordToDelete}를 삭제하시겠습니까?`,
      [
        {
          text: "예",
          onPress: async () => {
            try {
              const response = await axios.delete('https://nanolab-production-6aa7.up.railway.app/keywords', {
                data: { email: user.email, keyword: keywordToDelete },
              });

              if (response.status === 200) {
                setRegisteredKeywords(registeredKeywords.filter(kw => kw !== keywordToDelete));
              } else {
                console.error('Error deleting keyword:', response.data.message);
              }
            } catch (error) {
              console.error('Error deleting keyword:', error);
            }
          }
        },
        {
          text: "아니요",
          style: "cancel"
        }
      ]
    );
  };

  const dynamicStyles ={
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
  }

  const back = darkMode 
    ? require('../assets/image/dark/back.png')
    : require('../assets/image/light/back.png');

  const alert = darkMode
    ? require('../assets/image/dark/phonealert.png')
    : require('../assets/image/light/phonealert.png');

    return (
      <SafeAreaView style={[styles.container, dynamicStyles.container]}>
        <View style={[styles.bar, dynamicStyles.bar]}></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('Mypage'); }}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, dynamicStyles.title]}>키워드 알림 설정</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.contentWrapper}>
              <TextInput
                style={styles.input}
                placeholder="알림 받을 키워드를 입력해 주세요"
                placeholderTextColor="#6b7280"
                value={keyword}
                onChangeText={setKeyword}
                onSubmitEditing={handleAddKeyword}
              />

              <View style={styles.keywordContainer}>
                {registeredKeywords.length === 0 ? (
                  <View style={styles.noKeywordView}>
                    <Text style={styles.noKeywordText}>아직 등록된 키워드가 없어요</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Keywordhelp'); }}>
                      <Text style={styles.howToUseText}>어떻게 사용하나요?</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  registeredKeywords.map((item, index) => (
                    <View key={index.toString()} style={styles.keywordItemContainer}>
                      <Text style={styles.keywordItem}>{item}</Text>
                      <TouchableOpacity onPress={() => handleDeleteKeyword(item)}>
                        <Text style={styles.deleteButton}>X</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>

              <View style={styles.recentKeywords}>
                <Text style={styles.recentKeywordsTitle}>USER님이 최근 본 키워드에요.</Text>
                <View style={styles.keywordListContainer}>
                  {recentKeywords.map((kw, index) => (
                    <TouchableOpacity key={index} style={styles.keywordButton}>
                      <Text style={styles.plusText}>{kw}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.footer}>
                <Image source={alert} style={styles.alert}></Image>
                <Text style={styles.footerText}>알림 받는 키워드 {registeredKeywords.length} 개</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    bar: {
      width: '100%',
      height: 50,
      backgroundColor: '#9DC284',
      position: 'absolute',
      top: 0,
    },
    innerContainer: {
      flex: 1,
      padding: 10,
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
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: '#000000',
      right:15,
    },
    contentContainer: {
      flexGrow: 1,
    },
    contentWrapper: {
      flex: 1,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 25,
      margin: 20,
      paddingHorizontal: 15,
      height: 45,
      fontSize: 16,
    },
    keywordContainer: {
      paddingHorizontal: 25,
      marginVertical: 10,
      height:"50%",
    },
    noKeywordView: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    noKeywordText: {
      fontSize: 16,
      color: '#888',
    },
    howToUseText: {
      fontSize: 16,
      color: '#a5c585',
      textDecorationLine: 'underline',
      marginTop: 10,
    },
    keywordItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth:1,
      borderColor:'#DBDBDB',
      paddingVertical:15,
    },
    keywordItem: {
      fontSize: 16,
      color: 'black',
    },
    deleteButton: {
      fontSize: 16,
      color:'grey',
      marginLeft: 10,
    },
    recentKeywords: {
      paddingHorizontal: 25,
      marginVertical: 20,
    },
    recentKeywordsTitle: {
      fontSize: 15,
      color: 'black',
      marginBottom: 20,
    },
    keywordListContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    keywordButton: {
      backgroundColor: '#ddd',
      borderRadius: 15,
      padding: 10,
      marginBottom: 15,
      width: '32%',
      alignItems: 'center',
    },
    plusText: {
      fontSize: 14,
      color: 'black',
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'left',
      marginLeft:30,
      flexDirection:'row',
    },
    alert:{
      width:20,
      height:20,
      marginRight:10,
    },
    footerText: {
      fontSize: 16,
      color: '#888',
    },
  });

export default Keyword;
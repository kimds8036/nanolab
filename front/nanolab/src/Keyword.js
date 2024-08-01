import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function KeywordAlertPage({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [registeredKeywords, setRegisteredKeywords] = useState([]);
  const [recentKeywords, setRecentKeywords] = useState(["+", "+", "+", "+", "+", "+"]);

  useEffect(() => {
    // 여기에서 유저의 등록된 키워드를 불러오는 로직을 추가합니다.
    const fetchKeywords = async () => {
      try {
        const response = await axios.get(`${API_URL}/keywords`, {
          params: { email: 'test@example.com' }
        });
        setRegisteredKeywords(response.data.keywords);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKeywords();
  }, []);

  const handleAddKeyword = async () => {
    Alert.alert(
      "키워드 설정",
      `${keyword}를 설정하시겠습니까?`,
      [
        {
          text: "예",
          onPress: async () => {
            try {
              const response = await axios.post(`${API_URL}/keywords`, {
                email: 'test@example.com',
                keyword
              });
              setRegisteredKeywords([...registeredKeywords, keyword]);
              setKeyword('');
            } catch (error) {
              console.error(error);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>키워드 알림 설정</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconButtonText}>?</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="알림 받을 키워드를 입력해 주세요"
            placeholderTextColor="#6b7280"
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={handleAddKeyword}
          />

          {registeredKeywords.length === 0 ? (
            <View style={styles.noKeywordView}>
              <Text style={styles.noKeywordText}>아직 등록된 키워드가 없어요</Text>
              <TouchableOpacity>
                <Text style={styles.howToUseText}>어떻게 사용하나요?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.keywordView}>
              <Text style={styles.keywordTitle}>등록된 키워드 :</Text>
              <ScrollView style={styles.keywordList}>
                {registeredKeywords.map((kw, index) => (
                  <Text key={index} style={styles.keywordItem}>{kw}</Text>
                ))}
              </ScrollView>
            </View>
          )}

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
            <Text style={styles.footerText}>알림 받는 키워드 {registeredKeywords.length} 개</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a5c585',
    paddingTop: 40, // 상태바 높이를 고려해 패딩 추가
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: 'black',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  iconButton: {
    padding: 10,
  },
  iconButtonText: {
    fontSize: 20,
    color: 'black',
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
  noKeywordView: {
    alignItems: 'center',
    marginVertical: 120,
  },
  noKeywordText: {
    fontSize: 16,
    color: '#888',
  },
  howToUseText: {
    fontSize: 16,
    color: '#a5c585',
    textDecorationLine: 'underline',
  },
  keywordView: {
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  keywordTitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  keywordList: {
    maxHeight: 200, // 스크롤 가능한 영역의 최대 높이 설정
  },
  keywordItem: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 5,
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
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#888',
  },
});

export default KeywordAlertPage;
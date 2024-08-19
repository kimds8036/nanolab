import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function HelpScreen() {
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.topBar}></View>
        
        <View style={styles.header}>
          <View style={styles.backContainer}>
            <Image source={require('../assets/image/light/back.png')} style={{ width: 24, height: 24 }} />
          </View>
          
          <Text style={styles.headerTitle}>도움말</Text>
        </View>
      
      {/* 스크롤 가능한 내용 */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>키워드 등록을 하고 싶어요. 어떻게 하나요?</Text>
          </View>
          <Text style={styles.startsection}>
            키워드 등록 시, 등록한 해당 단어가 포함되어 있는 공지가 올라올 때 사용자에게 푸시 알림이 갑니다.

            누구보다 빠르게 자신의 관심 공지를 확인할 수 있습니다.
          </Text>
          <Text style={styles.sectionText1}>키워드 등록을 하려면?</Text>
          <Text style={styles.sectionText}>
            1. 마이 페이지에서 &gt;키워드 알림 설정&lt; 버튼으로 이동할 수 있어요.
          </Text>
          <Text style={styles.sectionText}>
            2. 키워드 입력 창에 관심 있는 키워드 또는 알림 받고 싶은 키워드를 입력하여 추가해 주세요.
          </Text>
          <Text style={styles.importText1}>
            ㄴ 키워드에 오타 발생 시 알림이 가지 않으니 주의하여 작성해 주세요.
          </Text>
          <Text style={styles.importText2}>Ex. 건극사랑, 국가 군로, 장헉금 → 건국사랑, 국가 근로, 장학금으로 수정</Text>
          <Text style={styles.sectionText1}>키워드 등록 팁!</Text>
          <Text style={styles.sectionText}>
            - 등록된 키워드를 삭제하고 싶다면 키워드 우측의 삭제 버튼을 통해 삭제가 가능해요.
          </Text>
          <Text style={styles.sectionText}>
            - 최근 본 키워드의 플러스 버튼을 통해 키워드를 등록할 수 있어요.
          </Text>
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
  topBar: {
    backgroundColor: '#9DC284',
    width: '100%',
    height: 70,
    position:'absolute',
  },
  backContainer: {
    position: 'absolute',
    left: 10,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
});

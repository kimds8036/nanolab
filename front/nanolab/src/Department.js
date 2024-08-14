import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GlobalContext } from './GlobalContext';

const Department = ({ navigation }) => {
  const { isDepartmentRegistered, setIsDepartmentRegistered, selectedCollege, setSelectedCollege, selectedDepartment, setSelectedDepartment } = useContext(GlobalContext);

  const [showCollegePicker, setShowCollegePicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);

  const colleges = {
    design: ['산업디자인학과', '시각영상디자인학과', '실내디자인학과', '패션디자인학과'],
    business: ['경영학과', '경제통상학과', '경찰학과', '동화•한국어문화학과', '문헌정보학과', '사회복지학과', '소방방재융합학과', '신문방송학과', '영어문화학과', '유아교육과'],
    engineering: ['녹색기술융합학과', '메카트로닉스공학과', '바이오메디컬공학과', '에너지신소재공학과', '컴퓨터공학과'],
    biomedical: ['골프산업학과', '바이오의약학과', '뷰티화장품학과', '생명공학과', '식품영양학과', '스포츠건강학과'],
    medicine: ['의예과'],
  };
  
  const collegeLabels = {
    design: '디자인 대학',
    business: '인문사회융합대학',
    engineering: '과학기술대학',
    biomedical: '의료생명대학',
    medicine: '의과대학',
  };

  const handleRegister = () => {
    if (selectedCollege && selectedDepartment) {
      setIsDepartmentRegistered(true);
      navigation.pop();  // 이전 화면으로 돌아가기
      Alert.alert('학과가 저장되었습니다.');
    } else {
      Alert.alert('학과를 선택해 주세요.');
    }
  };

  return (
    <ImageBackground source={require('../assets/image/background.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.rectangle1}></View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('Myinform'); }}>
            <Image source={require('../assets/image/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>학과 등록</Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate('ProfilePage'); }}>
            <Image source={require('../assets/image/question.png')} style={styles.questionIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textLine}>
            <Text style={styles.text1}>현재</Text>
            <Text style={styles.text2}> 재학 중인 학과</Text>
            <Text style={styles.text1}>를</Text>
          </View>
          <Text style={styles.text1}>입력해 주세요</Text>
        </View>
        {!isDepartmentRegistered ? (
          <>
            <TouchableOpacity style={styles.pickerHeader} onPress={() => setShowCollegePicker(!showCollegePicker)}>
              <Text style={styles.pickerText}>
                {selectedCollege ? collegeLabels[selectedCollege] : '단과 대학교'}
              </Text>
              <Image
                source={showCollegePicker ? require('../assets/image/arrow-up.png') : require('../assets/image/arrow-down.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            {showCollegePicker && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCollege}
                  onValueChange={(itemValue) => {
                    setSelectedCollege(itemValue);
                    setSelectedDepartment(colleges[itemValue] ? colleges[itemValue][0] : undefined);
                    setShowCollegePicker(false);
                  }}
                  style={styles.picker}>
                  {Object.keys(colleges).map((key) => (
                    <Picker.Item key={key} label={collegeLabels[key]} value={key} />
                  ))}
                </Picker>
              </View>
            )}
            <TouchableOpacity style={styles.pickerHeader} onPress={() => setShowDepartmentPicker(!showDepartmentPicker)}>
              <Text style={styles.pickerText}>
                {selectedDepartment ? selectedDepartment : '소속 학과'}
              </Text>
              <Image
                source={showDepartmentPicker ? require('../assets/image/arrow-up.png') : require('../assets/image/arrow-down.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            {showDepartmentPicker && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedDepartment}
                  onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
                  style={styles.picker}>
                  {selectedCollege && colleges[selectedCollege] ? 
                    colleges[selectedCollege].map((department, index) => (
                      <Picker.Item key={index} label={department} value={department} />
                    )) : null
                  }
                </Picker>
              </View>
            )}
            <TouchableOpacity onPress={handleRegister}>
              <View style={styles.save}>
                <Text style={styles.savetext}>저장하기</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.pickerHeader} onPress={() => setShowCollegePicker(!showCollegePicker)}>
              <Text style={styles.pickerText}>
                {selectedCollege ? collegeLabels[selectedCollege] : '단과 대학교'}
              </Text>
              <Image
                source={showCollegePicker ? require('../assets/image/arrow-up.png') : require('../assets/image/arrow-down.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            {showCollegePicker && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCollege}
                  onValueChange={(itemValue) => {
                    setSelectedCollege(itemValue);
                    setSelectedDepartment(colleges[itemValue] ? colleges[itemValue][0] : undefined);
                    setShowCollegePicker(false);
                  }}
                  style={styles.picker}>
                  {Object.keys(colleges).map((key) => (
                    <Picker.Item key={key} label={collegeLabels[key]} value={key} />
                  ))}
                </Picker>
              </View>
            )}
            <TouchableOpacity style={styles.pickerHeader} onPress={() => setShowDepartmentPicker(!showDepartmentPicker)}>
              <Text style={styles.pickerText}>
                {selectedDepartment ? selectedDepartment : '소속 학과'}
              </Text>
              <Image
                source={showDepartmentPicker ? require('../assets/image/arrow-up.png') : require('../assets/image/arrow-down.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            {showDepartmentPicker && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedDepartment}
                  onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
                  style={styles.picker}>
                  {selectedCollege && colleges[selectedCollege] ? 
                    colleges[selectedCollege].map((department, index) => (
                      <Picker.Item key={index} label={department} value={department} />
                    )) : null
                  }
                </Picker>
              </View>
            )}
            <TouchableOpacity onPress={handleRegister}>
              <View style={styles.save}>
                <Text style={styles.savetext}>수정하기</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rectangle1: {
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
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
  text1: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text2: {
    color: '#45B035',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 33,
  },
  pickerContainer: {
    marginBottom: 20,
    height: 180,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A7766',
    borderRadius: 20,
    paddingVertical: 13,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  pickerText: {
    fontSize: 18,
    color: 'grey',
    marginLeft: 20,
  },
  textContainer: {
    marginTop: 100,
    marginLeft: 20,
    marginBottom: 15,
  },
  textLine: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  questionIcon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  backgroundImage: {
    flex: 1,
  },
  save: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 13,
    width: '90%',
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    backgroundColor: '#557237',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  savetext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 23,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Department;
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you use react-native-vector-icons

const Department = ({ navigation }) => {
  const [selectedCollege, setSelectedCollege] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [showCollegePicker, setShowCollegePicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);

  const colleges = {
    design: ['산업디자인학과', '시각영상디자인학과', '실내디자인학과','패션디자인학과'],
    business: ['경영학과', '경제통상학과','경찰학과','동화•한국어문화학과','문헌정보학과','사회복지학과','소방방재융합학과','신문방송학과','영어문화학과','유아교육과'], 
    engineering: ['녹색기술융합학과', '메카트로닉스공학과','바이오메디컬공학과','에너지신소재공학과','컴퓨터공학과'],
    biomedical: ['골프산업학과','바이오의약학과','뷰티화장품학과','생명공학과','식품영양학과','스포츠건강학과'],
    medicine: ['의예과'],
  };
  
  const collegeLabels = {
    design: '디자인 대학',
    business: '인문사회융합대학',
    engineering: '과학기술대학',
    biomedical: '의료생명대학',
    medicine: '의과대학',
  };

  return (
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.rectangle1}></View>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { navigation.navigate('Main', { isMenuVisible: true }); }}>
                <Image source={require('../assets/image/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>학과 등록</Text>
            </View>
        </View>
        <View style={styles.textContainer}>
            <View style={styles.textLine}>
                <Text style={styles.text1}>현재</Text>
                <Text style={styles.text2}> 재학 중인 학과</Text>
                <Text style={styles.text1}>를</Text>
            </View>
            <Text style={styles.text1}>입력해 주세요</Text>
        </View>
        <TouchableOpacity style={styles.pickerHeader} onPress={() => setShowCollegePicker(!showCollegePicker)}>
            <Text style={styles.pickerText}>
                {selectedCollege ? collegeLabels[selectedCollege] : '단과 대학교'}
            </Text>
            <Icon name={showCollegePicker ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="#000" />
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
            <Icon name={showDepartmentPicker ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="#000" />
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
      </SafeAreaView>
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
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  backIcon:{
    width: 25,
    height: 25,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderBottomColor: '#ccc',
    paddingVertical: 20,
    marginBottom: 20,
    marginTop:20,
    width:'90%',
  },
  pickerText: {
    fontSize: 16,
    color: '#000',
  },
  textContainer:{
    marginTop: 100,
    marginLeft: 20,
  },
  textLine:{
    flexDirection:'row',
  },
});

export default Department;

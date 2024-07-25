import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated, Alert } from 'react-native';

const { width } = Dimensions.get('window');

const App = () => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: width * 1 / 4,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleHomePress = () => {
    Alert.alert('Home button pressed');
  };

  const handleBackPress = () => {
    Alert.alert('Back button pressed');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Menu</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleHomePress} style={styles.iconButton}>
              <Text style={styles.iconText}>⌂</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
              <Text style={styles.iconText}>←</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>학과 공지</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>학사 공지</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>장학 공지</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>일반 공지</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>취업 / 창업</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>공모전</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>국제 교류</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>모시래 식단</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>해오름 식단</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5E8D4',
  },
  slideContainer: {
    width: width * 5 / 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // 반투명 백그라운드
    flex: 1,
    position: 'absolute',
    right: 0,
    height: "100%",
  },
  header: {
    height: 80, // 상단 여유 공간 줄이기
    backgroundColor: '#6AA84F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 40,
    color: '#FFFFFF',
    marginTop: 10, // 상단 여유 공간 줄이기
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // 아이콘 상단 여유 공간 추가
  },
  iconButton: {
    marginLeft: 16,
  },
  iconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  menu: {
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
    width: width * 5 / 6 - 32,
  },
  menuItemText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default App;
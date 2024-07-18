import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const App = () => {
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: width * 1 / 6,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Menu</Text>
          <View style={styles.iconContainer}>
            <View style={styles.homeIcon} />
          </View>
        </View>
        <ScrollView style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>학과 공지</Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>학사 공지</Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>장학 공지</Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>일반 공지</Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>취업 / 창업</Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>공모전</Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>국제 교류</Text>
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
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
    width: width * 2 / 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // 반투명 백그라운드
    flex: 1,
    position: 'absolute',
    right: 0,
  },
  header: {
    height: 80,
    backgroundColor: '#6AA84F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  },
  menuItemText: {
    fontSize: 18,
    color: '#000000',
  },
  plusButton: {
    backgroundColor: '#38761D',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
  },
});

export default App;
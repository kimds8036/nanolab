import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MainPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>응애 {"\n"}메인 {"\n"}페이지 {"\n"}만들어줘{"\n"}일해라{"\n"}응애응애으앤</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default MainPage;

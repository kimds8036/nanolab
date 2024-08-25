import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Test = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>My WebView</title>
    </head>
    <body>
        <p>hello</p>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
		<View style={styles.bar}></View>
      <WebView 
        originWhitelist={['*']} 
        source={{ html: htmlContent }} 
        style={{ flex: 1 }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar:{
    backgroundColor:'#9DC284',
    width:'100%',
    height:50,
  },
});

export default Test;

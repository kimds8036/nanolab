import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const test = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>HTML in WebView</title>
    </head>
    <body>
      <h1>Hello, WebView!</h1>
      <p>This is a sample HTML content displayed in a WebView.</p>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default test;

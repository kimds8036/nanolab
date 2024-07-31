import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      table {
        transform: scale(1.5);
        transform-origin: 0 0;
      }
    </style>
  </head>
  <body>
    <p>Some content before the table</p>
    <table border="1">
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
      </tr>
    </table>
    <p>Some content after the table</p>
  </body>
</html>
`;

export default function ex(){
    return(
        <SafeAreaView style={styles.container}>
            <WebView
                
                originWhitelist={['*']}
                source={{html:'<h1>Hello</h1>'}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GlobalContext } from './GlobalContext';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState([]);
  const { darkMode } = useContext(GlobalContext);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://nanolab-production-6aa7.up.railway.app/auth/register');
      const data = await response.json();
      console.log('Received data:', data); // 서버 응답 데이터 확인
      setResults(data);
      setHasResults(data.length > 0);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const dynamicStyles={
    container:{
      flex:1,
      backgroundColor: darkMode ? '#2f2f2f' : '#ffffff',
    },
    topBar: {
      height: 50,
      backgroundColor: darkMode ? '#597248' : '#9DC284',
      width: '100%',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: darkMode?'grey':'#ccc',
      padding: 10,
      backgroundColor: darkMode ? '#2f2f2f' : '#ffffff',
    },
    resultContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: darkMode?'grey':'#ccc',
      padding: 10,
      backgroundColor: darkMode ? '#2f2f2f' : '#ffffff',
    },
    text:{
      color: darkMode ? '#f2f2f2' : '#000000',
    }
  };

  const searchfail = darkMode 
    ? require('../assets/image/dark/searchfail.png')
    : require('../assets/image/light/searchfail.png');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container,dynamicStyles.container]}>
        <View style={[styles.topBar,dynamicStyles.topBar]} />
        <View style={[styles.searchContainer,dynamicStyles.searchContainer]}>
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력하세요"
            placeholderTextColor={darkMode ? '#8B8B8B' : '#c2c2c2'}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Image source={require('../assets/image/light/exit.png')} style={styles.cancel} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.searchText}>검색</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.resultContainer,dynamicStyles.resultContainer]}>
          <Text style={styles.resultCountText}>{results.length}건의 검색결과</Text>
        </View>
        {hasResults ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text style={styles.resultItemText}>{item.title}</Text>
                {item.dDay !== undefined && (
                  <Text style={styles.dDay}>D-Day: {item.dDay >= 0 ? `-${item.dDay}` : `+${Math.abs(item.dDay)}`}</Text>
                )}
              </View>
            )}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Image source={searchfail} style={styles.noResultsImage} />
            <Text style={[styles.noResultsText,dynamicStyles.text]}>아쉽게도 일치하는 내용이 없습니다</Text>
            <Text style={[styles.noResultsSubText,dynamicStyles.subtext]}>검색어를 바꾸어 다시 검색 해 보세요</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 50,
    backgroundColor: '#9DC284',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding:5,
  },
  searchText:{
    color:'#0E664F',
    fontSize: 16,
  },
  cancel: {
    width:25,
    height:25,
    marginRight:10,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  resultCountText: {
    fontSize: 16,
    color: 'gray',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:200,
  },
  noResultsImage: {
    width:150,
    height:150,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#c2c2c2',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultItemText: {
    fontSize: 16,
    flex: 1,
  },
  dDay: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
});

export default Search;

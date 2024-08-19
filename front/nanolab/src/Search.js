import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState([]);

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

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
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
          <Image source={require('../assets/image/light/Searchfail.png')} style={styles.noResultsImage} />
          <Text style={styles.noResultsText}>아쉽게도 일치하는 내용이 없습니다</Text>
          <Text style={styles.noResultsSubText}>검색어를 바꾸어 다시 검색 해 보세요</Text>
        </View>
      )}
    </View>
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
  },
  cancelText: {
    fontSize: 16,
    color: 'gray',
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
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  noResultsSubText: {
    fontSize: 14,
    color: 'gray',
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

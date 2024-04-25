import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchDirectors, fetchMoviesByDirector } from '../api.js'; // Make sure the path is correct

const MovieRecommendationsScreen = () => {
  const [directors, setDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadDirectors();
  }, []);

  const loadDirectors = async () => {
    try {
      const response = await fetchDirectors();
      setDirectors(response.data); // Assuming the API returns an array of directors
    } catch (error) {
      console.error('Failed to fetch directors:', error);
    }
  };

  const handleDirectorPress = async (directorId) => {
    setSelectedDirector(directorId);
    try {
      const response = await fetchMoviesByDirector(directorId);
      setMovies(response.data); // Assuming the API returns an array of suggested movies
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Recommendations</Text>
      <FlatList
        data={directors}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleDirectorPress(item.id)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedDirector && (
        <>
          <Text style={styles.subtitle}>Suggested Movies:</Text>
          <FlatList
            data={movies}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.movieItem}>{item.title}</Text>}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5
  },
  itemText: {
    fontSize: 16
  },
  movieItem: {
    fontSize: 16,
    paddingVertical: 5
  }
});

export default MovieRecommendationsScreen;

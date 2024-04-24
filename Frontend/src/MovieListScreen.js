import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import { fetchMovies, searchMovies } from '../api.js'; // Ensure this path is correct based on your project structure

const MovieListScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadInitialMovies();
  }, []);

  const loadInitialMovies = async () => {
    try {
      const response = await fetchMovies();
      setMovies(response.data); // Assuming the API returns an array of movies
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadInitialMovies();
      return;
    }
    try {
      const response = await searchMovies(searchQuery);
      if (response.status === 200) {
        setMovies(response.data);
      } else {
        console.error('Search failed:', response.status);
      }
    } catch (error) {
      console.error('Failed to perform search:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie List</Text>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search movies by title"
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()} // Adjust according to your movie data structure
        renderItem={({ item }) => (
          <Text style={styles.movieItem}>{item.title}</Text> // Adjust if your movie objects differ
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  movieItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
  input: {
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  }
});

export default MovieListScreen;

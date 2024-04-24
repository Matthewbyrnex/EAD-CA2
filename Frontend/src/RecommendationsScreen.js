import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchMovies } from '../api.js'; // Ensure this path is correct based on your project structure

const RecommendationsScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetchMovies();
        setMovies(response.data); // Assuming the API returns an array of movies
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    loadMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Recommendations</Text>
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
  }
});

export default RecommendationsScreen;

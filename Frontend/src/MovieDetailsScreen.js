import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import api from '../api.js'; // Go up one directory level


const MovieDetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  const [director, setDirector] = useState(null);

  useEffect(() => {
    fetchDirectorDetails(movie.directorId);
  }, [movie.directorId]);

  const fetchDirectorDetails = async (directorId) => {
    try {
      const response = await api.fetchDirectorDetails(directorId);
      setDirector(response.data.name);
    } catch (error) {
      console.error('Failed to fetch director details', error);
    }
  };

  const addToWatchlist = () => {
    console.log('Add to Watchlist');
  };

  const rateMovie = () => {
    navigation.navigate('RateMovie', { movieId: movie.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      {director && <Text style={styles.detail}>Directed by: {director}</Text>}
      <Button title="Add to Watchlist" onPress={addToWatchlist} color="#007bff" />
      <Button title="Rate Movie" onPress={rateMovie} color="#28a745" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MovieDetailsScreen;

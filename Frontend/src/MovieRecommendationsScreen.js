import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { fetchDirectors, fetchMoviesByDirector } from '../api.js'; // Ensure this path is correct

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
      <View style={styles.bannerContainer}>
        <Image
          style={styles.bannerImage}
          source={require('../img/reel2.png')} // Adjust path as necessary
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Movie Recommendations</Text>
        <FlatList
          data={directors}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleDirectorPress(item.id)}
            >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark background
  },
  bannerContainer: {
    backgroundColor: '#1c1c1e', // Same as container to blend in
  },
  bannerImage: {
    width: '100%', // Full width of the screen
    height: 150, // Fixed height for consistency
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text color for the title
    alignSelf: 'center', // Center title
    marginTop: 20,
    marginBottom: 20, // Space between the banner image and the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    borderColor: '#39ff14', // Neon green border
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#ffffff',
    

  },
  movieItem: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 20,
    color: '#ffffff',
    borderBottomColor: '#393939',
    borderBottomWidth: 1,
    marginVertical: 5,
  }
});

export default MovieRecommendationsScreen;

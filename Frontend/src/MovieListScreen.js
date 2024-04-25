import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Image } from 'react-native';
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
      <Image
        style={styles.bannerImage}
        source={require('../img/reel2.png')} // Adjust path as necessary
      />
      <Text style={styles.title}>Movie List</Text>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search movies by title"
        placeholderTextColor="#999" // Lighter text for placeholder
      />
      <Button title="Search" onPress={handleSearch} color="#39ff14" // Neon green button color
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()} // Adjust according to your movie data structure
        renderItem={({ item }) => (
          <View style={styles.movieItemContainer}>
            <Text style={styles.movieItem}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark background
  },
  bannerImage: {
    width: '100%', // Full width of the screen
    height: 200, // Adjusted for a larger image
    marginBottom: 20, // Spacing between image and movie list title
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text color for the title
    alignSelf: 'center', // Center title
    marginTop: 20,
    marginBottom: 20, // Space between the banner image and the title
  },
  movieItemContainer: {
    backgroundColor: '#2a2a2a', // Dark grey background for each item
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10, // Slightly rounded corners
    shadowColor: '#000', // Shadow for each item
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    // marginBottom: 20, 
    marginTop: 20,// Space between items
    marginHorizontal: 20, // Spacing from screen edges
  },
  movieItem: {
    fontSize: 18,
    color: '#ffffff', 
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#39ff14', // Neon green border
    padding: 10,
    borderRadius: 10, // Rounded corners for input field
    width: '80%', // Less wide search bar, adjust this as needed
    alignSelf: 'center', // Center the search bar horizontally
    backgroundColor: '#2a2a2a', // Dark background for input
    color: '#ffffff', // White text color
    marginBottom: 20, // Space between the search bar and the search button
  },
  // Adjust the search button styles if you need to
  searchButton: {
    marginBottom: 20, // Space between the search button and the list
    marginHorizontal: 10, // Same horizontal margin as the movie items for alignment
    // Apply other styling as needed for the button
  },
  // ... other styles remain unchanged
});


export default MovieListScreen;

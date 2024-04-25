import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { fetchMovies, searchMovies, deleteMovie } from '../api'; // Ensure this path is correct

const MovieListScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

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

  const toggleDescription = (id) => {
    setSelectedMovieId(selectedMovieId === id ? null : id);
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Movie",
      "Are you sure you want to delete this movie?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDeleteMovie(id) }
      ],
      { cancelable: false }
    );
  };

  const handleDeleteMovie = async (id) => {
    try {
      const response = await deleteMovie(id);
      if (response.status === 204 || response.status === 200) {
        // Remove the movie from the state
        setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
        setSelectedMovieId(null);
        alert('Movie deleted successfully');
      } else {
        console.error('Delete failed:', response.status);
        alert('Failed to delete movie');
      }
    } catch (error) {
      console.error('Failed to delete movie:', error);
      alert('Error while deleting movie');
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
      <Button title="Search" onPress={handleSearch} color="#39ff14" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()} // Adjust according to your movie data structure
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.movieItemContainer} onPress={() => toggleDescription(item.id)}>
              <Text style={styles.movieItem}>{item.title}</Text>
            </TouchableOpacity>
            {selectedMovieId === item.id && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{item.description}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                  <Text style={styles.deleteButtonText}>Delete Movie</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  movieItemContainer: {
    backgroundColor: '#2a2a2a',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#39ff14',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
    marginHorizontal: 20,
  },
  movieItem: {
    fontSize: 18,
    color: '#ffffff',
    alignSelf: 'center',
  },
  descriptionContainer: {
    backgroundColor: '#333333',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#ffffff',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#39ff14',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#d9534f', // A softer red
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#ffffff', // White text color
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MovieListScreen;

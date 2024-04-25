import React, { useEffect, useState } from 'react';
import { Modal, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { fetchDirectors, fetchMoviesByDirector } from '../api.js'; // Ensure this path is correct
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const MovieRecommendationsScreen = () => {
  const [directors, setDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Get the navigation prop

  useEffect(() => {
    loadDirectors();
  }, []);

  const loadDirectors = async () => {
    try {
      const response = await fetchDirectors();
      setDirectors(response.data);
    } catch (error) {
      console.error('Failed to fetch directors:', error);
    }
  };

  const handleDirectorPress = async (directorId) => {
    setSelectedDirector(directorId);
    try {
      const response = await fetchMoviesByDirector(directorId);
      setMovies(response.data);
      setModalVisible(true);  // Open the modal on successful data fetch
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          style={styles.bannerImage}
          source={require('../img/reel2.png')}
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);  // Allows closing the modal when back button is pressed on Android
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.subtitle}>Suggested Movies:</Text>
            <FlatList
              data={movies}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <Text style={styles.movieItem}>{item.title}</Text>}
            />
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
        <Button
          title="Add Director"
          onPress={() => navigation.navigate('CreateDirectorScreen')}
          color="#39ff14" // Neon green color to match your design
        />
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
  modalView: {
    marginTop: 22,
    padding: 20,
    flex: 1,
    backgroundColor: '#1c1c1e', // Consistent background color with the main view
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text color for the title
    alignSelf: 'center', // Center title
    marginTop: 20,
    marginBottom: 20, // Space between the banner image and the title
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 30,  // Increased top margin for more space above the movies list
    marginBottom: 20,  // Increased bottom margin for more visual separation
  },
  movieItem: {
    fontSize: 18,
    paddingVertical: 15,  // Increased vertical padding for a more spacious look
    paddingLeft: 20,
    color: '#ffffff',
    borderBottomColor: '#393939',
    borderBottomWidth: 1,
    marginVertical: 8,  // Increased vertical margin between items
  },
  itemText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#ffffff',
  }
});

export default MovieRecommendationsScreen;

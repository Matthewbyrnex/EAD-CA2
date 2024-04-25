import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Movie Recommendation App!</Text>
      <Image
        style={styles.logo}
        source={{ uri: 'https://example.com/logo.png' }} // Replace with your actual logo URL
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.profileButton]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>My Watchlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.browseButton]}
          onPress={() => navigation.navigate('MovieList')} // This navigates to the movie list page
        >
          <Text style={styles.buttonText}>Browse Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.recommendationsButton]}
          onPress={() => navigation.navigate('MovieRecommendation')} // Ensure the navigation name matches your stack navigator
        >
          <Text style={styles.buttonText}>Movie Recommendations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap', // Allows buttons to wrap in smaller screens
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Adds space between wrapped buttons
  },
  profileButton: {
    backgroundColor: '#007bff',
  },
  browseButton: {
    backgroundColor: '#28a745',
  },
  recommendationsButton: {
    backgroundColor: '#ffc107', // Different color to distinguish the button
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

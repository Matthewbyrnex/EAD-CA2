import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Import local image if not using a direct path
// import reelImage from './path_to_your_image/reel.png'; // Uncomment and adjust if necessary

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Movie Recommendation App!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MovieList')}
        >
          <Text style={styles.buttonText}>Browse Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MovieRecommendation')}
        >
          <Text style={styles.buttonText}>Movie Recommendations</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.reelImage}
        source={require('../img/reel.png')} // Adjust this path if you use import
        // source={reelImage} // Use this line instead if importing
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1e',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20, // Adjust spacing as needed
  },
  button: {
    backgroundColor: '#2a2a2a',
    borderColor: '#39ff14',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reelImage: {
    width: 300, // Adjust based on your needs
    height: 150, // Adjust based on your needs
    resizeMode: 'contain', // Ensures the image fits within the dimensions without stretching
  },
});

export default HomeScreen;

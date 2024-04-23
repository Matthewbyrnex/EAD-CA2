import React from 'react';
import { View, Text } from 'react-native';

const MovieDetailsScreen = ({ route }) => {
  // Placeholder for movie details. In real app, you would get this from the API.
  const movie = route.params.movie;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{movie.title}</Text>
      {/* Display other movie details here */}
      <Text>{movie.director}</Text>
      <Text>{movie.description}</Text>
    </View>
  );
};

export default MovieDetailsScreen;

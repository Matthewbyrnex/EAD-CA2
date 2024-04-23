import React from 'react';
import { View, Text } from 'react-native';

const RecommendationsScreen = () => {
  // Placeholder for recommended movies. In real app, this would be fetched from API.
  const recommendations = ['Movie 1', 'Movie 2'];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Movie Recommendations</Text>
      {/* List recommendations here */}
      {recommendations.map((movie, index) => (
        <Text key={index}>{movie}</Text>
      ))}
    </View>
  );
};

export default RecommendationsScreen;

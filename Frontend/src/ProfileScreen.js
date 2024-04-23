import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  // Placeholder for user's favorite directors. In real app, this would be stateful.
  const favoriteDirectors = ['Director 1', 'Director 2'];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Favorite Directors</Text>
      {/* List directors here */}
      {favoriteDirectors.map((director, index) => (
        <Text key={index}>{director}</Text>
      ))}
      <Button
        title="Edit Directors"
        onPress={() => {/* Navigate to director selection */}}
      />
    </View>
  );
};

export default ProfileScreen;

import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const favoriteDirectors = ['Director 1', 'Director 2'];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Favorite Directors</Text>
      {favoriteDirectors.map((director, index) => (
        <Text key={index}>{director}</Text>
      ))}
      <Button
        title="Edit Directors"
        onPress={() => navigation.navigate('EditDirectors')}
      />
    </View>
  );
};

export default ProfileScreen;

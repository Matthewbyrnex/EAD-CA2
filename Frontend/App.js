import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import RecommendationsScreen from './src/RecommendationsScreen'; // Make sure the import is correct
import MovieDetailsScreen from './src/MovieDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

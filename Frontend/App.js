import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import MovieListScreen from './src/MovieListScreen'; // Make sure the import is correct
import MovieDetailsScreen from './src/MovieDetailsScreen';
// import LoginScreen from './src/LoginScreen'; // Import the Login Screen
import MovieRecommendationsScreen from './src/MovieRecommendationsScreen'; // Ensure the import is correct
import CreateDirectorScreen from './src/CreateDirectorScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="MovieList" component={MovieListScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="MovieRecommendation" component={MovieRecommendationsScreen} />
        <Stack.Screen name="CreateDirectorScreen" component={CreateDirectorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

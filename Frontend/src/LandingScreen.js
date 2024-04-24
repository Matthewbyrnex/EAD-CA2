import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MovieBuff</Text>
      <Button
        title="Log In"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Create Account')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default LandingScreen;

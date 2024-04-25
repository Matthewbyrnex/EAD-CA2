import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addDirectorAndMovie } from '../api'; // make sure to import the API function

const DirectorMovieModal = ({ visible, onClose }) => {
  const [directorName, setDirectorName] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');

  const handleAdd = async () => {
    // Data structure may need adjustment based on your API requirements
    const directorData = {
      name: directorName,
      movie: [{
        title: movieTitle,
        description: movieDescription
      }]
    };

    try {
      const response = await addDirectorAndMovie(directorData);
      console.log('Success:', response.data); // log or handle the response as needed
      onClose(); // Close modal after successful addition
      setDirectorName(''); // Clear the state
      setMovieTitle('');
      setMovieDescription('');
    } catch (error) {
      console.error('Failed to add director and movie:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Add Director and Movie</Text>
        <TextInput
          style={styles.input}
          placeholder="Director Name"
          value={directorName}
          onChangeText={setDirectorName}
        />
        <TextInput
          style={styles.input}
          placeholder="Movie Title"
          value={movieTitle}
          onChangeText={setMovieTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Movie Description"
          value={movieDescription}
          onChangeText={setMovieDescription}
          multiline
        />
        <Button
          title="Add"
          onPress={handleAdd}
          color="#39ff14" // Neon green to match your styling
        />
        <Button
          title="Cancel"
          onPress={onClose}
          color="#ff6347" // Tomato for cancel
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1e',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#2a2a2a',
    padding: 10,
    marginBottom: 10,
    color: '#ffffff',
    borderRadius: 10,
  }
});

export default DirectorMovieModal;

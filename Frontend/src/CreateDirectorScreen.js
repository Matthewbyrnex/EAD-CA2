import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchApi } from '../api';

const CreateDirectorScreen = ({ navigation }) => {
  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Director</Text>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async (values) => {
          try {
            const data = await fetchApi('api/Directors', 'POST', { Name: values.name });
            if (data) {
              navigation.navigate('MovieRecommendation');
            } else {
              showAlert('Failed to create director', 'No data received.');
            }
          } catch (error) {
            console.error('Creation error:', error);
            showAlert('Creation error', error.message);
          }
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required'),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Name"
              placeholderTextColor="#999" // Light gray for placeholder text
              style={styles.input}
            />
            {touched.name && errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
            <Button title="Create Director" onPress={handleSubmit} color="#39ff14" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1e', // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
    marginVertical: 20,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#39ff14', // Neon green border
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#2a2a2a', // Dark input field
    color: '#ffffff', // White text color
    marginBottom: 20,
  },
  errorText: {
    fontSize: 12,
    color: '#d9534f', // Soft red for errors
    marginBottom: 5,
  },
});

export default CreateDirectorScreen;

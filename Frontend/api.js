import axios from 'axios';

const api = axios.create({
    baseURL: 'http://movieproject.azurewebsites.net/api',
});

// Existing functions for fetching director and movie data
export const fetchDirectors = () => api.get('/directors');
export const fetchMoviesByDirector = (directorId) => api.get(`/Movies/${directorId}/suggestions`);
export const fetchDirectorDetails = (directorId) => api.get(`/directors/${directorId}`);
export const fetchMovies = () => api.get('/Movies', { headers: { 'Cache-Control': 'no-cache' } });
export const searchMovies = (query) => api.get(`/Movies/search?title=${encodeURIComponent(query)}`);
export const deleteMovie = (Id) => api.delete(`/Movies/${Id}`);  // Added delete method

// src/api/api.js

const API_URL = 'https://movieproject.azurewebsites.net';


export const fetchApi = async (endpoint, method, body = null) => {
  try {
    const response = await fetch(`https://movieproject.azurewebsites.net/${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your API needs
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (response.ok) {
      // Try to parse the JSON if there is a body, otherwise return an empty object
      const data = await response.text();
      const jsonData = data ? JSON.parse(data) : {};
      return { ok: true, data: jsonData };
    } else {
      // If the server responds with an error, handle it here
      const errorData = await response.text();
      const jsonError = errorData ? JSON.parse(errorData) : {};
      return { ok: false, error: jsonError.message || 'An error occurred' };
    }
  } catch (error) {
    // Catch any network or parsing errors
    return { ok: false, error: error.message };
  }
}

export default api;
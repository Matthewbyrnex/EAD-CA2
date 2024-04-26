import axios from 'axios';

const api = axios.create({
    baseURL: 'http://movieproject.azurewebsites.net/api',
});

export const fetchDirectors = () => api.get('/directors');
export const fetchMoviesByDirector = (directorId) => api.get(`/Movies/${directorId}/suggestions`);
export const fetchDirectorDetails = (directorId) => api.get(`/directors/${directorId}`);
export const fetchMovies = () => api.get('/Movies', { headers: { 'Cache-Control': 'no-cache' } });
export const searchMovies = (query) => api.get(`/Movies/search?title=${encodeURIComponent(query)}`);
export const deleteMovie = (Id) => api.delete(`/Movies/${Id}`);  // Added delete method

const API_URL = 'https://movieproject.azurewebsites.net';


export const fetchApi = async (endpoint, method, body = null) => {
  try {
    const response = await fetch(`https://movieproject.azurewebsites.net/${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (response.ok) {
      const data = await response.text();
      const jsonData = data ? JSON.parse(data) : {};
      return { ok: true, data: jsonData };
    } else {
      const errorData = await response.text();
      const jsonError = errorData ? JSON.parse(errorData) : {};
      return { ok: false, error: jsonError.message || 'An error occurred' };
    }
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export default api;
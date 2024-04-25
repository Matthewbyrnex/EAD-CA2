import axios from 'axios';

const api = axios.create({
    baseURL: 'http://movieproject.azurewebsites.net/api',
});

// Existing functions for fetching director and movie data
export const fetchDirectors = () => api.get('/directors');
export const fetchMoviesByDirector = (directorId) => api.get(`/Movies/${directorId}/suggestions`);
export const fetchDirectorDetails = (directorId) => api.get(`/directors/${directorId}`);
export const fetchMovies = () => api.get('/Movies');
export const searchMovies = (query) => api.get(`/Movies/search?title=${encodeURIComponent(query)}`);

export default api;

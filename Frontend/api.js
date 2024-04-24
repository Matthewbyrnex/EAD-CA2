import axios from 'axios';

const api = axios.create({
    baseURL: 'http://movieproject.azurewebsites.net/api',
});

export const fetchDirectors = () => api.get('/directors');
export const fetchMoviesByDirector = (directorId) => api.get(`/directors/${directorId}/suggestions`);
export const fetchDirectorDetails = (directorId) => api.get(`/directors/${directorId}`);
export const fetchMovies = () => api.get('/Movies');


export default api;

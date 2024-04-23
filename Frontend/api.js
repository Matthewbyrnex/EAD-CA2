// JavaScript source code
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://movieproject.azurewebsites.net/api',
});

export const fetchDirectors = () => api.get('/directors');
export const fetchMoviesByDirector = (directorId) => api.get(`/directors/${directorId}/suggestions`);

export default api;

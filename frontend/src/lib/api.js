import axios from 'axios';

const api = axios.create({
  baseURL: 'https://full-stack-movie-collection-manager.vercel.app/api'
});

export const getMovies = () => api.get('/movies');
export const createMovie = (movie) => api.post('/movies', movie);
export const updateMovie = (id, movie) => api.put(`/movies/${id}`, movie);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

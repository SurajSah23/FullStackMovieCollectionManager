import { useState, useEffect } from 'react';
import { Film, Plus } from 'lucide-react';
import MovieCard from './components/MovieCard';
import MovieForm from './components/MovieForm';
import * as api from './lib/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

export default function App() {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSubmit = async (movieData) => {
    try {
      if (editingMovie) {
        await api.updateMovie(editingMovie._id, movieData);
        toast.success('Movie updated successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await api.createMovie(movieData);
        toast.success('Movie added successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      }
      fetchMovies();
      setShowForm(false);
      setEditingMovie(null);
    } catch (error) {
      console.error('Error saving movie:', error);
      toast.error('Error saving movie!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
    toast.info('Edit the movie details!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.deleteMovie(id);
        fetchMovies();
        toast.success('Movie deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.error('Error deleting movie:', error);
        toast.error('Error deleting movie!', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleToggleWatched = async (id, watched) => {
    try {
      await api.updateMovie(id, { watched });
      fetchMovies();
      toast.success(watched ? 'Movie marked as watched!' : 'Movie marked as unwatched!', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error updating movie:', error);
      toast.error('Error updating movie!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleAddMovieClick = () => {
    toast.success('Add Movie Form is now visible!', {
      position: "top-right",
      autoClose: 3000,
    });
    setEditingMovie(null);
    setShowForm(!showForm);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Film className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Movie Collection
              </h1>
            </div>
            <button
              onClick={handleAddMovieClick} // Use new function for button click
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Movie
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {showForm && (
          <div className="mb-8 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {editingMovie ? 'Edit Movie' : 'Add New Movie'}
              </h2>
              <MovieForm
                onSubmit={handleSubmit}
                initialData={editingMovie}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleWatched={handleToggleWatched}
            />
          ))}
        </div>
      </main>

      {/* Render ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
}

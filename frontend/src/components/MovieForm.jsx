import { useState } from 'react';
import { Film } from 'lucide-react';
import PropTypes from 'prop-types'; // Import PropTypes

export default function MovieForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    director: initialData?.director || '',
    year: initialData?.year || new Date().getFullYear(),
    genre: initialData?.genre || '',
    rating: initialData?.rating || 0,
    watched: initialData?.watched || false,
    poster: initialData?.poster || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Director</label>
        <input
          type="text"
          value={formData.director}
          onChange={(e) => setFormData({ ...formData, director: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating (0-10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Poster URL</label>
          <input
            type="url"
            value={formData.poster}
            onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.watched}
          onChange={(e) => setFormData({ ...formData, watched: e.target.checked })}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Watched</label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Film className="w-5 h-5 mr-2" />
        {initialData ? 'Update Movie' : 'Add Movie'}
      </button>
    </form>
  );
}

// Define PropTypes for the component
MovieForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,  // onSubmit should be a function
  initialData: PropTypes.shape({      // initialData should be an object
    title: PropTypes.string,
    director: PropTypes.string,
    year: PropTypes.number,
    genre: PropTypes.string,
    rating: PropTypes.number,
    watched: PropTypes.bool,
    poster: PropTypes.string,
  }),
};

MovieForm.defaultProps = {
  initialData: {}, // Provide default props for initialData if none is passed
};

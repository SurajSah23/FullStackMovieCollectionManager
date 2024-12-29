import PropTypes from 'prop-types';
import { Pencil, Trash2, Eye, EyeOff, Star, Image } from 'lucide-react';

function MovieCard({ movie, onEdit, onDelete, onToggleWatched }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-[2/3] bg-gray-200">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-400" /> {/* Use Image icon */}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{movie.title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{movie.rating}/10</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">
          Directed by {movie.director} ({movie.year})
        </p>
        <p className="text-sm text-gray-500 mb-4">{movie.genre}</p>
        
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button
              onClick={() => onEdit(movie)}
              className="p-1 text-gray-600 hover:text-indigo-600"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(movie._id)}
              className="p-1 text-gray-600 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => onToggleWatched(movie._id, !movie.watched)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
              movie.watched
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {movie.watched ? (
              <>
                <Eye className="w-4 h-4" />
                <span>Watched</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Unwatched</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    watched: PropTypes.bool.isRequired,
    poster: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleWatched: PropTypes.func.isRequired,
};

export default MovieCard;

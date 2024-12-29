import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  watched: {
    type: Boolean,
    default: false
  },
  poster: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Movie', movieSchema);
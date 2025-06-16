const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  titleEn: String,
  image: String,
  rating: Number,
  year: String,
  genre: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  director: String,
  duration: String,
  description: String,
  cast: [String],
  videoUrl: String
});

module.exports = mongoose.model('Movie', movieSchema);
// controllers/movieController.js
const Movie = require('../models/Movie');
const Category = require('../models/Category');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('category');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('category');
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMoviesByCategory = async (req, res) => {
  try {
    const categoryDoc = await Category.findOne({ name: req.params.category });
    const query = !categoryDoc || req.params.category === 'All' ? {} : { category: categoryDoc._id };
    const movies = await Movie.find(query).populate('category');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { category, ...movieData } = req.body;
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) return res.status(400).json({ message: 'Invalid category' });
    const movie = new Movie({ ...movieData, category: categoryDoc._id });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

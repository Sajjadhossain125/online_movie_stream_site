// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.get('/category/:category', movieController.getMoviesByCategory);
router.post('/', movieController.createMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
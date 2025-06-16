import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [movie, setMovie] = useState({
    title: '',
    titleEn: '',
    image: '',
    rating: '',
    year: '',
    genre: '',
    category: '',
    director: '',
    duration: '',
    description: '',
    cast: '',
    videoUrl: ''
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch category list
    axios.get('http://localhost:3000/api/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      ...movie,
      rating: parseFloat(movie.rating),
      cast: movie.cast.split(',').map((c) => c.trim())
    };

    try {
      await axios.post('http://localhost:3000/api/movies', movieData);
      setMessage('Movie added successfully!');
      setMovie({
        title: '',
        titleEn: '',
        image: '',
        rating: '',
        year: '',
        genre: '',
        category: '',
        director: '',
        duration: '',
        description: '',
        cast: '',
        videoUrl: ''
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add movie.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Movie Title" value={movie.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="titleEn" placeholder="English Title" value={movie.titleEn} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="image" placeholder="Image URL" value={movie.image} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" step="0.1" name="rating" placeholder="Rating (e.g. 8.5)" value={movie.rating} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="year" placeholder="Year" value={movie.year} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="genre" placeholder="Genre" value={movie.genre} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="category" value={movie.category} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="duration" placeholder="Duration (e.g. 2h 15m)" value={movie.duration} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={movie.description} onChange={handleChange} className="w-full p-2 border rounded" rows="3" />
        <input type="text" name="cast" placeholder="Cast (comma separated)" value={movie.cast} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="videoUrl" placeholder="Video URL" value={movie.videoUrl} onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Movie</button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default MovieForm;

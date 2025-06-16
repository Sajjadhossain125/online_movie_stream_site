// src/components/MovieApp.jsx
import { useState, useEffect } from "react";
import axios from "axios";

// Simplified Movie Card
function MovieCard({ movie }) {
  return (
    <div className="bg-white/10 p-4 rounded-lg text-white">
      <img src={movie.image} alt={movie.titleEn} className="h-48 w-full object-cover rounded-md mb-2" />
      <h3 className="text-lg font-bold">{movie.title}</h3>
      <p className="text-sm text-white/70">{movie.titleEn}</p>
      <p className="text-sm">{movie.genre} | {movie.year}</p>
      <p className="text-xs">{movie.rating}⭐</p>
    </div>
  );
}

export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 Movies</h1>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Play, Heart, Star, Calendar, Film } from 'lucide-react';

export default function MovieList() {
  const [groupedMovies, setGroupedMovies] = useState({});

  useEffect(() => {
    fetch('${process.env.REACT_APP_API_URL}/api/movies')
      .then(res => res.json())
      .then(data => {
        const grouped = {};
        data.forEach(movie => {
          const categoryName = movie.category?.name || 'Uncategorized';
          if (!grouped[categoryName]) {
            grouped[categoryName] = [];
          }
          grouped[categoryName].push(movie);
        });
        setGroupedMovies(grouped);
      })
      .catch(err => console.error('Error fetching movies:', err));
  }, []);

  const handleMovieClick = (movieId) => {
    // Replace with your routing logic: navigate(`/movie/${movieId}`)
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="container mx-auto">
        {Object.entries(groupedMovies).map(([category, movies]) => (
          <div key={category} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-purple-500/20 pb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map(movie => (
                <div
                  key={movie._id}
                  onClick={() => handleMovieClick(movie._id)}
                  className="group block cursor-pointer"
                >
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="relative">
                      <img
                        src={movie.image || 'https://via.placeholder.com/300x180.png?text=No+Image'}
                        alt={movie.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`Watch movie: ${movie.title}`);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg"
                          >
                            <Play className="w-4 h-4" />
                            Watch
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`Favorite movie: ${movie.title}`);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30"
                          >
                            <Heart className="w-4 h-4" />
                            Favorite
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-300 transition-colors duration-200 line-clamp-2">
                        {movie.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {movie.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        {movie.genre && (
                          <div className="flex items-center gap-1 text-purple-300 text-sm">
                            <Film className="w-4 h-4" />
                            <span>{movie.genre}</span>
                          </div>
                        )}
                        {movie.year && (
                          <div className="flex items-center gap-1 text-green-400 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{movie.year}</span>
                          </div>
                        )}
                        {movie.rating && (
                          <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            <Star className="w-4 h-4" />
                            <span>{movie.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Mobile buttons - shown on smaller screens */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Watch movie: ${movie.title}`);
                          }}
                          className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg flex-1 justify-center"
                        >
                          <Play className="w-4 h-4" />
                          Watch
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Favorite movie: ${movie.title}`);
                          }}
                          className="flex items-center gap-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

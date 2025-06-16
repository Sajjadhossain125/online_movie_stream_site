import React, { useEffect, useState } from 'react';
import { Search, Film, Tag, ChevronRight } from 'lucide-react';

import Containers from '../../components/containes/Containers'

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));

    fetch('http://localhost:3000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Error fetching movies:', err));
  }, []);

  // Update suggestions on query change
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (!query) {
      setSuggestions([]);
      return;
    }

    const filtered = movies.filter(movie =>
      movie.titleEn?.toLowerCase().includes(query) ||
      movie.category?.tags?.some(tag => tag.toLowerCase().includes(query))
    );

    setSuggestions(filtered.slice(0, 5)); // limit to 5
  }, [searchQuery, movies]);

  const handleSelect = (movieId) => {
    // Replace with your actual navigation logic
    window.location.href = `/movie/${movieId}`;
    // Or if using React Router: navigate(`/movie/${movieId}`);
    setSearchQuery('');
    setSuggestions([]);
    setIsSearchFocused(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow click on suggestions
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section with Search */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10 shadow-2xl relative z-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Movie Hub
            </h1>
            <p className="text-gray-300 text-lg">
              Discover amazing movies across all genres
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <label htmlFor="search" className="block text-white font-semibold mb-3 text-lg">
              Search Movies
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search movies or category tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg relative z-10"
              />
              {isSearchFocused && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 pointer-events-none animate-pulse z-0"></div>
              )}
            </div>

            {/* Enhanced Suggestion Dropdown - Fixed z-index */}
            {suggestions.length > 0 && (searchQuery.length > 0) && isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl z-[100] overflow-hidden">
                {suggestions.map((movie) => (
                  <div
                    key={movie._id}
                    onMouseDown={() => handleSelect(movie._id)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors duration-200 group"
                  >
                    <Film className="w-5 h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
                    <span className="text-white group-hover:text-purple-300 flex-1 truncate">
                      {movie.titleEn || movie.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10 relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6 text-purple-400" />
              Browse Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div 
                  key={category._id}
                  className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-200">
                    {category.name}
                  </h3>
                  {category.tags && category.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {category.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 bg-purple-600/30 text-purple-200 rounded-full text-sm border border-purple-500/20 hover:bg-purple-600/40 transition-colors duration-200 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Movies Container */}
        <div className="relative z-0">
          <Containers searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
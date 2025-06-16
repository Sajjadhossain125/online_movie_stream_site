import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Star, ArrowLeft } from "lucide-react";

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Star Rating Component
function StarRating({ rating, size = "w-4 h-4", showValue = false, justify = "center" }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className={`flex items-${justify}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= fullStars 
                ? 'text-yellow-400 fill-yellow-400' 
                : star === fullStars + 1 && hasHalfStar
                ? 'text-yellow-400 fill-yellow-200'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-2 font-semibold text-white">
          {rating}/5
        </span>
      )}
    </div>
  );
}

// Movie Card Component
function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={() => onClick(movie)}
      className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:bg-white/15 cursor-pointer group"
    >
      <div className="relative">
        <img 
          src={movie.image}
          alt={movie.titleEn}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400/6366f1/ffffff?text=Movie+Poster';
          }}
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {movie.rating}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-white/70 mb-3 truncate">
          {movie.titleEn}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={movie.rating} />
          <span className="text-sm font-semibold text-white">
            {movie.rating}/5
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {movie.genre}
          </span>
          <span className="text-white/80 font-medium">
            {movie.year}
          </span>
        </div>
      </div>
    </div>
  );
}

// Category Filter Component
function CategoryFilter({ categories, selectedCategory, onCategoryChange, movieCount }) {
  return (
    <div className="text-center mb-8">
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category._id || category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm'
            }`}
          >
            {category.name || category}
          </button>
        ))}
      </div>
      
      <p className="text-white/70 text-sm">
        {movieCount} movies found in {selectedCategory} category
      </p>
    </div>
  );
}

// Category Section Component
function CategorySection({ category, movies, onMovieClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerView = 4;
  const totalSlides = Math.ceil(movies.length / moviesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentMovies = () => {
    const start = currentIndex * moviesPerView;
    return movies.slice(start, start + moviesPerView);
  };

  if (movies.length === 0) return null;

  const getCategoryStyle = (category) => {
    const styles = {
      "Bollywood": "from-gray-600 to-red-600",
      "Hollywood": "from-blue-600 to-purple-600", 
      "Anime": "from-pink-600 to-purple-600",
      "Action": "from-red-600 to-orange-600",
      "Comedy": "from-yellow-600 to-orange-600",
      "Drama": "from-gray-600 to-blue-600",
      "Romance": "from-pink-600 to-red-600",
      "Thriller": "from-gray-700 to-red-700"
    };
    return styles[category] || "from-indigo-600 to-purple-600";
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className={`text-2xl font-bold bg-gradient-to-r ${getCategoryStyle(category)} bg-clip-text text-transparent`}>
            {category}
          </h2>
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
            {movies.length} movies
          </span>
        </div>
        
        {movies.length > moviesPerView && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>

      <div className={`bg-gradient-to-r ${getCategoryStyle(category)}/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {getCurrentMovies().map((movie) => (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onClick={onMovieClick}
            />
          ))}
        </div>

        {movies.length > moviesPerView && totalSlides > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? `bg-gradient-to-r ${getCategoryStyle(category)} shadow-lg` 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Video Player Component
function VideoPlayer({ movie }) {
  return (
    <div className="mt-12 mb-8">
      <h3 className="text-2xl font-bold mb-4">Watch Movie</h3>
      <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        {movie.videoUrl ? (
          <div className="aspect-video">
            <iframe
              src={movie.videoUrl}
              className="w-full h-full rounded-xl"
              allowFullScreen
              title={movie.titleEn}
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Play className="w-16 h-16 text-white mx-auto mb-4" />
              <p className="text-white text-lg">Video will be available soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Related Movies Component
function RelatedMovies({ currentMovie, allMovies, onMovieSelect }) {
  const relatedMovies = allMovies
    .filter(movie => 
      movie._id !== currentMovie._id && 
      (movie.genre === currentMovie.genre || movie.category === currentMovie.category)
    )
    .slice(0, 4);

  if (relatedMovies.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Related Movies</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedMovies.map((movie) => (
          <MovieCard 
            key={movie._id} 
            movie={movie} 
            onClick={onMovieSelect}
          />
        ))}
      </div>
    </div>
  );
}

// Movie Details Component
function MovieDetails({ movie, onBack, allMovies, onMovieSelect }) {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen text-white">
      <div className="p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Movies
        </button>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img
              src={movie.image}
              alt={movie.titleEn}
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Movie+Poster';
              }}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <h2 className="text-2xl text-white/80 mb-4">{movie.titleEn}</h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <StarRating rating={movie.rating} size="w-5 h-5" showValue={true} justify="start" />
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full text-sm">
                  {movie.genre}
                </span>
                <span className="text-white/80">{movie.year}</span>
                {movie.duration && <span className="text-white/80">{movie.duration}</span>}
              </div>
            </div>

            {movie.director && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Director</h3>
                <p className="text-white/80">{movie.director}</p>
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.description && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-white/80 leading-relaxed">{movie.description}</p>
              </div>
            )}
          </div>
        </div>

        <VideoPlayer movie={movie} />
        <RelatedMovies 
          currentMovie={movie} 
          allMovies={allMovies} 
          onMovieSelect={onMovieSelect}
        />
      </div>
    </div>
  );
}

// Main Movie App Component
export default function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch movies and categories simultaneously
        const [moviesResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/movies`),
          fetch(`${API_BASE_URL}/categories`)
        ]);

        if (!moviesResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const moviesData = await moviesResponse.json();
        const categoriesData = await categoriesResponse.json();

        setMovies(moviesData);
        
        // Add "All" category and extract category names
        const categoryNames = ['All', ...categoriesData.map(cat => cat.name || cat)];
        setCategories(categoryNames);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load movies. Please make sure your backend server is running on port 3000.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackToMovies = () => {
    setSelectedMovie(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter movies by category
  const getFilteredMovies = () => {
    if (selectedCategory === 'All') {
      return movies;
    }
    return movies.filter(movie => {
      // Handle both ObjectId references and string categories
      if (typeof movie.category === 'object' && movie.category.name) {
        return movie.category.name === selectedCategory;
      }
      return movie.category === selectedCategory;
    });
  };

  // Group movies by category for category sections
  const getMoviesByCategory = () => {
    const categorizedMovies = {};
    const filteredCategories = categories.filter(cat => cat !== "All");
    
    filteredCategories.forEach(category => {
      categorizedMovies[category] = movies.filter(movie => {
        if (typeof movie.category === 'object' && movie.category.name) {
          return movie.category.name === category;
        }
        return movie.category === category;
      });
    });
    
    return categorizedMovies;
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading movies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If a movie is selected, show movie details
  if (selectedMovie) {
    return (
      <MovieDetails 
        movie={selectedMovie} 
        onBack={handleBackToMovies} 
        allMovies={movies}
        onMovieSelect={handleMovieClick}
      />
    );
  }

  const filteredMovies = getFilteredMovies();
  const categorizedMovies = getMoviesByCategory();

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Moovi.SH
          </h1>
          <p className="text-white/70 text-lg">
            Discover and watch amazing movies
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          movieCount={filteredMovies.length}
        />

        {/* Movies Display */}
        {selectedCategory === 'All' ? (
          // Show category sections when "All" is selected
          <div className="space-y-8">
            {Object.entries(categorizedMovies).map(([category, categoryMovies]) => (
              <CategorySection
                key={category}
                category={category}
                movies={categoryMovies}
                onMovieClick={handleMovieClick}
              />
            ))}
          </div>
        ) : (
          // Show filtered movies grid for specific category
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard 
                key={movie._id} 
                movie={movie} 
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/70 text-xl">
              No movies found in {selectedCategory} category
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-white/10">
          <p className="text-white/50">
            Enjoy your movie experience with Moovi.SH
          </p>
        </div>
      </div>
    </div>
  );
}
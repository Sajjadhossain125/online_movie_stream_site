import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ 
  movies, 
  currentIndex, 
  onPrevSlide, 
  onNextSlide, 
  onMovieClick,
  onPageChange 
}) {
  const moviesPerPage = 4;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const showArrows = movies.length > moviesPerPage;

  const getCurrentMovies = () => {
    const startIndex = currentIndex * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    return movies.slice(startIndex, endIndex);
  };

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70 text-lg">
          No movies found in this category
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showArrows && (
        <button
          onClick={onPrevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full shadow-xl p-3 hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Right Arrow */}
      {showArrows && (
        <button
          onClick={onNextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full shadow-xl p-3 hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Movie Cards Grid */}
      <div className={`${showArrows ? 'mx-16' : 'mx-0'} transition-all duration-300`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getCurrentMovies().map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={onMovieClick}
            />
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      {showArrows && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg transform scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
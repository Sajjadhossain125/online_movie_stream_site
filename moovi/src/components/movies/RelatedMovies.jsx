export default function RelatedMovies({ currentMovie, allMovies, onMovieSelect }) {
    // Get related movies from the same category
    const getRelatedMovies = () => {
      return allMovies
        .filter(m => m.category === currentMovie.category && m.id !== currentMovie.id)
        .slice(0, 6);
    };
  
    const relatedMovies = getRelatedMovies();
  
    if (relatedMovies.length === 0) {
      return null;
    }
  
    return (
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Related Movies from {currentMovie.category}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onMovieSelect(movie)}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={movie.image}
                alt={movie.titleEn}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-semibold text-sm truncate text-white">{movie.title}</h4>
                <p className="text-xs text-white/70 truncate">{movie.titleEn}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-1 rounded-full text-white">
                    {movie.rating}
                  </span>
                  <span className="text-xs text-white/70">{movie.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
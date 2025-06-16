import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Star, Calendar, User, Film, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieAndRelated = async () => {
      try {
        // Fetch current movie details
        const movieResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${id}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch all movies to find related ones
        const allMoviesResponse = await fetch('${process.env.REACT_APP_API_URL}/api/movies');
        const allMoviesData = await allMoviesResponse.json();

        // Filter related movies based on same category, excluding current movie
        const currentMovieCategory = movieData.category?.name;
        const related = allMoviesData.filter(m => 
          m._id !== movieData._id && 
          m.category?.name === currentMovieCategory
        ).slice(0, 6); // Limit to 6 related movies

        setRelatedMovies(related);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieAndRelated();
    }
  }, [id]);

  const getEmbedUrl = (videoUrl) => {
    if (!videoUrl) return '';
    
    if (videoUrl.includes('youtube.com/watch')) {
      const videoId = videoUrl.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    if (videoUrl.includes('youtu.be/')) {
      const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    if (videoUrl.includes('vimeo.com/')) {
      const videoId = videoUrl.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    return videoUrl;
  };

  const scrollRelatedMovies = (direction) => {
    const container = document.getElementById('related-movies-container');
    const scrollAmount = 320;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Movie not found</p>
          <Link to="/" className="text-purple-300 hover:text-purple-400 mt-4 inline-block">
            ← Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white hover:text-purple-300 transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-lg">Back to Movies</span>
        </Link>

        {/* Video Player Section */}
        {showPlayer && movie.videoUrl && (
          <div className="mb-8 bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animate-fadeIn">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={getEmbedUrl(movie.videoUrl)}
                title={movie.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button
              onClick={() => setShowPlayer(false)}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              Close Player
            </button>
          </div>
        )}

        {/* Movie Details Card */}
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-12">
          <div className="md:flex">
            {/* Movie Poster */}
            <div className="md:w-1/3 lg:w-1/4">
              <img 
                src={movie.image || 'https://via.placeholder.com/400x600.png?text=No+Image'} 
                alt={movie.title}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            {/* Movie Information */}
            <div className="md:w-2/3 lg:w-3/4 p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {movie.title}
                </h1>
                {movie.titleEn && movie.titleEn !== movie.title && (
                  <p className="text-xl text-purple-300 mb-2">
                    {movie.titleEn}
                  </p>
                )}
                <p className="text-lg text-gray-400">
                  {movie.year} • {movie.category?.name || 'Uncategorized'}
                </p>
              </div>

              {/* Movie Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {movie.rating && (
                  <div className="flex items-center gap-2 text-white">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{movie.rating}</span>
                  </div>
                )}
                {movie.duration && (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span>{movie.duration}</span>
                  </div>
                )}
                {movie.year && (
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span>{movie.year}</span>
                  </div>
                )}
                {movie.genre && (
                  <div className="flex items-center gap-2 text-white">
                    <Film className="w-5 h-5 text-purple-400" />
                    <span>{movie.genre}</span>
                  </div>
                )}
              </div>

              {/* Director */}
              {movie.director && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Director</h3>
                  </div>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
              )}

              {/* Description */}
              {movie.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                </div>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm border border-purple-500/20"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {movie.videoUrl && (
                  <button
                    onClick={() => setShowPlayer(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Watch Movie
                  </button>
                )}
                
                {movie.videoUrl && (
                  <button
                    onClick={() => window.open(movie.videoUrl, "_blank")}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30"
                  >
                    <Play className="w-5 h-5" />
                    Open in New Tab
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Movies Section */}
        {relatedMovies.length > 0 && (
          <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                More from {movie.category?.name || 'This Category'}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollRelatedMovies('left')}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollRelatedMovies('right')}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div 
              id="related-movies-container"
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {relatedMovies.map((relatedMovie) => (
                <Link
                  key={relatedMovie._id}
                  to={`/movie/${relatedMovie._id}`}
                  className="flex-shrink-0 w-72 bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105 no-underline"
                >
                  <div className="flex">
                    <img
                      src={relatedMovie.image || 'https://via.placeholder.com/96x144.png?text=No+Image'}
                      alt={relatedMovie.title}
                      className="w-24 h-36 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <h3 className="text-white font-semibold mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
                        {relatedMovie.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{relatedMovie.year}</p>
                      {relatedMovie.rating && (
                        <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{relatedMovie.rating}</span>
                        </div>
                      )}
                      <p className="text-gray-400 text-xs line-clamp-2">{relatedMovie.genre}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

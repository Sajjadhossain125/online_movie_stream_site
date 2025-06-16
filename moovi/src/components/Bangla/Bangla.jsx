import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

export default function MovieSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    // Bangla Movies
    {
      id: 1,
      title: "অপরাজিত",
      titleEn: "Aparajito",
      image: "https://images.unsplash.com/photo-1489599162714-3a2c76e9b1c8?w=200&h=280&fit=crop&crop=center",
      rating: 4.8,
      year: "1956",
      genre: "Drama",
      category: "Bangla",
      director: "Satyajit Ray",
      duration: "110 min",
      description: "The second film in Satyajit Ray's Apu Trilogy follows Apu's journey from childhood to adolescence in rural Bengal.",
      cast: ["Pinaki Sengupta", "Smaran Ghosal", "Karuna Banerjee"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 2,
      title: "পথের পাঁচালী",
      titleEn: "Pather Panchali",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&h=280&fit=crop&crop=center",
      rating: 4.9,
      year: "1955",
      genre: "Drama",
      category: "Bangla",
      director: "Satyajit Ray",
      duration: "125 min",
      description: "The first film in the Apu Trilogy, depicting the childhood of Apu in rural Bengal.",
      cast: ["Subir Banerjee", "Kanu Banerjee", "Karuna Banerjee"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    // Indian Movies
    {
      id: 3,
      title: "3 Idiots",
      titleEn: "3 Idiots",
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=280&fit=crop&crop=center",
      rating: 4.7,
      year: "2009",
      genre: "Comedy",
      category: "Indian",
      director: "Rajkumar Hirani",
      duration: "170 min",
      description: "A comedy-drama about three engineering students and their journey through college life.",
      cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 4,
      title: "Dangal",
      titleEn: "Dangal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop&crop=center",
      rating: 4.6,
      year: "2016",
      genre: "Sports",
      category: "Indian",
      director: "Nitesh Tiwari",
      duration: "161 min",
      description: "A biographical sports drama about wrestler Mahavir Singh Phogat who trains his daughters to become wrestlers.",
      cast: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    // Hollywood Movies
    {
      id: 5,
      title: "The Shawshank Redemption",
      titleEn: "The Shawshank Redemption",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=280&fit=crop&crop=center",
      rating: 4.9,
      year: "1994",
      genre: "Drama",
      category: "Hollywood",
      director: "Frank Darabont",
      duration: "142 min",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    {
      id: 6,
      title: "Interstellar",
      titleEn: "Interstellar",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=280&fit=crop&crop=center",
      rating: 4.8,
      year: "2014",
      genre: "Sci-Fi",
      category: "Hollywood",
      director: "Christopher Nolan",
      duration: "169 min",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    // Bollywood Movies
    {
      id: 7,
      title: "Lagaan",
      titleEn: "Lagaan",
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200&h=280&fit=crop&crop=center",
      rating: 4.7,
      year: "2001",
      genre: "Drama",
      category: "Bollywood",
      director: "Ashutosh Gowariker",
      duration: "224 min",
      description: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
      cast: ["Aamir Khan", "Gracy Singh", "Rachel Shelley"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    // Chinese Movies
    {
      id: 8,
      title: "Hero",
      titleEn: "Hero",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&h=280&fit=crop&crop=center",
      rating: 4.5,
      year: "2002",
      genre: "Action",
      category: "Chinese",
      director: "Zhang Yimou",
      duration: "120 min",
      description: "A defense officer tells the story of the fall of a legendary warrior in ancient China.",
      cast: ["Jet Li", "Tony Leung", "Maggie Cheung"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    },
    // Thai Movies
    {
      id: 9,
      title: "Ong Bak",
      titleEn: "Ong Bak",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=280&fit=crop&crop=center",
      rating: 4.3,
      year: "2003",
      genre: "Action",
      category: "Thailand",
      director: "Prachya Pinkaew",
      duration: "105 min",
      description: "A young fighter travels to Bangkok to retrieve a stolen Buddha statue and prove his worth.",
      cast: ["Tony Jaa", "Petchtai Wongkamlao", "Pumwaree Yodkamol"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
    },
    // Animation
    {
      id: 10,
      title: "Spirited Away",
      titleEn: "Spirited Away",
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=280&fit=crop&crop=center",
      rating: 4.8,
      year: "2001",
      genre: "Fantasy",
      category: "Animation",
      director: "Hayao Miyazaki",
      duration: "125 min",
      description: "A young girl enters a world ruled by gods and witches where humans are changed into beasts.",
      cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
    },
    // Web Series
    {
      id: 11,
      title: "Sacred Games",
      titleEn: "Sacred Games",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=280&fit=crop&crop=center",
      rating: 4.6,
      year: "2018",
      genre: "Thriller",
      category: "Web Series",
      director: "Anurag Kashyap",
      duration: "60 min/episode",
      description: "A policeman, a criminal overlord, a Bollywood film star, and others chasing their own interests collide in this series.",
      cast: ["Saif Ali Khan", "Nawazuddin Siddiqui", "Radhika Apte"],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
    }
  ];

  const categories = ["All", "Bangla", "Indian", "Hollywood", "Bollywood", "Chinese", "Thailand", "Animation", "Web Series"];

  // Filter movies based on selected category
  const getFilteredMovies = () => {
    if (selectedCategory === "All") {
      return movies;
    }
    return movies.filter(movie => movie.category === selectedCategory);
  };

  const filteredMovies = getFilteredMovies();
  const moviesPerPage = 4;
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const showArrows = filteredMovies.length > moviesPerPage;

  // Reset current index when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const getCurrentMovies = () => {
    const startIndex = currentIndex * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    return filteredMovies.slice(startIndex, endIndex);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= fullStars 
                ? 'text-yellow-400 fill-yellow-400' 
                : star === fullStars + 1 && hasHalfStar
                ? 'text-yellow-400 fill-yellow-200'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // If a movie is selected, show the movie details component
  if (selectedMovie) {
    return <MovieDetailsPage movie={selectedMovie} onBack={() => setSelectedMovie(null)} allMovies={movies} />;
  }

  return (
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <div className="relative w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Moovi.SH
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Results Counter */}
          <p className="text-white/70 text-sm">
            {filteredMovies.length} movies found in {selectedCategory} category
          </p>
        </div>

        {/* Left Arrow */}
        {showArrows && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full shadow-xl p-3 hover:bg-white transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Right Arrow */}
        {showArrows && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full shadow-xl p-3 hover:bg-white transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Movie Cards Grid */}
        <div className={`${showArrows ? 'mx-16' : 'mx-0'} transition-all duration-300`}>
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getCurrentMovies().map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-105 transform hover:bg-white/15 cursor-pointer group"
                >
                  {/* Movie Poster */}
                  <div className="relative">
                    <img 
                      src={movie.image}
                      alt={movie.titleEn}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {movie.rating}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  {/* Movie Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-white/70 mb-3 truncate">
                      {movie.titleEn}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-between mb-3">
                      {renderStars(movie.rating)}
                      <span className="text-sm font-semibold text-white">
                        {movie.rating}/5
                      </span>
                    </div>
                    
                    {/* Additional Info */}
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">
                No movies found in this category
              </p>
            </div>
          )}
        </div>

        {/* Slide Indicators */}
        {showArrows && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
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
    </div>
  );
}

// Movie Details Page Component
function MovieDetailsPage({ movie, onBack, allMovies }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Get related movies from the same category
  const getRelatedMovies = () => {
    return allMovies
      .filter(m => m.category === movie.category && m.id !== movie.id)
      .slice(0, 6);
  };

  const relatedMovies = getRelatedMovies();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= fullStars 
                ? 'text-yellow-400 fill-yellow-400' 
                : star === fullStars + 1 && hasHalfStar
                ? 'text-yellow-400 fill-yellow-200'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen text-white">
      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Movies
        </button>
      </div>

      {/* Movie Details Section */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <img
              src={movie.image}
              alt={movie.titleEn}
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <h2 className="text-2xl text-white/80 mb-4">{movie.titleEn}</h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {renderStars(movie.rating)}
                  <span className="font-semibold">{movie.rating}/5</span>
                </div>
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full text-sm">
                  {movie.genre}
                </span>
                <span className="text-white/80">{movie.year}</span>
                <span className="text-white/80">{movie.duration}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Director</h3>
              <p className="text-white/80">{movie.director}</p>
            </div>

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

            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-white/80 leading-relaxed">{movie.description}</p>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Watch Movie</h3>
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            {!isPlaying ? (
              <div className="relative">
                <img
                  src={movie.image}
                  alt={movie.titleEn}
                  className="w-full h-96 object-cover opacity-50"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/30 transition-all duration-300 group"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-12 h-12 text-white ml-1" />
                  </div>
                </button>
              </div>
            ) : (
              <video
                controls
                autoPlay
                className="w-full h-96"
                poster={movie.image}
              >
                <source src={movie.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Related Movies Section */}
        {relatedMovies.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Related Movies from {movie.category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedMovies.map((relatedMovie) => (
                <div
                  key={relatedMovie.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={relatedMovie.image}
                    alt={relatedMovie.titleEn}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm truncate">{relatedMovie.title}</h4>
                    <p className="text-xs text-white/70 truncate">{relatedMovie.titleEn}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-1 rounded-full">
                        {relatedMovie.rating}
                      </span>
                      <span className="text-xs text-white/70">{relatedMovie.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import './Indian.css'

export default function IndianSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const movies = [
    {
      id: 1,
      title: "অপরাজিত",
      titleEn: "Aparajito",
      image: "https://images.unsplash.com/photo-1489599162714-3a2c76e9b1c8?w=200&h=280&fit=crop&crop=center",
      rating: 4.8,
      year: "১৯৫৬",
      genre: "ক্লাসিক"
    },
    {
      id: 2,
      title: "পথের পাঁচালী",
      titleEn: "Pather Panchali",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&h=280&fit=crop&crop=center",
      rating: 4.9,
      year: "১৯৫৫",
      genre: "ড্রামা"
    },
    {
      id: 3,
      title: "চারুলতা",
      titleEn: "Charulata",
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=200&h=280&fit=crop&crop=center",
      rating: 4.7,
      year: "১৯৬৪",
      genre: "রোমান্স"
    },
    {
      id: 4,
      title: "দেবী",
      titleEn: "Devi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop&crop=center",
      rating: 4.6,
      year: "১৯৬০",
      genre: "ড্রামা"
    },
    {
      id: 5,
      title: "অশনি সংকেত",
      titleEn: "Ashani Sanket",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=280&fit=crop&crop=center",
      rating: 4.5,
      year: "১৯৭৩",
      genre: "ইতিহাস"
    },
    {
      id: 6,
      title: "কাঞ্চনজঙ্ঘা",
      titleEn: "Kanchenjungha",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200&h=280&fit=crop&crop=center",
      rating: 4.4,
      year: "১৯৬২",
      genre: "পারিবারিক"
    }
  ];

  const moviesPerPage = 4;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const showArrows = movies.length > moviesPerPage;

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
    return movies.slice(startIndex, endIndex);
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

  return (
    <div className="flex items-center justify-center  p-8">
      <div className="relative w-full bg-color max-w-7xl">
      <div className="slidebar">
       <h2 className="text-2xl font-bold text-center mb-6 text-white">
       Indian Film  </h2>
       </div>
       <br />
       <br />
        {/* Left Arrow - Only show if more than 4 movies */}
        {showArrows && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Right Arrow - Only show if more than 4 movies */}
        {showArrows && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Movie Cards Grid */}
        <div className={`${showArrows ? 'mx-16' : 'mx-0'} transition-all duration-300`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getCurrentMovies().map((movie) => (
              <div
                key={movie.id}
                className="rounded-2xl shadow-2xl border border-red-500 overflow-hidden hover:shadow-3xl transition-shadow duration-300 hover:scale-105 transform transition-transform"
              >
                {/* Movie Poster */}
                <div className="relative">
                  <img 
                    src={movie.image}
                    alt={movie.titleEn}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {movie.rating}
                  </div>
                </div>
                
                {/* Movie Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-white mb-3 truncate">
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
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {movie.genre}
                    </span>
                    <span className="text-white font-medium">
                      {movie.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators - Only show if more than 4 movies */}
        {showArrows && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Page Counter - Only show if more than 4 movies */}
      </div>
    </div>
  );
}
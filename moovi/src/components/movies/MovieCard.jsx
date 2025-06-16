import { Play } from "lucide-react";
import StarRating from "./StarRating";



export default function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={() => onClick(movie)}
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
          <StarRating rating={movie.rating} />
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
  );
}
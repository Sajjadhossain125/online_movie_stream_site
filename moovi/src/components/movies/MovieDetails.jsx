import { ChevronLeft } from "lucide-react";
import StarRating from "./StarRating";
import VideoPlayer from "./VideoPlayer";
import RelatedMovies from "./RelatedMovies";

export default function MovieDetails({ movie, onBack, allMovies, onMovieSelect }) {
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
                <StarRating rating={movie.rating} size="w-5 h-5" showValue={true} justify="start" />
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
        <VideoPlayer movie={movie} />

        {/* Related Movies Section */}
        <RelatedMovies 
          currentMovie={movie} 
          allMovies={allMovies} 
          onMovieSelect={onMovieSelect}
        />
      </div>
    </div>
  );
}
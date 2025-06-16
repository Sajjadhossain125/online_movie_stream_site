import { useState } from "react";
import { Play } from "lucide-react";

export default function VideoPlayer({ movie }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
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
  );
}
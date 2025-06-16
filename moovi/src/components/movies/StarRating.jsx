import { Star } from "lucide-react";

export default function StarRating({ rating, size = "w-4 h-4", showValue = false, justify = "center" }) {
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
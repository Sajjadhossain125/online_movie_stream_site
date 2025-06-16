export default function CategoryFilter({ categories, selectedCategory, onCategoryChange, movieCount }) {
    return (
      <div className="text-center mb-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
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
          {movieCount} movies found in {selectedCategory} category
        </p>
      </div>
    );
  }
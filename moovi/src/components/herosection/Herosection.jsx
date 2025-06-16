import React, { useState } from 'react'

export default function Herosection() {
  const [activeCategory, setActiveCategory] = useState('Bangladesh')
  
  const categories = [
    { name: 'Bangladesh', emoji: '🇧🇩', color: 'from-green-500 to-red-500' },
    { name: 'Indian', emoji: '🇮🇳', color: 'from-orange-500 to-green-500' },
    { name: 'Chinese', emoji: '🇨🇳', color: 'from-red-500 to-yellow-500' },
    { name: 'English', emoji: '🇺🇸', color: 'from-blue-500 to-red-500' },
    { name: 'Bollywood', emoji: '🎬', color: 'from-purple-500 to-pink-500' }
  ]

  return (
    <div className="flex items-center justify-center p-8  ">
      <div className="w-[800px] h-[160px]  rounded-2xl shadow-2xl p-8 border border-gray-200">
    

        {/* Category Buttons */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`relative overflow-hidden rounded-lg p-4 transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.name 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md bg-gray-50 hover:bg-gray-100'
              }`}
              style={{
                background: activeCategory === category.name 
                  ? `linear-gradient(135deg, ${category.color.replace('from-', '').replace('to-', '').split(' ')[0]}, ${category.color.replace('from-', '').replace('to-', '').split(' ')[1]})` 
                  : undefined
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">
                  {category.emoji}
                </div>
                <h3 className={`font-medium text-sm ${
                  activeCategory === category.name ? 'text-white' : 'text-gray-700'
                }`}>
                  {category.name}
                </h3>
              </div>
            </button>
          ))}
        </div>

    
      </div>
    </div>
  )
}
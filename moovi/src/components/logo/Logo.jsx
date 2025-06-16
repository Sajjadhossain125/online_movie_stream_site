import React from 'react'

export default function Logo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative group cursor-pointer">
        {/* Background glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
        
        {/* Main logo container */}
        <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-700 group-hover:border-purple-500 transition-all duration-300">
          {/* Logo text */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Moovi
            </span>
            <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
              .SH
            </span>
          </h1>
          
     
        </div>
        
        {/* Corner accent */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-70 group-hover:scale-110 transition-transform duration-300"></div>
      </div>
    </div>
  )
}
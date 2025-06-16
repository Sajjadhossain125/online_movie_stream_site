import React, { useState } from 'react';
import { Menu, X, Home, Film, Tv, Grid3X3, Play } from 'lucide-react';

// Import your actual React Router Link
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/movies', label: 'Movies', icon: Film },
    { path: '/tvshows', label: 'TV Shows', icon: Tv },
    { path: '/categories', label: 'Categories', icon: Grid3X3 }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              MovieHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-purple-300 hover:bg-white/10 transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 group-hover:text-purple-400" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-purple-300 hover:bg-white/10 transition-all duration-200 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="w-4 h-4 group-hover:text-purple-400" />
                <span>{label}</span>
              </Link>
            ))}
            <div className="pt-4">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
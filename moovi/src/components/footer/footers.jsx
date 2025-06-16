import React from 'react';
import { Play, Star, Calendar, Clock } from 'lucide-react';

// Mock Link component - replace with your actual React Router Link
const Link = ({ to, children, className }) => (
  <a href={to} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Browse',
      links: [
        'Popular Movies',
        'Top Rated',
        'Upcoming',
        'Now Playing',
        'TV Shows',
        'Trending'
      ]
    },
    {
      title: 'Genres',
      links: [
        'Action',
        'Comedy',
        'Drama',
        'Horror',
        'Sci-Fi',
        'Romance'
      ]
    },
    {
      title: 'Support',
      links: [
        'Help Center',
        'Contact Us',
        'Terms of Service',
        'Privacy Policy',
        'Cookie Policy',
        'About Us'
      ]
    }
  ];

  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 group mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                MovieHub
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Discover and explore thousands of movies and TV shows. Your ultimate entertainment destination.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <span className="text-purple-400 capitalize font-semibold">{social[0].toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-gray-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get notified about new releases and trending content.</p>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 text-gray-400 text-sm">
            <span>© {currentYear} MovieHub. All rights reserved.</span>
            <div className="hidden md:flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.8/5 User Rating</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-gray-400 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-green-400" />
              <span>Updated Daily</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
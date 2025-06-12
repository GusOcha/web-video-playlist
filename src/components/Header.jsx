import React, { useState } from 'react';
import { Play, Search, Plus } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode, setShowCreateModal }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}>
                <Play className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className={`ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
              PlaylistHub
            </span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="flex items-center">
              {searchVisible ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search playlists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-800/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    autoFocus
                  />
                  <button 
                    onClick={() => { setSearchVisible(false); setSearchQuery(''); }}
                    className={`p-1 rounded ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setSearchVisible(true)}
                  className={`p-2 rounded-lg ${darkMode ? 'text-white hover:bg-gray-800/50' : 'text-gray-900 hover:bg-gray-100/50'} transition-colors`}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Create Playlist CTA */}
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE PLAYLIST</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PlaylistCard from '../components/PlaylistCard';

/**
 * Home page component for displaying and filtering playlists.
 * Handles search, genre filtering, and displays playlists in a grid.
 */
const Home = ({
  darkMode,
  playlists,
  handleDeletePlaylist,
  handleEditPlaylist,
  loading,
  error,
  GROUP_ID
}) => {
  // State for search input and selected genre filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const genres = ['music', 'movie', 'education', 'others'];

  // Filter playlists based on search and genre
  const filteredPlaylists = playlists.filter(playlist => {
    const title = playlist.play_title || playlist.play_name || '';
    const description = playlist.play_description || '';
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || playlist.play_genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <main className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Entertainment</span> Hub
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Discover, organize, and enjoy your favorite YouTube content in one beautiful place
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>

        {/* Genre Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Filter by genre:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGenre('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedGenre === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : darkMode
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    : 'bg-white/50 text-gray-700 hover:bg-gray-100/50'
                  }`}
              >
                All
              </button>
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all capitalize ${selectedGenre === genre
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : darkMode
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      : 'bg-white/50 text-gray-700 hover:bg-gray-100/50'
                    }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredPlaylists.length} playlist{filteredPlaylists.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-red-900/50 text-red-300 border border-red-800' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && playlists.length === 0 && (
          <div className="text-center py-12">
            <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${darkMode ? 'border-white' : 'border-gray-900'}`}></div>
            <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading playlists...</p>
          </div>
        )}

        {/* Playlist Grid */}
        {!loading && filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map(playlist => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                darkMode={darkMode}
                onEdit={handleEditPlaylist}
                onDelete={handleDeletePlaylist}
                loading={loading}
              />
            ))}
          </div>
        ) : !loading && (
          // Empty state if no playlists match search/filter
          <div className="text-center py-12">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${darkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} flex items-center justify-center`}>
              <Search className={`w-8 h-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {searchQuery || selectedGenre !== 'all' ? 'No playlists found' : 'No playlists yet'}
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchQuery || selectedGenre !== 'all'
                ? 'Try adjusting your search or filters, or create a new playlist'
                : 'Create your first playlist to get started'
              }
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
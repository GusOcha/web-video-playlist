import React, { useState, useEffect } from 'react';
import { Search, Plus, Menu, MoreVertical, Edit, Trash2, Play, Home, ChevronDown, Sun, Moon } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Sample data for demonstration
  const samplePlaylists = [
    {
      id: 1,
      play_title: "Lo-fi Hip Hop Beats",
      play_description: "Chill beats to study and relax",
      play_url: "https://youtube.com/watch?v=jfKfPfyJRdk",
      play_thumbnail: "https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
      play_genre: "music",
      created_at: "2024-01-15"
    },
    {
      id: 2,
      play_title: "React.js Tutorial 2024",
      play_description: "Complete React tutorial for beginners",
      play_url: "https://youtube.com/watch?v=SqcY0GlETPk",
      play_thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg",
      play_genre: "education",
      created_at: "2024-01-14"
    },
    {
      id: 3,
      play_title: "Interstellar Soundtrack",
      play_description: "Hans Zimmer's masterpiece",
      play_url: "https://youtube.com/watch?v=UDVtMYqUAyw",
      play_thumbnail: "https://img.youtube.com/vi/UDVtMYqUAyw/maxresdefault.jpg",
      play_genre: "movie",
      created_at: "2024-01-13"
    }
  ];

  useEffect(() => {
    setPlaylists(samplePlaylists);
  }, []);

  const genres = ['music', 'movie', 'education', 'others'];

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.play_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         playlist.play_description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || playlist.play_genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleCreatePlaylist = (newPlaylist) => {
    const playlist = {
      ...newPlaylist,
      id: Date.now(),
      created_at: new Date().toISOString().split('T')[0]
    };
    setPlaylists([playlist, ...playlists]);
    setShowCreateModal(false);
  };

  const handleDeletePlaylist = (id) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const Header = () => (
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

          {/* Navigation */}
          {/* <nav className="hidden md:flex space-x-8">
            <a href="#" className={`${darkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}>
              <Home className="w-4 h-4 mr-1" />
              HOME
            </a>
            
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'genre' ? null : 'genre')}
                className={`${darkMode ? 'text-white hover:text-purple-400' : 'text-gray-900 hover:text-purple-600'} px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}
              >
                GENRE
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              
              {activeDropdown === 'genre' && (
                <div className={`absolute top-full left-0 mt-1 w-48 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} py-2`}>
                  <button 
                    onClick={() => { setSelectedGenre('all'); setActiveDropdown(null); }}
                    className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-white hover:bg-gray-700/50' : 'text-gray-900 hover:bg-gray-100/50'} transition-colors`}
                  >
                    All Genres
                  </button>
                  {genres.map(genre => (
                    <button 
                      key={genre}
                      onClick={() => { setSelectedGenre(genre); setActiveDropdown(null); }}
                      className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-white hover:bg-gray-700/50' : 'text-gray-900 hover:bg-gray-100/50'} transition-colors capitalize`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav> */}

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

            {/* Dark mode toggle */}
            {/* <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'text-white hover:bg-gray-800/50' : 'text-gray-900 hover:bg-gray-100/50'} transition-colors`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button> */}

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

  const PlaylistCard = ({ playlist }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div className={`relative group ${darkMode ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-md rounded-xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} overflow-hidden hover:scale-105 transition-all duration-300`}>
        {/* Thumbnail */}
        <div className="relative">
          <img 
            src={playlist.play_thumbnail} 
            alt={playlist.play_title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="%23374151"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23fff" font-family="Arial" font-size="14">No Image</text></svg>';
            }}
          />
          
          {/* Play overlay */}
          <a 
            href={playlist.play_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Play className="w-6 h-6 text-white" />
            </div>
          </a>

          {/* Menu button */}
          <div className="absolute top-2 right-2">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className={`absolute top-full right-0 mt-1 w-32 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} py-2`}>
                <button className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-white hover:bg-gray-700/50' : 'text-gray-900 hover:bg-gray-100/50'} transition-colors flex items-center`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  className={`block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center`}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Genre badge */}
          <div className="absolute bottom-2 left-2">
            <span className={`px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-full backdrop-blur-sm capitalize`}>
              {playlist.play_genre}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} line-clamp-2 mb-2`}>
            {playlist.play_title}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2 mb-3`}>
            {playlist.play_description}
          </p>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {playlist.created_at}
            </span>
            <a 
              href={playlist.play_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-600 text-sm font-medium"
            >
              Watch →
            </a>
          </div>
        </div>
      </div>
    );
  };

  const CreatePlaylistModal = () => {
    const [formData, setFormData] = useState({
      play_title: '',
      play_description: '',
      play_url: '',
      play_thumbnail: '',
      play_genre: 'music'
    });

    const handleSubmit = () => {
      if (formData.play_title && formData.play_description && formData.play_url && formData.play_thumbnail) {
        handleCreatePlaylist(formData);
        setFormData({
          play_title: '',
          play_description: '',
          play_url: '',
          play_thumbnail: '',
          play_genre: 'music'
        });
      }
    };

    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} p-6`}>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Create New Playlist
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Title*
              </label>
              <input
                type="text"
                required
                value={formData.play_title}
                onChange={(e) => setFormData({...formData, play_title: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Description*
              </label>
              <textarea
                required
                value={formData.play_description}
                onChange={(e) => setFormData({...formData, play_description: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                YouTube URL*
              </label>
              <input
                type="url"
                required
                value={formData.play_url}
                onChange={(e) => setFormData({...formData, play_url: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Thumbnail URL*
              </label>
              <input
                type="url"
                required
                value={formData.play_thumbnail}
                onChange={(e) => setFormData({...formData, play_thumbnail: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Genre
              </label>
              <select
                value={formData.play_genre}
                onChange={(e) => setFormData({...formData, play_genre: e.target.value})}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} capitalize`}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' : 'bg-gray-200/50 text-gray-900 hover:bg-gray-300/50'} transition-colors`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-purple-50/50 to-gray-50'}`}>
      <Header />
      
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

          {/* Filters */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by genre:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGenre('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedGenre === 'all' 
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
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all capitalize ${
                      selectedGenre === genre 
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

          {/* Playlist Grid */}
          {filteredPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaylists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${darkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'} flex items-center justify-center`}>
                <Search className={`w-8 h-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                No playlists found
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search or filters, or create a new playlist
              </p>
            </div>
          )}
        </div>
      </main>

      <CreatePlaylistModal />
    </div>
  );
};

export default App;
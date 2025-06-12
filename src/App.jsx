import React, { useState, useEffect } from 'react';
import { Search, Plus, Menu, MoreVertical, Edit, Trash2, Play, Home, ChevronDown, Sun, Moon, Users } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [error, setError] = useState('');

  const GROUP_ID = 33;
  const API_BASE_URL = 'https://webfmsi.singapoly.com';

  const genres = ['music', 'song', 'movie', 'education', 'others'];

  // Fetch playlists from API
  const fetchPlaylists = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlist/${GROUP_ID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      const data = await response.json();
      // Ensure we always set an array
      const playlistData = data.data || data || [];
      setPlaylists(Array.isArray(playlistData) ? playlistData : []);
    } catch (err) {
      setError('Failed to load playlists');
      console.error('Error fetching playlists:', err);
      setPlaylists([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Load playlists on component mount
  useEffect(() => {
    fetchPlaylists();
  }, []);

  // Ensure playlists is always an array before filtering
  const filteredPlaylists = Array.isArray(playlists) ? playlists.filter(playlist => {
    const matchesSearch = (playlist.play_name || playlist.play_title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (playlist.play_description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || playlist.play_genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }) : [];

  const handleCreatePlaylist = async (newPlaylist) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('play_name', newPlaylist.play_title);
      formData.append('play_url', newPlaylist.play_url);
      formData.append('play_thumbnail', newPlaylist.play_thumbnail);
      formData.append('play_genre', newPlaylist.play_genre);
      formData.append('play_description', newPlaylist.play_description);

      const response = await fetch(`${API_BASE_URL}/api/playlist/${GROUP_ID}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      const result = await response.json();
      console.log('Playlist created:', result);

      // Refresh the playlists list
      await fetchPlaylists();
      setShowCreateModal(false);
    } catch (err) {
      setError('Failed to create playlist');
      console.error('Error creating playlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlaylist = async (updatedPlaylist) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('play_name', updatedPlaylist.play_title);
      formData.append('play_url', updatedPlaylist.play_url);
      formData.append('play_thumbnail', updatedPlaylist.play_thumbnail);
      formData.append('play_genre', updatedPlaylist.play_genre);
      formData.append('play_description', updatedPlaylist.play_description);

      const response = await fetch(`${API_BASE_URL}/api/playlist/update/${updatedPlaylist.id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update playlist');
      }

      const result = await response.json();
      console.log('Playlist updated:', result);

      // Refresh the playlists list
      await fetchPlaylists();
      setShowEditModal(false);
      setEditingPlaylist(null);
    } catch (err) {
      setError('Failed to update playlist');
      console.error('Error updating playlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlaylist = async (id) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlist/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete playlist');
      }

      // Refresh the playlists list
      await fetchPlaylists();
    } catch (err) {
      setError('Failed to delete playlist');
      console.error('Error deleting playlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
    setShowEditModal(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const Header = () => (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}>
                <Play className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="ml-2 flex items-center space-x-3">
              <span className={`text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                PlaylistHub
              </span>
              <div className="flex items-center space-x-1">
                <div className={`flex items-center px-2 py-1 rounded-md ${darkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-200/50 text-gray-700'}`}>
                  <Users className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">Group {GROUP_ID}</span>
                </div>
              </div>
            </div>
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

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'text-white hover:bg-gray-800/50' : 'text-gray-900 hover:bg-gray-100/50'} transition-colors`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Create Playlist CTA */}
            <button
              onClick={() => setShowCreateModal(true)}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2 disabled:opacity-50"
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
      <div className={`relative group w-full ${darkMode ? 'bg-gray-800/30' : 'bg-white/30'} backdrop-blur-md rounded-xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} overflow-hidden hover:scale-105 transition-all duration-300`}>
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={playlist.play_thumbnail}
            alt={playlist.play_name || playlist.play_title}
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
              <div className={`absolute top-full right-0 mt-1 w-32 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} py-2 z-10`}>
                <button
                  onClick={() => { handleEditPlaylist(playlist); setShowMenu(false); }}
                  className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-white hover:bg-gray-700/50' : 'text-gray-900 hover:bg-gray-100/50'} transition-colors flex items-center`}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => { handleDeletePlaylist(playlist.id); setShowMenu(false); }}
                  disabled={loading}
                  className={`block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center disabled:opacity-50`}
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
            {playlist.play_name || playlist.play_title}
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

  const PlaylistModal = ({ isEdit = false, playlist = null, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      play_title: playlist?.play_name || playlist?.play_title || '',
      play_description: playlist?.play_description || '',
      play_url: playlist?.play_url || '',
      play_thumbnail: playlist?.play_thumbnail || '',
      play_genre: playlist?.play_genre || 'music'
    });

    const handleSubmit = () => {
      if (formData.play_title && formData.play_description && formData.play_url && formData.play_thumbnail) {
        if (isEdit) {
          onSubmit({ ...formData, id: playlist.id });
        } else {
          onSubmit(formData);
        }
        setFormData({
          play_title: '',
          play_description: '',
          play_url: '',
          play_thumbnail: '',
          play_genre: 'music'
        });
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} p-6`}>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            {isEdit ? 'Edit Playlist' : 'Create New Playlist'}
          </h2>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Title
              </label>
              <input
                type="text"
                required
                value={formData.play_title}
                onChange={(e) => setFormData({ ...formData, play_title: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Description
              </label>
              <textarea
                required
                value={formData.play_description}
                onChange={(e) => setFormData({ ...formData, play_description: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                YouTube URL
              </label>
              <input
                type="url"
                required
                value={formData.play_url}
                onChange={(e) => setFormData({ ...formData, play_url: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Thumbnail URL
              </label>
              <input
                type="url"
                required
                value={formData.play_thumbnail}
                onChange={(e) => setFormData({ ...formData, play_thumbnail: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Genre
              </label>
              <select
                value={formData.play_genre}
                onChange={(e) => setFormData({ ...formData, play_genre: e.target.value })}
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
                onClick={onClose}
                className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' : 'bg-gray-200/50 text-gray-900 hover:bg-gray-300/50'} transition-colors`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
              >
                {isEdit ? 'Update' : 'Create'}
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
        <div className="container mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Entertainment</span> Hub
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-2`}>
              Discover, organize, and enjoy your favorite YouTube content in one beautiful place
            </p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-200/50 text-gray-700'}`}>
              <Users className="w-4 h-4 mr-2" />
              <span className="font-medium">Viewing Group {GROUP_ID} Playlists</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-4 py-2 rounded-full transition-all ${selectedGenre === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : darkMode
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  : 'bg-white/50 text-gray-700 hover:bg-gray-100/50'
                }`}
            >
              All Genres
            </button>
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full transition-all capitalize ${selectedGenre === genre
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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
            </div>
          )}

          {/* Playlist Grid */}
          {!loading && filteredPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlaylists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          ) : !loading && (
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

      {/* Create Modal */}
      {showCreateModal && (
        <PlaylistModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePlaylist}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && editingPlaylist && (
        <PlaylistModal
          isEdit={true}
          playlist={editingPlaylist}
          onClose={() => { setShowEditModal(false); setEditingPlaylist(null); }}
          onSubmit={handleUpdatePlaylist}
        />
      )}
    </div>
  );
};

export default App;
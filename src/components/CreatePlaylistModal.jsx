import React, { useState } from 'react';

const CreatePlaylistModal = ({ showModal, setShowModal, handleCreatePlaylist, darkMode }) => {
  const [formData, setFormData] = useState({
    play_title: '',
    play_description: '',
    play_url: '',
    play_thumbnail: '',
    play_genre: 'others'
  });

  const genres = ['music', 'movie', 'education', 'others'];
  // Function to handle form submission
  // This function will be called when the user clicks the "Create" button
  const handleSubmit = async () => {
    if (formData.play_title && formData.play_description && formData.play_url && formData.play_thumbnail) {
      try {
        await handleCreatePlaylist(formData);// Call the function passed from the parent component to create the playlist
        setFormData({
          play_title: '',
          play_description: '',
          play_url: '',
          play_thumbnail: '',
          play_genre: 'music'
        });
      } catch (error) {
        console.error('Error creating playlist:', error);
        alert('Failed to create playlist. Please try again.');
      }
    }
  };

  if (!showModal) return null;

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
              onChange={(e) => setFormData({ ...formData, play_title: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, play_description: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, play_url: e.target.value })}
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
              onClick={() => setShowModal(false)}
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

export default CreatePlaylistModal;
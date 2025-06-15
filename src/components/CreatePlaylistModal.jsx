import React, { useState } from 'react';

const CreatePlaylistModal = ({ showModal, setShowModal, handleCreatePlaylist, darkMode }) => {
  const [formData, setFormData] = useState({
    play_title: '',
    play_description: '',
    play_url: '',
    play_thumbnail: '',
    play_genre: 'others'
  });
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const genres = ['music', 'movie', 'education', 'others'];
  
  // Function to handle form submission
  const handleSubmit = async () => {
    console.log('handleSubmit called'); // Debug log
    if (formData.play_title && formData.play_description && formData.play_url && formData.play_thumbnail) {
      try {
        setIsLoading(true);
        console.log('About to call handleCreatePlaylist'); // Debug log
        
        // Check if handleCreatePlaylist function exists
        if (typeof handleCreatePlaylist !== 'function') {
          console.error('handleCreatePlaylist is not a function!');
          alert('handleCreatePlaylist function is missing!');
          return;
        }
        
        await handleCreatePlaylist(formData);
        console.log('handleCreatePlaylist completed successfully'); // Debug log
        
        // Close modal first
        setShowModal(false);
        
        // Reset form data
        setFormData({
          play_title: '',
          play_description: '',
          play_url: '',
          play_thumbnail: '',
          play_genre: 'others'
        });
        
        console.log('About to show confirmation popup'); // Debug log
        // Show confirmation popup with a small delay to ensure modal is closed
        setTimeout(() => {
          setShowConfirmation(true);
        }, 100);
        
        // Auto close after 3 seconds
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3100);
        
      } catch (error) {
        console.error('Error creating playlist:', error);
        alert('Failed to create playlist. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Form validation failed - missing required fields'); // Debug log
    }
  };

  // Handle close confirmation popup manually
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Handle modal close (reset form when closing)
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      play_title: '',
      play_description: '',
      play_url: '',
      play_thumbnail: '',
      play_genre: 'others'
    });
  };

  if (!showModal && !showConfirmation) return null;

  return (
    <>
      {/* Main Create Playlist Modal */}
      {showModal && (
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
                  placeholder="Enter playlist title here..."
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
                  placeholder="Enter playlist description here..."
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
                  placeholder="https://youtube.com/playlist?list=..."
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
                  placeholder="https://example.com/thumbnail.jpg"
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
                  onClick={handleCloseModal}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' : 'bg-gray-200/50 text-gray-900 hover:bg-gray-300/50'} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.play_title || !formData.play_description || !formData.play_url || !formData.play_thumbnail}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 hover:shadow-[0_0_20px_3px_rgba(236,72,153,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-2xl text-center border ${darkMode ? 'border-gray-700' : 'border-gray-200'} max-w-sm w-full mx-4 transform transition-all duration-300 ease-out scale-100`}>
            {/* Success Icon with animation */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Success Message */}
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
              Berhasil!
            </h3>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Playlist berhasil dibuat
            </p>
            
            {/* OK Button */}
            <button
              onClick={handleCloseConfirmation}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePlaylistModal;
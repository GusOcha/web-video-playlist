import React from 'react';

const DeletePlaylistModal = ({
    showModal,
    setShowModal,
    handleDeletePlaylist,
    playlist,
    loading,
    darkMode,
}) => {
    if (!showModal || !playlist) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Delete Playlist
                </h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                    Are you sure you want to delete <span className="font-semibold">{playlist.play_title || playlist.play_name}</span>?
                </p>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowModal(false)}
                        className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'} transition-colors`}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDeletePlaylist(playlist.id)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePlaylistModal;
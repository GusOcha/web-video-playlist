import React, { useState, useEffect } from 'react';

const EditPlaylistModal = ({
    showModal,
    setShowModal,
    handleUpdatePlaylist,
    playlist,
    darkMode,
    loading,
    onClose,
}) => {
    const [formData, setFormData] = useState({
        play_title: '',
        play_description: '',
        play_url: '',
        play_thumbnail: '',
        play_genre: 'music',
    });

    useEffect(() => {
        if (playlist) {
            setFormData({
                play_title: playlist.play_title || playlist.play_name || '',
                play_description: playlist.play_description || '',
                play_url: playlist.play_url || '',
                play_thumbnail: playlist.play_thumbnail || '',
                play_genre: playlist.play_genre || 'music',
            });
        }
    }, [playlist]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdatePlaylist({ ...formData, id: playlist.id });
    };

    if (!showModal || !playlist) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Edit Playlist
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                        <input
                            type="text"
                            name="play_title"
                            value={formData.play_title}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} focus:outline-none`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                        <textarea
                            name="play_description"
                            value={formData.play_description}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} focus:outline-none`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>YouTube URL</label>
                        <input
                            type="url"
                            name="play_url"
                            value={formData.play_url}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} focus:outline-none`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Thumbnail URL</label>
                        <input
                            type="url"
                            name="play_thumbnail"
                            value={formData.play_thumbnail}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} focus:outline-none`}
                            required
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Genre</label>
                        <select
                            name="play_genre"
                            value={formData.play_genre}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} focus:outline-none`}
                        >
                            <option value="music">Music</option>
                            <option value="movie">Movie</option>
                            <option value="education">Education</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose || (() => setShowModal(false))}
                            className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'} transition-colors`}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPlaylistModal;
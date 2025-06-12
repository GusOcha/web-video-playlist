import React, { useState, useEffect } from 'react';

const EditPlaylistModal = ({
    showModal,
    setShowModal,
    playlist,
    loading,
    darkMode,
    onClose,
    getPlaylists,
    setError
}) => {
    const [formData, setFormData] = useState({
        play_title: '',
        play_description: '',
        play_url: '',
        play_thumbnail: '',
        play_genre: 'music'
    });
    const [submitting, setSubmitting] = useState(false);

    const genres = ['music', 'movie', 'education', 'others'];

    useEffect(() => {
        if (playlist) {
            setFormData({
                play_title: playlist.play_title || playlist.play_name || '',
                play_description: playlist.play_description || '',
                play_url: playlist.play_url || '',
                play_thumbnail: playlist.play_thumbnail || '',
                play_genre: playlist.play_genre || 'music'
            });
        }
    }, [playlist]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError && setError('');

        const playlistId = playlist?.id || playlist?.id_play;
        if (!playlistId) {
            console.error('No valid ID found in playlist object:', playlist);
            setError && setError('Playlist ID is missing.');
            setSubmitting(false);
            return;
        }

        try {
            const form = new FormData();
            form.append('play_name', formData.play_title);
            form.append('play_url', formData.play_url);
            form.append('play_thumbnail', formData.play_thumbnail);
            form.append('play_genre', formData.play_genre);
            form.append('play_description', formData.play_description);

            const response = await fetch(
                `https://webfmsi.singapoly.com/api/playlist/update/${playlistId}`,
                {
                    method: 'POST',
                    body: form
                }
            );

            const data = await response.json();
            if (!response.ok) throw new Error(`Update failed: ${JSON.stringify(data)}`);

            getPlaylists && getPlaylists();
            onClose ? onClose() : setShowModal(false);
        } catch (err) {
            console.error('Edit playlist failed:', err);
            setError && setError('Failed to update playlist');
        } finally {
            setSubmitting(false);
        }
    };

    if (!showModal || !playlist) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} p-6`}>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                    Edit Playlist
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Title*
                        </label>
                        <input
                            type="text"
                            name="play_title"
                            value={formData.play_title}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Description*
                        </label>
                        <textarea
                            name="play_description"
                            value={formData.play_description}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            YouTube URL*
                        </label>
                        <input
                            type="url"
                            name="play_url"
                            value={formData.play_url}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Thumbnail URL*
                        </label>
                        <input
                            type="url"
                            name="play_thumbnail"
                            value={formData.play_thumbnail}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Genre
                        </label>
                        <select
                            name="play_genre"
                            value={formData.play_genre}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white border-gray-600' : 'bg-white/50 text-gray-900 border-gray-300'} border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        >
                            {genres.map((genre) => (
                                <option key={genre} value={genre} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} capitalize`}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose ? onClose : () => setShowModal(false)}
                            className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' : 'bg-gray-200/50 text-gray-900 hover:bg-gray-300/50'} transition-colors`}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                            disabled={submitting}
                        >
                            {submitting ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPlaylistModal;

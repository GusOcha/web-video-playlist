import React, { useState } from 'react';

const DeletePlaylistModal = ({
    showModal,
    setShowModal,
    playlist,
    loading,
    darkMode,
    getPlaylists,
    setError
}) => {
    const [submitting, setSubmitting] = useState(false);


    if (!showModal || !playlist) return null;


    const playlistId =
        playlist.id ||
        playlist.id_play ||        // <-  backend Key
        playlist.play_id ||
        playlist.playlist_id;

    /**
     * Function to send DELETE request to the API
     */
    const onDelete = async () => {
        //If ID not found
        if (!playlistId) {
            console.error('No valid ID found in playlist object:', playlist);
            setError && setError('Playlist ID is missing.');
            return;
        }

        setSubmitting(true);
        setError && setError('');

        try {
            console.log('Attempting to delete playlist with ID:', playlistId);

            // The Delete Request to Api
            const response = await fetch(
                `https://webfmsi.singapoly.com/api/playlist/${playlistId}`, // <-- DELETE link
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );

            // If Failed to delte, run this block
            if (!response.ok) {
                let errorMessage = `Failed to delete playlist: ${response.status} ${response.statusText}`;

                try {
                    const errorData = await response.json(); // Try to parse JSON error
                    errorMessage = errorData?.message || errorMessage;
                } catch (_) {
                    const errorText = await response.text(); // Try to get raw text error
                    console.error('Delete failed with raw text:', errorText);
                }

                throw new Error(errorMessage);
            }

            // Success Yippee
            console.log('Playlist deleted successfully');
            getPlaylists && getPlaylists();     // Refresh after delete
            setShowModal(false);                // Close 
        } catch (err) {
            console.error('Delete error:', err);
            setError && setError(err.message || 'Failed to delete playlist');
        } finally {
            setSubmitting(false); // Reset local loading state
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-sm rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <h2 className="text-xl font-bold mb-4">Delete Playlist</h2>

                {/* Confirmation Message */}
                <p className="mb-6">
                    Are you sure you want to delete <span className="font-semibold">
                        {playlist.play_title || playlist.play_name || 'this playlist'}
                    </span>?
                </p>

                <div className="flex space-x-3">
                    {/* Cancel Button */}
                    <button
                        onClick={() => setShowModal(false)}
                        className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} transition-colors`}
                        disabled={submitting || loading}
                    >
                        Cancel
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={onDelete} //Runs the delete function
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all disabled:opacity-50"
                        disabled={submitting || loading}
                    >
                        {(submitting || loading) ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePlaylistModal;

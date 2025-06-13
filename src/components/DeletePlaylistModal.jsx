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
    // TAMBAHAN: State untuk double confirmation
    const [showDoubleConfirmation, setShowDoubleConfirmation] = useState(false);

    if (!showModal || !playlist) return null;

    const playlistId =
        playlist.id ||
        playlist.id_play ||
        playlist.play_id ||
        playlist.playlist_id;

    // MODIFIKASI: Function untuk menampilkan double confirmation sebelum delete
    const handleDeleteClick = () => {
        setShowDoubleConfirmation(true);
    };

    // TAMBAHAN: Function untuk membatalkan double confirmation
    const cancelDoubleConfirmation = () => {
        setShowDoubleConfirmation(false);
    };

    // Function untuk melakukan delete (tidak berubah)
    const onDelete = async () => {
        if (!playlistId) {
            console.error('No valid ID found in playlist object:', playlist);
            setError && setError('Playlist ID is missing.');
            return;
        }

        setSubmitting(true);
        setError && setError('');
        setShowDoubleConfirmation(false); // Tutup double confirmation

        try {
            console.log('Attempting to delete playlist with ID:', playlistId);

            const response = await fetch(
                `https://webfmsi.singapoly.com/api/playlist/${playlistId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );

            if (!response.ok) {
                let errorMessage = `Failed to delete playlist: ${response.status} ${response.statusText}`;

                try {
                    const errorData = await response.json();
                    errorMessage = errorData?.message || errorMessage;
                } catch (_) {
                    const errorText = await response.text();
                    console.error('Delete failed with raw text:', errorText);
                }

                throw new Error(errorMessage);
            }

            console.log('Playlist deleted successfully');
            getPlaylists && getPlaylists();
            setShowModal(false);
        } catch (err) {
            console.error('Delete error:', err);
            setError && setError(err.message || 'Failed to delete playlist');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Modal Delete Pertama */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className={`w-full max-w-sm rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                    <div className="text-center">
                        {/* Icon Warning */}
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-4">Delete Playlist</h2>

                        <p className="mb-6 text-sm">
                            Are you sure you want to delete <span className="font-semibold text-red-500">
                                "{playlist.play_title || playlist.play_name || 'this playlist'}"
                            </span>?
                        </p>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} transition-colors`}
                                disabled={submitting || loading}
                            >
                                Cancel
                            </button>

                            {/* MODIFIKASI: Ganti onClick dari onDelete ke handleDeleteClick */}
                            <button
                                onClick={handleDeleteClick}
                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all disabled:opacity-50"
                                disabled={submitting || loading}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* TAMBAHAN: Modal Double Confirmation */}
            {showDoubleConfirmation && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className={`w-full max-w-sm rounded-xl p-6 shadow-lg border-2 border-red-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                        <div className="text-center">
                            {/* Icon Warning Lebih Mencolok */}
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-500 mb-4">
                                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-2 text-red-500">⚠️ Final Warning</h3>
                            
                            <p className="mb-4 text-sm">
                                This action <span className="font-bold text-red-500">CANNOT BE UNDONE</span>!
                            </p>
                            
                            <p className="mb-6 text-sm">
                                Playlist <span className="font-semibold">
                                    "{playlist.play_title || playlist.play_name}"
                                </span> will be permanently deleted.
                            </p>

                            <div className="flex space-x-3">
                                <button
                                    onClick={cancelDoubleConfirmation}
                                    className={`flex-1 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} transition-colors`}
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={onDelete}
                                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Deleting...' : 'YES, DELETE'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeletePlaylistModal;
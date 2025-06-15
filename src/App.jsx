import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import EditPlaylistModal from './components/EditPlaylistModal';
import DeletePlaylistModal from './components/DeletePlaylistModal';

const API_BASE_URL = 'https://webfmsi.singapoly.com';
const GROUP_ID = 33;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Add search state at App level
  const [searchQuery, setSearchQuery] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [deletingPlaylist, setDeletingPlaylist] = useState(null);

  const getPlaylists = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlist/${GROUP_ID}`);
      const data = await response.json();
      setPlaylists(data?.datas || []);
    } catch (err) {
      setError('Failed to fetch playlists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  const handleCreatePlaylist = async (newPlaylist) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('play_name', newPlaylist.play_title);
      formData.append('play_url', newPlaylist.play_url);
      formData.append('play_thumbnail', newPlaylist.play_thumbnail);
      formData.append('play_genre', newPlaylist.play_genre);
      formData.append('play_description', newPlaylist.play_description);

      await fetch(`${API_BASE_URL}/api/playlist/${GROUP_ID}`, {
        method: 'POST',
        body: formData,
      });

      await getPlaylists();
      setShowCreateModal(false);
    } catch (err) {
      setError('Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
    setShowEditModal(true);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-purple-50/50 to-gray-50'}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setShowCreateModal={setShowCreateModal}
        loading={loading}
        GROUP_ID={GROUP_ID}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Home
        playlists={playlists}
        darkMode={darkMode}
        loading={loading}
        error={error}
        handleEditPlaylist={handleEditPlaylist}
        handleDeletePlaylist={(playlist) => {
          setDeletingPlaylist(playlist);
          setShowDeleteModal(true);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {showCreateModal && (
        <CreatePlaylistModal
          showModal={showCreateModal}
          setShowModal={setShowCreateModal}
          handleCreatePlaylist={handleCreatePlaylist}
          darkMode={darkMode}
          loading={loading}
        />
      )}

      {showEditModal && editingPlaylist && (
        <EditPlaylistModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          playlist={editingPlaylist}
          loading={loading}
          darkMode={darkMode}
          onClose={() => {
            setShowEditModal(false);
            setEditingPlaylist(null);
          }}
          getPlaylists={getPlaylists}
          setError={setError}
        />
      )}

      {showDeleteModal && deletingPlaylist && (
        <DeletePlaylistModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          playlist={deletingPlaylist}
          loading={loading}
          darkMode={darkMode}
          getPlaylists={getPlaylists}
          setError={setError}
        />
      )}
    </div>
  );
};

export default App;
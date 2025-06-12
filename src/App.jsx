import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import CreatePlaylistModal from './components/CreatePlaylistModal';
// import EditPlaylistModal from './components/EditPlaylistModal';

// Dummy getData function for demonstration. Replace with your actual API utility if needed.
const getData = async (url) => {
  const API_BASE_URL = 'https://webfmsi.singapoly.com';
  const response = await fetch(API_BASE_URL + url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const GROUP_ID = 33;

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [error, setError] = useState('');

  // Fetch playlists from API
  const getPlaylists = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await getData(`/api/playlist/${GROUP_ID}`);
      if (resp?.datas) {
        setPlaylists(resp.datas);
      } else if (Array.isArray(resp)) {
        setPlaylists(resp);
      } else {
        setPlaylists([]);
      }
    } catch (err) {
      setError('Failed to fetch playlists');
      setPlaylists([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

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

      const response = await fetch(`https://webfmsi.singapoly.com/api/playlist/${GROUP_ID}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      await getPlaylists();
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

      const response = await fetch(`https://webfmsi.singapoly.com/api/playlist/update/${updatedPlaylist.id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update playlist');
      }

      await getPlaylists();
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
      const response = await fetch(`https://webfmsi.singapoly.com/api/playlist/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete playlist');
      }

      await getPlaylists();
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-purple-50/50 to-gray-50'}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setShowCreateModal={setShowCreateModal}
        loading={loading}
        GROUP_ID={GROUP_ID}
      />

      <Home
        darkMode={darkMode}
        playlists={playlists}
        handleDeletePlaylist={handleDeletePlaylist}
        handleEditPlaylist={handleEditPlaylist}
        loading={loading}
        error={error}
        GROUP_ID={GROUP_ID}
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

      {/* Uncomment and implement EditPlaylistModal if needed */}
      {/* {showEditModal && editingPlaylist && (
        <EditPlaylistModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          handleUpdatePlaylist={handleUpdatePlaylist}
          playlist={editingPlaylist}
          darkMode={darkMode}
          loading={loading}
          onClose={() => {
            setShowEditModal(false);
            setEditingPlaylist(null);
          }}
        />
      )} */}
    </div>
  );
};

export default App;
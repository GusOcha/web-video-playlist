import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import CreatePlaylistModal from './components/CreatePlaylistModal';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Remove sample data and replace with API call
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = (newPlaylist) => {
    const playlist = {
      ...newPlaylist,
      id: Date.now(),
      created_at: new Date().toISOString().split('T')[0]
    };
    setPlaylists([playlist, ...playlists]);
    setShowCreateModal(false);
  };

  const handleDeletePlaylist = (id) => {
    setPlaylists(playlists.filter(p => p.id !== id));
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
      />
      
      <Home 
        darkMode={darkMode} 
        playlists={playlists} 
        handleDeletePlaylist={handleDeletePlaylist}
      />

      {showCreateModal && (
        <CreatePlaylistModal 
          showModal={showCreateModal}
          setShowModal={setShowCreateModal}
          handleCreatePlaylist={handleCreatePlaylist}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default App;
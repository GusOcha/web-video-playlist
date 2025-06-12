import React from 'react';
import PlaylistCard from '../components/PlaylistCard';

const Home = ({ playlists, darkMode, loading, error, handleEditPlaylist, handleDeletePlaylist }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {loading && <div className="text-center text-gray-400">Loading...</div>}
      {!loading && playlists.length === 0 && <div className="text-center text-gray-500">No playlists found.</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            darkMode={darkMode}
            onEdit={handleEditPlaylist}
            onDelete={handleDeletePlaylist}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

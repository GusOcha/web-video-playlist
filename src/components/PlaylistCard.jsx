import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Play } from 'lucide-react';

const PlaylistCard = ({ playlist, darkMode, onEdit, onDelete, loading }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={'relative group w-full bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden hover:scale-105 hover:shadow-[0_0_20px_3px_rgba(236,72,153,1)] transition-all duration-300'}>
      <div className="relative">
        <img
          src={playlist.play_thumbnail}
          alt={playlist.play_name || playlist.play_title || 'Playlist Thumbnail'}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src =
              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="%23374151"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23fff" font-family="Arial" font-size="14">No Image</text></svg>';
          }}
        />

        <a
          href={playlist.play_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Play className="w-6 h-6 text-white" />
          </div>
        </a>

        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className={`absolute top-full right-0 mt-1 w-32 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md rounded-lg shadow-lg border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} py-2 z-10`}>
              <button
                onClick={() => {
                  onEdit(playlist);
                  setShowMenu(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-white hover:bg-gray-700/50' : 'text-gray-900 hover:bg-gray-100/50'} flex items-center`}
              >
                <Edit className="w-4 h-4 mr-2" /> Edit
              </button>
              <button
                onClick={() => {
                  onDelete(playlist);
                  setShowMenu(false);
                }}
                disabled={loading}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 flex items-center disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-full capitalize">
            {playlist.play_genre}
          </span>
        </div>
      </div>

      <div className="p-4 group/playlist">
  <h3
    className={`
      font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}
      line-clamp-2 mb-2 transition-all duration-200
      group-hover/playlist:line-clamp-none group-hover/playlist:bg-purple-100/30
      ${darkMode ? 'group-hover/playlist:bg-gray-700/60' : ''}
      rounded cursor-pointer
    `}
  >
    {playlist.play_name || playlist.play_title}
  </h3>
  <p
    className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2 hover:line-clamp-none mb-3 transition-all duration-200 rounded 
    hover:bg-purple-100/30 hover:text-purple-700 
    ${darkMode ? 'hover:bg-gray-700/60 hover:text-white' : ''}`
    }
  >
    {playlist.play_description || ''}
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{playlist.created_at}</span>
          <a
            href={playlist.play_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-600 text-sm font-medium"
          >
            Watch →
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;

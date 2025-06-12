const API_BASE_URL = 'https://webfmsi.singapoly.com/api/playlist';
const GROUP_ID = '33'; // Replace with your actual group ID

export const getPlaylists = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/${GROUP_ID}`);
    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const createPlaylist = async (playlistData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${GROUP_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData),
    });
    if (!response.ok) {
      throw new Error('Failed to create playlist');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};

export const updatePlaylist = async (id, playlistData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${GROUP_ID}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData),
    });
    if (!response.ok) {
      throw new Error('Failed to update playlist');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw error;
  }
};

export const deletePlaylist = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${GROUP_ID}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete playlist');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw error;
  }
};
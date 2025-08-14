export function searchPlaylists(playlists, query) {
  if (!query) return playlists;

  const lowerQuery = query.toLowerCase();

  return playlists.filter(
    (playlist) =>
      playlist.title.toLowerCase().includes(lowerQuery) ||
      playlist.owner.username.toLowerCase().includes(lowerQuery)
  );
}

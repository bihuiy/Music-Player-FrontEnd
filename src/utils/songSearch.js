export function searchSongs(songs, query) {
  if (!query) return songs;

  const lowerQuery = query.toLowerCase();

  return songs.filter(
    (song) =>
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery)
  );
}

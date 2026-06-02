import React, { useState } from "react";
import axios from "axios";

function MusicApp({ user }) {
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const BASE_URL = "http://127.0.0.1:5000";

  // ================= FETCH SONGS =================
  const fetchSongs = async (mood) => {
    try {
      const res = await axios.get(`${BASE_URL}/songs/${mood}`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      setSongs(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch songs");
    }
  };

  // ================= FAVORITE TOGGLE =================
  const toggleFavorite = (song) => {
    setFavorites((prev) =>
      prev.some((s) => s.title === song.title)
        ? prev.filter((s) => s.title !== song.title)
        : [...prev, song]
    );
  };

  // ================= SEARCH FILTER =================
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome {user} 🎧</h1>

      <h2>Mood Music App</h2>

      {/* ================= MOOD BUTTONS ================= */}
      <button onClick={() => fetchSongs("happy")}>Happy 😊</button>
      <button onClick={() => fetchSongs("sad")}>Sad 😢</button>
      <button onClick={() => fetchSongs("angry")}>Angry 😡</button>
      <button onClick={() => fetchSongs("energetic")}>Energetic ⚡</button>
      <button onClick={() => fetchSongs("motivational")}>Motivational 🔥</button>
      <button onClick={() => fetchSongs("love")}>Love ❤️</button>
      <button onClick={() => fetchSongs("relaxed")}>Relaxed 😌</button>

      {/* ================= SEARCH BAR ================= */}
      <br /><br />
      <input
        type="text"
        placeholder="🔎Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ================= SONG LIST ================= */}
      <h3>Songs</h3>

      {search && filteredSongs.length === 0 ? (
        <p>🎵 Showing result for: {search}</p>
      ) : null}

      {(filteredSongs.length > 0
        ? filteredSongs
        : search
        ? [{ title: search, url: "" }]
        : songs
      ).map((song, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <p>🎵 {song.title}</p>

          {/* ================= PLAY BUTTON ================= */}
          <button
  onClick={() => {
    console.log(song);
    if (song.url) {
      setCurrentSong(song.url);
    } else {
      alert("URL not available for this song");
    }
  }}
>
  ▶️ Play
</button>
          {/* ================= FAVORITE BUTTON ================= */}
          <button onClick={() => toggleFavorite(song)}>
            {favorites.some((s) => s.title === song.title)
              ? "❤️ Saved"
              : "🤍 Add"}
          </button>
        </div>
      ))}

      {/* ================= FAVORITES ================= */}
      <h3>⭐ Favorites</h3>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((song, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <p>🎵 {song.title}</p>
            <button onClick={() => toggleFavorite(song)}>❌ Remove</button>
          </div>
        ))
      )}
      {/* ================= MUSIC PLAYER ================= */}
{currentSong && (
  <div style={{ marginTop: "20px" }}>
    <h3>Now Playing 🎧</h3>

    <iframe
      width="500"
      height="300"
      src={currentSong}
      title="YouTube Player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)}
      
    </div>
  );
}

export default MusicApp;
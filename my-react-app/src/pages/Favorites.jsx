import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import React, { useState } from "react";

function Favorites() {
  const { favorites } = useMovieContext();
  const [showMessage, setShowMessage] = useState(false);
  const [removeMessage, setRemoveMessage] = useState(false);

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites ⭐🔥</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              showMessage={showMessage}
              setShowMessage={setShowMessage}
              removeMessage={removeMessage}
              setRemoveMessage={setRemoveMessage}
            />
          ))}
        </div>
        <div className={`show-message${showMessage ? " visible" : ""}`}>
          You added a movie into Favorite ✔️
        </div>
        <div className={`remove-message${removeMessage ? " visible" : ""}`}>
          You removed a movie from Favorite ❌
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
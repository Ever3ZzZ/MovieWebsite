import React, { useState } from "react"
import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({
  movie,
  showMessage: showMessageProp,
  setShowMessage: setShowMessageProp,
  removeMessage: removeMessageProp,
  setRemoveMessage: setRemoveMessageProp
}) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
  const favorite = isFavorite(movie.id)

  // Если пропсы не переданы — используем локальное состояние
  const [showMessageLocal, setShowMessageLocal] = useState(false)
  const [removeMessageLocal, setRemoveMessageLocal] = useState(false)

  const showMessage = showMessageProp ?? showMessageLocal
  const setShowMessage = setShowMessageProp ?? setShowMessageLocal
  const removeMessage = removeMessageProp ?? removeMessageLocal
  const setRemoveMessage = setRemoveMessageProp ?? setRemoveMessageLocal

  function onFavoriteClick(e) {
    e.preventDefault()
    if (favorite) {
      removeFromFavorites(movie.id)
      setShowMessage(false)
      setRemoveMessage(true)
      setTimeout(() => setRemoveMessage(false), 2000)
    } else {
      addToFavorites(movie)
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 2000)
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
            ♥
          </button>
          <div className={`remove-message${removeMessage ? " visible" : ""}`}>
            You removed a movie from Favorite ❌
          </div>
          <div className={`show-message${showMessage ? " visible" : ""}`}>
            You added a movie into Favorite ✔️
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  )
}

export default MovieCard
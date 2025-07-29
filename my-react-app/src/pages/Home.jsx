import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  // Состояния для поиска, фильмов, ошибок и загрузки
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]); // Массив фильмов
  const [error, setError] = useState(null); // Ошибки
  const [loading, setLoading] = useState(true); // Статус загрузки

  // Загрузка популярных фильмов сразу при монтировании компонента
  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true); // Включаем индикатор загрузки
      try {
        const popularMovies = await getPopularMovies(); // Загрузка популярных фильмов
        setMovies(popularMovies); // Устанавливаем популярные фильмы в состояние
      } catch (err) {
        console.error(err);
        setError("Failed to load movies..."); // Сообщение об ошибке
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    loadPopularMovies(); // Вызов функции при монтировании компонента
  }, []); // Пустой массив зависимостей - эффект вызывается только при первом рендере компонента

  // Обработчик поиска
  const handleSearch = async (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    if (!searchQuery.trim()) return; // Если строка поиска пуста, ничего не делаем
    if (loading) return; // Если загрузка, не разрешаем поиск

    setLoading(true); // Включаем загрузку
    setMovies([]); // Очищаем текущий список фильмов (при новом поиске)

    try {
      const searchResults = await searchMovies(searchQuery); // Поиск по фильму
      setMovies(searchResults); // Сохраняем результаты поиска в состояние
      setError(null); // Сбрасываем ошибку, если поиск успешен
    } catch (err) {
      console.error(err);
      setError("Failed to search movies"); // Сообщение об ошибке поиска
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>} {/* Сообщение об ошибке */}

      {loading ? (
        <div className="loading">Loading...</div>  // Индикатор загрузки
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            // Если фильмы загружены, отображаем их
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <div className="no-movies">No movies found</div> // Сообщение, если фильмы не найдены
          )}
        </div>
      )}
      
    </div>
  );
}

export default Home;

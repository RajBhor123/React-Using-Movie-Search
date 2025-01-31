import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    if (!query) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=6c3a2d45`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center mb-8">Movie Search</h1>
      
      <form onSubmit={handleSubmit} className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <Search className="inline-block mr-2" size={20} />
          Search
        </button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      
      {error && <div className="error-message">{error}</div>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
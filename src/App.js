import "./App.css";
import { getMovieList, searchMovie } from "./Api";
import { useState, useEffect } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-Wrapper" key={i}>
          <div className="Movie-Title">{movie.title}</div>
          <img
            className="Movie-Image"
            alt="huhu"
            src={`${process.env.REACT_APP_BASEIMAGEURL}/${movie.poster_path}`}
          />
          <div className="Movie-Date">{movie.release_date}</div>
          <div className="Movie-Rating">{movie.vote_average}</div>
        </div>
      );
    });
  };
  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  console.log({ popularMovies: popularMovies });
  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Movie</h1>
        <input
          placeholder="Cari film kesayangan..."
          className="Movie-Search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-Container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;

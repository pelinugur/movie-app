import React, { useState, useEffect } from "react";
import './App.css';
import MovieList from "./Components/MovieList";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListHeading from "./Components/MovieListHeading";
import SearchBox from "./Components/SearchBox";
import AddFavourites from "./Components/AddFavourites";
import RemoveFavourites from "./RemoveFavourites";
import axios from 'axios'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([])
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f597ef81`
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search)

    }
  }

  useEffect(() => {
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=f597ef81')
    .then(resp => {
      console.log(resp)
    })
  }, [])

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'))

    setFavourites(movieFavourites)
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }

  }, [])
  console.log(searchValue);


  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))

  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container movie-app">

      <div className="row d-flex align-items-center mt-4 mb-4">

        <MovieListHeading
          heading="Movies" />

        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue} />
      </div>


      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          setMovies={setMovies}
          FavoriteComponent={AddFavourites} />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading
          heading="Favourites" />
      </div>


      <div className="row">
        <MovieList movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          FavoriteComponent={RemoveFavourites} />
      </div>


    </div>
  );
}

export default App;

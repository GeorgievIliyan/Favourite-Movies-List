import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`
    
    const response = await fetch(url);
    const responseJson = await response.json()

    if(responseJson.Search){
      setMovies(responseJson.Search)
    }
  }

  useEffect (() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect (() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'))
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouritesList = [...favourites, movie]
    setFavourites(newFavouritesList)
    saveToLocalStorage(newFavouritesList)
  }

  const RemoveFavouriteMovie = (movie) => {
    const newFavouritesList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouritesList);
    saveToLocalStorage(newFavouritesList);
  };

  return (
    <div className="App container-fluid movie-app p-5">
      <div className='row d-flex align-items-centers'>
        <MovieListHeading heading='Movies' subtitle = 'Find the movies you want'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList 
          movies={movies} 
          handleFavouritesClick={addFavouriteMovie} 
          favouriteComponent={AddFavourites}
        />
      </div>
      <h1 className='my-5'>Favourites: </h1>
      <div className="row">
        <MovieList 
          movies={favourites} 
          handleFavouritesClick={RemoveFavouriteMovie} 
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
}

export default App;
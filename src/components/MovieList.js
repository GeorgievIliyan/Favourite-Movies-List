import React from 'react'
import AddFavourites from './AddFavourites';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent
    return (
        <>
            {props.movies && props.movies.map((movie, index) => (
                <div key={index} className="image-container col d-flex align-items-center justify-content-start">
                    <img 
                        src={movie.Poster} 
                        alt="movie" 
                        style={{ width: '250px', height: '400px' }} 
                    />
                    <div
                        className='overlay d-flex align-items-center justify-content-center'
                        onClick={() => props.handleFavouritesClick(movie)}
                    >
                        <FavouriteComponent/>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList
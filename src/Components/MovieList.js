import React from 'react'

const MovieList = (props) => {
    const FavoriteComponent = props.FavoriteComponent;
    return (
        <>
            {props.movies.map((movie, index) =>
                <div key={index} className='col-lg-3 image-container d-flex flex-column justify-content-start'>
                    <img src={movie.Poster} alt='movie' />
                    <div onClick={() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavoriteComponent />
                    </div>

                </div>
            )}
        </>
    )
}

export default MovieList
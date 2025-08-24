import React from 'react'

function MovieListHeading(props) {
    return (
        <div className='col'>
            <h1>{props.heading}</h1>
            <p className='text-sm fw-light'>{props.subtitle}</p>
        </div>
    )
}

export default MovieListHeading
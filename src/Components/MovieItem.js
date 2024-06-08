import React from 'react'

const MovieItem = (props) => {
    return (
        <div>
            <div className="movie-flip-card">
                <div className="movie-flip-card-inner">
                    <div className="movie-flip-card-front">
                        {/* pass the poster using api */}
                        <img src={props.Poster} alt="" />
                    </div>
                    <div className="movie-flip-card-back">
                        <div className="strip"></div>
                        <div className="mstrip"></div>
                        <div className="sstrip">
                            <p className="code">Title - {props.title} ({props.type})</p>
                            <p className="code">genre - {props.genre}</p>
                            <p className="code">actors - {props.actors}</p>
                            <p className="code">language - {props.language}</p>
                            <p className="code">{props.runtime.split(" ").length>=2 ?  `runtime - ${props.runtime}`:`Total Season - ${props.runtime}`}</p>
                            <p className="code">rating - {props.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieItem

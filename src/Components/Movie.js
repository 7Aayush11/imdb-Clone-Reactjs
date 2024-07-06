import React, { useState, useEffect } from 'react'
import MovieItem from './MovieItem'
import Spinner from './Spinner';

const Movie = () => {

    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true)
    const apikey = "40713c4b";
    const itemsPerPage = 4;
    const titleList = ["The Shawshank Redemption",
        "The Godfather",
        "The Dark Knight",
        "The Godfather: Part II",
        "12 Angry men",
        "Schindler's List",
        "The Lord of the Rings: The Return of the King",
        "Pulp Fiction",
        "The Good, the Bad and the Ugly",
        "Fight Club",
        "Forrest Gump",
        "Inception",
        "Star Wars: Episode V - The Empire Strikes Back",
        "The Lord of the Rings: The Fellowship of the Ring",
        "The Matrix", "Star Wars: Episode IV - A New Hope", "GoodFellas",
        "One Flew Over the Cuckoo's Nest",
        "Hamilton",
        "Seven Samurai",
        "Se7en",
        "Life Is Beautiful",
        "City of God",
        "The Silence of the Lambs",
        "It's a Wonderful Life","Saving Private Ryan","12th Fail",
        "Spirited Away",
        "Parasite",
        "The Green Mile",
        "Interstellar",
        "Léon: The Professional"
    ];
    //eslint-disable-next-line
    const fetchMovie = async () => {
        setLoading(true)
        const promises = titleList.map(title => {
            const url = `https://www.omdbapi.com/?t=${title}&apikey=${apikey}`;
            return fetch(url).then(response => response.json());
        });
        const results = await Promise.all(promises);
        setItem(results);
        setLoading(false)
    }

    useEffect(() => {
        fetchMovie();
        // eslint-disable-next-line
    }, []);

    const movieSlides = Array(Math.ceil(item.length / itemsPerPage)).fill().map((_, index) => {
        const start = index * itemsPerPage;
        const end = start + itemsPerPage;
        return item.slice(start, end);
    });

    return (
        <div>
            <div className="container text-start" style={{ marginTop: "50px" }}>
                <h4 style={{ margin: "15px 40px", color: 'white', textDecoration: "underline" }}>All time popular movies</h4>
                {loading && <Spinner/>}
                <div id="carouselMovie" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {movieSlides.map((mslide, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="row">
                                    {mslide.map((element) => (
                                        <div className="col-md-2" style={{ margin: "0 40px" }} key={element.imdbID}>
                                            <MovieItem
                                                title={element.Title}
                                                actors={element.Actors}
                                                directors={element.Director}
                                                Poster={element.Poster}
                                                type={element.Type}
                                                language={element.Language}
                                                runtime={element.Runtime}
                                                genre={element.Genre}
                                                date={element.Released}
                                                rating={element.imdbRating}
                                                imdbID={element.imdbID}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev" type="button" data-bs-target="#carouselMovie" data-bs-slide="prev" style={{ display: "flex", justifyContent: "flex-start", width: "40px" }}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselMovie"
                        data-bs-slide="next" style={{ display: "flex", justifyContent: "flex-end", width: "40px" }}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Movie;
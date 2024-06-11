import React, { useState, useEffect } from 'react'
import MovieItem from './MovieItem'
import Spinner from './Spinner';

const Series = () => {

    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const apikey = "40713c4b";
    const itemsPerPage = 4;
    const titleList = [
        "Breaking Bad",
        "Game of Thrones",
        "The Wire",
        "Sherlock",
        "The Sopranos",
        "Arrested Development",
        "Firefly",
        "Dexter",
        "Avatar: The Last Airbender",
        "The Simpsons",
        "Monty Python’s Flying Circus",
        "Rome",
        "Freaks and Geeks",
        "Twin Peaks",
        "The Twilight Zone",
        "Death Note",
        "Oz",
        "Seinfeld", 
        "Better Call Saul",
        "House of Cards",
        "Peaky Blinders",
        "Band of Brothers",
        "Friends",
        "The Office",
        "Stranger Things",
        "The Mandalorian",
        "Black Mirror",
        "True Detective"
    ];

    //eslint-disable-next-line
    const fetchSeries = async () => {
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
        fetchSeries();
        // eslint-disable-next-line
    }, []);

    const seriesSlides = Array(Math.ceil(item.length / itemsPerPage)).fill().map((_, index) => {
        const start = index * itemsPerPage;
        const end = start + itemsPerPage;
        return item.slice(start, end);
    });

    return (
        <div>
            <div className="container text-start" style={{ marginTop: "50px" }}>
                <h4 style={{ margin: "15px 40px", color: 'white', textDecoration: "underline" }}>All time popular Series</h4>
                {loading && <Spinner/>}
                <div id="carouselSeries" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {seriesSlides.map((sslide, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="row">
                                    {sslide.map((element) => (
                                        <div className="col-md-2" style={{ margin: "0 40px" }} key={element.imdbID}>
                                            <MovieItem
                                                title={element.Title}
                                                actors={element.Actors}
                                                directors={element.Director}
                                                Poster={element.Poster}
                                                type={element.Type}
                                                language={element.Language}
                                                runtime={element.totalSeasons}
                                                genre={element.Genre}
                                                date={element.Released}
                                                rating={element.imdbRating}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev" type="button" data-bs-target="#carouselSeries" data-bs-slide="prev" style={{ display: "flex", justifyContent: "flex-start", width: "40px" }}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselSeries"
                        data-bs-slide="next" style={{ display: "flex", justifyContent: "flex-end", width: "40px" }}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Series;
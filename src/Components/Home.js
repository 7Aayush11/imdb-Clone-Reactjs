import React, { useState, useEffect } from 'react'
import MovieItem from './MovieItem'

const Home = () => {

    const [data, setData] = useState([]);
    const apikey = "40713c4b";
    const titleList = ["The Shawshank Redemption","The Godfather","The Dark Knight","The Godfather Part II","12 Angry Man", "Schindler's List", "The Lord of the Rings: The Return of the King", "Pulp Fiction", "The Lord of the Rings: The Fellowship of the Ring", "The Good, the Bad and the Ugly", "Inception", "Matrix"]
    const random = Math.floor(Math.random() * titleList.length);
    const title = titleList[random];
    //eslint-disable-next-line
    const fetchItem = async () => {
        const url = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apikey}`);
        const parsedData = await url.json()
        console.log(parsedData);
        setData(parsedData);
    }
    useEffect(() => {
        fetchItem();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <div className="container text-center" style={{ marginTop: "50px" }}>
                <div className="row align-items-start">
                    <div className="col">
                        <MovieItem title={data.Title} actors={data.Actors} directors={data.Director} Poster={data.Poster} type={data.Type} language={data.Language} runtime={data.Runtime} genre={data.Genre} date={data.Released} rating={data.imdbRating}/>
                    </div>
                    {/* <div className="col">
                        <MovieItem />
                    </div>
                    <div className="col">
                        <MovieItem />
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default Home

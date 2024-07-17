import React, { useContext } from 'react'
import SearchContext from '../Context/SearchContext'
import star from "./star.png"
import award from "./award.png"
import NA from "./NA.png"
import { useNavigate } from 'react-router-dom'

const FullMovieDetail = () => {

    const { searchContext } = SearchContext;
    const { genre, item, type, addItem } = useContext(searchContext)
    const navigate = useNavigate();

    const handleSave = async (id, poster)=>{
        await addItem(id, poster)
    }
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button type="button" className="btn btn-danger" style={{ marginTop: "35px", marginLeft: "27px" }} onClick={() => { navigate(-1) }}>Back</button>
                {/* Show an alert when it is saved and when it is already saved */}
                <button type="button" className="btn btn-success" style={{ marginTop: "35px", marginRight: "27px" }} onClick={()=>handleSave(item.imdbID, item.Poster)}>Save</button>
            </div>
            <div className="container text-center" style={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-start' }}>
                <div style={{ margin: "15px" }}>
                    <img src={item.Poster === "N/A" ? NA : item.Poster} alt="" style={{ height: "390px" }} />
                </div>
                <div style={{ margin: "15px", textAlign: "start", color: "#dfd8d8" }}>
                    <div className='container' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        {/* Title */}
                        <h3 className='mx-1'>{item.Title} - </h3>
                        {/* Genre */}
                        {genre.map((index) => (
                            <span key={index} className="badge rounded-pill text-bg-info mx-1">{index}</span>
                        ))}
                    </div>

                    <div className="container mx-1" style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Date, type, time */}
                        {type} . {item.Year} . {item.Runtime} {item.totalSeasons ? `. ${item.totalSeasons} Seasons` : null}
                        {/* Languages */}
                        <strong>{item.Language}</strong>
                        {/* Plot */}
                        <p className='my-2'>{item.Plot}</p>
                        {/* Rating*/}
                        <div className="row my-2" style={{ color: item.imdbRating >= "7" ? 'green' : item.imdbRating >= 3.8 ? "yellow" : "red" }}>
                            <img src={star} alt="Rating" style={{ maxWidth: "48px", maxHeight: "24px" }} />
                            {item.imdbRating}/10 . {item.imdbVotes} votes
                        </div>
                        {/* Awards */}
                        <div className="row mb-3" >
                            <img src={award} alt="Rating" style={{ maxWidth: "48px", maxHeight: "24px" }} />{item.Awards}
                        </div>
                        {/* Actor, Director, Writer */}
                        <div className="row">
                            <div className="col">
                                <div className="card" style={{ height: "100px", backgroundColor: 'cyan' }}>
                                    <div className="card-body" style={{ backgroundColor: "#111414", borderRadius: "inherit" }}>
                                        <h5 className="card-title" style={{ fontSize: "18px", color: 'deepskyblue' }}>Stars</h5>
                                        <h6 className="card-subtitle mb-2" style={{ fontSize: "13px", color: "#b6e4efcf" }}>{item.Actors}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card" style={{ height: "100px", backgroundColor: 'cyan' }}>
                                    <div className="card-body" style={{ backgroundColor: "#111414", borderRadius: "inherit" }}>
                                        <h5 className="card-title" style={{ fontSize: "18px", color: 'deepskyblue' }}>Directors</h5>
                                        <h6 className="card-subtitle mb-2" style={{ fontSize: "13px", color: "#b6e4efcf" }}>{item.Director}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card" style={{ height: "100px", backgroundColor: 'cyan' }}>
                                    <div className="card-body" style={{ backgroundColor: "#111414", borderRadius: "inherit" }}>
                                        <h5 className="card-title" style={{ fontSize: "18px", color: 'deepskyblue' }}>Writers</h5>
                                        <h6 className="card-subtitle mb-2" style={{ fontSize: "13px", color: "#b6e4efcf" }}>{item.Writer}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullMovieDetail

import React, { useContext, useState } from 'react'
import SearchContext from '../Context/SearchContext'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { searchContext } = SearchContext
    const { setEle } = useContext(searchContext)
    const [type, setType] = useState(null)
    const [title, setTitle] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        setTitle(title)
        setEle([title, type]);
        navigate(`/search/${title}`);
    };

    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/")
    }

    const handleMovie = () => {
        setType("movie")
        setEle([title, type]);
    }

    const handleSeries = () => {
        setType("series")
        setEle([title, type]);
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">AMdb</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Saved">Saved</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-disabled="true">NA</Link>
                            </li>
                        </ul>
                        <ul className="d-flex justify-content-end me-4 mb-2 mb-lg-0">
                            <li className="nav-item dropdown-center">
                                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "white" }}>
                                    Filter
                                </span>
                                <ul className="dropdown-menu">
                                    <li><span className="dropdown-item" onClick={handleSubmit}>All</span></li>
                                    <li><span className="dropdown-item" onClick={handleMovie}>Movie</span></li>
                                    <li><span className="dropdown-item" onClick={handleSeries}>Series</span></li>
                                </ul>
                            </li>
                        </ul>
                        <input className="me-2" placeholder="Search" aria-label="Search" id='title' />
                        <button className="btn btn-outline-success" onClick={handleSubmit}>
                            Search</button>
                        {
                            localStorage.getItem('token') ?
                                <button type='button' className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button> : <>
                                    <button type="button" className="btn btn-success mx-2" onClick={() => { navigate('/login') }}>Login</button>
                                    <button type="button" className="btn btn-success mr-2" onClick={() => { navigate('/signup') }}>Signup</button>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

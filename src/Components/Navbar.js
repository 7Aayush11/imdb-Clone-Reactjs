import React, { useContext } from 'react'
import SearchContext from '../Context/SearchContext'
// import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { searchContext } = SearchContext
    const { handleSearch } = useContext(searchContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        handleSearch(title);
    };
    return (

        <>

            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/">Action</a></li>
                                    <li><a className="dropdown-item" href="/">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <input className="me-2" placeholder="Search" aria-label="Search" id='title' />
                        <button className="btn btn-outline-success" onClick={handleSubmit}>
                            Search</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

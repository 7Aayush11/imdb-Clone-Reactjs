import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchContext from '../Context/SearchContext'
import wave from './wave.svg'

const Login = () => {

    const { searchContext } = SearchContext
    const context = useContext(searchContext);
    const { getUser, showAlert, mode } = context

    const [cred, setCred] = useState({ username: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: cred.username, password: cred.password }),
        });
        const json = response.json()

        const promiseThen = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(json);
            }, 100);
        });

        promiseThen
            .then((val) => {
                if (val.success) {
                    //Save the auth token and redirect
                    localStorage.setItem('token', val.authtoken)
                    showAlert(`Welcome back ${cred.username}`, "success")
                    getUser()
                    navigate("/")
                }
                else {
                    //Show alert

                    showAlert("Something went wrong try again with correct credintials", "warning")
                }
            })
            .catch((err) => console.log(err));
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle" style={{backgroundImage: 'linear-gradient(to bottom, #0d1010, #0a1414, #081619, #05191e, #031b23)', color: 'white'}}>
                <div className="card-body row">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input style={{ backgroundColor: mode === 'dark' ? '#F2ECFF' : 'white' }} type="text" className="form-control" value={cred.username} onChange={onChange} id="username" name="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input style={{ backgroundColor: mode === 'dark' ? '#F2ECFF' : 'white' }} type="password" className="form-control" value={cred.password} onChange={onChange} id="password" name="password" />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button type="submit" className="btn btn-primary" style={{textAlign: 'center'}}>Login</button>
                        </div>
                        <p style={{ color: 'white' }}>New user? get started <Link to="/signup">Signup</Link></p>
                    </form>
                </div>
            </div>
            <img src={wave} alt="wave" className='fixed-bottom' style={{zIndex: -1}}/>
        </div>
    )
}

export default Login
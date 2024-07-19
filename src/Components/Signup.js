import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SearchContext from '../Context/SearchContext';
import wave from './wave.svg'

const SignUp = () => {
    const [cred, setCred] = useState({ name: "", email: "", username: "", password: "", cpass: "" })
    let navigate = useNavigate();

    const { searchContext } = SearchContext
    const context = useContext(searchContext);
    const { showAlert } = context;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, email, username, password } = cred

        if (document.getElementById("cpass").value === document.getElementById("password").value) {
            const response = await fetch("http://localhost:4000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, username, password }),
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
                        navigate("/")
                        showAlert(`Hello ${name} have your notes in one place`, "success")
                    }
                    else {
                        //Show alert
                        showAlert("Something went wrong check whether user already exist", "warning")
                    }
                })
                .catch((err) => console.log(err));
        }
        else {
            showAlert("Password and Confirm Password does not match", "warning")
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="card position-absolute top-50 start-50 translate-middle" style={{backgroundImage: 'linear-gradient(to bottom, #0d1010, #0a1414, #081619, #05191e, #031b23)'}}>
                <div className="card-body row" >
                    <form id='signupForm' onSubmit={handleSubmit} style={{ color: 'white' }}>
                        <div className="col">
                            <div className="row my-3">
                                <div className="col-4">
                                    <label htmlFor="name" className="form-label">Name</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" value={cred.name} minLength={3} onChange={onChange} required id="name" name="name" />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" value={cred.email} onChange={onChange} required id="email" name="email" />
                                </div>  
                            </div>
                            <div className="row my-3">
                                <div className="col-4">
                                    <label htmlFor="username" className="form-label">Username</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" value={cred.username} onChange={onChange} minLength={5} id="username" name="username" />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                </div>
                                <div className="col-8">
                                    <input type="password" className="form-control" value={cred.password} onChange={onChange} minLength={8} id="password" name="password" />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-4">
                                    <label htmlFor="cpass" className="form-label">Confirm Password</label>
                                </div>
                                <div className="col-8">
                                    <input type="password" className="form-control" value={cred.cpass} onChange={onChange} minLength={8} required id="cpass" name="cpass" />
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button type="submit" className="btn btn-primary" style={{textAlign: 'center'}}>Sign Up</button>
                        </div>
                        <p style={{ color: 'white', textAlign: 'center' }}>Have an account?  <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
            <img src={wave} alt="wave" className='fixed-bottom' style={{zIndex: -1}}/>
        </div >
    )
}

export default SignUp
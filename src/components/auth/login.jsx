
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import swal from "sweetalert";
function Login() {
    async function loginUser(Credential) {
        return fetch("http://localhost:5000/api/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Credential)
        }).then(data => data.json())
    }
    const [email, setuserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            email,
            password
        });
        if ('token' in response) {
            swal({
                title: "Success",
                text: "Login Succefully",
                icon: "success",
                buttons: false,
                timer: 3000,
            }).then((value) => {
                sessionStorage.setItem('token', response['token']);
                sessionStorage.setItem('user', response['user']);
                sessionStorage.setItem('userName', response['userName']);
                window.location.href = "/";
            })
        } else {
            swal({
                title: "Error",
                text: response.message,
                icon: "error",
                buttons: false,
                dangerMode: true,
                timer: 3000,
            });
        }
    };
    return (
        <div className='container container-login'>
            <form onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-5 mb-3">
                            <h3 className='text-center'>Log In</h3>
                        </div>
                        <div className="col-lg-12 col-md-12 col-md-12">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="" className='form-control' required onChange={e => setuserName(e.target.value)} />
                        </div>
                        <div className="col-lg-12 col-md-12 col-md-12">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="" className='form-control' required onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="row mt-3 text-center">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <button type="submit" className='btn btn-primary btn-block'>Submit</button>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <NavLink to='/registration'><p>Click here to sign up</p></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
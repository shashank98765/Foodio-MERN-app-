import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
export default function Login() {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials")
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"))
            console.log(localStorage.getItem("userEmail"))

            navigate("/")
        }

    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148703851.jpg?w=996&t=st=1714317782~exp=1714318382~hmac=d9437e4ce285d22814f16780656a9cb4131dec89aae26087b5669b4e50d3ba69")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-danger rounded'  onSubmit={handleSubmit}>

                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email Address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassNameword1" class="form-label fw-bold">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassNameword1" />
                    </div>


                    <button type="submit" className="m-3 btn btn-success fw-bold">Submit</button>
                    <Link to="/createuser" className='m-3 btn btn-danger fw-bold'>I'm a new user</Link>
                </form>
            </div>

        </div>
    )
}

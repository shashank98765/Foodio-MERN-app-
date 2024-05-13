import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
export default function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials")
        }

    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148695092.jpg?w=996&t=st=1714318166~exp=1714318766~hmac=504d03e5c800289445d375c515df584ec27ebe456a1767adedaffd144902525f")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-danger rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />

                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email Address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassNameword1" class="form-label fw-bold">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassNameword1" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassNameword1" class="form-label fw-bold">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassNameword1" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success fw-bold">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger fw-bold'>Already a user</Link>
                </form>
            </div>
            </div>
            )
}

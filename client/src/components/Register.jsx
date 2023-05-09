import React, { useState } from 'react'
import axios from "axios"


const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3001/auth/register", { email, password })
            console.log("registration completed");
            window.location = "/auth"
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='auth-container'>
            <form onSubmit={onSubmitHandler}>
                <h2>Register</h2>
                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' id='username' value={email} onChange={(e) => setEmail(e.target.value)}  required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register

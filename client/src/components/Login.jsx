import React, { useState } from 'react'
import axios from "axios"
import { useCookies } from "react-cookie"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const user = await axios.post("http://localhost:3001/auth/login", { email, password })

            setCookies("access_token", user.data.token) //access_token = token şeklinde çerez oluşturur
            localStorage.setItem("userID", user.data.userID)

            navigate("/")

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='auth-container'>
            <form onSubmit={onSubmitHandler}>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' id='username' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login

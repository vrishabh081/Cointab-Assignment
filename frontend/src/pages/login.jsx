import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const payload = {email, password};
        axios.post("http://localhost:8080/login", payload)
            .then(res=>{
                if(res.data.message){
                    localStorage.setItem("user", JSON.stringify(res.data))
                    alert(res.data.message)
                    navigate("/")
                }
            })
            .catch(err=>{
                if(err.response.data.error){
                    alert(err.response.data.error)
                }
            })
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={submitHandler}>
                <input type="email" placeholder='Your email' onChange={(e)=>setEmail(e.target.value)}required />
                <input type="password" placeholder='Your password' onChange={(e)=>setPassword(e.target.value)} required />
                <input type="submit" value={"Submit"} />
            </form>
        </div>
    )
}

export default Login

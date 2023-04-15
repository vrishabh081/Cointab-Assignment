import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const payload = {name, email, password};
        axios.post("http://localhost:8080/signup", payload)
            .then(res=>{
                if(res.data.message){
                    alert(res.data.message)
                    navigate("/login")
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
            <h1>Sign up</h1>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder='Your name' onChange={(e)=>setName(e.target.value)} required />
                <input type="email" placeholder='Your email' onChange={(e)=>setEmail(e.target.value)} required />
                <input type="password" placeholder='Your password' onChange={(e)=>setPassword(e.target.value)} required />
                <input type="submit" value={"Submit"} />
            </form>
        </div>
    )
}

export default Signup

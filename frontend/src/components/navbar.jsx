import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("user")
    navigate("/login");
  } 

  return (
    <nav id='navbar'>
        <Link to={"/"}>Home</Link>
        <div>
            {
              user === null ?
              (
                <>
                  <Link to={"/signup"}>Sign up</Link>
                  <Link to={"login"}>Log in</Link>
                </>
              )
              :
              (
                <>
                  <p>{user.email}</p>
                  <button onClick={logoutHandler}>Log out</button>
                </>
              )
            }
        </div>
    </nav>
  )
}

export default Navbar

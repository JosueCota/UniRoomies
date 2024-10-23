import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
        <h2>Welcome to UniRoomies</h2>
        <p>
        <Link to={"/register"}>Create Account</Link>
        </p>
        <p>
        <Link to={"/login"}>Already Have An Account?</Link>
        </p>
    </div>
  )
}

export   default Homepage

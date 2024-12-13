import React from 'react'
import { Link } from 'react-router-dom'

//For general errors experienced in the website
const ErrorBound = () => {
  return (
    <div style={{display: 'flex', flexFlow:"column wrap", border: "2px solid lightgrey", alignItems:"center", justifySelf:"center", padding: "2rem", marginTop:"25vh", borderRadius: "2rem", width:"50%", textAlign:"center"}}>
      <h1>Error: Something Went Wrong</h1>
      <p>Hi! Either this page doesn't exist, or something went wrong: <strong>Please click the following link to be taken back <Link to="/">UniRoomies.com</Link></strong></p>
    </div>
  )
}

export default ErrorBound
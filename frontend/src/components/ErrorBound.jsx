import React from 'react'
import { Link } from 'react-router-dom'

const ErrorBound = () => {
  return (
    <div style={{display: 'flex', flexFlow:"column wrap", border: "2px solid lightgrey", alignItems:"center", justifySelf:"center", padding: "2rem", marginTop:"25vh", borderRadius: "2rem"}}>
      <h1>Error 404: Page Not Found</h1>
      <p>Please click the following link to be taken back <strong><Link to="/">UniRoomies.com</Link></strong></p>
    </div>
  )
}

export default ErrorBound
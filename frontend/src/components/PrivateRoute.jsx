import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import React from 'react'

const PrivateRoute = () => {
  
    const {user} = useSelector(state=> state.auth); 

    return user  ? <Outlet/> : <Navigate to="/login" replace/>;
}

export default PrivateRoute

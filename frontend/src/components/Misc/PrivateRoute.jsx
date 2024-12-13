import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import React from 'react'

//Requires user to be logged in (only checks client-side login; redux state)
//App handles server side login
const PrivateRoute = () => {
  
    const {user} = useSelector(state=> state.auth); 

    return user  ? <Outlet/> : <Navigate to="/login" replace/>;
}

export default PrivateRoute

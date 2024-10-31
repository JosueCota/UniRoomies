import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../features/usersApiSlice';
import { clearCredentials } from "../../features/authSlice"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {CDBSidebarMenuItem} from "cdbreact"
import { deleteSearch } from '../../features/searchesSlice';

const LogoutButton = () => {

    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
          await logout().unwrap();

          dispatch(clearCredentials());
          dispatch(deleteSearch());

          navigate('/')
          toast.success("Logged Out!", {toastId: "logoutSuccess"});
          
        } catch (err) {
          toast.error(err?.data?.message || err.error, {toastId: "logoutServerErr"})
        }
      }

  return (
      <button style={{width: "90%", padding: "5px"}} type='button' className='btn btn-outline-light' onClick={logoutHandler}>
                <CDBSidebarMenuItem icon='arrow-right-from-bracket' >Log Out</CDBSidebarMenuItem>
      </button>
  )
}

export default LogoutButton

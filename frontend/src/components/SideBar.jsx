import React from 'react';
import {
    CDBSidebar, 
    CDBSidebarContent, 
    CDBSidebarFooter, 
    CDBSidebarHeader, 
    CDBSidebarMenu, 
    CDBSidebarMenuItem, 
} from "cdbreact"
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/usersApiSlice';
import { clearCredentials } from "../features/authSlice"
import { useDispatch } from 'react-redux';

const Sidebar = () => {

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', position:"sticky", top:"0rem" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            UniRoomies
          </NavLink>
        </CDBSidebarHeader>
        
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/roommates" className={({isActive}) => isActive? "activeClicked" : ""}>
              <CDBSidebarMenuItem icon="people-group">Roommates</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/rooms" className={({isActive}) => isActive? "activeClicked" : ""}>
              <CDBSidebarMenuItem icon="house-user">Rooms</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" className={({isActive}) => isActive? "activeClicked" : ""}>
              <CDBSidebarMenuItem icon="user" iconType=''>Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/messages" className={({isActive}) => isActive? "activeClicked" : ""}>
              <CDBSidebarMenuItem icon="comments">Messages</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            <button style={{width: "90%", padding: "5px"}} type='button' className='btn btn-outline-light' onClick={logoutHandler}>
                <CDBSidebarMenuItem icon='arrow-right-from-bracket' >Log Out</CDBSidebarMenuItem>
            </button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;

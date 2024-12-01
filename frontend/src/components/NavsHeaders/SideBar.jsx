import React, { useState, useLayoutEffect } from 'react';
import {
    CDBSidebar, 
    CDBSidebarContent, 
    CDBSidebarFooter, 
    CDBSidebarHeader, 
    CDBSidebarMenu, 
    CDBSidebarMenuItem, 
} from "cdbreact"
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import SideBarButton from './SideBarButton';
import { BsFillHousesFill } from "react-icons/bs";

const Sidebar = () => {

  const [mobile, setMobile] = useState(false)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 550) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
    {mobile && !open && <SideBarButton onClick={() => setOpen(prev => true)}/>}
    {
      (mobile && open) || (!mobile)?
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', position: `${!mobile? "sticky": "absolute"}`, top:"0rem" }}>
      <CDBSidebar textColor="#fff" backgroundColor="var(--sidebar)" toggled={!open} >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={(e) => setOpen(prev => !prev)}></i>} >
          <NavLink href="/" className="text-decoration-none" style={{ color: 'inherit',display:"flex", alignItems:"center" }}>
          <BsFillHousesFill style={{ width: '30px' }}/>
            UniRoomies
          </NavLink>
        </CDBSidebarHeader>
        
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/roommates/1" className={({isActive}) => isActive? "activeClicked" : ""}>
              <CDBSidebarMenuItem icon="people-group">Roommates</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/rooms/1" className={({isActive}) => isActive? "activeClicked" : ""}>
              <CDBSidebarMenuItem icon="house-user">Rooms</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/user" className={({isActive}) => isActive? "activeClicked" : ""}>
              <CDBSidebarMenuItem icon="user" iconType=''>Profile</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
            >
            <LogoutButton/>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>: null}
            </>
  );
};

export default Sidebar;

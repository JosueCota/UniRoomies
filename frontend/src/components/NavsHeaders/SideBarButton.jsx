import React from 'react'
import { FaBars } from "react-icons/fa";

//Mobile button that becomes visible at 700px
const SideBarButton = ({onClick}) => {
  return (
    <button style={{position:"absolute", zIndex:"20", top:"20px", left:"12px", background:"none", border: "none"}} onClick={onClick}><FaBars color='#fff'/></button>
  )
}

export default SideBarButton

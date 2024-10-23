import { Outlet } from "react-router-dom"
import Sidebar from "../components/SideBar"

function App() {

  return (
  <div style={{display:"flex"}}>
    {/* Sidebar won't show in login or register screen */}
    <Sidebar/>
    <Outlet />  
  </div>
  
)}

export default App

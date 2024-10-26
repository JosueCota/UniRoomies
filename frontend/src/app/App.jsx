import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { ToastContainer }  from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {

  const {userInfo} = useSelector((state) => state.auth);

  return (
  <div style={{display:"flex", backgroundColor:"#fef5eb", minHeight: "100vh"}}>
    {/* Sidebar won't show in login or register screen */}
    {userInfo? <Sidebar/>: null}
    <ToastContainer/>
    <Outlet />  
  </div>
  
)}

export default App

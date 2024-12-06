import { Outlet } from "react-router-dom";
import Sidebar from "../components/NavsHeaders/SideBar";
import { ToastContainer }  from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useCheckAuthQuery } from '../features/authApiSlice.js';
import { showToastError } from "../utils/helperFunctions.js";

function App() {

  const {user} = useSelector((state) => state.auth);

  try {
    if (user) {
      const { auth } = useCheckAuthQuery()
      console.log(auth)
    }
  } catch(err) {
    showToastError(err, "authError")
  }
  
  return (
  <div style={{display:"flex", backgroundColor:"var(--main-background)", minHeight: "100vh", height:"100%"}}>
    {/* Sidebar won't show in login or register screen */}
    {user? <Sidebar/>: null}
    <ToastContainer limit={3}/>
    <Outlet />  
  </div>
  
)}

export default App

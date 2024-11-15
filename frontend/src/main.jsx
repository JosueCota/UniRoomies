import './index.css'
import ReactDOM from "react-dom/client"
import { StrictMode } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux"
import store from "./app/store.js"

import App from './app/App.jsx'
import ErrorBound from "./components/ErrorBound.jsx";
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Homepage from "./pages/Homepage.jsx";
import Roommates from "./pages/Roommates.jsx"
import Rooms from "./pages/Rooms.jsx"
import Profile from "./pages/Profile.jsx"
import ActivationPage from './pages/ActivationPage.jsx';
import ProfileRoommateTab from './components/Profile/ProfileRoommateTab.jsx';
import ProfileRoommateTabEdit from './components/Profile/ProfileRoommateTabEdit.jsx';
import ProfileUserTab from "./components/Profile/ProfileUserTab.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBound/>}>
      <Route index={true} path="/" element={<Homepage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/activation/:token" element={<ActivationPage/>} />
      
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute/>}>
        <Route path="/user" element={<Profile/>}>
          <Route index path="" element={<ProfileRoommateTab/>}/>
          <Route path="edit-user" element={<ProfileRoommateTabEdit/>}/>
          <Route path="account" element={<ProfileUserTab/>}/>
        </Route>
        <Route path="/roommates" element={<Roommates/>} />
        <Route path="/rooms" element={<Rooms/>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </Provider>
)

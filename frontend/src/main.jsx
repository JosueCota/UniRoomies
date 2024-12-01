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
import UserTab from './components/Profile/UserTab.jsx';
import AccountTab from "./components/Profile/AccountTab.jsx"
import RoommatePage from './components/Roommates/RoommatePage.jsx';
import RoomEdit from './components/Rooms/RoomEdit.jsx';

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
          <Route index path="" element={<UserTab/>}/>
          <Route path="account" element={<AccountTab/>}/>
        </Route>
        <Route path="/roommates/:page" element={<Roommates/>} />
        <Route path="/roommates/roommate/:id" element={<RoommatePage/>} />
        <Route path="/rooms/:page" element={<Rooms/>} />
        <Route path="/rooms/edit-room" element={<RoomEdit/>}/>
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

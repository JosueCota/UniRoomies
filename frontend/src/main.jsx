import ReactDOM from "react-dom/client"
import { StrictMode } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import ErrorBound from "./components/ErrorBound.jsx";
// import { Provider } from "react-redux"
// import {store} from "./app/store.js"

import App from './app/App.jsx'
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Homepage from "./pages/Homepage.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBound/>}>
      <Route index={true} path="/" element={<Homepage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
      <RouterProvider router={router} />
    {/* </Provider> */}
  </StrictMode>
)

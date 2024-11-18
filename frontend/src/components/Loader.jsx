import React from 'react'
import { Spinner } from "react-bootstrap"
const Loader = () => {
  return (
    <Spinner
        animation='border'
        role="status"
        style={{
          color:"white",
          margin: "auto",
          display: "block"
        }}
    >
        <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}
export default Loader

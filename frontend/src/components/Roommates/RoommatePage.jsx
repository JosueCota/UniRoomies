import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const RoommatePage = () => {

  const navigate = useNavigate();
  const { id } = useParams()
  
  return (
    <div>
      <p>Roommate {id}</p>
      <button type='button' onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default RoommatePage
